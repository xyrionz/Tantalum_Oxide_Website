import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp, Cpu, Zap, Thermometer, Atom } from 'lucide-react';

interface HomeworkDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const HomeworkDrawer: React.FC<HomeworkDrawerProps> = ({ isOpen, onClose }) => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const researchCards = [
    {
      id: 'applications',
      title: 'SEMICONDUCTOR APPLICATIONS',
      icon: Cpu,
      summary: 'Ta₂O₅ in modern microelectronics',
      content: [
        'High-κ gate dielectric in advanced MOSFETs',
        'Replacement for SiO₂ in sub-45nm technology nodes',
        'Improved gate control with reduced leakage current',
        'Enhanced device performance in logic and memory applications'
      ]
    },
    {
      id: 'barriers',
      title: 'DIFFUSION BARRIER LAYERS',
      icon: Zap,
      summary: 'Preventing metal migration in interconnects',
      content: [
        'Copper diffusion barrier in Cu/low-k interconnects',
        'Prevents electromigration and maintains reliability',
        'Superior barrier properties compared to traditional materials',
        'Stable under high current densities and temperatures'
      ]
    },
    {
      id: 'thermal',
      title: 'TEMPERATURE BEHAVIOR',
      icon: Thermometer,
      summary: 'Thermal stability and phase transitions',
      content: [
        'Stable up to 1000°C in inert atmosphere',
        'Phase transition from amorphous to crystalline at ~600°C',
        'Orthorhombic crystal structure at high temperatures',
        'Minimal thermal expansion coefficient'
      ]
    },
    {
      id: 'electrical',
      title: 'ELECTRICAL PROPERTIES',
      icon: Atom,
      summary: 'Dielectric and electronic characteristics',
      content: [
        'Dielectric constant (κ) of 22-26 at room temperature',
        'Low leakage current density (<10⁻⁸ A/cm²)',
        'High breakdown field strength (>5 MV/cm)',
        'Excellent insulating properties with wide bandgap (~4.0 eV)'
      ]
    }
  ];

  const toggleCard = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <div className={`
      fixed inset-y-0 right-0 w-96 bg-slate-900/95 border-l border-green-500/30 backdrop-blur-sm
      transform transition-transform duration-300 z-50
      ${isOpen ? 'translate-x-0' : 'translate-x-full'}
    `}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-green-500/30">
        <h2 className="text-green-400 font-bold tracking-wider">
          RESEARCH FILES
        </h2>
        <button
          onClick={onClose}
          className="w-8 h-8 bg-red-500/20 border border-red-500/50 rounded flex items-center justify-center hover:bg-red-500/30 transition-colors"
        >
          <X className="w-4 h-4 text-red-400" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-80px)]">
        {researchCards.map((card) => {
          const Icon = card.icon;
          const isExpanded = expandedCard === card.id;
          
          return (
            <div
              key={card.id}
              className={`
                bg-slate-800/50 border border-green-500/30 rounded-lg transition-all duration-300
                ${isExpanded ? 'border-green-500 shadow-lg shadow-green-500/20' : ''}
              `}
            >
              <button
                onClick={() => toggleCard(card.id)}
                className="w-full p-4 text-left flex items-center justify-between hover:bg-green-500/5 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded border border-green-500/50 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-green-400 font-semibold text-sm">
                      {card.title}
                    </h3>
                    <p className="text-green-300/60 text-xs">
                      {card.summary}
                    </p>
                  </div>
                </div>
                <div className="text-green-400">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>
              
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-green-500/20">
                  <ul className="space-y-2 mt-3">
                    {card.content.map((item, index) => (
                      <li key={index} className="text-green-200/80 text-sm flex items-start space-x-2">
                        <span className="text-orange-400 font-bold text-xs mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomeworkDrawer;