import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Search, Download, FileText, Clock, Music, TrendingUp, Filter } from 'lucide-react';

const PracticeHistory = ({ checkedItems, practiceNotes, tempoSettings, startDate }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar', 'list', 'search'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterExercise, setFilterExercise] = useState('all');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Get all unique exercise types from the data
  const getUniqueExercises = () => {
    const exercises = new Set();
    Object.keys(practiceNotes).forEach(key => {
      const exerciseId = key.split('-').slice(4).join('-');
      exercises.add(exerciseId);
    });
    Object.keys(checkedItems).forEach(key => {
      const exerciseId = key.split('-').slice(4).join('-');
      exercises.add(exerciseId);
    });
    return Array.from(exercises);
  };

  // Get practice data for a specific date
  const getDateData = (dateStr) => {
    const data = {
      date: dateStr,
      exercises: [],
      totalTime: 0,
      completionRate: 0
    };

    // Get all items for this date
    const dateKeys = Object.keys(checkedItems).filter(key => key.startsWith(dateStr));

    dateKeys.forEach(key => {
      const exerciseId = key.split('-').slice(4).join('-');
      const noteKey = key;
      const tempoKey = key;

      // Get practice time from timer
      const timerKey = `timer_${exerciseId}_${dateStr}`;
      const savedTime = localStorage.getItem(timerKey);
      const minutes = savedTime ? Math.floor(parseInt(savedTime) / 60) : 0;

      data.exercises.push({
        id: exerciseId,
        name: formatExerciseName(exerciseId),
        completed: checkedItems[key] || false,
        notes: practiceNotes[noteKey] || '',
        tempo: tempoSettings[tempoKey] || null,
        time: minutes
      });

      data.totalTime += minutes;
    });

    // Calculate completion rate
    const completed = data.exercises.filter(e => e.completed).length;
    data.completionRate = data.exercises.length > 0
      ? Math.round((completed / data.exercises.length) * 100)
      : 0;

    return data;
  };

  // Format exercise ID to readable name
  const formatExerciseName = (id) => {
    return id.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  // Get all practice dates
  const getAllPracticeDates = () => {
    const dates = new Set();

    Object.keys(checkedItems).forEach(key => {
      const parts = key.split(' ');
      if (parts.length >= 4) {
        const dateStr = parts.slice(0, 4).join(' ');
        dates.add(dateStr);
      }
    });

    Object.keys(practiceNotes).forEach(key => {
      const parts = key.split(' ');
      if (parts.length >= 4) {
        const dateStr = parts.slice(0, 4).join(' ');
        dates.add(dateStr);
      }
    });

    return Array.from(dates).sort((a, b) => new Date(b) - new Date(a));
  };

  // Search through all practice data
  const searchPracticeData = () => {
    const results = [];
    const allDates = getAllPracticeDates();

    allDates.forEach(dateStr => {
      const data = getDateData(dateStr);

      data.exercises.forEach(exercise => {
        const matchesSearch = !searchTerm ||
          exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          exercise.notes.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = filterExercise === 'all' ||
          exercise.id === filterExercise;

        if (matchesSearch && matchesFilter && (exercise.completed || exercise.notes)) {
          results.push({
            date: dateStr,
            ...exercise
          });
        }
      });
    });

    return results;
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const current = new Date(startDate);

    while (current <= lastDay || current.getDay() !== 0) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  // Check if date has practice data
  const hasDataForDate = (date) => {
    const dateStr = date.toDateString();
    return getAllPracticeDates().includes(dateStr);
  };

  // Export practice data
  const exportData = (format = 'json') => {
    const allDates = getAllPracticeDates();
    const exportData = {
      startDate: startDate,
      practiceHistory: []
    };

    allDates.forEach(dateStr => {
      const data = getDateData(dateStr);
      if (data.exercises.length > 0) {
        exportData.practiceHistory.push(data);
      }
    });

    if (format === 'json') {
      const dataStr = JSON.stringify(exportData, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `flute-practice-history-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
    } else if (format === 'csv') {
      let csv = 'Date,Exercise,Completed,Tempo,Time (min),Notes\n';

      exportData.practiceHistory.forEach(day => {
        day.exercises.forEach(exercise => {
          csv += `"${day.date}","${exercise.name}","${exercise.completed}","${exercise.tempo || ''}","${exercise.time}","${exercise.notes.replace(/"/g, '""')}"\n`;
        });
      });

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `flute-practice-history-${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <Calendar className="w-6 h-6 mr-2 text-indigo-600" />
          Practice History & Journal
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('calendar')}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              viewMode === 'calendar' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Calendar
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              viewMode === 'list' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            List
          </button>
          <button
            onClick={() => setViewMode('search')}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              viewMode === 'search' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Search
          </button>
        </div>
      </div>

      {/* Search/Filter Bar */}
      {viewMode === 'search' && (
        <div className="mb-4 flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search notes and exercises..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterExercise}
            onChange={(e) => setFilterExercise(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Exercises</option>
            {getUniqueExercises().map(exercise => (
              <option key={exercise} value={exercise}>
                {formatExerciseName(exercise)}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Calendar View */}
      {viewMode === 'calendar' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h4 className="text-lg font-semibold">
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h4>
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
                {day}
              </div>
            ))}
            {generateCalendarDays().map((date, index) => {
              const hasData = hasDataForDate(date);
              const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
              const isToday = date.toDateString() === new Date().toDateString();
              const isSelected = selectedDate && date.toDateString() === selectedDate;

              return (
                <button
                  key={index}
                  onClick={() => hasData && setSelectedDate(date.toDateString())}
                  className={`
                    relative p-2 h-12 rounded text-sm
                    ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
                    ${hasData ? 'bg-green-50 hover:bg-green-100 font-semibold' : 'hover:bg-gray-50'}
                    ${isToday ? 'ring-2 ring-indigo-500' : ''}
                    ${isSelected ? 'bg-indigo-100' : ''}
                    ${hasData ? 'cursor-pointer' : 'cursor-default'}
                  `}
                  disabled={!hasData}
                >
                  {date.getDate()}
                  {hasData && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {getAllPracticeDates().slice(0, 30).map(dateStr => {
            const data = getDateData(dateStr);
            if (data.exercises.length === 0) return null;

            return (
              <div
                key={dateStr}
                onClick={() => setSelectedDate(dateStr)}
                className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-gray-800">
                      {new Date(dateStr).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="text-sm text-gray-600">
                      {data.exercises.filter(e => e.completed).length} exercises • {data.totalTime} min
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-indigo-600">{data.completionRate}%</div>
                    <div className="text-xs text-gray-500">Complete</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Search Results */}
      {viewMode === 'search' && (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {searchPracticeData().map((result, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-semibold text-gray-800">{result.name}</span>
                  {result.completed && <span className="ml-2 text-green-600">✓</span>}
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(result.date).toLocaleDateString()}
                </span>
              </div>
              {result.notes && (
                <p className="text-sm text-gray-700 bg-white p-2 rounded">{result.notes}</p>
              )}
              <div className="flex gap-4 mt-2 text-xs text-gray-500">
                {result.tempo && <span>Tempo: {result.tempo} BPM</span>}
                {result.time > 0 && <span>Time: {result.time} min</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Selected Date Details */}
      {selectedDate && (
        <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
          <h4 className="font-semibold text-indigo-800 mb-3">
            Practice Details for {new Date(selectedDate).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </h4>
          {(() => {
            const data = getDateData(selectedDate);
            return (
              <div>
                <div className="grid grid-cols-3 gap-4 mb-3 text-center">
                  <div>
                    <div className="text-2xl font-bold text-indigo-600">
                      {data.exercises.filter(e => e.completed).length}
                    </div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {data.totalTime}
                    </div>
                    <div className="text-sm text-gray-600">Minutes</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      {data.completionRate}%
                    </div>
                    <div className="text-sm text-gray-600">Complete</div>
                  </div>
                </div>

                <div className="space-y-2">
                  {data.exercises.map((exercise, idx) => (
                    <div key={idx} className="bg-white p-3 rounded">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-gray-800">
                          {exercise.completed && '✓ '}
                          {exercise.name}
                        </span>
                        <div className="text-sm text-gray-500">
                          {exercise.tempo && <span className="mr-3">♩ = {exercise.tempo}</span>}
                          {exercise.time > 0 && <span>{exercise.time} min</span>}
                        </div>
                      </div>
                      {exercise.notes && (
                        <p className="text-sm text-gray-700 mt-2 pl-4 border-l-2 border-indigo-200">
                          {exercise.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Export Buttons */}
      <div className="mt-6 flex justify-center gap-2">
        <button
          onClick={() => exportData('json')}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          Export JSON
        </button>
        <button
          onClick={() => exportData('csv')}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <FileText className="w-4 h-4 mr-2" />
          Export CSV
        </button>
      </div>
    </div>
  );
};

export default PracticeHistory;