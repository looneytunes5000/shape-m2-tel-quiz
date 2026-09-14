// Tests for the quiz engine's public API only — never internals or the DOM.
// Run with: node --test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { QUIZ, createQuiz } from './quiz.mjs';

const correctIds = () => QUIZ.options.filter((o) => o.correct).map((o) => o.id);
const distractorIds = () => QUIZ.options.filter((o) => !o.correct).map((o) => o.id);
const pickAll = (quiz, ids) => ids.forEach((id) => quiz.toggle(id));

test('configuration defines exactly nine options with exactly seven correct', () => {
  assert.equal(QUIZ.options.length, 9);
  assert.equal(QUIZ.options.filter((o) => o.correct).length, 7);
  assert.equal(QUIZ.requiredPicks, 7);
  assert.ok(QUIZ.videoId);
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

test('isSolved is true only when exactly the correct options are selected', () => {
  const quiz = createQuiz();
  assert.equal(quiz.isSolved(), false, 'starts unsolved');
  pickAll(quiz, correctIds().slice(0, QUIZ.requiredPicks - 1));
  assert.equal(quiz.isSolved(), false, 'all but one is not enough');
  pickAll(quiz, correctIds().slice(QUIZ.requiredPicks - 1));
  assert.equal(quiz.isSolved(), true, 'all correct options solve it');
});

test('a wrong selection keeps the activity unsolved until it is removed', () => {
  const quiz = createQuiz();
  pickAll(quiz, correctIds());
  assert.equal(quiz.isSolved(), true);
  quiz.toggle(distractorIds()[0]);
  assert.equal(quiz.isSolved(), false, 'a distractor alongside the five blocks solving');
  quiz.toggle(distractorIds()[0]);
  assert.equal(quiz.isSolved(), true, 'removing it solves again');
  quiz.toggle(correctIds()[0]);
  assert.equal(quiz.isSolved(), false, 'dropping a correct answer unsolves it');
});

test('each engine instance is independent', () => {
  const a = createQuiz();
  const b = createQuiz();
  pickAll(a, correctIds());
  assert.equal(a.isSolved(), true);
  assert.equal(b.isSolved(), false);
  assert.equal(b.selectedCount(), 0);
});
