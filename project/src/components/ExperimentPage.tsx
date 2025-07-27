import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, Thermometer, Beaker, Droplets } from 'lucide-react';
import ImageCarousel from './ImageCarousel';

const ExperimentPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const experimentSteps = [
    {
      title: "DISSOLUTION PROCESS",
      icon: Droplets,
      description: "Tantalum ethoxide dissolved in ethanol at varying concentrations",
      details: [
        "0.15 mol Ta(OEt)₅ in ethanol",
        "0.45 mol Ta(OEt)₅ in ethanol", 
        "0.65 mol Ta(OEt)₅ in ethanol"
      ],
      time: "30 minutes",
      temperature: "Room temperature"
    },
    {
      title: "INITIAL STIRRING",
      icon: Clock,
      description: "Initial stirring to ensure complete dissolution",
      details: [
        "Magnetic stirrer at 300 rpm",
        "Continuous stirring for 45 minutes",
        "Monitor for clarity and homogeneity"
      ],
      time: "45 minutes",
      temperature: "Room temperature"
    },
    {
      title: "ACID ADDITION & EXTENDED STIRRING",
      icon: Beaker,
      description: "Acetic acid addition with extended stirring periods",
      details: [
        "Add glacial acetic acid dropwise",
        "Stirring cycles: 4, 8, 12, 16 hours",
        "Monitor pH and viscosity changes"
      ],
      time: "4-16 hours",
      temperature: "Room temperature"
    },
    {
      title: "SOL-GEL FORMATION",
      icon: Droplets,
      description: "Observation of sol-gel transition",
      details: [
        "Monitor viscosity increase",
        "Color changes from clear to amber",
        "Gel point determination"
      ],
      time: "Variable",
      temperature: "Room temperature"
    },
    {
      title: "SUBSTRATE COATING",
      icon: Beaker,
      description: "Transfer to substrate and drying process",
      details: [
        "Spin coating at 2000 rpm",
        "Uniform film thickness",
        "Air drying for 24 hours"
      ],
      time: "24 hours",
      temperature: "Room temperature"
    },
    {
      title: "ANNEALING PROCESS",
      icon: Thermometer,
      description: "High temperature annealing for crystallization",
      details: [
        "Temperature range: 600°C - 1000°C",
        "Heating rate: 5°C/min",
        "Hold time: 2 hours at target temperature"
      ],
      time: "4-6 hours",
      temperature: "600-1000°C"
    }
  ];

  const labImages = [
  {
    url: "/images/1st.jpeg",
    title: "Raw Materials Setup",
    description: "Tantalum ethoxide, ethanol, and glacial acetic acid arranged for processing.",
  },
  {
    url: "/images/2nd.jpeg",
    title: "Initial Stirring",
    description: "Stirring of Tantalum ethoxide in ethanol for 45 minutes.",
  },
  {
    url: "/images/3rd.jpeg",
    title: "Acetic Acid Addition",
    description: "Acetic acid added to the mixture followed by extended stirring.",
  },
  {
    url: "/images/4th.jpeg",
    title: "Sol-Gel Observation",
    description: "Gel-like consistency observed after reaction — sol-gel phase.",
  },
  {
    url: "/images/5th.jpeg",
    title: "Coating on Substrate",
    description: "Sol transferred and coated onto the substrate before drying.",
  },
  {
    url: "/images/6th.jpeg",
    title: "Annealing Setup",
    description: "Prepared substrates placed in furnace for annealing at high temperature.",
  },
  {
    url: "/images/7th.jpeg",
    title: "Final Samples",
    description: "Final Tantalum oxide-coated samples ready for analysis.",
  },
];


  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-green-400 tracking-wider">
          EXPERIMENTAL PROCEDURE
        </h1>
        <h2 className="text-lg text-orange-400 tracking-widest">
          LAB LOGBOOK - SOL-GEL SYNTHESIS
        </h2>
      </div>

      {/* Image Carousel */}
      <div className="bg-slate-900/80 border border-green-500/30 rounded-lg p-6">
        <h3 className="text-green-400 font-bold mb-4 tracking-wider text-center">
          LABORATORY DOCUMENTATION
        </h3>
        <ImageCarousel images={labImages} />
      </div>

      {/* Experiment Timeline */}
      <div className="bg-slate-900/80 border border-green-500/30 rounded-lg p-6">
        <h3 className="text-green-400 font-bold mb-6 tracking-wider text-center">
          SYNTHESIS PROTOCOL
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          {experimentSteps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            
            return (
              <div
                key={index}
                className={`
                  border rounded-lg p-4 cursor-pointer transition-all duration-300
                  ${isActive 
                    ? 'border-green-500 bg-green-500/10 shadow-lg shadow-green-500/20' 
                    : 'border-green-500/30 bg-slate-800/50 hover:border-green-500/50'
                  }
                `}
                onClick={() => setCurrentStep(index)}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    ${isActive ? 'bg-green-500' : 'bg-green-500/30'}
                  `}>
                    <Icon className="w-4 h-4 text-slate-900" />
                  </div>
                  <div className="text-xs text-orange-400 font-bold">
                    STEP {index + 1}
                  </div>
                </div>
                
                <h4 className="text-green-300 font-semibold text-sm mb-2">
                  {step.title}
                </h4>
                
                <p className="text-green-200/80 text-xs mb-3 leading-relaxed">
                  {step.description}
                </p>
                
                <div className="space-y-2 text-xs">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3 h-3 text-orange-400" />
                    <span className="text-orange-300">{step.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Thermometer className="w-3 h-3 text-orange-400" />
                    <span className="text-orange-300">{step.temperature}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Detailed Step Information */}
        <div className="mt-6 bg-slate-800/50 border border-green-500/20 rounded-lg p-4">
          <h4 className="text-green-400 font-semibold mb-3">
            {experimentSteps[currentStep].title} - DETAILED PROCEDURE
          </h4>
          <ul className="space-y-2">
            {experimentSteps[currentStep].details.map((detail, index) => (
              <li key={index} className="text-green-200/80 text-sm flex items-start space-x-2">
                <span className="text-orange-400 font-bold">•</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExperimentPage;