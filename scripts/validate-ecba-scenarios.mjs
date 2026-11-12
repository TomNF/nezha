import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];

function check(condition, message) {
  if (!condition) errors.push(message);
}

function loadScript(sandbox, file) {
  vm.runInContext(readFileSync(join(root, file), 'utf8'), sandbox, { filename: file });
}

function assertUnique(items, label) {
  const seen = new Set();
  items.forEach((item) => {
    check(item && item.id, `${label} has an item without an id.`);
    if (!item || !item.id) return;
    check(!seen.has(item.id), `${label} has duplicate id: ${item.id}`);
    seen.add(item.id);
  });
}

function normalizeStem(value) {
  return String(value || '').toLowerCase().replace(/\s+/g, ' ').trim();
}

function assertNoDuplicateStems(questions, label) {
  const seen = new Map();
  questions.forEach((question) => {
    const stem = normalizeStem(question.question);
    check(Boolean(stem), `Question ${question.id} has no stem.`);
    if (!stem) return;
    check(!seen.has(stem), `${label} has duplicate stem: ${question.id} and ${seen.get(stem)}`);
    if (!seen.has(stem)) seen.set(stem, question.id);
  });
}

function assertExplanations(questions, label) {
  questions.forEach((question) => {
    check(
      typeof question.explanation === 'string' && question.explanation.trim().length > 0,
      `${label} question ${question.id} has no explanation.`
    );
  });
}

function assertNoForbiddenOptions(questions, label) {
  const forbidden = /\b(all|none) of the above\b|\bboth a and b\b|\ba and b\b|\bcả .*trên\b|\btất cả (các )?(đáp án|phương án)\b|\bkhông (có )?(đáp án|phương án) nào\b/i;
  questions.forEach((question) => {
    (question.options || []).forEach((option) => {
      check(!forbidden.test(String(option || '')), `${label} question ${question.id} uses a forbidden option: ${option}`);
    });
  });
}

function assertBalancedAnswers(questions, label, minShare, maxShare) {
  const optionCount = questions.reduce((max, question) => {
    return Math.max(max, Array.isArray(question.options) ? question.options.length : 0);
  }, 0);
  const counts = Array.from({ length: optionCount }, () => 0);
  questions.forEach((question) => {
    if (Number.isInteger(question.answer) && question.answer >= 0 && question.answer < optionCount) {
      counts[question.answer] += 1;
    }
  });
  const total = questions.length || 1;
  counts.forEach((count, index) => {
    const share = count / total;
    check(
      share >= minShare && share <= maxShare,
      `${label} answer index ${index} has ${count}/${total} (${(share * 100).toFixed(1)}%), outside ${(minShare * 100).toFixed(0)}-${(maxShare * 100).toFixed(0)}%.`
    );
  });
}

const sandbox = { window: {} };
vm.createContext(sandbox);
['curriculum.js', 'content-data.js', 'curriculum-ext.js', 'exams.js', 'exams-ecba.js', 'exams-ecba-scenarios.js']
  .forEach((file) => loadScript(sandbox, file));

const curriculum = sandbox.window.NEZHA_CURRICULUM;
const content = sandbox.window.NEZHA_CONTENT && sandbox.window.NEZHA_CONTENT.ecba;
const track = curriculum && curriculum.tracks.find((item) => item.id === 'ba');
const exam = sandbox.window.NEZHA_EXAMS.get('ecba-scenario-drill');
const examSets = sandbox.window.NEZHA_EXAMS.list().filter((item) => item.trackId === 'ba');
const fullMocks = examSets.filter((item) => item.examKind !== 'scenario');
const allQuestions = examSets.flatMap((item) => item.questions || []);

check(content, 'ECBA content is missing.');
check(track, 'ECBA track is missing.');
check(exam, 'ECBA scenario drill is missing.');
check(examSets.length === 4, `Expected 3 full mocks plus 1 scenario drill, found ${examSets.length}.`);
check(fullMocks.length === 3, `Expected 3 ECBA full mocks, found ${fullMocks.length}.`);
if (!content || !track || !exam) {
  console.error(errors.join('\n'));
  process.exit(1);
}

check(track.title === 'ECBA', 'ECBA track title should be ECBA.');
check(track.shortTitle === 'ECBA', 'ECBA short title should be ECBA.');
check(track.affectsOverall !== false, 'ECBA should count toward the overall score.');
check(track.examModuleTitle === 'Full Mocks & Scenario Drill', 'ECBA exam module title is wrong.');
check(track.examPrep && track.examPrep.targetPercent === 75, 'ECBA practice target should be 75%.');
check(track.examPrep && track.examPrep.scenarioTarget === 70, 'ECBA scenario target should be 70%.');
check(track.modules.some((module) => module.id === 'ba-mod-0'), 'ECBA orientation module is missing.');
check(track.modules.some((module) => module.id === 'ba-mod-9'), 'ECBA final review module is missing.');

