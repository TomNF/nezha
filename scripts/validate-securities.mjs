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
[
  'curriculum.js',
  'content-data.js',
  'securities-content.js',
  'securities-curriculum.js',
  'curriculum-ext.js',
  'exams.js',
  'exams-securities.js'
].forEach((file) => loadScript(sandbox, file));

const curriculum = sandbox.window.NEZHA_CURRICULUM;
const content = sandbox.window.NEZHA_CONTENT && sandbox.window.NEZHA_CONTENT.securities;
const track = curriculum && curriculum.tracks.find((item) => item.id === 'securities');

check(content, 'Securities content is missing.');
check(track, 'Securities track is missing.');
if (!content || !track) {
  console.error(errors.join('\n'));
  process.exit(1);
}

const expectedCoreIds = [
  'sec-mod-0',
  ...Array.from({ length: 8 }, (_, index) => `securities-core-${index + 1}`),
  'sec-mod-9'
];
const coreModules = track.modules.filter((module) => !module.optional);
const optionalModules = track.modules.filter((module) => module.optional);
const coreLessons = coreModules.flatMap((module) => module.lessons || []);
const optionalLessons = optionalModules.flatMap((module) => module.lessons || []);
const quizzes = coreLessons.flatMap((lesson) => lesson.quiz || []);
const flashcards = coreLessons.flatMap((lesson) => lesson.flashcards || []);

check(track.title === 'Securities Theory (SRTC)', 'Securities track has an unexpected title.');
check(track.optional === true, 'Securities track should be optional.');
check(track.prerequisiteId == null, 'Securities track should not require a prerequisite.');
check(track.affectsOverall === false, 'Securities track should not affect the overall score.');
check(track.examModuleTitle === 'Practice Mocks', 'Securities exam module title is wrong.');
check(track.examPrep && track.examPrep.targetPercent === 70, 'Securities examPrep target should be 70%.');
check(coreModules.length === 10, `Expected 10 core securities modules, found ${coreModules.length}.`);
check(coreModules.map((module) => module.id).join('|') === expectedCoreIds.join('|'), 'Securities core module order is wrong.');
check(optionalModules.length === 1 && optionalModules[0].id === 'sec-mod-10', 'Expected one optional trading-app module.');
check(coreLessons.length === 20, `Expected 20 core securities lessons, found ${coreLessons.length}.`);
check(optionalLessons.length === 2, `Expected 2 optional securities lessons, found ${optionalLessons.length}.`);
check(content.topics.length === 8, `Expected 8 securities topics, found ${content.topics.length}.`);
check(content.sections.length === 1, 'Securities content should have one section.');
check(content.sections[0].minutes === 60, 'Securities section should be 60 minutes.');
check(content.targetPercent === 70, 'Securities content target should be 70%.');
check(Boolean(content.source), 'Securities content is missing a source.');
check(/^\d{4}-\d{2}-\d{2}$/.test(content.verifiedOn || ''), 'Securities content is missing a valid verifiedOn date.');
check(content.volatile === true, 'Securities content should be marked volatile.');
check(Boolean(content.volatileReason), 'Securities content should explain why it is volatile.');
check(track.source === content.source, 'Securities track source should match content metadata.');
check(track.verifiedOn === content.verifiedOn, 'Securities track verifiedOn should match content metadata.');
check(track.volatile === true, 'Securities track should be marked volatile.');
check(track.examPrep.source === content.source, 'Securities examPrep source should match content metadata.');
check(track.examPrep.verifiedOn === content.verifiedOn, 'Securities examPrep verifiedOn should match content metadata.');
check(track.examPrep.volatile === true, 'Securities examPrep should be marked volatile.');
content.topics.forEach((topic) => {
  topic.facts.forEach((fact) => {
    check(fact.source === content.source, `Fact ${fact.term} has mismatched source metadata.`);
    check(fact.verifiedOn === content.verifiedOn, `Fact ${fact.term} has mismatched verifiedOn metadata.`);
    check(fact.volatile === true, `Fact ${fact.term} should be marked volatile.`);
  });
});

assertUnique(track.modules, 'Securities modules');
assertUnique(coreLessons, 'Securities core lessons');
assertUnique(quizzes, 'Securities quizzes');
assertUnique(flashcards, 'Securities flashcards');

