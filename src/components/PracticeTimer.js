import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';

const PracticeTimer = ({ recommendedMinutes, itemId, onTimeUpdate }) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const audioContextRef = useRef(null);
  const hasPlayedBuzzerRef = useRef(false);
  const recommendedSeconds = recommendedMinutes * 60;

  useEffect(() => {
    // Initialize audio context
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    // Load saved time from localStorage
    const savedTime = localStorage.getItem(`timer_${itemId}_${new Date().toDateString()}`);
    if (savedTime) {
      const saved = parseInt(savedTime);
      setSeconds(saved);
      // Check if we've already played the buzzer for this session
      hasPlayedBuzzerRef.current = saved >= recommendedSeconds;
    }

    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, [itemId, recommendedSeconds]);

  const playBuzzer = () => {
    if (!audioContextRef.current) return;

    // Resume audio context if suspended (for browser autoplay policies)
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    const currentTime = audioContextRef.current.currentTime;
    const buzzerDuration = 3; // 3 seconds total
    const beepDuration = 0.2; // Each beep lasts 0.2 seconds
    const beepInterval = 0.3; // Time between beeps
    const numberOfBeeps = Math.floor(buzzerDuration / beepInterval);

    for (let i = 0; i < numberOfBeeps; i++) {
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);

      oscillator.frequency.value = 880; // A5 note
      oscillator.type = 'sine';

      // Envelope for each beep
      const beepStartTime = currentTime + (i * beepInterval);
      gainNode.gain.setValueAtTime(0, beepStartTime);
      gainNode.gain.linearRampToValueAtTime(0.3, beepStartTime + 0.01); // Quick fade in
      gainNode.gain.setValueAtTime(0.3, beepStartTime + beepDuration - 0.01);
      gainNode.gain.linearRampToValueAtTime(0, beepStartTime + beepDuration); // Quick fade out

      oscillator.start(beepStartTime);
      oscillator.stop(beepStartTime + beepDuration);
    }
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          const newSeconds = prevSeconds + 1;

          // Play buzzer when reaching recommended time
          if (newSeconds === recommendedSeconds && !hasPlayedBuzzerRef.current) {
            playBuzzer();
            hasPlayedBuzzerRef.current = true;
          }

          // Save to localStorage every 5 seconds
          if (newSeconds % 5 === 0) {
            localStorage.setItem(`timer_${itemId}_${new Date().toDateString()}`, newSeconds.toString());
          }
          if (onTimeUpdate) {
            onTimeUpdate(itemId, newSeconds);
          }
          return newSeconds;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, itemId, onTimeUpdate, recommendedSeconds]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    return Math.min((seconds / recommendedSeconds) * 100, 100);
  };

  const getProgressColor = () => {
    const percentage = getProgressPercentage();
    if (percentage < 50) return 'bg-red-400';
    if (percentage < 80) return 'bg-yellow-400';
    if (percentage < 100) return 'bg-blue-400';
    return 'bg-green-500';
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
    hasPlayedBuzzerRef.current = false; // Reset buzzer flag
    localStorage.removeItem(`timer_${itemId}_${new Date().toDateString()}`);
    if (onTimeUpdate) {
      onTimeUpdate(itemId, 0);
    }
  };

  const toggleTimer = () => {
    // Resume audio context when starting timer (for browser autoplay policies)
    if (!isRunning && audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    setIsRunning(!isRunning);
  };

  return (
    <div className="flex items-center gap-3 bg-white rounded-lg p-2 border border-gray-200">
      <Clock className="w-4 h-4 text-gray-500" />

      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">
            {formatTime(seconds)} / {formatTime(recommendedSeconds)}
          </span>
          <span className="text-xs text-gray-500">
            {Math.round(getProgressPercentage())}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className={`h-1.5 rounded-full transition-all duration-300 ${getProgressColor()}`}
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={toggleTimer}
          className={`p-1.5 rounded transition-colors ${
            isRunning
              ? 'bg-red-100 hover:bg-red-200 text-red-600'
              : 'bg-green-100 hover:bg-green-200 text-green-600'
          }`}
          aria-label={isRunning ? 'Pause timer' : 'Start timer'}
        >
          {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        <button
          onClick={handleReset}
          className="p-1.5 rounded bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
          aria-label="Reset timer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PracticeTimer;