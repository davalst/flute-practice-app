import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Search, Download, FileText, Clock, Music, ChevronDown, ChevronUp } from 'lucide-react';

const PracticeHistory = ({ checkedItems, practiceNotes, tempoSettings, startDate }) => {
  const [viewMode, setViewMode] = useState('month'); // 'month', 'all', 'search'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterExercise, setFilterExercise] = useState('all');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [expandedDates, setExpandedDates] = useState({});

  // Get all unique exercise types from the data
  const getUniqueExercises = () => {
    const exercises = new Set();
    Object.keys(practiceNotes).forEach(key => {
      const exerciseId = key.split('-').slice(4).join('-');
      if (exerciseId) exercises.add(exerciseId);
    });
    Object.keys(checkedItems).forEach(key => {
      const exerciseId = key.split('-').slice(4).join('-');
      if (exerciseId) exercises.add(exerciseId);
    });
    return Array.from(exercises).filter(e => e);
  };

  // Format exercise ID to readable name
  const formatExerciseName = (id) => {
    if (!id) return 'Unknown';
    return id.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  // Get practice data for a specific date
  const getDateData = (dateStr) => {
    const data = {
      date: dateStr,
      exercises: [],
      totalTime: 0,
      hasNotes: false
    };

    // Get all items for this date
    const dateKeys = Object.keys({...checkedItems, ...practiceNotes}).filter(key => key.startsWith(dateStr));

    dateKeys.forEach(key => {
      const exerciseId = key.split('-').slice(4).join('-');
      if (!exerciseId) return;

      const noteKey = key;
      const tempoKey = key;

      // Get practice time from timer
      const timerKey = `timer_${exerciseId}_${dateStr}`;
      const savedTime = localStorage.getItem(timerKey);
      const minutes = savedTime ? Math.floor(parseInt(savedTime) / 60) : 0;

      const notes = practiceNotes[noteKey] || '';
      if (notes) data.hasNotes = true;

      // Check if we already have this exercise
      const existingExercise = data.exercises.find(e => e.id === exerciseId);
      if (existingExercise) {
        if (notes && !existingExercise.notes) existingExercise.notes = notes;
        if (checkedItems[key]) existingExercise.completed = true;
      } else {
        data.exercises.push({
          id: exerciseId,
          name: formatExerciseName(exerciseId),
          completed: checkedItems[key] || false,
          notes: notes,
          tempo: tempoSettings[tempoKey] || null,
          time: minutes
        });
      }

      data.totalTime += minutes;
    });

    return data;
  };

  // Get all practice dates with notes or completed items
  const getAllPracticeDates = () => {
    const dates = new Set();

    Object.keys(practiceNotes).forEach(key => {
      const parts = key.split(' ');
      if (parts.length >= 4 && practiceNotes[key]) {
        const dateStr = parts.slice(0, 4).join(' ');
        dates.add(dateStr);
      }
    });

    Object.keys(checkedItems).forEach(key => {
      if (checkedItems[key]) {
        const parts = key.split(' ');
        if (parts.length >= 4) {
          const dateStr = parts.slice(0, 4).join(' ');
          dates.add(dateStr);
        }
      }
    });

    return Array.from(dates).sort((a, b) => new Date(b) - new Date(a));
  };

  // Get practice dates for current month
  const getMonthPracticeDates = () => {
    const allDates = getAllPracticeDates();
    return allDates.filter(dateStr => {
      const date = new Date(dateStr);
      return date.getMonth() === currentMonth.getMonth() &&
             date.getFullYear() === currentMonth.getFullYear();
    });
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

        const matchesFilter = filterExercise === 'all' || exercise.id === filterExercise;

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

  // Toggle expanded state for a date
  const toggleDateExpanded = (dateStr) => {
    setExpandedDates(prev => ({
      ...prev,
      [dateStr]: !prev[dateStr]
    }));
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

  // Calculate stats for the month
  const getMonthStats = () => {
    const dates = getMonthPracticeDates();
    let totalNotes = 0;
    let totalTime = 0;
    let completedExercises = 0;

    dates.forEach(dateStr => {
      const data = getDateData(dateStr);
      data.exercises.forEach(exercise => {
        if (exercise.notes) totalNotes++;
        if (exercise.completed) completedExercises++;
        totalTime += exercise.time;
      });
    });

    return { totalNotes, totalTime, completedExercises, practiceDays: dates.length };
  };

  const monthStats = getMonthStats();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <Calendar className="w-6 h-6 mr-2 text-indigo-600" />
          Practice History & Notes
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('month')}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              viewMode === 'month' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            By Month
          </button>
          <button
            onClick={() => setViewMode('all')}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              viewMode === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Notes
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

      {/* Month View */}
      {viewMode === 'month' && (
        <div>
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4 bg-gray-50 rounded-lg p-3">
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
              className="p-2 hover:bg-gray-200 rounded transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-center">
              <h4 className="text-lg font-semibold">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h4>
              <div className="text-sm text-gray-600">
                {monthStats.practiceDays} days • {monthStats.totalNotes} notes • {monthStats.totalTime} min
              </div>
            </div>
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
              className="p-2 hover:bg-gray-200 rounded transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Practice Days List */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {getMonthPracticeDates().length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Music className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No practice notes for this month</p>
              </div>
            ) : (
              getMonthPracticeDates().map(dateStr => {
                const data = getDateData(dateStr);
                const isExpanded = expandedDates[dateStr];
                const notesCount = data.exercises.filter(e => e.notes).length;

                return (
                  <div key={dateStr} className="bg-gray-50 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleDateExpanded(dateStr)}
                      className="w-full p-4 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          <div className="text-left">
                            <div className="font-semibold text-gray-800">
                              {new Date(dateStr).toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </div>
                            <div className="text-sm text-gray-600">
                              {data.exercises.filter(e => e.completed).length} completed •
                              {notesCount > 0 && ` ${notesCount} notes • `}
                              {data.totalTime > 0 && ` ${data.totalTime} min`}
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-gray-200">
                        {data.exercises.map((exercise, idx) => (
                          <div key={idx} className="mt-3 bg-white p-3 rounded">
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
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* All Notes View */}
      {viewMode === 'all' && (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {getAllPracticeDates().slice(0, 50).map(dateStr => {
            const data = getDateData(dateStr);
            const notesExercises = data.exercises.filter(e => e.notes);

            if (notesExercises.length === 0) return null;

            return (
              <div key={dateStr} className="bg-gray-50 rounded-lg p-4">
                <div className="font-semibold text-gray-800 mb-2">
                  {new Date(dateStr).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
                {notesExercises.map((exercise, idx) => (
                  <div key={idx} className="mb-2">
                    <div className="text-sm font-medium text-gray-700">
                      {exercise.name}:
                    </div>
                    <p className="text-sm text-gray-600 ml-4 mt-1">
                      {exercise.notes}
                    </p>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}

      {/* Search Results */}
      {viewMode === 'search' && (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {searchPracticeData().length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No results found</p>
            </div>
          ) : (
            searchPracticeData().map((result, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3">
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
            ))
          )}
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