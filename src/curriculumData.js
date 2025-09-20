// Complete 26-week flute curriculum designed by expert flute teachers
// Progressive difficulty from beginner to intermediate level

export const weeklyPractice = {
  1: {
    title: "Week 1: Build Tone & Routine",
    focus: "Develop consistent daily habit, tone quality, and basic scales",
    milestone: "Play C major one octave smoothly and sight-read simple rhythms",
    weeklyGoal: "Complete 6 out of 7 days this week",
    items: [
      {
        id: 'long-tones',
        label: 'Long tones (focus on breath control)',
        time: '10 min',
        points: 25,
        tips: ['Start with 8 counts, gradually increase', 'Keep shoulders relaxed', 'Listen for steady tone'],
        tempoRange: { min: 60, max: 80, suggested: 60 }
      },
      {
        id: 'c-major',
        label: 'C major scale (one octave)',
        time: '10 min',
        points: 25,
        tips: ['Practice hands separately first', 'Use correct fingerings', 'Keep tempo steady'],
        tempoRange: { min: 60, max: 100, suggested: 80 }
      },
      {
        id: 'simple-pieces',
        label: 'Simple pieces (2-4 measures at a time)',
        time: '20 min',
        points: 35,
        tips: ['Play slowly first', 'Count aloud', 'Focus on note accuracy over speed'],
        isMainFocus: true
      },
      {
        id: 'sight-reading',
        label: 'Easy sight-reading (never stop for mistakes)',
        time: '5 min',
        points: 15,
        tips: ['Keep eyes on music', 'Don\'t go back to fix mistakes', 'Start very slowly'],
        quality: 'accuracy'
      }
    ]
  },

  2: {
    title: "Week 2: Add Rhythm & Expand Range",
    focus: "Improve rhythm skills and play confidently in time",
    milestone: "Play simple pieces in C and G major at steady tempo",
    weeklyGoal: "Practice with metronome at least 5 days",
    items: [
      { id: 'dynamic-long-tones', label: 'Long tones with crescendo-decrescendo', time: '8 min', points: 20, tempoRange: { min: 60, max: 80, suggested: 60 } },
      { id: 'c-g-scales', label: 'C major (two octaves) + G major (one octave)', time: '12 min', points: 25, tempoRange: { min: 80, max: 120, suggested: 100 } },
      { id: 'phrase-pieces', label: 'Break pieces into phrases, then connect', time: '15 min', points: 30, isMainFocus: true },
      { id: 'rhythm-work', label: 'Clap rhythms, use metronome for sections', time: '5 min', points: 15 },
      { id: 'harder-sight-reading', label: 'Slightly harder sight-reading', time: '5 min', points: 10 }
    ]
  },

  3: {
    title: "Week 3: Improve Finger Dexterity & Fluency",
    focus: "Build smoother transitions and read longer pieces",
    milestone: "Play three major scales comfortably, confident sight-reading",
    weeklyGoal: "Master all three scales (C, G, F) by week's end",
    items: [
      { id: 'three-scales', label: 'Rotate C, G, and F major scales daily', time: '12 min', points: 30, tempoRange: { min: 80, max: 120, suggested: 100 } },
      { id: 'finger-patterns', label: 'Finger pattern exercises with metronome', time: '8 min', points: 20, tempoRange: { min: 60, max: 100, suggested: 80 } },
      { id: 'whole-piece', label: 'Play through whole piece once (even if slow)', time: '15 min', points: 30, isMainFocus: true },
      { id: 'lines-sight-reading', label: 'Sight-read 4-5 short lines, steady tempo', time: '10 min', points: 20 }
    ]
  },

  4: {
    title: "Week 4: Dynamics & Expression",
    focus: "Add musical expression and dynamic contrast",
    milestone: "Play pieces with clear dynamic changes (p, mf, f)",
    weeklyGoal: "Record yourself playing with dynamics 3 times",
    items: [
      { id: 'dynamic-scales', label: 'Scales with dynamic variations', time: '10 min', points: 25, tempoRange: { min: 80, max: 100, suggested: 90 } },
      { id: 'expressive-tones', label: 'Long tones with vibrato attempts', time: '8 min', points: 20 },
      { id: 'dynamic-pieces', label: 'Focus on dynamic markings in pieces', time: '20 min', points: 35, isMainFocus: true },
      { id: 'articulation', label: 'Tonguing exercises (ta, da, double)', time: '7 min', points: 20 }
    ]
  },

  5: {
    title: "Week 5: Articulation Mastery",
    focus: "Develop clear tonguing and varied articulations",
    milestone: "Play staccato and legato passages distinctly",
    weeklyGoal: "Master 3 different articulation patterns",
    items: [
      { id: 'articulation-scales', label: 'Scales with different articulations', time: '12 min', points: 30, tempoRange: { min: 80, max: 120, suggested: 100 } },
      { id: 'tongue-exercises', label: 'Single and double tonguing patterns', time: '10 min', points: 25 },
      { id: 'articulated-pieces', label: 'Pieces emphasizing articulation variety', time: '18 min', points: 30, isMainFocus: true },
      { id: 'slur-practice', label: 'Slur exercises across intervals', time: '5 min', points: 15 }
    ]
  },

  6: {
    title: "Week 6: Minor Scales Introduction",
    focus: "Begin minor scales and develop emotional expression",
    milestone: "Play A minor and D minor scales fluently",
    weeklyGoal: "Practice minor scales daily with emotion",
    items: [
      { id: 'minor-scales', label: 'A minor and D minor scales (natural)', time: '12 min', points: 30, tempoRange: { min: 70, max: 100, suggested: 85 } },
      { id: 'chromatic-runs', label: 'Chromatic scale segments', time: '8 min', points: 20, tempoRange: { min: 60, max: 90, suggested: 75 } },
      { id: 'minor-pieces', label: 'Pieces in minor keys', time: '20 min', points: 35, isMainFocus: true },
      { id: 'expression-study', label: 'Practice conveying emotions', time: '5 min', points: 15 }
    ]
  },

  7: {
    title: "Week 7: Rhythm Complexity",
    focus: "Master syncopation and complex rhythmic patterns",
    milestone: "Play pieces with dotted rhythms and syncopation accurately",
    weeklyGoal: "Clap and play 5 different rhythm patterns",
    items: [
      { id: 'rhythm-patterns', label: 'Complex rhythm exercises', time: '10 min', points: 25 },
      { id: 'syncopation', label: 'Syncopated scale patterns', time: '10 min', points: 25, tempoRange: { min: 70, max: 100, suggested: 85 } },
      { id: 'rhythmic-pieces', label: 'Jazz or Latin-influenced pieces', time: '20 min', points: 35, isMainFocus: true },
      { id: 'subdivision', label: 'Practice subdividing beats', time: '5 min', points: 15 }
    ]
  },

  8: {
    title: "Week 8: Extended Range",
    focus: "Expand to high and low register comfortably",
    milestone: "Play two-octave scales in 5 keys",
    weeklyGoal: "Hit high E and low C consistently",
    items: [
      { id: 'range-exercises', label: 'Octave leaps and register changes', time: '12 min', points: 30 },
      { id: 'two-octave-scales', label: 'Five major scales, two octaves', time: '10 min', points: 25, tempoRange: { min: 80, max: 120, suggested: 100 } },
      { id: 'range-pieces', label: 'Pieces utilizing full range', time: '18 min', points: 30, isMainFocus: true },
      { id: 'harmonics', label: 'Practice overtones and harmonics', time: '5 min', points: 15 }
    ]
  },

  9: {
    title: "Week 9: Ornamentation Basics",
    focus: "Learn trills, grace notes, and turns",
    milestone: "Execute basic ornaments in context",
    weeklyGoal: "Add ornaments to 3 familiar pieces",
    items: [
      { id: 'trill-practice', label: 'Trill exercises on each note', time: '10 min', points: 25 },
      { id: 'grace-notes', label: 'Grace notes and appoggiaturas', time: '8 min', points: 20 },
      { id: 'baroque-pieces', label: 'Baroque pieces with ornaments', time: '20 min', points: 35, isMainFocus: true },
      { id: 'mordent-turn', label: 'Mordents and turns practice', time: '7 min', points: 20 }
    ]
  },

  10: {
    title: "Week 10: Ensemble Skills",
    focus: "Develop listening and blending abilities",
    milestone: "Play duets maintaining independent part",
    weeklyGoal: "Practice with recordings or play-alongs daily",
    items: [
      { id: 'duet-practice', label: 'Play duets (with recording)', time: '15 min', points: 30, isMainFocus: true },
      { id: 'harmony-scales', label: 'Scales in thirds and sixths', time: '10 min', points: 25, tempoRange: { min: 70, max: 100, suggested: 85 } },
      { id: 'listening-exercise', label: 'Match pitch and tone with recordings', time: '10 min', points: 25 },
      { id: 'counting-rests', label: 'Practice counting long rests', time: '5 min', points: 20 }
    ]
  },

  11: {
    title: "Week 11: Memorization Skills",
    focus: "Develop memory through pattern recognition",
    milestone: "Memorize and perform a complete piece",
    weeklyGoal: "Practice from memory 20 minutes daily",
    items: [
      { id: 'memorize-scales', label: 'Play scales from memory', time: '8 min', points: 20 },
      { id: 'phrase-memory', label: 'Memorize 4-bar phrases', time: '12 min', points: 30 },
      { id: 'full-memorization', label: 'Work on memorizing complete piece', time: '20 min', points: 35, isMainFocus: true },
      { id: 'mental-practice', label: 'Practice without flute (mental)', time: '5 min', points: 15 }
    ]
  },

  12: {
    title: "Week 12: Performance Preparation",
    focus: "Build confidence for public performance",
    milestone: "Perform mini-recital for family/friends",
    weeklyGoal: "Do 3 mock performances",
    items: [
      { id: 'performance-run', label: 'Complete run-throughs', time: '20 min', points: 35, isMainFocus: true },
      { id: 'stage-presence', label: 'Practice bowing and stage etiquette', time: '5 min', points: 15 },
      { id: 'nerves-management', label: 'Breathing exercises for nerves', time: '10 min', points: 25 },
      { id: 'recovery-practice', label: 'Practice recovering from mistakes', time: '10 min', points: 25 }
    ]
  },

  13: {
    title: "Week 13: Technical Precision",
    focus: "Refine finger coordination and timing",
    milestone: "Play technical passages at performance tempo",
    weeklyGoal: "Increase tempo on 3 technical passages",
    items: [
      { id: 'finger-independence', label: 'Finger independence exercises', time: '10 min', points: 25 },
      { id: 'technical-patterns', label: 'Arpeggios and broken chords', time: '12 min', points: 30, tempoRange: { min: 80, max: 140, suggested: 110 } },
      { id: 'etudes', label: 'Technical etudes', time: '18 min', points: 30, isMainFocus: true },
      { id: 'slow-practice', label: 'Ultra-slow precision work', time: '5 min', points: 15 }
    ]
  },

  14: {
    title: "Week 14: Tone Color Exploration",
    focus: "Develop different tone colors and timbres",
    milestone: "Demonstrate 3 distinct tone colors",
    weeklyGoal: "Experiment with embouchure daily",
    items: [
      { id: 'tone-colors', label: 'Practice bright, dark, hollow tones', time: '12 min', points: 30 },
      { id: 'register-matching', label: 'Match tone across registers', time: '8 min', points: 20 },
      { id: 'character-pieces', label: 'Pieces requiring tone variety', time: '20 min', points: 35, isMainFocus: true },
      { id: 'whistle-tones', label: 'Extended techniques exploration', time: '5 min', points: 15 }
    ]
  },

  15: {
    title: "Week 15: Sight-Reading Focus",
    focus: "Rapid reading and pattern recognition",
    milestone: "Sight-read grade-appropriate pieces fluently",
    weeklyGoal: "Sight-read 20 new excerpts",
    items: [
      { id: 'rhythm-reading', label: 'Rhythm-only sight-reading', time: '8 min', points: 20 },
      { id: 'melodic-reading', label: 'Melodic sight-reading', time: '12 min', points: 30 },
      { id: 'ensemble-reading', label: 'Sight-read duet parts', time: '15 min', points: 30, isMainFocus: true },
      { id: 'transposition', label: 'Simple transposition exercises', time: '10 min', points: 20 }
    ]
  },

  16: {
    title: "Week 16: Phrasing Mastery",
    focus: "Shape musical lines with breath and dynamics",
    milestone: "Perform pieces with professional phrasing",
    weeklyGoal: "Record and analyze your phrasing daily",
    items: [
      { id: 'phrase-breathing', label: 'Practice breathing between phrases', time: '10 min', points: 25 },
      { id: 'phrase-shapes', label: 'Create phrase shapes in scales', time: '8 min', points: 20 },
      { id: 'lyrical-pieces', label: 'Lyrical pieces with long phrases', time: '20 min', points: 35, isMainFocus: true },
      { id: 'rubato', label: 'Practice tempo flexibility', time: '7 min', points: 20 }
    ]
  },

  17: {
    title: "Week 17: Advanced Articulation",
    focus: "Master triple tonguing and flutter tongue",
    milestone: "Execute advanced articulations cleanly",
    weeklyGoal: "Practice triple tonguing patterns daily",
    items: [
      { id: 'triple-tongue', label: 'Triple tonguing exercises', time: '12 min', points: 30 },
      { id: 'flutter-tongue', label: 'Flutter tonguing development', time: '8 min', points: 20 },
      { id: 'mixed-articulation', label: 'Pieces with varied articulations', time: '20 min', points: 35, isMainFocus: true },
      { id: 'tongue-flexibility', label: 'Rapid articulation changes', time: '5 min', points: 15 }
    ]
  },

  18: {
    title: "Week 18: Vibrato Development",
    focus: "Cultivate controlled, musical vibrato",
    milestone: "Apply appropriate vibrato in performance",
    weeklyGoal: "Practice vibrato exercises 15 minutes daily",
    items: [
      { id: 'vibrato-pulses', label: 'Measured vibrato pulses', time: '10 min', points: 25, tempoRange: { min: 60, max: 120, suggested: 80 } },
      { id: 'vibrato-long-tones', label: 'Long tones with vibrato', time: '10 min', points: 25 },
      { id: 'vibrato-pieces', label: 'Apply vibrato musically in pieces', time: '20 min', points: 35, isMainFocus: true },
      { id: 'vibrato-speeds', label: 'Vary vibrato speed and width', time: '5 min', points: 15 }
    ]
  },

  19: {
    title: "Week 19: Contemporary Techniques",
    focus: "Explore modern flute techniques",
    milestone: "Perform piece with extended techniques",
    weeklyGoal: "Master 3 contemporary techniques",
    items: [
      { id: 'multiphonics', label: 'Multiphonics exploration', time: '8 min', points: 20 },
      { id: 'key-clicks', label: 'Key clicks and percussive sounds', time: '7 min', points: 20 },
      { id: 'contemporary-piece', label: 'Modern/contemporary pieces', time: '20 min', points: 35, isMainFocus: true },
      { id: 'pitch-bends', label: 'Pitch bending and glissandi', time: '10 min', points: 25 }
    ]
  },

  20: {
    title: "Week 20: Musical Interpretation",
    focus: "Develop personal artistic voice",
    milestone: "Create unique interpretation of standard piece",
    weeklyGoal: "Study 3 different recordings of same piece",
    items: [
      { id: 'style-study', label: 'Compare different interpretations', time: '10 min', points: 25 },
      { id: 'personal-interpretation', label: 'Develop your interpretation', time: '20 min', points: 35, isMainFocus: true },
      { id: 'period-practice', label: 'Practice period-appropriate style', time: '10 min', points: 25 },
      { id: 'expression-freedom', label: 'Improvise expressively', time: '5 min', points: 15 }
    ]
  },

  21: {
    title: "Week 21: Endurance Building",
    focus: "Build stamina for longer performances",
    milestone: "Play 30 minutes without fatigue",
    weeklyGoal: "Increase practice sessions by 10 minutes",
    items: [
      { id: 'breathing-stamina', label: 'Extended breathing exercises', time: '12 min', points: 30 },
      { id: 'long-pieces', label: 'Play through longer works', time: '25 min', points: 35, isMainFocus: true },
      { id: 'embouchure-strength', label: 'Embouchure strengthening', time: '8 min', points: 20 },
      { id: 'active-rest', label: 'Practice active rest techniques', time: '5 min', points: 15 }
    ]
  },

  22: {
    title: "Week 22: Jazz & Improvisation",
    focus: "Explore jazz styles and improvisation",
    milestone: "Improvise over chord progressions",
    weeklyGoal: "Learn 3 jazz standards",
    items: [
      { id: 'jazz-scales', label: 'Blues and jazz scales', time: '10 min', points: 25, tempoRange: { min: 80, max: 140, suggested: 110 } },
      { id: 'chord-patterns', label: 'Chord tone practice', time: '10 min', points: 25 },
      { id: 'jazz-standards', label: 'Learn jazz standards', time: '20 min', points: 35, isMainFocus: true },
      { id: 'improvisation', label: 'Free improvisation', time: '5 min', points: 15 }
    ]
  },

  23: {
    title: "Week 23: Chamber Music Skills",
    focus: "Advanced ensemble and communication",
    milestone: "Lead a chamber ensemble piece",
    weeklyGoal: "Practice chamber music daily",
    items: [
      { id: 'cue-giving', label: 'Practice giving cues', time: '5 min', points: 15 },
      { id: 'intonation-matching', label: 'Intonation with piano/others', time: '10 min', points: 25 },
      { id: 'chamber-repertoire', label: 'Chamber music repertoire', time: '25 min', points: 40, isMainFocus: true },
      { id: 'score-study', label: 'Study full scores', time: '5 min', points: 20 }
    ]
  },

  24: {
    title: "Week 24: Competition Preparation",
    focus: "Prepare for auditions and competitions",
    milestone: "Perform competition-level repertoire",
    weeklyGoal: "Do daily mock auditions",
    items: [
      { id: 'scales-all-keys', label: 'All major and minor scales', time: '15 min', points: 30, tempoRange: { min: 100, max: 144, suggested: 120 } },
      { id: 'orchestral-excerpts', label: 'Standard orchestral excerpts', time: '15 min', points: 30 },
      { id: 'competition-pieces', label: 'Competition repertoire', time: '15 min', points: 30, isMainFocus: true },
      { id: 'mental-preparation', label: 'Visualization and mental prep', time: '5 min', points: 10 }
    ]
  },

  25: {
    title: "Week 25: Recording Project",
    focus: "Create professional-quality recordings",
    milestone: "Record 3-piece demo",
    weeklyGoal: "Record daily and self-evaluate",
    items: [
      { id: 'recording-prep', label: 'Prepare pieces for recording', time: '20 min', points: 35, isMainFocus: true },
      { id: 'microphone-technique', label: 'Practice recording technique', time: '10 min', points: 25 },
      { id: 'take-management', label: 'Multiple takes and editing', time: '10 min', points: 25 },
      { id: 'critical-listening', label: 'Analyze recordings critically', time: '5 min', points: 15 }
    ]
  },

  26: {
    title: "Week 26: Final Recital & Reflection",
    focus: "Culminate learning with full recital",
    milestone: "Perform 30-minute recital program",
    weeklyGoal: "Celebrate your 6-month journey!",
    items: [
      { id: 'recital-program', label: 'Full recital run-through', time: '30 min', points: 40, isMainFocus: true },
      { id: 'program-notes', label: 'Write program notes', time: '10 min', points: 20 },
      { id: 'technical-review', label: 'Review all scales and exercises', time: '10 min', points: 20 },
      { id: 'reflection', label: 'Journal about your progress', time: '10 min', points: 20 }
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