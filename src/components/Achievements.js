import React, { useState, useEffect } from 'react';
import { Trophy, Star, Award, Target, Zap, Heart, Flame, Medal, Crown, Sparkles } from 'lucide-react';

const Achievements = ({ checkedItems, startDate, currentWeek }) => {
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [newAchievement, setNewAchievement] = useState(null);

  const achievements = [
    // Streak Achievements
    {
      id: 'first-day',
      title: 'First Steps',
      description: 'Complete your first practice session',
      icon: Star,
      color: 'from-yellow-400 to-yellow-600',
      requirement: (stats) => stats.totalDays >= 1
    },
    {
      id: 'week-warrior',
      title: 'Week Warrior',
      description: 'Practice for 7 days straight',
      icon: Flame,
      color: 'from-orange-400 to-red-600',
      requirement: (stats) => stats.maxStreak >= 7
    },
    {
      id: 'fortnight-hero',
      title: 'Fortnight Hero',
      description: 'Maintain a 14-day practice streak',
      icon: Zap,
      color: 'from-purple-400 to-pink-600',
      requirement: (stats) => stats.maxStreak >= 14
    },
    {
      id: 'monthly-master',
      title: 'Monthly Master',
      description: 'Practice for 30 days in a row',
      icon: Crown,
      color: 'from-indigo-400 to-purple-600',
      requirement: (stats) => stats.maxStreak >= 30
    },

    // Completion Achievements
    {
      id: 'perfectionist',
      title: 'Perfectionist',
      description: 'Complete 100% of daily tasks for a week',
      icon: Trophy,
      color: 'from-green-400 to-emerald-600',
      requirement: (stats) => stats.perfectWeeks >= 1
    },
    {
      id: 'consistency-key',
      title: 'Consistency is Key',
      description: 'Practice at least 5 days per week for 4 weeks',
      icon: Medal,
      color: 'from-blue-400 to-cyan-600',
      requirement: (stats) => stats.consistentWeeks >= 4
    },

    // Milestone Achievements
    {
      id: 'scale-master',
      title: 'Scale Master',
      description: 'Master all major scales',
      icon: Award,
      color: 'from-teal-400 to-green-600',
      requirement: (stats) => stats.weeksCompleted >= 8
    },
    {
      id: 'rhythm-expert',
      title: 'Rhythm Expert',
      description: 'Complete all rhythm exercises in week 7',
      icon: Target,
      color: 'from-rose-400 to-pink-600',
      requirement: (stats) => stats.weeksCompleted >= 7
    },
    {
      id: 'tone-artist',
      title: 'Tone Artist',
      description: 'Practice long tones for 30 days total',
      icon: Heart,
      color: 'from-pink-400 to-red-500',
      requirement: (stats) => stats.longToneDays >= 30
    },
    {
      id: 'halfway-there',
      title: 'Halfway There',
      description: 'Complete 13 weeks of the program',
      icon: Sparkles,
      color: 'from-amber-400 to-orange-600',
      requirement: (stats) => stats.weeksCompleted >= 13
    },
    {
      id: 'graduate',
      title: 'Graduate',
      description: 'Complete the full 26-week program',
      icon: Crown,
      color: 'from-gold-400 to-yellow-600',
      requirement: (stats) => stats.weeksCompleted >= 26
    },

    // Practice Time Achievements
    {
      id: 'hour-hero',
      title: 'Hour Hero',
      description: 'Practice for 60 minutes in a single day',
      icon: Flame,
      color: 'from-red-400 to-orange-600',
      requirement: (stats) => stats.maxDailyMinutes >= 60
    },
    {
      id: 'time-investor',
      title: 'Time Investor',
      description: 'Accumulate 500 total practice minutes',
      icon: Medal,
      color: 'from-cyan-400 to-blue-600',
      requirement: (stats) => stats.totalMinutes >= 500
    },
    {
      id: 'dedication',
      title: 'Dedication',
      description: 'Reach 1000 total practice minutes',
      icon: Trophy,
      color: 'from-violet-400 to-purple-600',
      requirement: (stats) => stats.totalMinutes >= 1000
    }
  ];

  useEffect(() => {
    checkAchievements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedItems]);

  const calculateStats = () => {
    const stats = {
      totalDays: 0,
      maxStreak: 0,
      currentStreak: 0,
      perfectWeeks: 0,
      consistentWeeks: 0,
      weeksCompleted: currentWeek,
      longToneDays: 0,
      totalMinutes: 0,
      maxDailyMinutes: 0
    };

    // Calculate total practice days and streaks
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let currentStreak = 0;
    let maxStreak = 0;

    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toDateString();
      const dayItems = Object.keys(checkedItems).filter(key => key.startsWith(dateStr) && checkedItems[key]);

      if (dayItems.length > 0) {
        stats.totalDays++;
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);

        // Check for long tones
        if (dayItems.some(key => key.includes('long-tone'))) {
          stats.longToneDays++;
        }

        // Calculate daily minutes
        let dailyMinutes = 0;
        dayItems.forEach(key => {
          // Key format is like "Tue Dec 10 2024-long-tones"
          // Extract the itemId by removing the date prefix
          const itemId = key.substring(dateStr.length + 1); // +1 for the dash
          const timerKey = `timer_${itemId}_${dateStr}`;
          const savedTime = localStorage.getItem(timerKey);
          if (savedTime) {
            dailyMinutes += Math.floor(parseInt(savedTime) / 60);
          }
        });
        stats.totalMinutes += dailyMinutes;
        stats.maxDailyMinutes = Math.max(stats.maxDailyMinutes, dailyMinutes);
      } else if (i > 0) {
        currentStreak = 0;
      }
    }

    stats.maxStreak = maxStreak;
    stats.currentStreak = currentStreak;

    // Calculate perfect weeks (simplified)
    stats.perfectWeeks = Math.floor(stats.totalDays / 7);

    // Calculate consistent weeks (at least 5 days per week)
    stats.consistentWeeks = Math.floor(stats.totalDays / 5);

    return stats;
  };

  const checkAchievements = () => {
    const stats = calculateStats();
    const unlocked = [];
    const savedAchievements = JSON.parse(localStorage.getItem('fluteApp_achievements') || '[]');

    achievements.forEach(achievement => {
      if (achievement.requirement(stats)) {
        unlocked.push(achievement.id);

        // Check if this is a new achievement
        if (!savedAchievements.includes(achievement.id)) {
          setNewAchievement(achievement);
          setTimeout(() => setNewAchievement(null), 5000);
        }
      }
    });

    setUnlockedAchievements(unlocked);
    localStorage.setItem('fluteApp_achievements', JSON.stringify(unlocked));
  };

  const getAchievementProgress = (achievement) => {
    const stats = calculateStats();

    // Simple progress calculation based on achievement type
    if (achievement.id.includes('streak') || achievement.id.includes('first-day')) {
      return Math.min(100, (stats.maxStreak / 30) * 100);
    }
    if (achievement.id.includes('week')) {
      return Math.min(100, (stats.weeksCompleted / 26) * 100);
    }
    if (achievement.id.includes('minute') || achievement.id.includes('time')) {
      return Math.min(100, (stats.totalMinutes / 1000) * 100);
    }
    return 0;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
          Achievements
        </h3>
        <div className="text-sm text-gray-600">
          {unlockedAchievements.length} / {achievements.length} Unlocked
        </div>
      </div>

      {/* New Achievement Notification */}
      {newAchievement && (
        <div className="fixed top-4 right-4 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg shadow-xl p-4 flex items-center">
            <Trophy className="w-8 h-8 mr-3" />
            <div>
              <div className="font-bold">Achievement Unlocked!</div>
              <div className="text-sm">{newAchievement.title}</div>
            </div>
          </div>
        </div>
      )}

      {/* Achievement Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {achievements.map(achievement => {
          const isUnlocked = unlockedAchievements.includes(achievement.id);
          const Icon = achievement.icon;
          const progress = getAchievementProgress(achievement);

          return (
            <div
              key={achievement.id}
              className={`relative rounded-lg p-4 transition-all ${
                isUnlocked
                  ? 'bg-gradient-to-br transform hover:scale-105 shadow-lg'
                  : 'bg-gray-100 opacity-60'
              }`}
              style={isUnlocked ? { backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` } : {}}
            >
              {isUnlocked && (
                <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} rounded-lg opacity-10`} />
              )}

              <div className="relative">
                <div className={`flex justify-center mb-2 ${isUnlocked ? 'text-white' : 'text-gray-400'}`}>
                  <Icon className="w-8 h-8" />
                </div>

                <h4 className={`text-sm font-bold text-center mb-1 ${
                  isUnlocked ? 'text-gray-800' : 'text-gray-600'
                }`}>
                  {achievement.title}
                </h4>

                <p className={`text-xs text-center ${
                  isUnlocked ? 'text-gray-700' : 'text-gray-500'
                }`}>
                  {achievement.description}
                </p>

                {!isUnlocked && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-300 rounded-full h-1">
                      <div
                        className="bg-gray-500 h-1 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-center mt-1 text-gray-500">
                      {Math.round(progress)}% Complete
                    </p>
                  </div>
                )}

                {isUnlocked && (
                  <div className="mt-2 text-center">
                    <Star className="w-4 h-4 text-yellow-500 inline-block" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats Summary */}
      <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-indigo-700">{calculateStats().totalDays}</div>
            <div className="text-xs text-indigo-600">Total Days</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-700">{calculateStats().maxStreak}</div>
            <div className="text-xs text-purple-600">Best Streak</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-pink-700">{calculateStats().totalMinutes}</div>
            <div className="text-xs text-pink-600">Total Minutes</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;