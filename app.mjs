// View layer — renders engine state and handles input. Contains no business
// logic: every decision about right/wrong comes from quiz.mjs.
import { QUIZ, createQuiz } from './quiz.mjs';

const LETTERS = 'ABCDEFGH';
const VERDICTS = {
  correct: { text: 'Correct', good: true },
  incorrect: { text: 'Incorrect', good: false },
  missed: { text: 'Missed', good: false },
  avoided: { text: 'Rightly left out', good: true },
};

const quiz = createQuiz();

const els = {
  options: document.getElementById('options'),
  count: document.getElementById('count'),
  hint: document.getElementById('count-hint'),
  submit: document.getElementById('submit'),
  instructions: document.getElementById('q-instructions'),
  quizSection: document.getElementById('quiz-section'),
  results: document.getElementById('results'),
  resultsHeading: document.getElementById('results-heading'),
  scoreLine: document.getElementById('score-line'),
  review: document.getElementById('review'),
  certName: document.getElementById('cert-name'),
  certNameDisplay: document.getElementById('cert-name-display'),
  certDate: document.getElementById('cert-date'),
  certScore: document.getElementById('cert-score'),
  certOrg: document.getElementById('cert-org'),
  certTitle: document.getElementById('cert-title'),
  certActivity: document.getElementById('cert-activity'),
  certModule: document.getElementById('cert-module'),
  printBtn: document.getElementById('print-btn'),
};

const orderIndexById = new Map();
const letterById = new Map();

function shuffle(items) {
  const order = [...items];
  for (let i = order.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

function renderOptions() {
  shuffle(QUIZ.options).forEach((opt, index) => {
    const letter = LETTERS[index];
    orderIndexById.set(opt.id, index);
    letterById.set(opt.id, letter);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'option';
    btn.dataset.id = opt.id;
    btn.setAttribute('aria-pressed', 'false');

    const mark = document.createElement('span');
    mark.className = 'opt-letter';
    mark.setAttribute('aria-hidden', 'true');
    mark.textContent = letter;

    const label = document.createElement('span');
    label.className = 'opt-label';
    label.textContent = opt.label;

    btn.append(mark, label);
    btn.addEventListener('click', () => {
      quiz.toggle(opt.id);
      btn.setAttribute('aria-pressed', String(quiz.isSelected(opt.id)));
      syncControls();
    });
    els.options.append(btn);
  });
}

function syncControls() {
  const n = quiz.selectedCount();
  els.count.textContent = `${n} of ${QUIZ.requiredPicks} selected`;
  els.hint.textContent =
    n < QUIZ.requiredPicks
      ? 'Select five options to continue.'
      : n > QUIZ.requiredPicks
        ? 'More than five selected — remove some to continue.'
        : 'Ready when you are.';
  els.submit.disabled = !quiz.canSubmit();
}

function renderReview(result) {
  const sorted = [...result.review].sort(
    (a, b) => orderIndexById.get(a.id) - orderIndexById.get(b.id),
  );
  for (const r of sorted) {
    const verdict = VERDICTS[r.verdict];
    const li = document.createElement('li');
    li.className = `review-item is-${r.verdict}`;

    const mark = document.createElement('span');
    mark.className = 'opt-letter';
    mark.setAttribute('aria-hidden', 'true');
    mark.textContent = letterById.get(r.id);

    const body = document.createElement('div');

    const head = document.createElement('p');
    head.className = 'review-label';
    head.textContent = r.label;
    const verdictTag = document.createElement('span');
    verdictTag.className = 'verdict';
    verdictTag.textContent = `${verdict.good ? '✓' : '✗'} ${verdict.text}`;
    head.append(verdictTag);

    const why = document.createElement('p');
    why.className = 'review-explanation';
    why.textContent = r.explanation;

    body.append(head, why);
    li.append(mark, body);
    els.review.append(li);
  }
}

function showResults(result) {
  els.scoreLine.textContent = `You matched ${result.score} of ${result.max}.`;
  renderReview(result);
  els.certScore.textContent = `${result.score} / ${result.max}`;
  els.certDate.textContent = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  els.quizSection.hidden = true;
  els.results.hidden = false;
  els.resultsHeading.focus();
}

els.instructions.textContent = QUIZ.instructions;

els.certOrg.textContent = QUIZ.certificate.org;
els.certTitle.textContent = QUIZ.certificate.title;
els.certActivity.textContent = QUIZ.certificate.activity;
els.certModule.textContent = QUIZ.certificate.module;

els.submit.addEventListener('click', () => {
  const result = quiz.submit();
  if (!result.ok) {
    els.hint.textContent = result.reason;
    return;
  }
  showResults(result);
});

els.certName.addEventListener('input', () => {
  els.certNameDisplay.textContent = els.certName.value.trim() || 'Participant';
});

els.printBtn.addEventListener('click', () => window.print());

els.certDate.textContent = new Date().toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

renderOptions();
syncControls();