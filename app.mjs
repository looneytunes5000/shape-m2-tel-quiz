// View layer — renders engine state and handles input. Contains no business
// logic: every decision about right/wrong comes from quiz.mjs.
// The ?v= here must match the ones in index.html — bump all together on
// every deploy so browsers never mix old and new files (Pages caches 10 min).
import { QUIZ, createQuiz } from './quiz.mjs?v=20260918a';

const LETTERS = 'ABCDEFGHI';

const quiz = createQuiz();
let watchDone = false;
let celebrated = false;

const els = {
  options: document.getElementById('options'),
  count: document.getElementById('count'),
  hint: document.getElementById('count-hint'),
  reload: document.getElementById('reload'),
  guide: document.getElementById('guide'),
  expand: document.getElementById('expand'),
  workspace: document.querySelector('.workspace'),
  videoFrame: document.querySelector('.video-frame iframe'),
  routeStops: {
    watch: document.querySelector('[data-route="watch"]'),
    identify: document.querySelector('[data-route="identify"]'),
  },
};

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

    const verdictNote = document.createElement('span');
    verdictNote.className = 'sr-only';
    verdictNote.setAttribute('aria-live', 'polite');

    btn.append(mark, label, verdictNote);
    btn.addEventListener('click', () => {
      quiz.toggle(opt.id);
      const selected = quiz.isSelected(opt.id);
      btn.setAttribute('aria-pressed', String(selected));
      btn.classList.toggle('is-correct', selected && opt.correct);
      btn.classList.toggle('is-incorrect', selected && !opt.correct);
      verdictNote.textContent = selected ? (opt.correct ? 'Correct' : 'Incorrect') : '';
      syncControls();
    });
    els.options.append(btn);
  });
}

function syncControls() {
  const found = quiz.correctSelectedCount();
  const solved = quiz.isSolved();
  els.count.textContent = `${found} of ${QUIZ.requiredPicks} found`;
  els.hint.textContent = solved
    ? `All ${QUIZ.requiredPicks} identified 🎉`
    : found === QUIZ.requiredPicks
      ? 'Remove the ones marked red.'
      : '';
  els.hint.classList.toggle('is-solved', solved);
  if (solved && !celebrated) celebrate(els.hint);
  celebrated = solved;
  syncRoute();
}

/* A short burst from the completion line when the last answer lands — same
   palette as the page, ~2.5 seconds, then the canvas removes itself. Skipped
   entirely for anyone who asked for reduced motion. */
function celebrate(originEl) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.createElement('canvas');
  canvas.className = 'confetti';
  canvas.setAttribute('aria-hidden', 'true');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.append(canvas);
  const ctx = canvas.getContext('2d');

  const COLORS = ['#d9480f', '#a53a08', '#ffd2a5', '#2b1a0c', '#22663a', '#fff8ee'];
  const rect = originEl.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;

  const pieces = Array.from({ length: 140 }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * 9;
    return {
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 4,
      w: 6 + Math.random() * 6,
      h: 8 + Math.random() * 8,
      rot: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      life: 1,
    };
  });

  let frames = 0;
  const tick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of pieces) {
      p.vy += 0.28;
      p.vx *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.spin;
      p.life -= 0.012;
      if (p.life <= 0) continue;
      ctx.save();
      ctx.globalAlpha = Math.min(1, p.life * 1.6);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }
    frames += 1;
    if (frames < 150) requestAnimationFrame(tick);
    else canvas.remove();
  };
  requestAnimationFrame(tick);
  window.addEventListener('resize', () => canvas.remove(), { once: true });
}

/* Two live stops: 1 cues the video, 2 cues the answers once the video plays.
   A stop pulses (is-cue) until the person does what it asks; stop 2 turns
   done once the five framework categories are found. */
function syncRoute() {
  const stops = els.routeStops;
  if (!stops.watch || !stops.identify) return;
  const solved = quiz.isSolved();
  stops.watch.className = watchDone ? 'route-stop is-done' : 'route-stop is-cue';
  stops.identify.className = solved
    ? 'route-stop is-done'
    : !watchDone
      ? 'route-stop'
      : quiz.selectedCount() > 0 ? 'route-stop is-active' : 'route-stop is-cue';
  if (solved) {
    stops.watch.removeAttribute('aria-current');
    stops.identify.removeAttribute('aria-current');
  } else if (watchDone) {
    stops.watch.removeAttribute('aria-current');
    stops.identify.setAttribute('aria-current', 'step');
  } else {
    stops.watch.setAttribute('aria-current', 'step');
    stops.identify.removeAttribute('aria-current');
  }
}

els.reload.addEventListener('click', () => location.reload());

/* Phones start with the briefing collapsed so the video keeps the top of the
   screen; wide screens always show it. */
if (window.innerWidth <= 640) els.guide.open = false;

window.addEventListener('resize', () => {
  if (window.innerWidth > 1200) els.guide.open = true;
});

/* Expand: the workspace becomes a viewport-height theater — the player
   spans the full width on top and the answers scroll in the region beneath.
   A class toggle only — the iframe never leaves the DOM, so playback never
   restarts. */
const syncTheaterHeight = () => {
  const wsTop = els.workspace.getBoundingClientRect().top + window.scrollY;
  els.workspace.style.setProperty('--theater-h', `${window.innerHeight - wsTop}px`);
};

window.addEventListener('resize', () => {
  if (els.workspace.classList.contains('is-theater')) syncTheaterHeight();
});

els.expand.addEventListener('click', () => {
  const on = !els.workspace.classList.contains('is-theater');
  if (on) {
    window.scrollTo(0, 0);
    syncTheaterHeight();
  }
  els.workspace.classList.toggle('is-theater', on);
  document.body.classList.toggle('theater-open', on);
  els.expand.setAttribute('aria-expanded', String(on));
  els.expand.textContent = on ? 'Collapse video' : 'Expand video';
});

/* The embed URL is assembled here so facilitators only edit quiz.mjs.
   enablejsapi + origin open the postMessage channel that marks the Watch
   stop done when playback actually starts. */
els.videoFrame.src =
  `https://www.youtube-nocookie.com/embed/${QUIZ.videoId}?rel=0&enablejsapi=1&origin=${encodeURIComponent(location.origin)}`;
els.videoFrame.title = `${QUIZ.videoTitle} (YouTube video)`;

/* The official widget handshake: ask the player to start reporting state. */
els.videoFrame.addEventListener('load', () => {
  els.videoFrame.contentWindow?.postMessage(
    JSON.stringify({ event: 'listening', id: 1, channel: 'widget' }),
    '*',
  );
});

renderOptions();
syncControls();

/* Stop 1 completes when the video actually plays (pause after start counts).
   The iframe API posts messages to the parent window; no dependency needed. */
window.addEventListener('message', (event) => {
  if (event.origin !== 'https://www.youtube-nocookie.com') return;
  let data;
  try { data = JSON.parse(event.data); } catch { return; }
  if (data?.event === 'infoDelivery' && data?.info?.playerState === 1 && !watchDone) {
    watchDone = true;
    syncRoute();
  }
});
