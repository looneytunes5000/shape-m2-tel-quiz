// Tests for the quiz engine's public API only — never internals or the DOM.
// Run with: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { QUIZ, createQuiz } from './quiz.mjs';

const correctIds = () => QUIZ.options.filter((o) => o.correct).map((o) => o.id);
const distractorIds = () => QUIZ.options.filter((o) => !o.correct).map((o) => o.id);
const pickAll = (quiz, ids) => ids.forEach((id) => quiz.toggle(id));

test('configuration defines exactly eight options with exactly five correct', () => {
  assert.equal(QUIZ.options.length, 8);
  assert.equal(QUIZ.options.filter((o) => o.correct).length, 5);
  assert.equal(QUIZ.requiredPicks, 5);
  assert.ok(QUIZ.videoId);
  assert.ok(QUIZ.instructions.trim().length > 0);
});

test('every option has a unique id, a label and an explanation', () => {
  const ids = QUIZ.options.map((o) => o.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const o of QUIZ.options) {
    assert.ok(o.label.trim().length > 0, `missing label for ${o.id}`);
    assert.ok(o.explanation.trim().length > 0, `missing explanation for ${o.id}`);
    assert.equal(typeof o.correct, 'boolean');
  }
});

test('canSubmit is true only when exactly five options are selected', () => {
  const ids = QUIZ.options.map((o) => o.id);
  const quiz = createQuiz();
  for (let i = 0; i < 4; i += 1) {
    quiz.toggle(ids[i]);
    assert.equal(quiz.canSubmit(), false, `should be blocked at ${i + 1} selected`);
  }
  quiz.toggle(ids[4]);
  assert.equal(quiz.canSubmit(), true, 'should open at exactly 5 selected');
  quiz.toggle(ids[5]);
  assert.equal(quiz.canSubmit(), false, 'should block again beyond 5');
});

test('toggling the same option twice deselects it', () => {
  const quiz = createQuiz();
  const [first] = correctIds();
  quiz.toggle(first);
  assert.equal(quiz.selectedCount(), 1);
  assert.equal(quiz.isSelected(first), true);
  quiz.toggle(first);
  assert.equal(quiz.selectedCount(), 0);
  assert.equal(quiz.isSelected(first), false);
});

test('submit with fewer than five selected is rejected and changes nothing', () => {
  const quiz = createQuiz();
  pickAll(quiz, correctIds().slice(0, 4));
  const result = quiz.submit();
  assert.equal(result.ok, false);
  assert.ok(result.reason.trim().length > 0);
  assert.equal(quiz.selectedCount(), 4);
});

test('submit with more than five selected is rejected', () => {
  const quiz = createQuiz();
  pickAll(quiz, QUIZ.options.map((o) => o.id));
  assert.equal(quiz.submit().ok, false);
});

test('a perfect selection scores five and reviews every option exactly once', () => {
  const quiz = createQuiz();
  pickAll(quiz, correctIds());
  const result = quiz.submit();
  assert.equal(result.ok, true);
  assert.equal(result.score, 5);
  assert.equal(result.max, 5);
  assert.equal(result.review.length, QUIZ.options.length);
  assert.deepEqual(
    result.review.map((r) => r.id).sort(),
    QUIZ.options.map((o) => o.id).sort(),
  );
  for (const r of result.review.filter((x) => x.chosen)) {
    assert.equal(r.verdict, 'correct');
  }
  for (const r of result.review.filter((r) => !r.chosen)) {
    assert.equal(r.verdict, 'avoided');
  }
});

test('selecting all three distractors plus two correct answers scores two', () => {
  const quiz = createQuiz();
  pickAll(quiz, [...distractorIds(), ...correctIds().slice(0, 2)]);
  const result = quiz.submit();
  assert.equal(result.ok, true);
  assert.equal(result.score, 2);
  const counts = {};
  for (const r of result.review) counts[r.verdict] = (counts[r.verdict] ?? 0) + 1;
  assert.equal(counts.correct, 2);
  assert.equal(counts.incorrect, 3);
  assert.equal(counts.missed, 3);
});

test('every review item carries its label and explanation for the results screen', () => {
  const quiz = createQuiz();
  pickAll(quiz, [...distractorIds(), ...correctIds().slice(0, 2)]);
  const result = quiz.submit();
  assert.equal(result.ok, true);
  for (const r of result.review) {
    assert.ok(r.label.trim().length > 0);
    assert.ok(r.explanation.trim().length > 0);
    assert.equal(typeof r.correctAnswer, 'boolean');
  }
});