const moduleIndex = (id) => track.modules.findIndex((module) => module.id === id);
check(moduleIndex('ba-mod-0') < moduleIndex('ba-mod-1'), 'ba-mod-0 should come before ba-mod-1.');
check(moduleIndex('ba-mod-9') < moduleIndex('ba-mod-5'), 'ba-mod-9 should come before optional wealth modules.');
check(moduleIndex('ba-mod-4') < moduleIndex('ba-mod-9'), 'ba-mod-9 should come after ba-mod-4.');

['ba-mod-5', 'ba-mod-6', 'ba-mod-7', 'ba-mod-8'].forEach((id) => {
  const module = track.modules.find((item) => item.id === id);
  check(module && module.optional === true, `${id} should be optional.`);
});

check(exam.id === 'ecba-scenario-drill', 'Scenario exam id is wrong.');
check(exam.trackId === 'ba', 'Scenario exam has the wrong trackId.');
check(exam.examKind === 'scenario', 'Scenario exam should have examKind scenario.');
check(exam.formNumber === 4, 'Scenario exam should be form 4.');
check(exam.targetPercent === 70, 'Scenario target should be 70%.');
check(exam.sections.length === 1, 'Scenario exam should have one section.');
check(exam.sections[0].minutes === 30, 'Scenario section should be 30 minutes.');
check(exam.durationMinutes === 30, 'Scenario exam should be 30 minutes.');
check(exam.questions.length === 20, `Expected 20 scenario questions, found ${exam.questions.length}.`);

const topicIds = new Set(content.topics.map((topic) => topic.id));
const coveredTopics = new Set(exam.questions.map((question) => question.topicId));
check(coveredTopics.size === topicIds.size, `Scenario drill covers ${coveredTopics.size}/${topicIds.size} ECBA topics.`);
coveredTopics.forEach((topicId) => {
  check(topicIds.has(topicId), `Scenario question points to an unknown topic: ${topicId}`);
});

assertUnique(exam.questions, 'ECBA scenario questions');
const sectionIds = new Set(exam.sections.map((section) => section.id));
exam.questions.forEach((question) => {
  check(sectionIds.has(question.sectionId), `Question ${question.id} points to an unknown section.`);
  check(Array.isArray(question.options) && question.options.length === 4, `Question ${question.id} should have 4 options.`);
  check(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < question.options.length, `Question ${question.id} has an invalid answer index.`);
  check(Boolean(question.explanation), `Question ${question.id} has no explanation.`);
  check(Boolean(question.topicId), `Question ${question.id} has no topicId.`);
  check(Boolean(question.topicTitle), `Question ${question.id} has no topicTitle.`);
  check(Boolean(question.lessonRef), `Question ${question.id} has no lessonRef.`);
  check(Boolean(question.question), `Question ${question.id} has no question text.`);
});

assertUnique(examSets, 'ECBA exam sets');
assertUnique(allQuestions, 'ECBA exam questions');
assertNoDuplicateStems(allQuestions, 'ECBA mocks');
assertExplanations(allQuestions, 'ECBA mock');
assertNoForbiddenOptions(allQuestions, 'ECBA mock');
assertBalancedAnswers(allQuestions, 'ECBA mocks', 0.15, 0.35);

fullMocks.forEach((mock) => {
  check(mock.questions.length === 50, `Exam ${mock.id} should have 50 questions.`);
  check(mock.durationMinutes === 75, `Exam ${mock.id} should be 75 minutes.`);
  check(mock.sections.length === 1, `Exam ${mock.id} should have one section.`);
  const mockSectionIds = new Set(mock.sections.map((section) => section.id));
  mock.questions.forEach((question) => {
    check(mockSectionIds.has(question.sectionId), `Question ${question.id} points to an unknown section.`);
    check(Array.isArray(question.options) && question.options.length === 4, `Question ${question.id} should have 4 options.`);
    check(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < question.options.length, `Question ${question.id} has an invalid answer index.`);
    check(Boolean(question.explanation), `Question ${question.id} has no explanation.`);
  });
  assertBalancedAnswers(mock.questions, mock.id, 0.10, 0.45);
});

if (errors.length) {
  console.error('ECBA scenario validation failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`ECBA scenario validation passed: 20 questions, 4 options each, all ${topicIds.size} topics covered.`);
