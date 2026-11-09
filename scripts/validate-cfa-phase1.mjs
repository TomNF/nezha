import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const files = [
  'curriculum.js',
  'content-data.js',
  'curriculum-ext.js',
  'exams.js',
  'exams-ecba.js',
  'exams-cfa.js',
  'cfa-assessments.js',
  'cfa-assessments-phase0.js',
  'cfa-assessments-phase1a.js',
  'cfa-blueprint.js',
  'cfa-formulas.js',
  'cfa-foundations.js',
  'cfa-quant.js'
];

const context = { window: {}, console };
context.window.window = context.window;
vm.createContext(context);

files.forEach((file) => {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  vm.runInContext(source, context, { filename: file });
});

const errors = [];
const assert = (condition, message) => {
  if (!condition) errors.push(message);
};

const isText = (value, minLength = 1) => typeof value === 'string' && value.trim().length >= minLength;
const normalize = (value) => String(value).trim().toLowerCase();

const assessments = context.window.NEZHA_CFA_ASSESSMENTS;
const formulas = context.window.NEZHA_CFA_FORMULAS;
const practice = assessments ? assessments.get('cfa-phase1a-practice') : null;
const lessonQuizBank = assessments ? assessments.get('cfa-phase1a-lesson-quizzes') : null;
const curriculum = context.window.NEZHA_CURRICULUM;
const cfa = curriculum && Array.isArray(curriculum.tracks)
  ? curriculum.tracks.find((track) => track.id === 'cfa')
  : null;

assert(assessments && typeof assessments.get === 'function', 'window.NEZHA_CFA_ASSESSMENTS is missing');
assert(formulas && typeof formulas === 'object', 'window.NEZHA_CFA_FORMULAS is missing');
assert(practice && typeof practice === 'object', 'cfa-phase1a-practice assessment is missing');
assert(lessonQuizBank && typeof lessonQuizBank === 'object', 'cfa-phase1a-lesson-quizzes assessment is missing');
assert(cfa && Array.isArray(cfa.modules), 'CFA track or modules are missing');

if (!assessments || !formulas || !practice || !lessonQuizBank || !cfa) {
  console.error(`CFA Phase 1A validation failed:\n- ${errors.join('\n- ')}`);
  process.exit(1);
}

const formulaList = Array.isArray(formulas.formulas) ? formulas.formulas : [];
const categories = Array.isArray(formulas.categories) ? formulas.categories : [];
const formulaIds = new Set();
const categorySet = new Set(categories);

assert(formulas.version === 1, 'formulas.version must be 1');
assert(formulaList.length >= 25, `expected at least 25 formulas, found ${formulaList.length}`);
assert(categories.length >= 5, `expected at least 5 formula categories, found ${categories.length}`);
assert(categorySet.size === categories.length, 'formula categories contain duplicates');

formulaList.forEach((formula) => {
  const id = String(formula && formula.id || '');
  assert(isText(id), 'formula is missing id');
  assert(!formulaIds.has(id), `duplicate formula id: ${id}`);
  formulaIds.add(id);
  assert(isText(formula.category, 3), `${id}: missing category`);
  assert(categorySet.has(formula.category), `${id}: category is not registered`);
  assert(['finance-math', 'quant-tvm'].includes(formula.topicId), `${id}: invalid topicId`);
  assert(isText(formula.name, 5), `${id}: missing name`);
  assert(isText(formula.formula, 3), `${id}: missing formula`);
  assert(isText(formula.variables, 10), `${id}: missing variables`);
  assert(isText(formula.when, 15), `${id}: missing when-to-use`);
  assert(isText(formula.trap, 15), `${id}: missing trap`);
});

const topics = Array.isArray(practice.topics) ? practice.topics : [];
const questions = Array.isArray(practice.questions) ? practice.questions : [];
const topicIds = new Set(topics.map((topic) => topic.id));
const questionIds = new Set();
const stems = new Set();
const answerCounts = {};
const typeCounts = {};
const topicTypeCounts = {};
const banks = assessments.list();
const bankIds = banks.map((bank) => bank.id);

assert(practice.phase === '1A', 'practice assessment phase must be 1A');
assert(practice.kind === 'practice', 'practice assessment kind must be practice');
assert(lessonQuizBank.phase === '1A', 'lesson quiz assessment phase must be 1A');
assert(lessonQuizBank.kind === 'lesson-quiz', 'lesson quiz assessment kind must be lesson-quiz');
assert(new Set(bankIds).size === bankIds.length, 'duplicate assessment bank ids');
assert(banks.length === 3, `expected 3 assessment banks, found ${banks.length}`);
assert(practice.version === 1, 'practice.version must be 1');
assert(Number(practice.sessionSize) === 10, 'practice.sessionSize must be 10');
assert(topics.length === 2, `expected 2 practice topics, found ${topics.length}`);
assert(questions.length === 100, `expected 100 practice questions, found ${questions.length}`);
assert(practice.counts && Number(practice.counts.total) === questions.length, 'practice.counts.total does not match question count');

