// ==========================================================================
// QUIZ CONTENT — EDIT THIS BLOCK TO UPDATE THE ACTIVITY
// -------------------------------------------------------------------------
// Everything a facilitator might want to change lives in the QUIZ object
// below. No other file needs editing.
//   videoId ......... the YouTube id of the embedded video
//   instructions .... shown above the answer options
//   requiredPicks ... how many options a participant must select (kept at 5)
//   options ......... exactly eight entries; set correct: true on the five
//                     answers and correct: false on the distractors
//   explanation ..... one line shown for each option in the results review
// ==========================================================================

export const QUIZ = {
  videoId: 'KBlohpOEJOs',
  videoTitle: 'VTC Technology Enhanced Learning',
  requiredPicks: 5,
  instructions:
    'Identify the five types of technology enhanced learning (TEL) at VTC ' +
    'according to the course framework — not simply the individual ' +
    'technologies demonstrated in the video. Select exactly five options.',
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
  ],
  certificate: {
    org: 'VTC CLT Training and Workshop',
    title: 'Certificate of Completion',
    activity: 'Technology Enhanced Learning at VTC',
    module: 'SHAPE Module M2',
  },
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
  const canSubmit = () => selected.size === config.requiredPicks;

  const toggle = (id) => {
    if (selected.has(id)) {
      selected.delete(id);
    } else {
      selected.add(id);
    }
  };

  const submit = () => {
    if (selected.size !== config.requiredPicks) {
      return {
        ok: false,
        reason: `Select exactly ${config.requiredPicks} options before submitting.`,
      };
    }
    const review = config.options.map((o) => {
      const chosen = selected.has(o.id);
      const verdict = chosen
        ? (o.correct ? 'correct' : 'incorrect')
        : (o.correct ? 'missed' : 'avoided');
      return {
        id: o.id,
        label: o.label,
        explanation: o.explanation,
        correctAnswer: o.correct,
        chosen,
        verdict,
      };
    });
    return {
      ok: true,
      score: review.filter((r) => r.verdict === 'correct').length,
      max: config.requiredPicks,
      review,
    };
  };

  return { toggle, isSelected, selectedCount, canSubmit, submit, config };
}