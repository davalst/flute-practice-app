import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Plus, Minus, Volume2 } from 'lucide-react';

const Metronome = ({ defaultTempo = 120, minTempo = 40, maxTempo = 208 }) => {
  const [tempo, setTempo] = useState(defaultTempo);
  const [isPlaying, setIsPlaying] = useState(false);
  const [beatCount, setBeatCount] = useState(0);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const audioContextRef = useRef(null);
  const nextNoteTimeRef = useRef(0);
  const scheduleAheadTime = 0.1; // How far ahead to schedule audio (sec)
  const lookahead = 25.0; // How frequently to call scheduling function (in milliseconds)
  const timerRef = useRef(null);
  const currentBeatRef = useRef(0);

  useEffect(() => {
    // Initialize AudioContext
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      currentBeatRef.current = 0;
      nextNoteTimeRef.current = audioContextRef.current.currentTime;
      scheduler();
    } else {
      clearTimeout(timerRef.current);
      setBeatCount(0);
    }

    return () => {
      clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  const scheduler = () => {
    // while there are notes that will need to play before the next interval,
    // schedule them and advance the pointer.
    while (nextNoteTimeRef.current < audioContextRef.current.currentTime + scheduleAheadTime) {
      scheduleNote(currentBeatRef.current, nextNoteTimeRef.current);
      nextNote();
    }
    timerRef.current = setTimeout(scheduler, lookahead);
  };

  const nextNote = () => {
    const secondsPerBeat = 60.0 / tempo;
    nextNoteTimeRef.current += secondsPerBeat;
    currentBeatRef.current++;
    if (currentBeatRef.current === beatsPerMeasure) {
      currentBeatRef.current = 0;
    }
  };

  const scheduleNote = (beatNumber, time) => {
    const osc = audioContextRef.current.createOscillator();
    const envelope = audioContextRef.current.createGain();

    osc.connect(envelope);
    envelope.connect(audioContextRef.current.destination);

    if (beatNumber === 0) {
      // Downbeat
      osc.frequency.value = 1000;
      envelope.gain.value = 0.3;
    } else {
      // Other beats
      osc.frequency.value = 800;
      envelope.gain.value = 0.2;
    }

    envelope.gain.exponentialRampToValueAtTime(0.01, time + 0.05);

    osc.start(time);
    osc.stop(time + 0.05);

    // Update visual beat indicator
    if (time - audioContextRef.current.currentTime < 0.05) {
      setBeatCount((beatNumber + 1) % beatsPerMeasure || beatsPerMeasure);
    }
  };

  const handleTempoChange = (newTempo) => {
    const clampedTempo = Math.max(minTempo, Math.min(maxTempo, newTempo));
    setTempo(clampedTempo);
  };

  const togglePlayPause = () => {
    if (!isPlaying && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    setIsPlaying(!isPlaying);
  };

  const adjustTempo = (amount) => {
    handleTempoChange(tempo + amount);
  };

  const tapTempo = useRef([]);
  const handleTapTempo = () => {
    const now = Date.now();
    tapTempo.current.push(now);

    // Keep only last 8 taps
    if (tapTempo.current.length > 8) {
      tapTempo.current.shift();
    }

    // Calculate average interval between taps
    if (tapTempo.current.length >= 2) {
      const intervals = [];
      for (let i = 1; i < tapTempo.current.length; i++) {
        intervals.push(tapTempo.current[i] - tapTempo.current[i - 1]);
      }
      const avgInterval = intervals.reduce((a, b) => a + b) / intervals.length;
      const calculatedTempo = Math.round(60000 / avgInterval);
      handleTempoChange(calculatedTempo);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <Volume2 className="w-5 h-5 mr-2" />
          Metronome
        </h3>
        <div className="flex space-x-2">
          {[...Array(beatsPerMeasure)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all ${
                beatCount === i + 1 && isPlaying
                  ? 'bg-purple-600 scale-150'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center mb-6">
        <button
          onClick={() => adjustTempo(-10)}
          className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
          aria-label="Decrease tempo by 10"
        >
          <Minus className="w-5 h-5" />
        </button>

        <button
          onClick={() => adjustTempo(-1)}
          className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
          aria-label="Decrease tempo by 1"
        >
          <Minus className="w-4 h-4" />
        </button>

        <div className="mx-6 text-center">
          <div className="text-3xl font-bold text-gray-800">{tempo}</div>
          <div className="text-sm text-gray-500">BPM</div>
        </div>

        <button
          onClick={() => adjustTempo(1)}
          className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
          aria-label="Increase tempo by 1"
        >
          <Plus className="w-4 h-4" />
        </button>

        <button
          onClick={() => adjustTempo(10)}
          className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
          aria-label="Increase tempo by 10"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center justify-center space-x-4 mb-4">
        <button
          onClick={togglePlayPause}
          className={`flex items-center justify-center w-16 h-16 rounded-full transition-all ${
            isPlaying
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-purple-500 hover:bg-purple-600 text-white'
          }`}
          aria-label={isPlaying ? 'Pause metronome' : 'Start metronome'}
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
        </button>
      </div>

      <div className="flex items-center justify-center space-x-4 mb-4">
        <button
          onClick={handleTapTempo}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium text-gray-700 transition-colors"
        >
          Tap Tempo
        </button>

        <select
          value={beatsPerMeasure}
          onChange={(e) => setBeatsPerMeasure(Number(e.target.value))}
          className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value={2}>2/4</option>
          <option value={3}>3/4</option>
          <option value={4}>4/4</option>
          <option value={5}>5/4</option>
          <option value={6}>6/8</option>
          <option value={7}>7/8</option>
        </select>
      </div>

      <div className="mt-4">
        <input
          type="range"
          min={minTempo}
          max={maxTempo}
          value={tempo}
          onChange={(e) => handleTempoChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{minTempo}</span>
          <span>Tempo</span>
          <span>{maxTempo}</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2">
        {[60, 80, 100, 120].map((preset) => (
          <button
            key={preset}
            onClick={() => handleTempoChange(preset)}
            className={`py-1 px-2 rounded text-sm font-medium transition-colors ${
              tempo === preset
                ? 'bg-purple-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {preset}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Metronome;