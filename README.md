# Technology Enhanced Learning at VTC — interactive quiz (SHAPE Module M2)

A single-page, no-login activity for CLT training workshops. Participants watch
the official VTC video **“VTC Technology Enhanced Learning”** (3 min 25 s), then
identify the **TEL types demonstrated in the video** by picking them from nine
options. Each pick instantly shows whether it is one of the seven TEL types
(green) or not (red); the activity completes when all seven are found, and
**Start again** reloads with a fresh shuffle.

**Live URL:** https://looneytunes5000.github.io/shape-m2-tel-quiz/

## How it is built

- `index.html` — the page structure
- `styles.css` — the light orange academic theme
- `quiz.mjs` — the quiz engine. **All editable content (video id, instructions,
  options, explanations) lives in the clearly-marked
  configuration block at the top of this file.** Set `correct: true` on the five
  right answers; everything else is derived automatically.
- `app.mjs` — the view layer that renders engine state; contains no business logic
- `quiz.test.mjs` — tests for the engine's public API

No frameworks, no build step, no dependencies, no data collection. Options are
shuffled on every page load; correctness is keyed by option id, so shuffling
never matters. Start again reloads the page for a fresh attempt.

## Running locally

ES modules need to be served over HTTP (opening `index.html` directly from disk
will not work). Any static server is fine, for example:

```
python -m http.server 8000
```

…then open http://localhost:8000 .

## Running the tests

Requires Node.js 18 or newer. Nothing to install:

```
node --test
```

## Design and spec

The requirements are published as an issue in this repository:
https://github.com/looneytunes5000/shape-m2-tel-quiz/issues/1

The quiz is deliberately a step above the video's surface content: the video
demonstrates technologies (VR, AR, MR …) while the correct answers are the
framework categories. The instruction line above the options exists to make that
distinction explicit.