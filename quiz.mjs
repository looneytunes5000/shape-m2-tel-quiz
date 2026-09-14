// ==========================================================================
// QUIZ CONTENT — EDIT THIS BLOCK TO UPDATE THE ACTIVITY
// -------------------------------------------------------------------------
// Everything a facilitator might want to change lives in the QUIZ object
// below. No other file needs editing.
//   videoId ......... the YouTube id of the embedded video (wired in by
//                     app.mjs — no HTML edit needed)
//   requiredPicks ... how many answers the task asks for (kept at 5)
//   options ......... exactly nine entries; set correct: true on the five
//                     answers and correct: false on the distractors
//   explanation ..... context for each option (not shown in the current
//                     reveal-only flow; kept as facilitator reference)
// ==========================================================================

export const QUIZ = {
  videoId: 'KBlohpOEJOs',
  videoTitle: 'VTC Technology Enhanced Learning',
  requiredPicks: 5,
  options: [
    {
      id: 'applied-digital-skills',
      label: 'Applied and Digital Skills',
      correct: true,
      explanation:
        'The video opens by describing how VTC equips students with applied and digital skills for the modern workplace (0:00–0:41).',
    },
    {
      id: 'computer-aided-assessment',
      label: 'Computer-aided Assessment',
      correct: true,
      explanation:
        'Named in the blended-learning part of the video: teachers use computer-aided assessment to evaluate learning progress (2:46).',
    },
    {
      id: 'smart-learning-facilities',
      label: 'Smart Learning Facilities',
      correct: true,
      explanation:
        'The VR, AR and MR systems and labs shown in the video are examples of the facilities that let students practise safely (0:56–2:34).',
    },
    {
      id: 'wearable-technology',
      label: 'Wearable Technology',
      correct: true,
      explanation:
        'The wearable broadcast system lets teachers demonstrate techniques so students can visualise every detail (1:46).',
    },
    {
      id: 'learning-management-platform',
      label: 'Learning Management Platform',
      correct: true,
      explanation:
        'The blended-learning section combines face-to-face lessons with online learning, which the course framework groups under the learning management platform (2:35).',
    },
    {
      id: 'virtual-reality',
      label: 'Virtual Reality (VR)',
      correct: false,
      explanation:
        'A technology demonstrated in the video, not a framework category — VR simulation training is an example of smart learning facilities (0:56).',
    },
    {
      id: 'augmented-reality',
      label: 'Augmented Reality (AR)',
      correct: false,
      explanation:
        'A technology demonstrated in the video, not a framework category — AR is an example of smart learning facilities (1:26).',
    },
    {
      id: 'mixed-reality',
      label: 'Mixed Reality (MR)',
      correct: false,
      explanation:
        'A technology demonstrated in the video, not a framework category — MR is an example of smart learning facilities (1:58).',
    },
    {
      id: 'blended-learning',
      label: 'Blended Learning',
      correct: false,
      explanation:
        'Named in the video (2:35) as a teaching approach, not a framework type — the blended-learning content belongs to the Learning Management Platform category.',
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