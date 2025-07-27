import React, { useState } from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import RetroGraph from './RetroGraph';

interface DataPoint {
  x: number;
  y: number;
}

interface Instrument {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  graphData: DataPoint[];
  xLabel: string;
  yLabel: string;
}

interface InstrumentPanelProps {
  instrument: Instrument;
}

const InstrumentPanel: React.FC<InstrumentPanelProps> = ({ instrument }) => {
  const [observations, setObservations] = useState('');
  const [customData, setCustomData] = useState('');
  const [isActive, setIsActive] = useState(false);

  const Icon = instrument.icon;

  const handleDataInput = (value: string) => {
    setCustomData(value);
    // You can implement dynamic chart updates here
  };

  return (
    <div className={`
      bg-slate-900/80 border rounded-lg p-4 transition-all duration-300
      ${isActive ? 'border-green-500 shadow-lg shadow-green-500/20' : 'border-green-500/30'}
    `}>
      {/* CRT Monitor Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-500/20 rounded border border-green-500/50 flex items-center justify-center">
            <Icon className="w-4 h-4 text-green-400" />
          </div>
          <div>
            <h3 className="text-green-400 font-bold text-sm tracking-wider">
              {instrument.name}
            </h3>
            <p className="text-green-300/60 text-xs">
              {instrument.description}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
        </div>
      </div>

      {/* CRT Screen */}
      <div 
        className="bg-black border border-green-500/50 rounded p-2 mb-4 cursor-pointer"
        onClick={() => setIsActive(!isActive)}
      >
        <div className="bg-slate-900 rounded p-2 min-h-[200px] relative overflow-hidden">
          {/* Scanlines effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-pulse"></div>
          
          <RetroGraph
            data={instrument.graphData}
            xLabel={instrument.xLabel}
            yLabel={instrument.yLabel}
            color={isActive ? '#22c55e' : '#16a34a'}
          />
        </div>
      </div>

      {/* Control Panel */}
      <div className="space-y-3">
        <div>
          <label className="block text-green-300 text-xs font-semibold mb-1">
            OBSERVATIONS
          </label>
          <textarea
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
            placeholder="Enter experimental observations..."
            className="w-full bg-slate-800/50 border border-green-500/30 rounded px-3 py-2 text-green-200 text-sm placeholder-green-300/50 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500/50"
            rows={2}
          />
        </div>
        
        <div>
          <label className="block text-green-300 text-xs font-semibold mb-1">
            DATA INPUT
          </label>
          <input
            type="text"
            value={customData}
            onChange={(e) => handleDataInput(e.target.value)}
            placeholder="Enter data values (e.g., temp,peak,intensity)"
            className="w-full bg-slate-800/50 border border-green-500/30 rounded px-3 py-2 text-green-200 text-sm placeholder-green-300/50 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500/50"
          />
        </div>
      </div>
    </div>
  );
};

export default InstrumentPanel;