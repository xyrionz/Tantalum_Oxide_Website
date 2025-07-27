import React, { useState } from 'react';
import { Monitor, BarChart3, Eye, Waves, Calculator } from 'lucide-react';
import RetroGraph from './RetroGraph';
import InstrumentPanel from './InstrumentPanel';

const ResultsPage: React.FC = () => {
  const instruments = [
    {
      id: 'ftir',
      name: 'FTIR SPECTROSCOPY',
      icon: Waves,
      description: 'Fourier Transform Infrared Analysis',
      graphData: [
        { x: 400, y: 85 },
        { x: 600, y: 92 },
        { x: 800, y: 78 },
        { x: 1000, y: 88 },
        { x: 1200, y: 95 },
        { x: 1400, y: 82 },
        { x: 1600, y: 90 },
        { x: 1800, y: 77 },
        { x: 2000, y: 85 }
      ],
      xLabel: 'Wavenumber (cm⁻¹)',
      yLabel: 'Transmittance (%)'
    },
    {
      id: 'uvvis',
      name: 'UV-VIS SPECTROSCOPY',
      icon: Eye,
      description: 'Ultraviolet-Visible Absorption',
      graphData: [
        { x: 200, y: 0.1 },
        { x: 250, y: 0.8 },
        { x: 300, y: 1.2 },
        { x: 350, y: 0.9 },
        { x: 400, y: 0.3 },
        { x: 450, y: 0.1 },
        { x: 500, y: 0.05 },
        { x: 550, y: 0.02 },
        { x: 600, y: 0.01 }
      ],
      xLabel: 'Wavelength (nm)',
      yLabel: 'Absorbance'
    },
    {
      id: 'sem',
      name: 'SEM IMAGING',
      icon: Monitor,
      description: 'Scanning Electron Microscopy',
      graphData: [
        { x: 0, y: 150 },
        { x: 1, y: 145 },
        { x: 2, y: 148 },
        { x: 3, y: 152 },
        { x: 4, y: 149 },
        { x: 5, y: 147 },
        { x: 6, y: 151 },
        { x: 7, y: 146 },
        { x: 8, y: 150 }
      ],
      xLabel: 'Position (μm)',
      yLabel: 'Thickness (nm)'
    },
    {
      id: 'xrd',
      name: 'XRD ANALYSIS',
      icon: BarChart3,
      description: 'X-Ray Diffraction Pattern',
      graphData: [
        { x: 20, y: 100 },
        { x: 25, y: 150 },
        { x: 30, y: 800 },
        { x: 35, y: 200 },
        { x: 40, y: 400 },
        { x: 45, y: 300 },
        { x: 50, y: 600 },
        { x: 55, y: 250 },
        { x: 60, y: 180 }
      ],
      xLabel: '2θ (degrees)',
      yLabel: 'Intensity (counts)'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-green-400 tracking-wider">
          CHARACTERIZATION RESULTS
        </h1>
        <h2 className="text-lg text-orange-400 tracking-widest">
          INSTRUMENT ANALYSIS ROOM
        </h2>
      </div>

      {/* Instrument Panels Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {instruments.map((instrument) => (
          <InstrumentPanel key={instrument.id} instrument={instrument} />
        ))}
      </div>

      {/* Analysis Summary */}
      <div className="bg-slate-900/80 border border-green-500/30 rounded-lg p-6">
        <h3 className="text-green-400 font-bold mb-4 tracking-wider text-center">
          ANALYTICAL SUMMARY
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-orange-400 font-semibold">STRUCTURAL ANALYSIS</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start space-x-2">
                <span className="text-green-400 font-bold">•</span>
                <span className="text-green-200/80">
                  FTIR confirms Ta-O bonds at characteristic frequencies
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-400 font-bold">•</span>
                <span className="text-green-200/80">
                  XRD reveals orthorhombic crystal structure
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-400 font-bold">•</span>
                <span className="text-green-200/80">
                  SEM shows uniform film thickness (~150 nm)
                </span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-orange-400 font-semibold">OPTICAL PROPERTIES</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start space-x-2">
                <span className="text-green-400 font-bold">•</span>
                <span className="text-green-200/80">
                  UV-Vis shows strong absorption in UV region
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-400 font-bold">•</span>
                <span className="text-green-200/80">
                  Estimated band gap: ~4.0 eV
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-400 font-bold">•</span>
                <span className="text-green-200/80">
                  High transparency in visible region
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;