coreModules.concat(optionalModules).forEach((module) => {
  check(module.lessons.length === 2, `Module ${module.id} should have two lessons.`);
});

coreLessons.concat(optionalLessons).forEach((lesson) => {
  check(Array.isArray(lesson.objectives) && lesson.objectives.length > 0, `Lesson ${lesson.id} has no objectives.`);
  check(Boolean(lesson.contentHtml), `Lesson ${lesson.id} has no content.`);
  check(Array.isArray(lesson.quiz) && lesson.quiz.length > 0, `Lesson ${lesson.id} has no quiz.`);
  check(Array.isArray(lesson.flashcards) && lesson.flashcards.length > 0, `Lesson ${lesson.id} has no flashcards.`);
  (lesson.quiz || []).forEach((question) => {
    check(Array.isArray(question.options) && question.options.length >= 2, `Quiz ${question.id} has fewer than 2 options.`);
    check(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < question.options.length, `Quiz ${question.id} has an invalid answer index.`);
    check(Boolean(question.explanation), `Quiz ${question.id} has no explanation.`);
  });
  (lesson.flashcards || []).forEach((card) => {
    check(Boolean(card.front) && Boolean(card.back), `Flashcard ${card.id} is incomplete.`);
  });
});

const topicIds = new Set();
let totalExamCount = 0;
content.topics.forEach((topic) => {
  check(!topicIds.has(topic.id), `Duplicate securities topic id: ${topic.id}`);
  topicIds.add(topic.id);
  check(Array.isArray(topic.facts) && topic.facts.length === 10, `Topic ${topic.id} should have 10 facts.`);
  check(topic.examCount === 5, `Topic ${topic.id} should have examCount 5.`);
  check(Array.isArray(topic.lessonTitles) && topic.lessonTitles.length === 2, `Topic ${topic.id} should have two lesson titles.`);
  check(topic.sectionId === content.sections[0].id, `Topic ${topic.id} points to an unknown section.`);
  totalExamCount += Number(topic.examCount) || 0;
});
check(totalExamCount === 40, `Expected 40 securities exam questions, found ${totalExamCount}.`);

const examSets = sandbox.window.NEZHA_EXAMS.list().filter((exam) => exam.trackId === 'securities');
check(examSets.length === 3, `Expected 3 securities mocks, found ${examSets.length}.`);
const allQuestions = examSets.flatMap((exam) => exam.questions || []);
assertUnique(examSets, 'Securities exam sets');
assertUnique(allQuestions, 'Securities exam questions');
assertNoDuplicateStems(allQuestions, 'Securities mocks');
assertExplanations(allQuestions, 'Securities mock');
assertNoForbiddenOptions(allQuestions, 'Securities mock');
assertBalancedAnswers(allQuestions, 'Securities mocks', 0.15, 0.35);

examSets.forEach((exam) => {
  check(exam.sections.length === 1, `Exam ${exam.id} should have one section.`);
  check(exam.sections[0].minutes === 60, `Exam ${exam.id} should be 60 minutes.`);
  check(exam.questions.length === 40, `Exam ${exam.id} should have 40 questions.`);
  check(exam.durationMinutes === 60, `Exam ${exam.id} has the wrong duration.`);
  check(exam.targetPercent === 70, `Exam ${exam.id} has the wrong target.`);
  const sectionIds = new Set(exam.sections.map((section) => section.id));
  exam.questions.forEach((question) => {
    check(sectionIds.has(question.sectionId), `Question ${question.id} points to an unknown section.`);
    check(Array.isArray(question.options) && question.options.length === 4, `Question ${question.id} should have 4 options.`);
    check(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < question.options.length, `Question ${question.id} has an invalid answer index.`);
    check(Boolean(question.explanation), `Question ${question.id} has no explanation.`);
  });
  content.topics.forEach((topic) => {
    const count = exam.questions.filter((question) => question.topicId === topic.id).length;
    check(count === topic.examCount, `Exam ${exam.id} has ${count} questions for ${topic.id}, expected ${topic.examCount}.`);
  });
  assertBalancedAnswers(exam.questions, exam.id, 0.10, 0.45);
});

if (errors.length) {
  console.error('Securities validation failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Securities validation passed: 8 topics, 20 core lessons, 2 optional lessons, 3 mocks, 40 questions each.`);
