import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const files = [
  'cfa-assessments.js',
  'cfa-assessments-phase0.js',
  'cfa-blueprint.js'
];
const context = { window: {}, console };
context.window.window = context.window;
vm.createContext(context);
files.forEach((file) => {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  vm.runInContext(source, context, { filename: file });
});

const registry = context.window.NEZHA_CFA_ASSESSMENTS;
const blueprint = context.window.NEZHA_CFA_PHASE0;
const assessment = registry ? registry.get('cfa-phase0-diagnostic') : null;
const errors = [];
const assert = (condition, message) => {
  if (!condition) errors.push(message);
};

assert(registry && typeof registry.get === 'function', 'window.NEZHA_CFA_ASSESSMENTS is missing');
assert(blueprint && typeof blueprint === 'object', 'window.NEZHA_CFA_PHASE0 is missing');
assert(assessment && typeof assessment === 'object', 'cfa-phase0-diagnostic assessment is missing');
if (!registry || !blueprint || !assessment) {
  console.error(`CFA Phase 0 validation failed:\n- ${errors.join('\n- ')}`);
  process.exit(1);
}

const topics = Array.isArray(blueprint.topics) ? blueprint.topics : [];
const sections = Array.isArray(assessment.sections) ? assessment.sections : [];
const questions = sections.flatMap((section) => Array.isArray(section.questions) ? section.questions : []);
const topicIds = new Set(topics.map((topic) => topic.id));
const ids = new Set();

assert(assessment.phase === '0', 'diagnostic assessment phase must be 0');
assert(assessment.kind === 'diagnostic', 'diagnostic assessment kind must be diagnostic');
assert(topics.length === 10, `expected 10 CFA topics, found ${topics.length}`);
assert(sections.length === 11, `expected 11 diagnostic sections, found ${sections.length}`);
assert(questions.length === 40, `expected 40 diagnostic questions, found ${questions.length}`);
assert(assessment.totalQuestions === questions.length, 'assessment.totalQuestions does not match question count');
assert(blueprint.diagnostic && blueprint.diagnostic.totalQuestions === questions.length, 'blueprint must reference the diagnostic assessment');
assert(Number(blueprint.plan && blueprint.plan.totalHours) === 300, 'plan.totalHours must be 300');
assert(Number(blueprint.plan && blueprint.plan.defaultWeeklyHours) === 6, 'plan.defaultWeeklyHours must be 6');
assert(typeof blueprint.disclaimer === 'string' && blueprint.disclaimer.length > 40, 'disclaimer is missing or too short');

topics.forEach((topic) => {
  assert(topic.id && topic.title && topic.weight, `topic is missing id/title/weight: ${JSON.stringify(topic)}`);
  assert(topicIds.has(topic.id), `topic exists but not registered: ${topic.id}`);
});

sections.forEach((section) => {
  assert(section.id && section.title, `section is missing id/title: ${JSON.stringify(section)}`);
  assert(Array.isArray(section.questions) && section.questions.length > 0, `section has no questions: ${section.id}`);
  section.questions.forEach((question) => {
    assert(question.id, `question missing id in section ${section.id}`);
    assert(!ids.has(question.id), `duplicate question id: ${question.id}`);
    ids.add(question.id);
    assert(question.topicId === section.id, `${question.id}: topicId must equal section id ${section.id}`);
    assert(typeof question.question === 'string' && question.question.trim().length > 10, `${question.id}: question stem is too short`);
    assert(Array.isArray(question.options) && question.options.length === 3, `${question.id}: expected exactly 3 options`);
    assert(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < 3, `${question.id}: invalid answer index`);
    assert(typeof question.explanation === 'string' && question.explanation.trim().length > 10, `${question.id}: explanation is missing or too short`);
    if (Array.isArray(question.options)) {
      assert(new Set(question.options.map((option) => String(option).trim().toLowerCase())).size === question.options.length, `${question.id}: duplicate options`);
    }
  });
});

const foundations = sections.find((section) => section.id === 'foundations');
assert(foundations && foundations.questions.length === 10, 'foundations section must contain 10 questions');

topics.forEach((topic) => {
  const section = sections.find((item) => item.id === topic.id);
  assert(section && section.questions.length === 3, `${topic.id}: expected 3 diagnostic questions`);
});

const answerCounts = questions.reduce((counts, question) => {
  counts[question.answer] = (counts[question.answer] || 0) + 1;
  return counts;
}, {});
Object.keys(answerCounts).forEach((answer) => {
  assert(answerCounts[answer] >= 5, `answer index ${answer} is underused (${answerCounts[answer]} questions)`);
});

if (errors.length) {
  console.error(`CFA Phase 0 validation failed:\n- ${errors.join('\n- ')}`);
  process.exit(1);
}

console.log('CFA Phase 0 validation passed');
console.log(`- Topics: ${topics.length}`);
console.log(`- Diagnostic sections: ${sections.length}`);
console.log(`- Diagnostic questions: ${questions.length}`);
console.log(`- Answer distribution: ${JSON.stringify(answerCounts)}`);