topics.forEach((topic) => {
  assert(['finance-math', 'quant-tvm'].includes(topic.id), `invalid practice topic: ${topic.id}`);
  assert(isText(topic.title, 5), `${topic.id}: missing title`);
  assert(isText(topic.description, 15), `${topic.id}: missing description`);
  assert(Array.isArray(topic.lessonIds) && topic.lessonIds.length === 6, `${topic.id}: expected 6 lessonIds`);
  const count = questions.filter((question) => question.topicId === topic.id).length;
  assert(count === 50, `${topic.id}: expected 50 questions, found ${count}`);
});

questions.forEach((question) => {
  const id = String(question && question.id || '');
  assert(isText(id), 'practice question is missing id');
  assert(!questionIds.has(id), `duplicate practice question id: ${id}`);
  questionIds.add(id);
  assert(topicIds.has(question.topicId), `${id}: topic is not registered`);
  assert(['calculation', 'application', 'conceptual'].includes(question.type), `${id}: invalid type`);
  assert(['easy', 'medium', 'hard'].includes(question.difficulty), `${id}: invalid difficulty`);
  assert(isText(question.los, 3), `${id}: missing LOS`);
  assert(isText(question.question, 10), `${id}: question stem is too short`);
  assert(question.source === 'NeZha original', `${id}: source must be NeZha original`);
  const stem = normalize(question.question);
  assert(!stems.has(stem), `${id}: duplicate question stem`);
  stems.add(stem);
  assert(Array.isArray(question.options) && question.options.length === 3, `${id}: expected exactly 3 options`);
  if (Array.isArray(question.options)) {
    assert(question.options.every((option) => isText(option)), `${id}: empty option`);
    assert(new Set(question.options.map(normalize)).size === question.options.length, `${id}: duplicate options`);
  }
  assert(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < 3, `${id}: invalid answer index`);
  assert(isText(question.explanation, 10), `${id}: explanation is too short`);
  if (question.type === 'calculation') {
    assert(Array.isArray(question.steps) && question.steps.length >= 2, `${id}: calculation needs at least 2 steps`);
  }

  answerCounts[question.answer] = (answerCounts[question.answer] || 0) + 1;
  typeCounts[question.type] = (typeCounts[question.type] || 0) + 1;
  topicTypeCounts[question.topicId] = topicTypeCounts[question.topicId] || {};
  topicTypeCounts[question.topicId][question.type] = (topicTypeCounts[question.topicId][question.type] || 0) + 1;
});

assert(typeCounts.calculation === 60, `expected 60 calculation questions, found ${typeCounts.calculation || 0}`);
assert(typeCounts.application === 25, `expected 25 application questions, found ${typeCounts.application || 0}`);
assert(typeCounts.conceptual === 15, `expected 15 conceptual questions, found ${typeCounts.conceptual || 0}`);
Object.keys(answerCounts).forEach((answer) => {
  assert(answerCounts[answer] >= 20, `answer index ${answer} is underused (${answerCounts[answer]} questions)`);
});

const phase1Modules = cfa.modules.filter((module) => String(module.id).startsWith('cfa-phase1-'));
const phase1Lessons = phase1Modules.flatMap((module) => module.lessons);
const moduleIds = cfa.modules.map((module) => module.id);
const lessonIds = cfa.modules.flatMap((module) => module.lessons.map((lesson) => lesson.id));

assert(new Set(moduleIds).size === moduleIds.length, 'CFA track contains duplicate module ids');
assert(new Set(lessonIds).size === lessonIds.length, 'CFA track contains duplicate lesson ids');
assert(phase1Modules.length === 2, `expected 2 Phase 1A modules, found ${phase1Modules.length}`);
assert(phase1Lessons.length === 12, `expected 12 Phase 1A lessons, found ${phase1Lessons.length}`);
assert(phase1Modules[0].id === 'cfa-phase1-finance-math', 'first Phase 1A module must be finance math');
assert(phase1Modules[1].id === 'cfa-phase1-quant-tvm', 'second Phase 1A module must be quant TVM');
assert(cfa.modules.findIndex((module) => module.id === 'cfa-phase1-finance-math') < cfa.modules.findIndex((module) => module.id === 'cfa-mod-1'), 'Phase 1A modules must be inserted before cfa-mod-1');

const foundationsExport = context.window.NEZHA_CFA_FOUNDATIONS;
const quantExport = context.window.NEZHA_CFA_QUANT;
assert(foundationsExport && foundationsExport.moduleId === 'cfa-phase1-finance-math', 'NEZHA_CFA_FOUNDATIONS export is missing');
assert(quantExport && quantExport.moduleId === 'cfa-phase1-quant-tvm', 'NEZHA_CFA_QUANT export is missing');

phase1Modules.forEach((module) => {
  assert(module.phase === '1A', `${module.id}: module phase must be 1A`);
  assert(isText(module.title, 5), `${module.id}: missing title`);
  assert(isText(module.description, 15), `${module.id}: missing description`);
  assert(Array.isArray(module.lessons) && module.lessons.length === 6, `${module.id}: expected 6 lessons`);
});

