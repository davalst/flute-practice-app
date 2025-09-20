import React, { useState } from 'react';
import { X, Search, Music, Info } from 'lucide-react';

const FingeringChart = ({ isOpen, onClose }) => {
  const [searchNote, setSearchNote] = useState('');
  const [selectedOctave, setSelectedOctave] = useState('all');

  // Comprehensive fingering data for flute
  // O = Open, ● = Closed, ◐ = Half-hole
  const fingeringData = [
    // First Octave
    { note: 'C4', octave: 'low', fingering: ['●', '●', '●', '●', '●', '●', '●', '●', '●'], alternates: [] },
    { note: 'C#4/Db4', octave: 'low', fingering: ['●', '●', '●', '●', '●', '●', '●', '●', 'O'], alternates: [] },
    { note: 'D4', octave: 'low', fingering: ['●', '●', '●', '●', '●', '●', '●', 'O', 'O'], alternates: [] },
    { note: 'D#4/Eb4', octave: 'low', fingering: ['●', '●', '●', '●', '●', '●', 'O', '●', 'O'], alternates: [] },
    { note: 'E4', octave: 'low', fingering: ['●', '●', '●', '●', '●', '●', 'O', 'O', 'O'], alternates: [] },
    { note: 'F4', octave: 'low', fingering: ['●', '●', '●', '●', '●', 'O', 'O', 'O', 'O'], alternates: [] },
    { note: 'F#4/Gb4', octave: 'low', fingering: ['●', '●', '●', '●', 'O', '●', '●', 'O', 'O'], alternates: [] },
    { note: 'G4', octave: 'low', fingering: ['●', '●', '●', '●', 'O', 'O', 'O', 'O', 'O'], alternates: [] },
    { note: 'G#4/Ab4', octave: 'low', fingering: ['●', '●', '●', 'O', '●', '●', '●', 'O', 'O'], alternates: [] },
    { note: 'A4', octave: 'low', fingering: ['●', '●', '●', 'O', 'O', 'O', 'O', 'O', 'O'], alternates: [] },
    { note: 'A#4/Bb4', octave: 'low', fingering: ['●', '●', 'O', '●', 'O', 'O', 'O', 'O', 'O'], alternates: [
      { type: 'Thumb Bb', fingering: ['●', '●', '●', 'O', 'O', 'O', 'O', 'O', 'O', 'Thumb'] }
    ]},
    { note: 'B4', octave: 'low', fingering: ['●', '●', 'O', 'O', 'O', 'O', 'O', 'O', 'O'], alternates: [] },

    // Second Octave
    { note: 'C5', octave: 'middle', fingering: ['●', 'O', '●', '●', '●', '●', '●', '●', '●'], alternates: [] },
    { note: 'C#5/Db5', octave: 'middle', fingering: ['●', 'O', '●', '●', '●', '●', '●', '●', 'O'], alternates: [] },
    { note: 'D5', octave: 'middle', fingering: ['●', 'O', '●', '●', '●', '●', '●', 'O', 'O'], alternates: [] },
    { note: 'D#5/Eb5', octave: 'middle', fingering: ['●', 'O', '●', '●', '●', '●', 'O', '●', 'O'], alternates: [] },
    { note: 'E5', octave: 'middle', fingering: ['●', 'O', '●', '●', '●', '●', 'O', 'O', 'O'], alternates: [] },
    { note: 'F5', octave: 'middle', fingering: ['●', 'O', '●', '●', '●', 'O', 'O', 'O', 'O'], alternates: [] },
    { note: 'F#5/Gb5', octave: 'middle', fingering: ['●', 'O', '●', '●', 'O', '●', '●', 'O', 'O'], alternates: [] },
    { note: 'G5', octave: 'middle', fingering: ['●', 'O', '●', '●', 'O', 'O', 'O', 'O', 'O'], alternates: [] },
    { note: 'G#5/Ab5', octave: 'middle', fingering: ['●', 'O', '●', 'O', '●', '●', '●', 'O', 'O'], alternates: [] },
    { note: 'A5', octave: 'middle', fingering: ['●', 'O', '●', 'O', 'O', 'O', 'O', 'O', 'O'], alternates: [] },
    { note: 'A#5/Bb5', octave: 'middle', fingering: ['●', 'O', 'O', '●', 'O', 'O', 'O', 'O', 'O'], alternates: [
      { type: 'Thumb Bb', fingering: ['●', 'O', '●', 'O', 'O', 'O', 'O', 'O', 'O', 'Thumb'] }
    ]},
    { note: 'B5', octave: 'middle', fingering: ['●', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'], alternates: [] },

    // Third Octave
    { note: 'C6', octave: 'high', fingering: ['O', 'O', '●', '●', '●', '●', '●', '●', '●'], alternates: [] },
    { note: 'C#6/Db6', octave: 'high', fingering: ['O', 'O', 'O', '●', '●', '●', '●', '●', 'O'], alternates: [] },
    { note: 'D6', octave: 'high', fingering: ['◐', '●', '●', '●', '●', '●', '●', 'O', 'O'], alternates: [] },
    { note: 'D#6/Eb6', octave: 'high', fingering: ['◐', '●', '●', '●', '●', '●', 'O', '●', 'O'], alternates: [] },
    { note: 'E6', octave: 'high', fingering: ['◐', '●', '●', '●', '●', 'O', '●', '●', 'O'], alternates: [] },
    { note: 'F6', octave: 'high', fingering: ['◐', '●', '●', '●', 'O', '●', 'O', 'O', 'O'], alternates: [] },
    { note: 'F#6/Gb6', octave: 'high', fingering: ['◐', '●', '●', '●', 'O', 'O', '●', 'O', 'O'], alternates: [] },
    { note: 'G6', octave: 'high', fingering: ['◐', '●', '●', 'O', '●', '●', '●', '●', 'O'], alternates: [] },
    { note: 'G#6/Ab6', octave: 'high', fingering: ['◐', '●', 'O', '●', '●', '●', '●', '●', 'O'], alternates: [] },
    { note: 'A6', octave: 'high', fingering: ['●', '●', 'O', '●', 'O', '●', '●', 'O', 'O'], alternates: [] },
    { note: 'A#6/Bb6', octave: 'high', fingering: ['●', 'O', 'O', '●', '●', 'O', '●', 'O', 'O'], alternates: [] },
    { note: 'B6', octave: 'high', fingering: ['●', 'O', '●', '●', 'O', 'O', '●', 'O', 'O'], alternates: [] },
    { note: 'C7', octave: 'high', fingering: ['●', 'O', 'O', '●', 'O', 'O', '●', 'O', 'O'], alternates: [] }
  ];

  const filterNotes = () => {
    return fingeringData.filter(item => {
      const matchesSearch = !searchNote ||
        item.note.toLowerCase().includes(searchNote.toLowerCase());
      const matchesOctave = selectedOctave === 'all' || item.octave === selectedOctave;
      return matchesSearch && matchesOctave;
    });
  };

  const FingeringDisplay = ({ fingering, isAlternate = false }) => {
    const keyLabels = ['LT', 'L1', 'L2', 'L3', 'R1', 'R2', 'R3', 'R4', 'RF'];

    return (
      <div className={`flex flex-col items-center ${isAlternate ? 'scale-90' : ''}`}>
        <div className="grid grid-cols-3 gap-1 mb-2">
          {/* Left Hand */}
          <div className="col-span-1">
            <div className="text-xs text-gray-500 text-center mb-1">Left Hand</div>
            {fingering.slice(0, 4).map((key, idx) => (
              <div key={idx} className="flex items-center justify-end mb-1">
                <span className="text-xs text-gray-600 mr-2">{keyLabels[idx]}</span>
                <div className={`w-6 h-6 rounded-full border-2 ${
                  key === '●' ? 'bg-gray-800 border-gray-800' :
                  key === '◐' ? 'bg-gray-400 border-gray-800' :
                  'bg-white border-gray-400'
                }`} />
              </div>
            ))}
          </div>

          {/* Flute Body (visual separator) */}
          <div className="col-span-1 flex justify-center">
            <div className="w-1 h-full bg-gray-300 rounded" />
          </div>

          {/* Right Hand */}
          <div className="col-span-1">
            <div className="text-xs text-gray-500 text-center mb-1">Right Hand</div>
            {fingering.slice(4, 9).map((key, idx) => (
              <div key={idx} className="flex items-center mb-1">
                <div className={`w-6 h-6 rounded-full border-2 ${
                  key === '●' ? 'bg-gray-800 border-gray-800' :
                  key === '◐' ? 'bg-gray-400 border-gray-800' :
                  'bg-white border-gray-400'
                }`} />
                <span className="text-xs text-gray-600 ml-2">{keyLabels[idx + 4]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Special keys indicator */}
        {fingering.includes('Thumb') && (
          <div className="text-xs text-blue-600 mt-1">+ Thumb Bb key</div>
        )}
      </div>
    );
  };

  console.log('FingeringChart component - isOpen:', isOpen);

  if (!isOpen) {
    console.log('FingeringChart not rendering because isOpen is false');
    return null;
  }

  console.log('FingeringChart rendering modal');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={() => {
            console.log('Backdrop clicked, closing modal');
            onClose();
          }}
        />

        {/* Modal */}
        <div className="inline-block w-full max-w-4xl p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <Music className="w-7 h-7 mr-3 text-indigo-600" />
              Flute Fingering Chart
            </h2>
            <button
              onClick={() => {
                console.log('Close button clicked');
                onClose();
              }}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-3 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search for a note (e.g., C#5, Bb4)"
                value={searchNote}
                onChange={(e) => setSearchNote(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <select
              value={selectedOctave}
              onChange={(e) => setSelectedOctave(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Octaves</option>
              <option value="low">Low (First)</option>
              <option value="middle">Middle (Second)</option>
              <option value="high">High (Third)</option>
            </select>
          </div>

          {/* Legend */}
          <div className="bg-blue-50 rounded-lg p-3 mb-6">
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-gray-800 border-2 border-gray-800" />
                <span>Closed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-white border-2 border-gray-400" />
                <span>Open</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-gray-400 border-2 border-gray-800" />
                <span>Half-hole</span>
              </div>
              <div className="text-gray-600 ml-4">
                <Info className="w-4 h-4 inline mr-1" />
                LT=Left Thumb, L1-3=Left fingers, R1-4=Right fingers, RF=Right foot
              </div>
            </div>
          </div>

          {/* Fingering Charts Grid */}
          <div className="max-h-96 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filterNotes().map((item, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                  <div className="text-center mb-3">
                    <div className="text-lg font-bold text-gray-800">{item.note}</div>
                    <div className="text-xs text-gray-500 capitalize">{item.octave} octave</div>
                  </div>
                  <FingeringDisplay fingering={item.fingering} />

                  {/* Alternate fingerings */}
                  {item.alternates.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="text-xs text-gray-600 mb-2">Alternate:</div>
                      {item.alternates.map((alt, altIdx) => (
                        <div key={altIdx}>
                          <div className="text-xs text-gray-500 mb-1">{alt.type}</div>
                          <FingeringDisplay fingering={alt.fingering} isAlternate />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">Quick Tips:</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Use alternate fingerings for smoother transitions in fast passages</li>
              <li>• Third octave notes require more air support and embouchure control</li>
              <li>• Practice fingerings slowly and accurately before increasing speed</li>
              <li>• Some notes have multiple fingerings - experiment to find what works best</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FingeringChart;