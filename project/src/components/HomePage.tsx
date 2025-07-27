import React from 'react';
import { Atom, Zap, Shield, Cpu } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Title Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-green-400 tracking-wider">
          TANTALUM OXIDE (Ta₂O₅)
        </h1>
        <h2 className="text-xl text-orange-400 tracking-widest">
          HIGH-K DIELECTRIC RESEARCH PROJECT
        </h2>
        <div className="w-32 h-1 bg-green-500/50 mx-auto"></div>
      </div>

      {/* Chalkboard-style Content */}
      <div className="bg-slate-900/80 border border-green-500/30 rounded-lg p-8 backdrop-blur-sm">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Left Column - Chemical Properties */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <Atom className="w-6 h-6 text-green-400" />
              <h3 className="text-lg font-bold text-green-400 tracking-wider">
                CHEMICAL PROPERTIES
              </h3>
            </div>
            
            <div className="space-y-4 text-sm">
              <div className="border-l-2 border-green-500/50 pl-4">
                <h4 className="text-green-300 font-semibold">HIGH DIELECTRIC CONSTANT</h4>
                <p className="text-green-200/80 leading-relaxed">
                  Ta₂O₅ exhibits a dielectric constant (κ) of approximately 22-26, 
                  making it excellent for high-k dielectric applications in modern 
                  semiconductor devices.
                </p>
              </div>
              
              <div className="border-l-2 border-orange-500/50 pl-4">
                <h4 className="text-orange-300 font-semibold">CHEMICAL STABILITY</h4>
                <p className="text-green-200/80 leading-relaxed">
                  Exceptional chemical inertness and resistance to acidic/basic 
                  environments, maintaining structural integrity under harsh conditions.
                </p>
              </div>
              
              <div className="border-l-2 border-green-500/50 pl-4">
                <h4 className="text-green-300 font-semibold">THERMAL STABILITY</h4>
                <p className="text-green-200/80 leading-relaxed">
                  Stable at high temperatures (up to 1000°C), making it suitable 
                  for high-temperature processing and operation.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Applications */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <Cpu className="w-6 h-6 text-orange-400" />
              <h3 className="text-lg font-bold text-orange-400 tracking-wider">
                SEMICONDUCTOR APPLICATIONS
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-slate-800/50 border border-green-500/20 rounded p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <h4 className="text-green-300 font-semibold">BARRIER LAYERS</h4>
                </div>
                <p className="text-green-200/80 text-sm leading-relaxed">
                  Acts as an effective diffusion barrier in Cu/low-k interconnects, 
                  preventing copper migration and maintaining device reliability.
                </p>
              </div>
              
              <div className="bg-slate-800/50 border border-orange-500/20 rounded p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="w-4 h-4 text-orange-400" />
                  <h4 className="text-orange-300 font-semibold">GATE DIELECTRICS</h4>
                </div>
                <p className="text-green-200/80 text-sm leading-relaxed">
                  Used in MOSFET gate stacks to reduce leakage current while 
                  maintaining high capacitance for improved device performance.
                </p>
              </div>
              
              <div className="bg-slate-800/50 border border-green-500/20 rounded p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Atom className="w-4 h-4 text-green-400" />
                  <h4 className="text-green-300 font-semibold">CAPACITOR APPLICATIONS</h4>
                </div>
                <p className="text-green-200/80 text-sm leading-relaxed">
                  High-k property enables miniaturization of capacitors while 
                  maintaining or improving electrical performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chemical Formula Display */}
      <div className="bg-slate-900/60 border border-green-500/30 rounded-lg p-6 text-center">
        <h3 className="text-green-400 font-bold mb-4 tracking-wider">MOLECULAR STRUCTURE</h3>
        <div className="text-4xl font-bold text-orange-400 tracking-wider mb-2">
          Ta₂O₅
        </div>
        <p className="text-green-200/80 text-sm">
          TANTALUM PENTOXIDE - ORTHORHOMBIC CRYSTAL STRUCTURE
        </p>
      </div>
    </div>
  );
};

export default HomePage;