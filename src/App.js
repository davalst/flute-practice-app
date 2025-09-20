import React, { useState, useEffect } from 'react';
import { Check, Music, Calendar, Award, RotateCcw, TrendingUp, Target, Star, CheckCircle2, Trophy, Lightbulb } from 'lucide-react';
import './App.css';
import { weeklyPractice, weeklyTeachingTips } from './curriculumData';
import InlineMetronome from './components/InlineMetronome';
import CompactMetronome from './components/CompactMetronome';
import PracticeTimer from './components/PracticeTimer';
import ProgressChart from './components/ProgressChart';
import Achievements from './components/Achievements';
import PracticeHistory from './components/PracticeHistory';

const FluteChecklistApp = () => {
  // Initialize from localStorage or use defaults
  const [startDate] = useState(() => {
    const saved = localStorage.getItem('fluteApp_startDate');
    return saved ? new Date(saved) : new Date();
  });

  const [checkedItems, setCheckedItems] = useState(() => {
    const saved = localStorage.getItem('fluteApp_checkedItems');
    return saved ? JSON.parse(saved) : {};
  });

  const [sessionCompleted, setSessionCompleted] = useState(false);

  const [practiceNotes, setPracticeNotes] = useState(() => {
    const saved = localStorage.getItem('fluteApp_practiceNotes');
    return saved ? JSON.parse(saved) : {};
  });

  const [tempoSettings, setTempoSettings] = useState(() => {
    const saved = localStorage.getItem('fluteApp_tempoSettings');
    return saved ? JSON.parse(saved) : {};
  });

  const [showTips, setShowTips] = useState(false);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('fluteApp_startDate', startDate.toISOString());
  }, [startDate]);

  useEffect(() => {
    localStorage.setItem('fluteApp_checkedItems', JSON.stringify(checkedItems));
  }, [checkedItems]);

  useEffect(() => {
    localStorage.setItem('fluteApp_practiceNotes', JSON.stringify(practiceNotes));
  }, [practiceNotes]);

  useEffect(() => {
    localStorage.setItem('fluteApp_tempoSettings', JSON.stringify(tempoSettings));
  }, [tempoSettings]);

  // Calculate current day and week based on start date
  const getCurrentDay = () => {
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1; // Day 1, 2, 3, etc.
  };

  const getCurrentWeek = () => {
    const currentDay = getCurrentDay();
    return Math.min(Math.ceil(currentDay / 7), 26); // Week 1-26 (6 months), cap at 26
  };

  const currentDay = getCurrentDay();
  const currentWeek = getCurrentWeek();
  const dayOfWeek = ((currentDay - 1) % 7) + 1; // 1-7 within the week

  const getCurrentWeekTips = () => {
    return weeklyTeachingTips[currentWeek] || [
      "Stay consistent with daily practice",
      "Listen to professional flutists for inspiration",
      "Record yourself to track progress",
      "Focus on one thing at a time"
    ];
  };

  const getPracticeStreak = () => {
    let streak = 0;
    const today = new Date();
    const practice = weeklyPractice[currentWeek] || weeklyPractice[1]; // Fallback to week 1
    
    for (let i = 0; i < 30; i++) { // Check last 30 days
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateStr = checkDate.toDateString();
      
      const dayCompleted = practice.items.some(item => {
        const key = `${dateStr}-${item.id}`;
        return checkedItems[key];
      });
      
      if (dayCompleted) {
        streak++;
      } else if (i > 0) { // Don't break streak on today if not yet practiced
        break;
      }
    }
    return streak;
  };

  const currentPractice = weeklyPractice[currentWeek] || weeklyPractice[1]; // Fallback to week 1

  const handleItemCheck = (itemId) => {
    const today = new Date().toDateString();
    const key = `${today}-${itemId}`;
    
    setCheckedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleNotesChange = (itemId, notes) => {
    const today = new Date().toDateString();
    const key = `${today}-${itemId}`;
    
    setPracticeNotes(prev => ({
      ...prev,
      [key]: notes
    }));
  };

  const handleTempoChange = (itemId, tempo) => {
    const today = new Date().toDateString();
    const key = `${today}-${itemId}`;
    
    setTempoSettings(prev => ({
      ...prev,
      [key]: tempo
    }));
  };

  const isItemChecked = (itemId) => {
    const today = new Date().toDateString();
    const key = `${today}-${itemId}`;
    return checkedItems[key] || false;
  };

  const getItemNotes = (itemId) => {
    const today = new Date().toDateString();
    const key = `${today}-${itemId}`;
    return practiceNotes[key] || '';
  };

  const getItemTempo = (itemId) => {
    const today = new Date().toDateString();
    const key = `${today}-${itemId}`;
    return tempoSettings[key] || '';
  };

  const getTodayProgress = () => {
    const today = new Date().toDateString();
    const todayItems = currentPractice.items.filter(item => {
      const key = `${today}-${item.id}`;
      return checkedItems[key];
    });
    return {
      completed: todayItems.length,
      total: currentPractice.items.length,
      points: todayItems.reduce((sum, item) => sum + (currentPractice.items.find(i => i.id === item.id)?.points || 0), 0),
      maxPoints: currentPractice.items.reduce((sum, item) => sum + item.points, 0)
    };
  };

  const getWeekProgress = () => {
    const weekStart = new Date(startDate);
    weekStart.setDate(startDate.getDate() + (currentWeek - 1) * 7);
    
    let completedDays = 0;
    let totalPoints = 0;
    let maxWeekPoints = 0;
    
    for (let i = 0; i < 7; i++) {
      const checkDate = new Date(weekStart);
      checkDate.setDate(weekStart.getDate() + i);
      
      if (checkDate > new Date()) break; // Don't count future days
      
      const dateStr = checkDate.toDateString();
      const dayCompleted = currentPractice.items.every(item => {
        const key = `${dateStr}-${item.id}`;
        return checkedItems[key];
      });
      
      const dayPoints = currentPractice.items.reduce((sum, item) => {
        const key = `${dateStr}-${item.id}`;
        return sum + (checkedItems[key] ? item.points : 0);
      }, 0);
      
      if (dayCompleted) completedDays++;
      totalPoints += dayPoints;
      maxWeekPoints += currentPractice.items.reduce((sum, item) => sum + item.points, 0);
    }
    
    return { completedDays, totalPoints, maxWeekPoints };
  };

  const getDailyEncouragement = (progress) => {
    const percentage = (progress.points / progress.maxPoints) * 100;
    
    if (percentage === 100) {
      return {
        message: "🎉 Perfect practice session! You're building amazing habits!",
        level: "Excellent",
        color: "text-green-600"
      };
    } else if (percentage >= 80) {
      return {
        message: "🌟 Great job today! You're making solid progress!",
        level: "Great",
        color: "text-blue-600"
      };
    } else if (percentage >= 60) {
      return {
        message: "👍 Good work! Every bit of practice counts!",
        level: "Good",
        color: "text-yellow-600"
      };
    } else if (percentage >= 40) {
      return {
        message: "🎵 Nice start! Try to complete a few more items tomorrow!",
        level: "Keep Going",
        color: "text-orange-600"
      };
    } else {
      return {
        message: "🎶 Every journey starts with a single note. You've got this!",
        level: "Getting Started",
        color: "text-purple-600"
      };
    }
  };

  const getWeeklyEncouragement = (weekProgress) => {
    const percentage = (weekProgress.totalPoints / weekProgress.maxWeekPoints) * 100;
    
    if (percentage >= 90) {
      return "🏆 Outstanding week! You're exceeding expectations!";
    } else if (percentage >= 75) {
      return "🎯 Excellent week of practice! Keep this momentum going!";
    } else if (percentage >= 60) {
      return "📈 Solid week of progress! You're building great habits!";
    } else if (percentage >= 40) {
      return "🌱 Growing steadily! Try to be more consistent next week!";
    } else {
      return "🎵 Every practice session matters. Focus on consistency!";
    }
  };

  const resetDay = () => {
    const today = new Date().toDateString();
    const newCheckedItems = { ...checkedItems };

    currentPractice.items.forEach(item => {
      const key = `${today}-${item.id}`;
      delete newCheckedItems[key];
    });

    setCheckedItems(newCheckedItems);
    setSessionCompleted(false);
  };

  const resetAllData = () => {
    if (window.confirm('This will clear all your practice history. Are you sure?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const progress = getTodayProgress();
  const weekProgress = getWeekProgress();
  const progressPercent = (progress.points / progress.maxPoints) * 100;
  const encouragement = getDailyEncouragement(progress);
  const isSessionComplete = progress.completed === progress.total;
  const currentStreak = getPracticeStreak();
  const weeklyTips = getCurrentWeekTips();

  useEffect(() => {
    if (isSessionComplete && !sessionCompleted) {
      setSessionCompleted(true);
    }
  }, [isSessionComplete, sessionCompleted]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Music className="w-8 h-8 text-indigo-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Daily Flute Practice</h1>
          </div>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              Day {currentDay}
            </div>
            <div>Week {currentWeek} of 26</div>
            <div>Day {dayOfWeek} of Week</div>
            <div className="flex items-center">
              <Trophy className="w-4 h-4 mr-1 text-orange-500" />
              {currentStreak} day streak
            </div>
          </div>
        </div>

        {/* Practice Tips */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Lightbulb className="w-5 h-5 text-yellow-600 mr-2" />
              <h3 className="text-lg font-semibold text-yellow-800">Weekly Teaching Tips</h3>
            </div>
            <button
              onClick={() => setShowTips(!showTips)}
              className="text-yellow-600 hover:text-yellow-800 transition-colors"
            >
              {showTips ? 'Hide' : 'Show'} Tips
            </button>
          </div>
          {showTips && (
            <div className="space-y-2">
              {weeklyTips.map((tip, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-yellow-800 text-sm">{tip}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Current Week Info */}
        <div className="bg-indigo-50 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-indigo-800 mb-2">{currentPractice.title}</h2>
          <p className="text-indigo-700 mb-3"><strong>Focus:</strong> {currentPractice.focus}</p>
          <div className="flex items-start mb-3">
            <Award className="w-5 h-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-indigo-700"><strong>Milestone:</strong> {currentPractice.milestone}</p>
          </div>
          <div className="flex items-start">
            <Target className="w-5 h-5 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-indigo-700"><strong>This Week's Goal:</strong> {currentPractice.weeklyGoal}</p>
          </div>
        </div>

        {/* Compact Global Metronome */}
        <div className="mb-8">
          <CompactMetronome />
        </div>

        {/* Weekly Progress */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Week {currentWeek} Progress
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{weekProgress.completedDays}</div>
              <div className="text-sm text-gray-600">Days Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{weekProgress.totalPoints}</div>
              <div className="text-sm text-gray-600">Points Earned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{Math.round((weekProgress.totalPoints / weekProgress.maxWeekPoints) * 100)}%</div>
              <div className="text-sm text-gray-600">Week Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{7 - weekProgress.completedDays}</div>
              <div className="text-sm text-gray-600">Days Remaining</div>
            </div>
          </div>
          <div className="text-center text-gray-700 font-medium">
            {getWeeklyEncouragement(weekProgress)}
          </div>
        </div>

        {/* Daily Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Today's Progress</span>
            <span className="text-sm text-gray-600">{progress.points}/{progress.maxPoints} points</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Practice Checklist */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800">Today's Practice Session</h3>
            <button
              onClick={resetDay}
              className="flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset Day
            </button>
          </div>
          
          {currentPractice.items.map((item, index) => (
            <div key={item.id} className={`rounded-lg p-4 transition-colors ${
              item.isMainFocus ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50 hover:bg-gray-100'
            }`}>
              <div className="space-y-3">
                {/* Main checkbox and title */}
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id={`checkbox-${item.id}`}
                    checked={isItemChecked(item.id)}
                    onChange={() => handleItemCheck(item.id)}
                    className="mt-1 w-5 h-5 text-green-600 bg-white border-gray-300 rounded focus:ring-green-500 focus:ring-2 cursor-pointer"
                  />
                  <label htmlFor={`checkbox-${item.id}`} className="flex-grow ml-3 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${
                        isItemChecked(item.id) ? 'text-green-700 line-through' : 'text-gray-800'
                      }`}>
                        {item.label}
                        {item.isMainFocus && <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Main Focus</span>}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded">
                          {item.time}
                        </span>
                        <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">
                          {item.points} pts
                        </span>
                      </div>
                    </div>
                  </label>
                </div>
                
                {/* Inline Metronome for applicable items */}
                {item.tempoRange && (
                  <div className="ml-8">
                    <InlineMetronome
                      tempo={getItemTempo(item.id) || item.tempoRange.suggested}
                      setTempo={(value) => handleTempoChange(item.id, value)}
                      tempoRange={item.tempoRange}
                      itemId={item.id}
                    />
                  </div>
                )}

                {/* Practice Timer */}
                <div className="ml-8">
                  <PracticeTimer
                    recommendedMinutes={parseInt(item.time)}
                    itemId={item.id}
                    onTimeUpdate={(id, seconds) => {
                      // Optional: handle time updates if needed
                    }}
                  />
                </div>

                {/* Practice tips */}
                {item.tips && (
                  <div className="ml-8">
                    <div className="text-xs text-gray-600 mb-1 font-medium">💡 Practice Tips:</div>
                    <div className="flex flex-wrap gap-1">
                      {item.tips.map((tip, tipIndex) => (
                        <span key={tipIndex} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {tip}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Practice notes */}
                <div className="ml-8">
                  <textarea
                    placeholder="Practice notes: What went well? What to work on tomorrow?"
                    value={getItemNotes(item.id)}
                    onChange={(e) => handleNotesChange(item.id, e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded p-2 resize-none"
                    rows="2"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Chart */}
        <div className="mb-8">
          <ProgressChart
            checkedItems={checkedItems}
            startDate={startDate}
            currentWeek={currentWeek}
          />
        </div>

        {/* Achievements */}
        <div className="mb-8">
          <Achievements
            checkedItems={checkedItems}
            startDate={startDate}
            currentWeek={currentWeek}
          />
        </div>

        {/* Practice History & Journal */}
        <div className="mb-8">
          <PracticeHistory
            checkedItems={checkedItems}
            practiceNotes={practiceNotes}
            tempoSettings={tempoSettings}
            startDate={startDate}
          />
        </div>

        {/* Session Completion */}
        {sessionCompleted && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 mb-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-yellow-500 mr-2" />
                <h3 className="text-2xl font-bold text-green-800">Session Complete!</h3>
              </div>
              <div className={`text-lg mb-2 ${encouragement.color}`}>
                <strong>{encouragement.level}</strong>
              </div>
              <p className="text-gray-700 text-lg mb-4">{encouragement.message}</p>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div className="bg-white rounded-lg p-3">
                  <div className="text-2xl font-bold text-blue-600">{progress.points}</div>
                  <div className="text-sm text-gray-600">Points Earned</div>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <div className="text-2xl font-bold text-green-600">{Math.round(progressPercent)}%</div>
                  <div className="text-sm text-gray-600">Completion</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm border-t pt-6">
          <p>Started your journey on {startDate.toLocaleDateString()} 🎵</p>
          <p className="mt-1">Consistency builds excellence!</p>
          <button
            onClick={resetAllData}
            className="mt-4 text-xs text-red-600 hover:text-red-800 underline"
          >
            Reset All Data
          </button>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <FluteChecklistApp />
    </div>
  );
}

export default App;
