import { rounds } from '../src/questions.js';

const errors = [];
const seenQuestions = new Set();
const seenTopics = new Set();

if (rounds.length !== 5) errors.push(`Expected 5 themes; found ${rounds.length}.`);

rounds.forEach((round, roundIndex) => {
  if (round.questions.length !== 20) {
    errors.push(`Round ${roundIndex + 1} has ${round.questions.length} questions; expected 20.`);
  }

  round.questions.forEach((question, questionIndex) => {
    const location = `Round ${roundIndex + 1}, question ${questionIndex + 1}`;
    const key = question.q.trim().toLowerCase();
    const topic = question.topic?.trim().toLowerCase();

    if (!topic) errors.push(`${location} has no topic ID.`);
    if (topic && seenTopics.has(topic)) errors.push(`${location} duplicates topic ID "${topic}".`);
    if (!question.q?.trim()) errors.push(`${location} has no question text.`);
    if (!Array.isArray(question.options) || question.options.length !== 4) {
      errors.push(`${location} must have exactly four options.`);
    }
    if (!Number.isInteger(question.answer) || question.answer < 0 || question.answer > 3) {
      errors.push(`${location} has an invalid answer index.`);
    }
    if (!question.explain?.trim()) errors.push(`${location} has no explanation.`);
    if (!/^https?:\/\//.test(question.source || '')) errors.push(`${location} has no valid source URL.`);
    if (seenQuestions.has(key)) errors.push(`${location} duplicates another question.`);
    if (topic) seenTopics.add(topic);
    seenQuestions.add(key);
  });
});

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Validated ${rounds.length} themes, ${seenQuestions.size} sourced questions and ${seenTopics.size} unique topics.`);
