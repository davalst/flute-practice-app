import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const InlineMetronome = ({ tempo, setTempo, tempoRange, itemId }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioContextRef = useRef(null);
  const nextNoteTimeRef = useRef(0);
  const scheduleAheadTime = 0.1;
  const lookahead = 25.0;
  const timerRef = useRef(null);
  const currentBeatRef = useRef(0);
  const beatsPerMeasure = 4;

  useEffect(() => {
    // Initialize AudioContext
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
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
    }

    return () => {
      clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, tempo]);

  const scheduler = () => {
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
    if (isMuted) return;

    const osc = audioContextRef.current.createOscillator();
    const envelope = audioContextRef.current.createGain();

    osc.connect(envelope);
    envelope.connect(audioContextRef.current.destination);

    if (beatNumber === 0) {
      // Downbeat
      osc.frequency.value = 1000;
      envelope.gain.value = volume * 0.6;
    } else {
      // Other beats
      osc.frequency.value = 800;
      envelope.gain.value = volume * 0.4;
    }

    envelope.gain.exponentialRampToValueAtTime(0.01, time + 0.05);

    osc.start(time);
    osc.stop(time + 0.05);
  };

  const togglePlayPause = () => {
    if (!isPlaying && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTempoChange = (e) => {
    const newTempo = parseInt(e.target.value);
    if (!isNaN(newTempo) && newTempo >= tempoRange.min && newTempo <= tempoRange.max) {
      setTempo(newTempo);
    }
  };

  const adjustTempo = (amount) => {
    const newTempo = Math.max(tempoRange.min, Math.min(tempoRange.max, (tempo || tempoRange.suggested) + amount));
    setTempo(newTempo);
  };

  return (
    <div className="flex items-center gap-3 bg-white rounded-lg p-2 border border-gray-200">
      {/* Play/Pause Button */}
      <button
        onClick={togglePlayPause}
        className={`p-2 rounded transition-colors ${
          isPlaying
            ? 'bg-red-100 hover:bg-red-200 text-red-600'
            : 'bg-green-100 hover:bg-green-200 text-green-600'
        }`}
        aria-label={isPlaying ? 'Stop metronome' : 'Start metronome'}
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </button>

      {/* Tempo Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => adjustTempo(-5)}
          className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-bold"
          aria-label="Decrease tempo"
        >
          -
        </button>

        <div className="flex items-center gap-1">
          <input
            type="number"
            value={tempo || tempoRange.suggested}
            onChange={handleTempoChange}
            min={tempoRange.min}
            max={tempoRange.max}
            className="w-14 px-1 py-0.5 text-center border border-gray-300 rounded text-sm font-medium"
          />
          <span className="text-xs text-gray-500">BPM</span>
        </div>

        <button
          onClick={() => adjustTempo(5)}
          className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-bold"
          aria-label="Increase tempo"
        >
          +
        </button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`p-1.5 rounded transition-colors ${
            isMuted
              ? 'bg-gray-100 text-gray-400'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
          }`}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {!isMuted && (
          <input
            type="range"
            min="0"
            max="100"
            value={volume * 100}
            onChange={(e) => setVolume(parseInt(e.target.value) / 100)}
            className="w-20 h-1 accent-gray-600"
            aria-label="Volume"
          />
        )}
      </div>

      {/* Visual Beat Indicator */}
      {isPlaying && (
        <div className="flex gap-1">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === 0 ? 'bg-green-500' : 'bg-gray-300'
              } animate-pulse`}
              style={{
                animationDelay: `${(i * 60 / tempo) * 0.25}s`,
                animationDuration: `${60 / tempo}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default InlineMetronome;