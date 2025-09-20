// Complete 26-week flute curriculum designed by expert flute teachers
// Progressive difficulty from beginner to intermediate level

export const weeklyPractice = {
  1: {
    title: "Week 1: C Major & Foundation",
    focus: "Build tone quality, establish routine, learn C Major (no sharps/flats)",
    milestone: "Play C Major scale one octave with clean fingerings and steady tone",
    weeklyGoal: "Complete 6 out of 7 days this week",
    items: [
      { id: 'long-tones', label: 'Long tones (Low B to Middle D)', time: '3 min', points: 10 },
      { id: 'c-major', label: 'C Major scale - one octave', time: '5 min', points: 10, tempoRange: { min: 60, max: 100, suggested: 80 } },
      { id: 'posture-breathing', label: 'Posture and breathing exercises', time: '5 min', points: 10 },
      { id: 'basic-articulation', label: 'Basic articulation (Ta-Ta-Ta)', time: '5 min', points: 10 },
      { id: 'repertoire', label: 'Repertoire practice', time: '45 min', points: 60, isMainFocus: true }
    ]
  },

  2: {
    title: "Week 2: G Major Introduction",
    focus: "Learn G Major scale (1 sharp - F♯), continue tone development",
    milestone: "Play G Major scale one octave smoothly, maintain C Major proficiency",
    weeklyGoal: "Practice with metronome at least 5 days",
    items: [
      { id: 'long-tones', label: 'Long tones with dynamics', time: '3 min', points: 10 },
      { id: 'g-major', label: 'G Major scale - one octave (F♯)', time: '5 min', points: 10, tempoRange: { min: 60, max: 100, suggested: 80 } },
      { id: 'c-major-review', label: 'C Major scale review', time: '5 min', points: 10, tempoRange: { min: 80, max: 120, suggested: 100 } },
      { id: 'rhythm-patterns', label: 'Rhythm patterns with metronome', time: '5 min', points: 10 },
      { id: 'repertoire', label: 'Repertoire practice', time: '45 min', points: 60, isMainFocus: true }
    ]
  },

  3: {
    title: "Week 3: D Major & Dexterity",
    focus: "Learn D Major scale (2 sharps - F♯, C♯), improve finger coordination",
    milestone: "Play D Major one octave cleanly, maintain previous scales",
    weeklyGoal: "Master D Major scale with smooth transitions",
    items: [
      { id: 'long-tones', label: 'Long tones (extended range)', time: '3 min', points: 10 },
      { id: 'd-major', label: 'D Major scale - one octave (F♯, C♯)', time: '5 min', points: 10, tempoRange: { min: 60, max: 100, suggested: 80 } },
      { id: 'scale-review', label: 'Review C and G Major scales', time: '5 min', points: 10, tempoRange: { min: 80, max: 120, suggested: 100 } },
      { id: 'finger-patterns', label: 'Finger dexterity exercises', time: '5 min', points: 10 },
      { id: 'repertoire', label: 'Repertoire practice', time: '45 min', points: 60, isMainFocus: true }
    ]
  },

  4: {
    title: "Week 4: F Major & Expression",
    focus: "Learn F Major scale (1 flat - B♭), develop dynamic control",
    milestone: "Play F Major smoothly, add dynamics to all scales",
    weeklyGoal: "Master F Major and play all 4 scales with dynamics",
    items: [
      { id: 'long-tones', label: 'Long tones with vibrato attempts', time: '3 min', points: 10 },
      { id: 'f-major', label: 'F Major scale - one octave (B♭)', time: '5 min', points: 10, tempoRange: { min: 60, max: 100, suggested: 80 } },
      { id: 'dynamic-practice', label: 'Dynamic exercises (pp to ff)', time: '5 min', points: 10 },
      { id: 'articulation', label: 'Articulation patterns', time: '5 min', points: 10 },
      { id: 'repertoire', label: 'Repertoire practice', time: '45 min', points: 60, isMainFocus: true }
    ]
  },

  5: {
    title: "Week 5: B♭ Major & Articulation",
    focus: "Learn B♭ Major scale (2 flats - B♭, E♭), develop articulation variety",
    milestone: "Play B♭ Major one octave, master thumb B♭ key usage",
    weeklyGoal: "Perfect B♭ Major fingerings and articulation patterns",
    items: [
      { id: 'long-tones', label: 'Long tones (focus on B♭)', time: '3 min', points: 10 },
      { id: 'bb-major', label: 'B♭ Major scale - one octave (B♭, E♭)', time: '5 min', points: 10, tempoRange: { min: 60, max: 100, suggested: 80 } },
      { id: 'scale-review', label: 'Review all previous scales', time: '5 min', points: 10, tempoRange: { min: 80, max: 120, suggested: 100 } },
      { id: 'articulation-patterns', label: 'Staccato and legato patterns', time: '5 min', points: 10 },
      { id: 'repertoire', label: 'Repertoire practice', time: '45 min', points: 60, isMainFocus: true }
    ]
  },

  6: {
    title: "Week 6: A Major Exploration",
    focus: "Learn A Major scale (3 sharps - F♯, C♯, G♯), build finger agility",
    milestone: "Play A Major smoothly, navigate all sharp key signatures",
    weeklyGoal: "Master A Major and perform scale sequence from C to A",
    items: [
      { id: 'long-tones', label: 'Long tones (upper register)', time: '3 min', points: 10 },
      { id: 'a-major', label: 'A Major scale - one octave (F♯, C♯, G♯)', time: '5 min', points: 10, tempoRange: { min: 60, max: 100, suggested: 80 } },
      { id: 'sharp-scales-review', label: 'Review G and D Major', time: '5 min', points: 10, tempoRange: { min: 80, max: 120, suggested: 100 } },
      { id: 'scale-sequence', label: 'All 6 scales in sequence', time: '5 min', points: 10 },
      { id: 'repertoire', label: 'Repertoire practice', time: '45 min', points: 60, isMainFocus: true }
    ]
  },

  7: {
    title: "Week 7: E♭ Major & Level 1 Complete",
    focus: "Learn E♭ Major (3 flats - B♭, E♭, A♭), master all Level 1 scales",
    milestone: "Complete all 7 one-octave major scales with confidence",
    weeklyGoal: "Perform all Level 1 scales from memory with good tone",
    items: [
      { id: 'long-tones', label: 'Long tones (all registers)', time: '3 min', points: 10 },
      { id: 'eb-major', label: 'E♭ Major scale - one octave (B♭, E♭, A♭)', time: '5 min', points: 10, tempoRange: { min: 60, max: 100, suggested: 80 } },
      { id: 'flat-scales-review', label: 'Review F and B♭ Major', time: '5 min', points: 10, tempoRange: { min: 80, max: 120, suggested: 100 } },
      { id: 'all-scales-test', label: 'All 7 scales consecutively', time: '5 min', points: 10 },
      { id: 'repertoire', label: 'Repertoire practice', time: '45 min', points: 60, isMainFocus: true }
    ]
  },

  8: {
    title: "Week 8: C Major - 3 Octaves",
    focus: "Expand C Major to full 3-octave range (C4 to C7)",
    milestone: "Play C Major across entire flute range with even tone",
    weeklyGoal: "Master register transitions and breath control",
    items: [
      { id: 'long-tones', label: 'Long tones (high register focus)', time: '3 min', points: 10 },
      { id: 'c-major-3oct', label: 'C Major - 3 octaves (C4 to C7)', time: '5 min', points: 10, tempoRange: { min: 60, max: 100, suggested: 80 } },
      { id: 'register-exercises', label: 'Octave leaps and transitions', time: '5 min', points: 10 },
      { id: 'scale-patterns', label: 'C Major arpeggios', time: '5 min', points: 10, tempoRange: { min: 80, max: 120, suggested: 100 } },
      { id: 'repertoire', label: 'Repertoire practice', time: '45 min', points: 60, isMainFocus: true }
    ]
  },

  9: {
    title: "Week 9: G Major - 2 Octaves",
    focus: "Expand G Major to 2 octaves (G4 to G6)",
    milestone: "Play G Major 2 octaves with clean F♯ fingerings throughout",
    weeklyGoal: "Achieve smooth transitions between octaves",
    items: [
      { id: 'long-tones', label: 'Long tones (G focus)', time: '3 min', points: 10 },
      { id: 'g-major-2oct', label: 'G Major - 2 octaves (G4 to G6)', time: '5 min', points: 10, tempoRange: { min: 60, max: 100, suggested: 80 } },
      { id: 'c-major-review', label: 'C Major 3 octaves review', time: '5 min', points: 10, tempoRange: { min: 80, max: 120, suggested: 100 } },
      { id: 'g-major-arpeggios', label: 'G Major arpeggios and thirds', time: '5 min', points: 10 },
      { id: 'repertoire', label: 'Repertoire practice', time: '45 min', points: 60, isMainFocus: true }
    ]
  },

  10: {
    title: "Week 10: D Major - 2 Octaves",
    focus: "Expand D Major to 2 octaves (D4 to D6)",
    milestone: "Master D Major with consistent tone across registers",
    weeklyGoal: "Perfect high D6 with stable embouchure",
    items: [
      { id: 'long-tones', label: 'Long tones (D6 focus)', time: '3 min', points: 10 },
      { id: 'd-major-2oct', label: 'D Major - 2 octaves (D4 to D6)', time: '5 min', points: 10, tempoRange: { min: 60, max: 100, suggested: 80 } },
      { id: 'scale-sequence', label: 'C, G, D major sequence', time: '5 min', points: 10, tempoRange: { min: 80, max: 120, suggested: 100 } },
      { id: 'd-major-patterns', label: 'D Major scale patterns', time: '5 min', points: 10 },
      { id: 'repertoire', label: 'Repertoire practice', time: '45 min', points: 60, isMainFocus: true }
    ]
  },

  11: {
    title: "Week 11: F Major - 2 Octaves",
    focus: "Expand F Major to 2 octaves (F4 to F6)",
    milestone: "Play F Major with consistent B♭ fingering across octaves",
    weeklyGoal: "Master thumb B♭ in all registers",
    items: [
      { id: 'long-tones', label: 'Long tones (B♭ focus)', time: '3 min', points: 10 },
      { id: 'f-major-2oct', label: 'F Major - 2 octaves (F4 to F6)', time: '5 min', points: 10, tempoRange: { min: 60, max: 100, suggested: 80 } },
      { id: 'bb-technique', label: 'B♭ fingering exercises', time: '5 min', points: 10 },
      { id: 'f-major-arpeggios', label: 'F Major arpeggios', time: '5 min', points: 10 },
      { id: 'repertoire', label: 'Repertoire practice', time: '45 min', points: 60, isMainFocus: true }
    ]
  },

  12: {
    title: "Week 12: B♭ Major (2 octaves)",
    focus: "Master B♭ Major scale across two octaves",
    milestone: "Play B♭ Major scale fluently at 120 bpm",
    weeklyGoal: "Comfortable with 2-octave B♭ Major patterns",
    items: [
      { id: 'long-tones', label: 'Long tones (E♭ focus)', time: '3 min', points: 10 },
      { id: 'bb-major-scale', label: 'B♭ Major scale - 2 octaves', time: '5 min', points: 10, tempoRange: { min: 80, max: 120, suggested: 100 } },
      { id: 'bb-arpeggios', label: 'B♭ Major arpeggios', time: '5 min', points: 10 },
      { id: 'performance-prep', label: 'Performance preparation', time: '5 min', points: 10 },
      { id: 'repertoire', label: 'Repertoire practice', time: '45 min', points: 60, isMainFocus: true }
    ]
  },

  13: {
    title: "Week 13: A Major (2 octaves)",
    focus: "Develop fluency in A Major scale",
    milestone: "Master A Major with all sharps",
    weeklyGoal: "Smooth transitions in A Major patterns",
    items: [
      { id: 'long-tones', label: 'Long tones (G♯ focus)', time: '3 min', points: 10 },
      { id: 'a-major-scale', label: 'A Major scale - 2 octaves', time: '5 min', points: 10, tempoRange: { min: 80, max: 120, suggested: 100 } },
      { id: 'a-major-thirds', label: 'A Major in thirds', time: '5 min', points: 10 },
      { id: 'technical-precision', label: 'Technical precision work', time: '5 min', points: 10 },
      { id: 'repertoire', label: 'Repertoire practice', time: '45 min', points: 60, isMainFocus: true }
    ]
  },

  14: {
    title: "Week 14: E♭ Major (2 octaves) - Level 2 Complete",
    focus: "Complete Level 2 with E♭ Major mastery",
    milestone: "Confidently play all Level 2 scales",
    weeklyGoal: "Review all major scales learned",
    items: [
      { id: 'long-tones', label: 'Long tones (A♭ focus)', time: '3 min', points: 10 },
      { id: 'eb-major-scale', label: 'E♭ Major scale - 2 octaves', time: '5 min', points: 10, tempoRange: { min: 80, max: 120, suggested: 100 } },
      { id: 'eb-major-patterns', label: 'E♭ Major patterns', time: '5 min', points: 10 },
      { id: 'all-majors-review', label: 'Review all major scales', time: '5 min', points: 10 },
      { id: 'repertoire', label: 'Repertoire practice', time: '45 min', points: 60, isMainFocus: true }
    ]
  },

  15: {
    title: "Week 15: A Minor Natural (Level 3 Begins)",
    focus: "Introduction to natural minor scales",
    milestone: "Master A minor natural scale",
    weeklyGoal: "Understand minor scale structure",
    items: [
      { id: 'long-tones', label: 'Long tones (minor tonality)', time: '3 min', points: 10 },
      { id: 'a-minor-natural', label: 'A minor natural scale', time: '5 min', points: 10, tempoRange: { min: 70, max: 110, suggested: 90 } },
      { id: 'a-minor-arpeggios', label: 'A minor arpeggios', time: '5 min', points: 10 },
      { id: 'sight-reading', label: 'Sight-reading in minor keys', time: '5 min', points: 10 },
      { id: 'repertoire', label: 'Repertoire practice', time: '45 min', points: 60, isMainFocus: true }
    ]
  },

  16: {
    title: "Week 16: E Minor Natural",
    focus: "Develop E minor scale fluency",
    milestone: "Play E minor with expression",
    weeklyGoal: "Master E minor patterns",
    items: [
      { id: 'long-tones', label: 'Long tones (E minor focus)', time: '3 min', points: 10 },
      { id: 'e-minor-natural', label: 'E minor natural scale', time: '5 min', points: 10, tempoRange: { min: 70, max: 110, suggested: 90 } },
      { id: 'e-minor-patterns', label: 'E minor scale patterns', time: '5 min', points: 10 },
      { id: 'phrasing-minor', label: 'Phrasing in minor keys', time: '5 min', points: 10 },
      { id: 'repertoire', label: 'Repertoire practice', time: '45 min', points: 60, isMainFocus: true }
    ]
  },

  17: {
    title: "Week 17: D Minor Natural",
    focus: "Master D minor scale",
    milestone: "Fluent D minor execution",
    weeklyGoal: "D minor in various articulations",
    items: [
      { id: 'long-tones', label: 'Long tones (D minor focus)', time: '3 min', points: 10 },
      { id: 'd-minor-natural', label: 'D minor natural scale', time: '5 min', points: 10, tempoRange: { min: 70, max: 110, suggested: 90 } },
      { id: 'd-minor-arpeggios', label: 'D minor arpeggios', time: '5 min', points: 10 },
      { id: 'articulation-minor', label: 'Advanced articulation', time: '5 min', points: 10 },
      { id: 'repertoire', label: 'Repertoire practice', time: '45 min', points: 60, isMainFocus: true }
    ]
  },

  18: {
    title: "Week 18: G Minor Natural",
    focus: "G minor scale development",
    milestone: "Master G minor patterns",
    weeklyGoal: "G minor with vibrato application",
    items: [
      { id: 'long-tones', label: 'Long tones (G minor focus)', time: '3 min', points: 10 },
      { id: 'g-minor-natural', label: 'G minor natural scale', time: '5 min', points: 10, tempoRange: { min: 70, max: 110, suggested: 90 } },
      { id: 'g-minor-patterns', label: 'G minor scale patterns', time: '5 min', points: 10 },
      { id: 'vibrato-minor', label: 'Vibrato in minor scales', time: '5 min', points: 10 },
      { id: 'repertoire', label: 'Repertoire practice', time: '45 min', points: 60, isMainFocus: true }
    ]
  },

  19: {
    title: "Week 19: C Minor Natural",
    focus: "C minor scale mastery",
    milestone: "Fluent C minor execution",
    weeklyGoal: "C minor with contemporary techniques",
    items: [
      { id: 'long-tones', label: 'Long tones (C minor focus)', time: '3 min', points: 10 },
      { id: 'c-minor-natural', label: 'C minor natural scale', time: '5 min', points: 10, tempoRange: { min: 70, max: 110, suggested: 90 } },
      { id: 'c-minor-arpeggios', label: 'C minor arpeggios', time: '5 min', points: 10 },
      { id: 'contemporary-minor', label: 'Contemporary techniques', time: '5 min', points: 10 },
      { id: 'repertoire', label: 'Repertoire practice', time: '45 min', points: 60, isMainFocus: true }
    ]
  },

  20: {
    title: "Week 20: F Minor Natural",
    focus: "F minor scale development",
    milestone: "Master F minor patterns",
    weeklyGoal: "F minor with musical interpretation",
    items: [
      { id: 'long-tones', label: 'Long tones (F minor focus)', time: '3 min', points: 10 },
      { id: 'f-minor-natural', label: 'F minor natural scale', time: '5 min', points: 10, tempoRange: { min: 70, max: 110, suggested: 90 } },
      { id: 'f-minor-patterns', label: 'F minor scale patterns', time: '5 min', points: 10 },
      { id: 'interpretation-minor', label: 'Musical interpretation', time: '5 min', points: 10 },
      { id: 'repertoire', label: 'Repertoire practice', time: '45 min', points: 60, isMainFocus: true }
    ]
  },

  21: {
    title: "Week 21: B Minor Natural - Level 3 Complete",
    focus: "Complete natural minor scales",
    milestone: "Master all natural minor scales",
    weeklyGoal: "Review all minor scales with endurance",
    items: [
      { id: 'long-tones', label: 'Long tones (B minor focus)', time: '3 min', points: 10 },
      { id: 'b-minor-natural', label: 'B minor natural scale', time: '5 min', points: 10, tempoRange: { min: 70, max: 110, suggested: 90 } },
      { id: 'all-minors-review', label: 'Review all natural minors', time: '5 min', points: 10 },
      { id: 'endurance-scales', label: 'Endurance scale practice', time: '5 min', points: 10 },
      { id: 'repertoire', label: 'Repertoire practice', time: '45 min', points: 60, isMainFocus: true }
    ]
  },

  22: {
    title: "Week 22: A Harmonic Minor (Level 4 Begins)",
    focus: "Introduction to harmonic minor scales",
    milestone: "Master A harmonic minor",
    weeklyGoal: "Understand harmonic minor structure",
    items: [
      { id: 'long-tones', label: 'Long tones (harmonic intervals)', time: '3 min', points: 10 },
      { id: 'a-harmonic-minor', label: 'A harmonic minor scale', time: '5 min', points: 10, tempoRange: { min: 70, max: 110, suggested: 90 } },
      { id: 'harmonic-patterns', label: 'Harmonic minor patterns', time: '5 min', points: 10 },
      { id: 'jazz-minor-modes', label: 'Jazz applications', time: '5 min', points: 10 },
      { id: 'repertoire', label: 'Repertoire practice', time: '45 min', points: 60, isMainFocus: true }
    ]
  },

  23: {
    title: "Week 23: D & E Harmonic Minor",
    focus: "Master D and E harmonic minor scales",
    milestone: "Fluent in multiple harmonic minors",
    weeklyGoal: "Chamber music with harmonic minors",
    items: [
      { id: 'long-tones', label: 'Long tones (raised 7th focus)', time: '3 min', points: 10 },
      { id: 'd-e-harmonic-minor', label: 'D & E harmonic minor scales', time: '5 min', points: 10, tempoRange: { min: 70, max: 110, suggested: 90 } },
      { id: 'harmonic-arpeggios', label: 'Harmonic minor arpeggios', time: '5 min', points: 10 },
      { id: 'intonation-practice', label: 'Intonation practice', time: '5 min', points: 10 },
      { id: 'repertoire', label: 'Repertoire practice', time: '45 min', points: 60, isMainFocus: true }
    ]
  },

  24: {
    title: "Week 24: A Melodic Minor",
    focus: "Introduction to melodic minor scales",
    milestone: "Master A melodic minor",
    weeklyGoal: "Competition prep with melodic minor",
    items: [
      { id: 'long-tones', label: 'Long tones (melodic focus)', time: '3 min', points: 10 },
      { id: 'a-melodic-minor', label: 'A melodic minor scale', time: '5 min', points: 10, tempoRange: { min: 70, max: 110, suggested: 90 } },
      { id: 'melodic-patterns', label: 'Melodic minor patterns', time: '5 min', points: 10 },
      { id: 'all-scales-review', label: 'Review all scales learned', time: '5 min', points: 10 },
      { id: 'repertoire', label: 'Repertoire practice', time: '45 min', points: 60, isMainFocus: true }
    ]
  },

  25: {
    title: "Week 25: Chromatic Scale (Level 5)",
    focus: "Master the chromatic scale",
    milestone: "Play chromatic scale fluently",
    weeklyGoal: "Chromatic proficiency for recording",
    items: [
      { id: 'long-tones', label: 'Long tones (chromatic)', time: '3 min', points: 10 },
      { id: 'chromatic-scale', label: 'Chromatic scale - full range', time: '5 min', points: 10, tempoRange: { min: 80, max: 120, suggested: 100 } },
      { id: 'chromatic-patterns', label: 'Chromatic patterns', time: '5 min', points: 10 },
      { id: 'recording-prep', label: 'Recording preparation', time: '5 min', points: 10 },
      { id: 'repertoire', label: 'Repertoire practice', time: '45 min', points: 60, isMainFocus: true }
    ]
  },

  26: {
    title: "Week 26: Final Mastery & Celebration",
    focus: "Complete scale mastery and celebrate progress",
    milestone: "Demonstrate all 5 levels of scales",
    weeklyGoal: "Celebrate your complete scale journey!",
    items: [
      { id: 'long-tones', label: 'Long tones (celebration)', time: '3 min', points: 10 },
      { id: 'all-scales-mastery', label: 'Perform all scales learned', time: '5 min', points: 10 },
      { id: 'scale-medley', label: 'Create scale medley', time: '5 min', points: 10 },
      { id: 'reflection', label: 'Reflect on journey', time: '5 min', points: 10 },
      { id: 'repertoire', label: 'Final repertoire showcase', time: '45 min', points: 60, isMainFocus: true }
    ]
  }
};

