import { existsSync, readFileSync, statSync } from 'node:fs';
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

const sandbox = { window: { NEZHA_EXAMS: { registerMany() {} } } };
vm.createContext(sandbox);
['curriculum.js', 'content-data.js', 'curriculum-ext.js', 'ielts-curriculum.js', 'exams-ielts.js']
  .forEach((file) => loadScript(sandbox, file));

const curriculum = sandbox.window.NEZHA_CURRICULUM;
const track = curriculum && curriculum.tracks.find((item) => item.id === 'ielts');
check(track, 'IELTS track is missing.');
if (!track) {
  console.error(errors.join('\n'));
  process.exit(1);
}

const lessons = track.modules.flatMap((module) => module.lessons || []);
const coreLessons = lessons.filter((lesson) => !lesson.isExam);
const quizzes = coreLessons.flatMap((lesson) => lesson.quiz || []);
const flashcards = coreLessons.flatMap((lesson) => lesson.flashcards || []);

check(track.modules.length === 7, `Expected 7 IELTS modules, found ${track.modules.length}.`);
check(coreLessons.length === 24, `Expected 24 core IELTS lessons, found ${coreLessons.length}.`);
check(quizzes.length === 72, `Expected 72 IELTS quiz questions, found ${quizzes.length}.`);
check(flashcards.length === 72, `Expected 72 IELTS flashcards, found ${flashcards.length}.`);
check(track.optional === true, 'IELTS track should be optional.');
check(track.prerequisiteId == null, 'IELTS track should not require a prerequisite.');

function assertUnique(items, label) {
  const seen = new Set();
  items.forEach((item) => {
    check(item && item.id, `${label} has an item without an id.`);
    if (!item || !item.id) return;
    check(!seen.has(item.id), `${label} has duplicate id: ${item.id}`);
    seen.add(item.id);
  });
}

assertUnique(coreLessons, 'IELTS lessons');
assertUnique(quizzes, 'IELTS quizzes');
assertUnique(flashcards, 'IELTS flashcards');

coreLessons.forEach((lesson) => {
  check(Array.isArray(lesson.objectives) && lesson.objectives.length > 0, `Lesson ${lesson.id} has no objectives.`);
  check(Boolean(lesson.contentHtml), `Lesson ${lesson.id} has no content.`);
  (lesson.quiz || []).forEach((question) => {
    check(Array.isArray(question.options) && question.options.length >= 2, `Quiz ${question.id} has fewer than 2 options.`);
    check(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < question.options.length, `Quiz ${question.id} has an invalid answer index.`);
    check(Boolean(question.explanation), `Quiz ${question.id} has no explanation.`);
  });
  (lesson.flashcards || []).forEach((card) => {
    check(Boolean(card.front) && Boolean(card.back), `Flashcard ${card.id} is incomplete.`);
  });
});

const data = sandbox.window.NEZHA_IELTS_EXAMS;
check(data && data.listening && data.reading && data.writing && data.speaking, 'IELTS exam sets are incomplete.');
if (!data) {
  console.error(errors.join('\n'));
  process.exit(1);
}

const exams = [data.listening, data.reading, data.writing, data.speaking];
assertUnique(exams, 'IELTS exam sets');
assertUnique(exams.map((exam) => ({ id: exam.lessonId })), 'IELTS exam lesson links');

const allQuestions = exams.flatMap((exam) => exam.questions || []);
const allTasks = exams.flatMap((exam) => exam.sections.flatMap((section) => section.tasks || []));
assertUnique(allQuestions, 'IELTS exam questions');
assertUnique(allTasks, 'IELTS exam tasks');

check(data.listening.questions.length === 40, `Listening should have 40 questions, found ${data.listening.questions.length}.`);
check(data.listening.sections.length === 4, `Listening should have 4 sections, found ${data.listening.sections.length}.`);
check(data.reading.questions.length === 40, `Reading should have 40 questions, found ${data.reading.questions.length}.`);
check(data.reading.sections.length === 3, `Reading should have 3 sections, found ${data.reading.sections.length}.`);
check(data.writing.sections.length === 1, 'Writing should have one timed section.');
check(data.writing.sections[0].tasks.length === 2, 'Writing should have two tasks.');
check(data.speaking.sections.length === 1, 'Speaking should have one timed section.');
check(data.speaking.sections[0].tasks.length === 3, 'Speaking should have three parts.');
check(data.writing.questions.length === 0, 'Writing mock should not contain MCQ questions.');
check(data.speaking.questions.length === 0, 'Speaking mock should not contain MCQ questions.');

exams.forEach((exam) => {
  check(Boolean(exam.id), 'Exam is missing an id.');
  check(Boolean(exam.title), `Exam ${exam.id} is missing a title.`);
  check(exam.trackId === 'ielts', `Exam ${exam.id} has the wrong trackId.`);
  check(Number(exam.durationMinutes) > 0, `Exam ${exam.id} has no duration.`);
  check(Number(exam.targetPercent) > 0, `Exam ${exam.id} has no targetPercent.`);
  const sectionIds = new Set(exam.sections.map((section) => section.id));
  exam.sections.forEach((section) => {
    check(Boolean(section.title), `Exam ${exam.id} has a section without a title.`);
    check(Number(section.minutes) > 0, `Section ${section.id} has no minutes.`);
    if (section.type === 'writing' || section.type === 'speaking') {
      check(Array.isArray(section.tasks) && section.tasks.length > 0, `Section ${section.id} has no tasks.`);
    }
  });
  (exam.questions || []).forEach((question) => {
    check(sectionIds.has(question.sectionId), `Question ${question.id} points to an unknown section.`);
    check(Array.isArray(question.options) && question.options.length >= 2, `Question ${question.id} has too few options.`);
    check(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < question.options.length, `Question ${question.id} has an invalid answer index.`);
    check(Boolean(question.explanation), `Question ${question.id} has no explanation.`);
  });
});

data.listening.sections.forEach((section) => {
  check(section.type === 'listening', `Listening section ${section.id} has the wrong type.`);
  check(Boolean(section.audioSrc), `Listening section ${section.id} has no audio.`);
  check(Boolean(section.transcriptHtml), `Listening section ${section.id} has no transcript.`);
  if (section.audioSrc) {
    const audioPath = join(root, section.audioSrc);
    check(existsSync(audioPath), `Missing audio file: ${section.audioSrc}`);
    if (existsSync(audioPath)) check(statSync(audioPath).size > 1000, `Audio file is too small: ${section.audioSrc}`);
  }
});

data.reading.sections.forEach((section) => {
  check(section.type === 'reading', `Reading section ${section.id} has the wrong type.`);
  check(Boolean(section.passageHtml), `Reading section ${section.id} has no passage.`);
});

data.writing.sections.flatMap((section) => section.tasks).forEach((task, index) => {
  check(Boolean(task.promptHtml), `Writing task ${task.id} has no prompt.`);
  check(index === 0 ? task.minWords === 150 : task.minWords === 250, `Writing task ${task.id} has an unexpected word target.`);
});

data.speaking.sections.flatMap((section) => section.tasks).forEach((task) => {
  check(Boolean(task.promptHtml), `Speaking task ${task.id} has no prompt.`);
  check(Number(task.recommendedMinutes) > 0, `Speaking task ${task.id} has no recommended time.`);
});

if (errors.length) {
  console.error('IELTS validation failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`IELTS validation passed: ${coreLessons.length} lessons, ${quizzes.length} quiz, ${flashcards.length} flashcards, 40 listening, 40 reading, 2 writing tasks, 3 speaking parts.`);
