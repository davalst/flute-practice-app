import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';

const PracticeTimer = ({ recommendedMinutes, itemId, onTimeUpdate }) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const recommendedSeconds = recommendedMinutes * 60;

  useEffect(() => {
    // Load saved time from localStorage
    const savedTime = localStorage.getItem(`timer_${itemId}_${new Date().toDateString()}`);
    if (savedTime) {
      setSeconds(parseInt(savedTime));
    }
  }, [itemId]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          const newSeconds = prevSeconds + 1;
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
  }, [isRunning, itemId, onTimeUpdate]);

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
    localStorage.removeItem(`timer_${itemId}_${new Date().toDateString()}`);
    if (onTimeUpdate) {
      onTimeUpdate(itemId, 0);
    }
  };

  const toggleTimer = () => {
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