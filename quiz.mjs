// ==========================================================================
// QUIZ CONTENT — EDIT THIS BLOCK TO UPDATE THE ACTIVITY
// -------------------------------------------------------------------------
// Everything a facilitator might want to change lives in the QUIZ object
// below. No other file needs editing.
//   videoId ......... the YouTube id of the embedded video (wired in by
//                     app.mjs — no HTML edit needed)
//   requiredPicks ... how many answers the task asks for
//   options ......... exactly nine entries; set correct: true on the answers
//                     and correct: false on the distractors
//   explanation ..... context for each option (not shown in the current
//                     reveal-only flow; kept as facilitator reference)
// ==========================================================================

export const QUIZ = {
  videoId: 'KBlohpOEJOs',
  videoTitle: 'VTC Technology Enhanced Learning',
  requiredPicks: 7,
  options: [
    {
      id: 'virtual-reality',
      label: 'Virtual Reality (VR)',
      correct: true,
      explanation:
        'Shown from 0:56 — students practise in immersive VR-simulated environments.',
    },
    {
      id: 'augmented-reality',
      label: 'Augmented Reality (AR)',
      correct: true,
      explanation:
        'Shown at 1:26 — AR overlays digital content onto real equipment for training.',
    },
    {
      id: 'mixed-reality',
      label: 'Mixed Reality (MR)',
      correct: true,
      explanation:
        'Shown at 1:58 — MR blends physical and digital elements in practice spaces.',
    },
    {
      id: 'wearable-technology',
      label: 'Wearable Technology',
      correct: true,
      explanation:
        'Shown at 1:46 — the wearable broadcast system lets teachers demonstrate techniques in fine detail.',
    },
    {
      id: 'blended-learning',
      label: 'Blended Learning',
      correct: true,
      explanation:
        'Named at 2:35 — combining face-to-face lessons with online learning.',
    },
    {
      id: 'learning-management-platform',
      label: 'Learning Management Platform',
      correct: true,
      explanation:
        'Named at 2:35 — the platform that carries VTC’s online and blended learning.',
    },
    {
      id: 'smart-learning-facilities',
      label: 'Smart Learning Facilities',
      correct: true,
      explanation:
        'The video shows smart labs and facilities (0:56–2:34) purpose-built for technology-supported learning.',
    },
    {
      id: 'applied-digital-skills',
      label: 'Applied and Digital Skills',
      correct: false,
      explanation:
        'The video’s opening (0:00–0:41) describes applied and digital skills as the goal of TEL, not one of its types.',
    },
    {
      id: 'computer-aided-assessment',
      label: 'Computer-aided Assessment',
      correct: false,
      explanation:
        'Mentioned at 2:46 as a way to evaluate learning progress — an assessment method, not a TEL type demonstrated.',
    },
  ],
};

// ==========================================================================
// ENGINE — no need to edit below this line
// -------------------------------------------------------------------------
// Pure logic, deliberately free of any DOM access so it can be tested with
// "node --test". The view layer (app.mjs) renders whatever this returns.
// ==========================================================================

export function createQuiz(config = QUIZ) {
  const selected = new Set();

  const isSelected = (id) => selected.has(id);
  const selectedCount = () => selected.size;
  const correctSelectedCount = () =>
    config.options.filter((o) => o.correct && selected.has(o.id)).length;

  // Solved when the selection is exactly the set of correct answers —
  // all five found, nothing wrong left selected.
  const isSolved = () => {
    const correctIds = config.options.filter((o) => o.correct).map((o) => o.id);
    return correctIds.length === selected.size
      && correctIds.every((id) => selected.has(id));
  };

  const toggle = (id) => {
    if (selected.has(id)) {
      selected.delete(id);
    } else {
      selected.add(id);
    }
  };

  return { toggle, isSelected, selectedCount, correctSelectedCount, isSolved, config };
}