phase1Lessons.forEach((lesson) => {
  const id = String(lesson.id || '');
  assert(isText(id), 'Phase 1A lesson is missing id');
  assert(lesson.phase === '1A', `${id}: lesson phase must be 1A`);
  assert(['finance-math', 'quant-tvm'].includes(lesson.topicId), `${id}: invalid topicId`);
  assert(isText(lesson.title, 5), `${id}: missing title`);
  assert(Number(lesson.estimatedMinutes) >= 20, `${id}: estimatedMinutes is too low`);
  assert(Array.isArray(lesson.objectives) && lesson.objectives.length >= 3, `${id}: expected at least 3 objectives`);
  assert(isText(lesson.contentHtml, 500), `${id}: contentHtml is too short`);
  assert(Array.isArray(lesson.keyTerms) && lesson.keyTerms.length >= 3, `${id}: expected at least 3 keyTerms`);
  assert(Array.isArray(lesson.flashcards) && lesson.flashcards.length === 3, `${id}: expected exactly 3 flashcards`);
  assert(Array.isArray(lesson.quiz) && lesson.quiz.length === 3, `${id}: expected exactly 3 quiz questions`);
  assert(isText(lesson.feynman, 20), `${id}: feynman prompt is too short`);

  lesson.flashcards.forEach((card) => {
    assert(isText(card.id, 3), `${id}: flashcard is missing id`);
    assert(isText(card.front, 5), `${card.id}: flashcard front is too short`);
    assert(isText(card.back, 5), `${card.id}: flashcard back is too short`);
  });

  lesson.quiz.forEach((item) => {
    assert(item.type === 'mcq', `${item.id}: quiz type must be mcq`);
    assert(isText(item.question, 10), `${item.id}: quiz question is too short`);
    assert(Array.isArray(item.options) && item.options.length >= 2, `${item.id}: quiz needs at least 2 options`);
    assert(Number.isInteger(item.answer) && item.answer >= 0 && item.answer < item.options.length, `${item.id}: invalid quiz answer`);
    assert(isText(item.explanation, 10), `${item.id}: quiz explanation is too short`);
  });
});

const lessonQuizzes = lessonQuizBank.lessonQuizzes || {};
const quizLessonIds = Object.keys(lessonQuizzes);
assert(quizLessonIds.length === 12, `expected 12 lesson quiz banks, found ${quizLessonIds.length}`);
quizLessonIds.forEach((lessonId) => {
  assert(lessonIds.includes(lessonId), `lesson quiz bank references an unknown lesson: ${lessonId}`);
  const quiz = lessonQuizzes[lessonId];
  assert(Array.isArray(quiz) && quiz.length === 3, `${lessonId}: lesson quiz bank must contain 3 questions`);
  if (Array.isArray(quiz)) {
    quiz.forEach((item) => {
      assert(item.type === 'mcq', `${item.id}: bank quiz type must be mcq`);
      assert(isText(item.question, 10), `${item.id}: bank quiz question is too short`);
      assert(Array.isArray(item.options) && item.options.length >= 2, `${item.id}: bank quiz needs at least 2 options`);
      assert(Number.isInteger(item.answer) && item.answer >= 0 && item.answer < item.options.length, `${item.id}: invalid bank quiz answer`);
      assert(isText(item.explanation, 10), `${item.id}: bank quiz explanation is too short`);
    });
  }
});
phase1Lessons.forEach((lesson) => {
  assert(lesson.quiz === lessonQuizzes[lesson.id], `${lesson.id}: content must use the lesson quiz bank`);
});

const foundationsTopics = topics.find((topic) => topic.id === 'finance-math');
const quantTopics = topics.find((topic) => topic.id === 'quant-tvm');
const financeModule = phase1Modules.find((module) => module.id === 'cfa-phase1-finance-math');
const quantModule = phase1Modules.find((module) => module.id === 'cfa-phase1-quant-tvm');
assert(foundationsTopics && financeModule && foundationsTopics.lessonIds.every((id) => financeModule.lessons.some((lesson) => lesson.id === id)), 'finance-math practice lessonIds do not match its module');
assert(quantTopics && quantModule && quantTopics.lessonIds.every((id) => quantModule.lessons.some((lesson) => lesson.id === id)), 'quant-tvm practice lessonIds do not match its module');

if (errors.length) {
  console.error(`CFA Phase 1A validation failed:\n- ${errors.join('\n- ')}`);
  process.exit(1);
}

console.log('CFA Phase 1A validation passed');
console.log(`- Formulas: ${formulaList.length} across ${categories.length} categories`);
console.log(`- Practice questions: ${questions.length} (${typeCounts.calculation} calculation, ${typeCounts.application} application, ${typeCounts.conceptual} conceptual)`);
console.log(`- Answer distribution: ${JSON.stringify(answerCounts)}`);
console.log(`- Phase 1A modules: ${phase1Modules.length}; lessons: ${phase1Lessons.length}`);
console.log(`- CFA modules total: ${cfa.modules.length}; lessons total: ${lessonIds.length}`);