export const weeklyTeachingTips = {
  1: [
    "Start each practice session with proper posture - feet flat, back straight, flute parallel to floor",
    "Quality over quantity - 20 minutes of focused practice beats an hour of distracted playing",
    "Record yourself daily to hear your progress objectively",
    "Use a mirror to check your embouchure and posture"
  ],
  2: [
    "The metronome is your best friend - start slow and gradually increase tempo",
    "Practice breathing exercises away from the flute to build lung capacity",
    "Focus on smooth connections between notes in scales",
    "Don't rush - taking time now will save time later"
  ],
  3: [
    "Practice difficult fingerings slowly and deliberately",
    "Use a pencil to mark fingering patterns in your music",
    "Break complex passages into 2-3 note groups",
    "Your fingers should be curved and relaxed, not tense"
  ],
  4: [
    "Dynamics are not just about volume - they're about tone color too",
    "Practice crescendos and diminuendos on single notes first",
    "Mark dynamic changes in your music with colored pencils",
    "Record yourself to check if dynamics are audible"
  ],
  5: [
    "Your tongue should touch lightly behind upper teeth for 'ta'",
    "Practice articulation patterns without the flute first",
    "Keep air flow constant even when tonguing",
    "Start slowly - speed comes with accuracy"
  ],
  6: [
    "Minor scales have different emotional colors than major",
    "Practice all three forms: natural, harmonic, and melodic",
    "Listen to recordings in minor keys for inspiration",
    "Pay attention to the raised 7th in harmonic minor"
  ],
  7: [
    "Count subdivisions out loud while playing",
    "Use a metronome app with different subdivision sounds",
    "Practice rhythms away from the flute by clapping",
    "Write in counting for difficult passages"
  ],
  8: [
    "Support low notes with faster air and open throat",
    "High notes need faster air speed, not more air",
    "Practice overtones to improve upper register",
    "Don't bite or squeeze for high notes"
  ],
  9: [
    "Start trills slowly and gradually increase speed",
    "Grace notes should be light and before the beat",
    "Listen to baroque flutists for ornamentation style",
    "Write out ornaments if needed for clarity"
  ],
  10: [
    "Playing with others develops crucial listening skills",
    "Always know what the other parts are doing",
    "Blend your tone with ensemble, don't dominate",
    "Count rests carefully - they're as important as notes"
  ],
  11: [
    "Memorize in sections, not note by note",
    "Use visual, auditory, and kinesthetic memory",
    "Practice from different starting points when memorizing",
    "Have backup plans if memory fails in performance"
  ],
  12: [
    "Performance anxiety is normal - prepare for it",
    "Practice performing for stuffed animals or pets first",
    "Visualize successful performances",
    "Focus on sharing music, not being perfect"
  ],
  13: [
    "Technical passages need slow, accurate practice first",
    "Use rhythmic variations to master difficult sections",
    "Keep fingers close to keys for speed",
    "Mental practice away from flute helps too"
  ],
  14: [
    "Experiment with jaw position for tone colors",
    "Different vowel shapes create different timbres",
    "Match your tone color to the music's character",
    "Listen to professional flutists for tone variety"
  ],
  15: [
    "Look ahead while sight-reading, not at current note",
    "Recognize common patterns and chord progressions",
    "Don't stop for mistakes when sight-reading",
    "Practice sight-reading daily, even for 5 minutes"
  ],
  16: [
    "Phrases are musical sentences - they need shape",
    "Plan your breathing to support phrase structure",
    "Use dynamics and rubato to enhance phrasing",
    "Sing phrases to understand their shape"
  ],
  17: [
    "Triple tonguing uses 'ta-ka-ta' or 'da-ga-da'",
    "Practice syllables without flute first",
    "Keep articulation light and quick",
    "Flutter tongue uses rolled 'R' or throat flutter"
  ],
  18: [
    "Vibrato comes from the throat, not the jaw",
    "Start with measured pulses, then let it flow naturally",
    "Vibrato speed and width should vary with music",
    "Not all notes need vibrato - use it tastefully"
  ],
  19: [
    "Contemporary techniques expand flute possibilities",
    "Start with simple effects before complex ones",
    "These techniques serve the music, not show off",
    "Study scores carefully for notation meanings"
  ],
  20: [
    "Your interpretation should be informed but personal",
    "Study the composer's style and historical context",
    "Make deliberate choices about tempo and phrasing",
    "Be able to explain your interpretive decisions"
  ],
  21: [
    "Build endurance gradually to avoid injury",
    "Take micro-breaks during long practice sessions",
    "Stay hydrated and maintain good posture",
    "Mental stamina is as important as physical"
  ],
  22: [
    "Jazz requires different articulation than classical",
    "Learn chord symbols and progressions",
    "Listen to great jazz flutists for style",
    "Start improvisation with simple patterns"
  ],
  23: [
    "Chamber music is musical conversation",
    "Eye contact and body language are important",
    "Balance and blend constantly with others",
    "Know the full score, not just your part"
  ],
  24: [
    "Audition preparation is systematic, not random",
    "Know required repertoire inside and out",
    "Practice walking on stage and starting",
    "Prepare for anything - broken stands, bad pianos, etc."
  ],
  25: [
    "Recording reveals truth - embrace it for growth",
    "Multiple takes are normal and necessary",
    "Room acoustics matter for recording quality",
    "Edit for the best musical result, not perfection"
  ],
  26: [
    "You've built a strong foundation - keep building!",
    "Set new goals for the next 6 months",
    "Consider finding a teacher if you haven't already",
    "Celebrate how far you've come!"
  ]
};