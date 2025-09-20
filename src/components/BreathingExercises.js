import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Play, Pause, RotateCcw, Wind, Timer, Info } from 'lucide-react';

const BreathingExercises = () => {
  const [selectedExercise, setSelectedExercise] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('ready'); // ready, inhale, hold, exhale
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [totalCycles, setTotalCycles] = useState(5);

  const intervalRef = useRef(null);
  const audioContextRef = useRef(null);

  // Breathing exercise patterns
  const exercises = useMemo(() => [
    {
      name: "Basic 4-4-4-4",
      description: "Equal breathing for beginners",
      pattern: { inhale: 4, hold1: 4, exhale: 4, hold2: 4 },
      recommended: "Great for warming up and finding your natural rhythm"
    },
    {
      name: "Performance Breath",
      description: "Quick inhale, long controlled exhale",
      pattern: { inhale: 2, hold1: 2, exhale: 8, hold2: 2 },
      recommended: "Mimics performance breathing - quick breath, long phrase"
    },
    {
      name: "Endurance Builder",
      description: "Extended exhale for breath control",
      pattern: { inhale: 4, hold1: 4, exhale: 12, hold2: 4 },
      recommended: "Builds lung capacity and control for long phrases"
    },
    {
      name: "Relaxation",
      description: "Calming pattern to reduce performance anxiety",
      pattern: { inhale: 4, hold1: 7, exhale: 8, hold2: 0 },
      recommended: "Use before performances to calm nerves"
    },
    {
      name: "Power Breathing",
      description: "Build support for high notes",
      pattern: { inhale: 3, hold1: 3, exhale: 6, hold2: 3 },
      recommended: "Strengthens diaphragm support for upper register"
    },
    {
      name: "Quick Recovery",
      description: "For between difficult passages",
      pattern: { inhale: 1, hold1: 1, exhale: 2, hold2: 1 },
      recommended: "Practice quick, efficient breaths between phrases"
    }
  ], []);

  useEffect(() => {
    // Initialize audio context for click sounds
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  useEffect(() => {
    if (isRunning) {
      const exercise = exercises[selectedExercise];
      let phase = 'inhale';
      let timer = exercise.pattern.inhale;
      let previousPhase = ''; // Track what came before hold
      setCurrentPhase(phase);
      setTimeRemaining(timer);

      intervalRef.current = setInterval(() => {
        timer--;

        if (timer <= 0) {
          // Play tick sound on phase change
          playTick();

          // Move to next phase
          if (phase === 'inhale') {
            if (exercise.pattern.hold1 > 0) {
              previousPhase = 'inhale';
              phase = 'hold';
              timer = exercise.pattern.hold1;
            } else {
              phase = 'exhale';
              timer = exercise.pattern.exhale;
            }
          } else if (phase === 'hold' && previousPhase === 'inhale') {
            phase = 'exhale';
            timer = exercise.pattern.exhale;
          } else if (phase === 'exhale') {
            if (exercise.pattern.hold2 > 0) {
              previousPhase = 'exhale';
              phase = 'hold';
              timer = exercise.pattern.hold2;
            } else {
              // Cycle complete
              setCycleCount(prev => {
                if (prev + 1 >= totalCycles) {
                  setIsRunning(false);
                  return 0;
                }
                return prev + 1;
              });
              phase = 'inhale';
              timer = exercise.pattern.inhale;
            }
          } else if (phase === 'hold' && previousPhase === 'exhale') {
            // Cycle complete
            setCycleCount(prev => {
              if (prev + 1 >= totalCycles) {
                setIsRunning(false);
                return 0;
              }
              return prev + 1;
            });
            phase = 'inhale';
            timer = exercise.pattern.inhale;
          }

          setCurrentPhase(phase);
        }

        setTimeRemaining(timer);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setCurrentPhase('ready');
      setTimeRemaining(0);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, selectedExercise, totalCycles, exercises]);

  const playTick = () => {
    if (!audioContextRef.current) return;

    const osc = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    osc.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    osc.frequency.value = 800;
    gainNode.gain.value = 0.1;

    osc.start();
    osc.stop(audioContextRef.current.currentTime + 0.05);
  };

  const startStop = () => {
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    setIsRunning(!isRunning);
    if (!isRunning) {
      setCycleCount(0);
    }
  };

  const reset = () => {
    setIsRunning(false);
    setCycleCount(0);
    setCurrentPhase('ready');
    setTimeRemaining(0);
  };

  const getPhaseColor = () => {
    switch (currentPhase) {
      case 'inhale': return 'bg-blue-500';
      case 'hold': return 'bg-yellow-500';
      case 'exhale': return 'bg-green-500';
      default: return 'bg-gray-400';
    }
  };

  const getPhaseText = () => {
    switch (currentPhase) {
      case 'inhale': return 'INHALE';
      case 'hold': return 'HOLD';
      case 'exhale': return 'EXHALE';
      case 'ready': return 'Ready';
      default: return '';
    }
  };

  const currentExercise = exercises[selectedExercise];
  const totalDuration = Object.values(currentExercise.pattern).reduce((a, b) => a + b, 0);

  return (
    <div className="bg-gradient-to-br from-sky-50 to-blue-100 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <Wind className="w-6 h-6 mr-2 text-blue-600" />
          Breathing Exercises
        </h3>
        <div className="text-sm text-gray-600">
          Essential for flute tone & endurance
        </div>
      </div>

      {/* Exercise Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Exercise:
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {exercises.map((exercise, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedExercise(idx);
                reset();
              }}
              className={`p-3 rounded-lg text-left transition-all ${
                selectedExercise === idx
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
              }`}
            >
              <div className="font-semibold text-sm">{exercise.name}</div>
              <div className={`text-xs mt-1 ${
                selectedExercise === idx ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {exercise.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Current Exercise Details */}
      <div className="bg-white rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-gray-800">{currentExercise.name}</h4>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Timer className="w-4 h-4" />
            {totalDuration}s per cycle
          </div>
        </div>

        {/* Pattern Display */}
        <div className="flex justify-center gap-2 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">{currentExercise.pattern.inhale}</div>
            <div className="text-xs text-gray-600">Inhale</div>
          </div>
          {currentExercise.pattern.hold1 > 0 && (
            <>
              <div className="text-2xl text-gray-400 mx-2">→</div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500">{currentExercise.pattern.hold1}</div>
                <div className="text-xs text-gray-600">Hold</div>
              </div>
            </>
          )}
          <div className="text-2xl text-gray-400 mx-2">→</div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">{currentExercise.pattern.exhale}</div>
            <div className="text-xs text-gray-600">Exhale</div>
          </div>
          {currentExercise.pattern.hold2 > 0 && (
            <>
              <div className="text-2xl text-gray-400 mx-2">→</div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500">{currentExercise.pattern.hold2}</div>
                <div className="text-xs text-gray-600">Hold</div>
              </div>
            </>
          )}
        </div>

        <div className="bg-blue-50 rounded p-3 text-sm text-blue-700">
          <Info className="w-4 h-4 inline mr-1" />
          {currentExercise.recommended}
        </div>
      </div>

      {/* Visual Breathing Guide */}
      <div className="bg-gray-800 rounded-lg p-6 mb-6 text-center">
        <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center transition-all duration-1000 ${
          isRunning ? getPhaseColor() : 'bg-gray-600'
        } ${currentPhase === 'inhale' ? 'scale-110' : currentPhase === 'exhale' ? 'scale-90' : 'scale-100'}`}>
          <div className="text-white">
            <div className="text-3xl font-bold">{getPhaseText()}</div>
            {timeRemaining > 0 && (
              <div className="text-2xl">{timeRemaining}</div>
            )}
          </div>
        </div>

        {/* Progress */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Cycle {cycleCount + (isRunning ? 1 : 0)} of {totalCycles}</span>
            <span>{Math.round(((cycleCount) / totalCycles) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${(cycleCount / totalCycles) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <button
          onClick={startStop}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
            isRunning
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          {isRunning ? 'Pause' : 'Start'}
        </button>

        <button
          onClick={reset}
          className="flex items-center gap-2 px-4 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition-all"
        >
          <RotateCcw className="w-5 h-5" />
          Reset
        </button>
      </div>

      {/* Cycle Count Selector */}
      <div className="flex items-center justify-center gap-3">
        <label className="text-sm text-gray-600">Cycles:</label>
        <select
          value={totalCycles}
          onChange={(e) => setTotalCycles(Number(e.target.value))}
          disabled={isRunning}
          className="px-3 py-1 border border-gray-300 rounded text-sm"
        >
          {[3, 5, 10, 15, 20].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>

      {/* Tips */}
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <h4 className="font-semibold text-yellow-800 mb-2">Breathing Tips:</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Breathe from your diaphragm, not your chest</li>
          <li>• Keep shoulders relaxed and down</li>
          <li>• Inhale through corners of mouth, keeping embouchure</li>
          <li>• Practice away from the flute first</li>
        </ul>
      </div>
    </div>
  );
};

export default BreathingExercises;