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

const sandbox = { window: {} };
vm.createContext(sandbox);
[
  'curriculum.js',
  'content-data.js',
  'istqb-content.js',
  'istqb-curriculum.js',
  'curriculum-ext.js',
  'exams.js',
  'exams-istqb.js'
].forEach((file) => loadScript(sandbox, file));

const curriculum = sandbox.window.NEZHA_CURRICULUM;
const content = sandbox.window.NEZHA_CONTENT && sandbox.window.NEZHA_CONTENT.istqb;
const track = curriculum && curriculum.tracks.find((item) => item.id === 'istqb');

check(content, 'ISTQB content is missing.');
check(track, 'ISTQB track is missing.');
if (!content || !track) {
  console.error(errors.join('\n'));
  process.exit(1);
}

const expectedCoreIds = [
  'istqb-mod-0',
  ...Array.from({ length: 6 }, (_, index) => `istqb-core-${index + 1}`),
  'istqb-mod-7'
];
const expectedFactCounts = [10, 10, 8, 12, 10, 6];
const expectedExamCounts = [8, 6, 4, 11, 9, 2];
const coreModules = track.modules.filter((module) => !module.optional);
const optionalModules = track.modules.filter((module) => module.optional);
const coreLessons = coreModules.flatMap((module) => module.lessons || []);
const optionalLessons = optionalModules.flatMap((module) => module.lessons || []);
const quizzes = coreLessons.flatMap((lesson) => lesson.quiz || []);
const flashcards = coreLessons.flatMap((lesson) => lesson.flashcards || []);

check(track.title === 'ISTQB Foundation (CTFL)', 'ISTQB track has an unexpected title.');
check(track.shortTitle === 'ISTQB', 'ISTQB short title is wrong.');
check(track.optional === true, 'ISTQB track should be optional.');
check(track.prerequisiteId == null, 'ISTQB track should not require a prerequisite.');
check(track.affectsOverall === false, 'ISTQB track should not affect the overall score.');
check(track.examModuleTitle === 'Practice Mocks', 'ISTQB exam module title is wrong.');
check(track.examPrep && track.examPrep.targetPercent === 65, 'ISTQB examPrep target should be 65%.');
check(track.examPrep && track.examPrep.readinessTarget === 70, 'ISTQB readiness target should be 70%.');
check(track.examPrep && track.examPrep.passMark === '26/40', 'ISTQB pass mark should be 26/40.');
check(coreModules.length === 8, `Expected 8 core ISTQB modules, found ${coreModules.length}.`);
check(coreModules.map((module) => module.id).join('|') === expectedCoreIds.join('|'), 'ISTQB core module order is wrong.');
check(optionalModules.length === 1 && optionalModules[0].id === 'istqb-mod-8', 'Expected one optional trading-app QA module.');
check(coreLessons.length === 20, `Expected 20 core ISTQB lessons, found ${coreLessons.length}.`);
check(optionalLessons.length === 2, `Expected 2 optional ISTQB lessons, found ${optionalLessons.length}.`);
check(content.topics.length === 6, `Expected 6 ISTQB topics, found ${content.topics.length}.`);
check(content.sections.length === 1, 'ISTQB content should have one section.');
check(content.sections[0].minutes === 60, 'ISTQB section should be 60 minutes.');
check(content.targetPercent === 65, 'ISTQB content target should be 65%.');
check(content.passNote.includes('26/40'), 'ISTQB pass note should mention 26/40.');

assertUnique(track.modules, 'ISTQB modules');
assertUnique(coreLessons, 'ISTQB core lessons');
assertUnique(quizzes, 'ISTQB quizzes');
assertUnique(flashcards, 'ISTQB flashcards');

coreModules.concat(optionalModules).forEach((module) => {
  check(module.lessons.length >= 2, `Module ${module.id} should have at least two lessons.`);
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
content.topics.forEach((topic, index) => {
  check(!topicIds.has(topic.id), `Duplicate ISTQB topic id: ${topic.id}`);
  topicIds.add(topic.id);
  check(Array.isArray(topic.facts) && topic.facts.length === expectedFactCounts[index], `Topic ${topic.id} should have ${expectedFactCounts[index]} facts.`);
  check(topic.examCount === expectedExamCounts[index], `Topic ${topic.id} should have examCount ${expectedExamCounts[index]}.`);
  check(Array.isArray(topic.lessonTitles) && topic.lessonTitles.length >= 2, `Topic ${topic.id} should have at least two lesson titles.`);
  check(topic.sectionId === content.sections[0].id, `Topic ${topic.id} points to an unknown section.`);
  totalExamCount += Number(topic.examCount) || 0;
});
check(totalExamCount === 40, `Expected 40 ISTQB exam questions, found ${totalExamCount}.`);

const examSets = sandbox.window.NEZHA_EXAMS.list().filter((exam) => exam.trackId === 'istqb');
check(examSets.length === 3, `Expected 3 ISTQB mocks, found ${examSets.length}.`);
const allQuestions = examSets.flatMap((exam) => exam.questions || []);
assertUnique(examSets, 'ISTQB exam sets');
assertUnique(allQuestions, 'ISTQB exam questions');

examSets.forEach((exam) => {
  check(exam.sections.length === 1, `Exam ${exam.id} should have one section.`);
  check(exam.sections[0].minutes === 60, `Exam ${exam.id} should be 60 minutes.`);
  check(exam.questions.length === 40, `Exam ${exam.id} should have 40 questions.`);
  check(exam.durationMinutes === 60, `Exam ${exam.id} has the wrong duration.`);
  check(exam.targetPercent === 65, `Exam ${exam.id} has the wrong target.`);
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
});

if (errors.length) {
  console.error('ISTQB validation failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`ISTQB validation passed: 6 topics, 20 core lessons, 2 optional lessons, 3 mocks, 40 questions each.`);
