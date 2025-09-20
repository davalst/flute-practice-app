import React, { useState, useEffect } from 'react';
import { Calendar, Award, Target, BarChart3, Activity } from 'lucide-react';

const ProgressChart = ({ checkedItems, startDate, currentWeek }) => {
  const [chartView, setChartView] = useState('week'); // 'week', 'month', 'all'
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    calculateProgressData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedItems, chartView]);

  const calculateProgressData = () => {
    const data = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (chartView === 'week') {
      // Last 7 days
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateStr = date.toDateString();
        const dayData = calculateDayProgress(dateStr);
        data.push({
          date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
          shortDate: date.toLocaleDateString('en-US', { weekday: 'short' }),
          ...dayData
        });
      }
    } else if (chartView === 'month') {
      // Last 30 days
      for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateStr = date.toDateString();
        const dayData = calculateDayProgress(dateStr);
        data.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          shortDate: date.getDate().toString(),
          ...dayData
        });
      }
    } else {
      // All time (since start date)
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      const daysSinceStart = Math.floor((today - start) / (1000 * 60 * 60 * 24));

      for (let i = 0; i <= Math.min(daysSinceStart, 180); i++) { // Max 6 months
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        const dateStr = date.toDateString();
        const dayData = calculateDayProgress(dateStr);
        data.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          shortDate: date.getDate().toString(),
          ...dayData
        });
      }
    }

    setProgressData(data);
  };

  const calculateDayProgress = (dateStr) => {
    const dayItems = Object.keys(checkedItems).filter(key => key.startsWith(dateStr));
    const completedItems = dayItems.filter(key => checkedItems[key]).length;
    const totalItems = dayItems.length > 0 ? 4 : 0; // Assuming 4 items per day as standard

    // Calculate practice time from localStorage
    let totalMinutes = 0;
    dayItems.forEach(key => {
      const itemId = key.split('-').slice(4).join('-');
      const timerKey = `timer_${itemId}_${dateStr}`;
      const savedTime = localStorage.getItem(timerKey);
      if (savedTime) {
        totalMinutes += Math.floor(parseInt(savedTime) / 60);
      }
    });

    return {
      completed: completedItems,
      total: totalItems,
      percentage: totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0,
      minutes: totalMinutes
    };
  };


  const getAverageCompletion = () => {
    const validDays = progressData.filter(d => d.total > 0);
    if (validDays.length === 0) return 0;
    return Math.round(validDays.reduce((sum, d) => sum + d.percentage, 0) / validDays.length);
  };

  const getTotalPracticeTime = () => {
    return progressData.reduce((sum, d) => sum + d.minutes, 0);
  };

  const getStreakDays = () => {
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toDateString();
      const dayItems = Object.keys(checkedItems).filter(key => key.startsWith(dateStr) && checkedItems[key]);

      if (dayItems.length > 0) {
        streak++;
      } else if (i > 0) { // Don't break on today if not practiced yet
        break;
      }
    }
    return streak;
  };

  const getBarColor = (percentage) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-blue-500';
    if (percentage >= 40) return 'bg-yellow-500';
    if (percentage > 0) return 'bg-orange-500';
    return 'bg-gray-300';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <BarChart3 className="w-6 h-6 mr-2 text-indigo-600" />
          Progress Visualization
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setChartView('week')}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              chartView === 'week'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setChartView('month')}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              chartView === 'month'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setChartView('all')}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              chartView === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Time
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <Activity className="w-5 h-5 text-purple-600" />
            <span className="text-2xl font-bold text-purple-700">{getStreakDays()}</span>
          </div>
          <p className="text-sm text-purple-600 mt-1">Day Streak</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <Target className="w-5 h-5 text-blue-600" />
            <span className="text-2xl font-bold text-blue-700">{getAverageCompletion()}%</span>
          </div>
          <p className="text-sm text-blue-600 mt-1">Avg Completion</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <Calendar className="w-5 h-5 text-green-600" />
            <span className="text-2xl font-bold text-green-700">{progressData.filter(d => d.completed > 0).length}</span>
          </div>
          <p className="text-sm text-green-600 mt-1">Days Practiced</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <Award className="w-5 h-5 text-orange-600" />
            <span className="text-2xl font-bold text-orange-700">{getTotalPracticeTime()}</span>
          </div>
          <p className="text-sm text-orange-600 mt-1">Total Minutes</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="relative">
        <div className="flex items-end justify-between h-48 mb-2">
          {progressData.slice(-Math.min(progressData.length, chartView === 'week' ? 7 : chartView === 'month' ? 30 : 30)).map((day, index) => (
            <div
              key={index}
              className="flex-1 flex flex-col items-center justify-end mx-0.5"
              style={{ maxWidth: chartView === 'month' || chartView === 'all' ? '20px' : 'auto' }}
            >
              {day.percentage > 0 && (
                <div className="text-xs text-gray-600 mb-1">
                  {chartView === 'week' && `${day.percentage}%`}
                </div>
              )}
              <div
                className={`w-full rounded-t transition-all duration-300 ${getBarColor(day.percentage)}`}
                style={{
                  height: `${(day.percentage / 100) * 100}%`,
                  minHeight: day.percentage > 0 ? '4px' : '0'
                }}
                title={`${day.date}: ${day.percentage}% complete, ${day.minutes} minutes`}
              />
            </div>
          ))}
        </div>

        {/* X-axis labels */}
        <div className="flex justify-between text-xs text-gray-500">
          {progressData.slice(-Math.min(progressData.length, chartView === 'week' ? 7 : 10)).map((day, index) => (
            <div
              key={index}
              className="flex-1 text-center mx-0.5"
              style={{ maxWidth: chartView === 'month' || chartView === 'all' ? '40px' : 'auto' }}
            >
              {chartView === 'week' || index % Math.ceil(progressData.length / 10) === 0 ? day.shortDate : ''}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-500 rounded" />
          <span className="text-gray-600">80-100%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-500 rounded" />
          <span className="text-gray-600">60-79%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-yellow-500 rounded" />
          <span className="text-gray-600">40-59%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-orange-500 rounded" />
          <span className="text-gray-600">1-39%</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;