import React from 'react';
import { Volume2 } from 'lucide-react';
import InlineMetronome from './InlineMetronome';

const CompactMetronome = () => {
  const [tempo, setTempo] = React.useState(120);

  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 shadow-md">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-800 flex items-center">
          <Volume2 className="w-4 h-4 mr-2" />
          General Metronome
        </h3>
        <span className="text-xs text-gray-600">For exercises without tempo marks</span>
      </div>
      <InlineMetronome
        tempo={tempo}
        setTempo={setTempo}
        tempoRange={{ min: 40, max: 208, suggested: 120 }}
        itemId="global"
      />
    </div>
  );
};

export default CompactMetronome;