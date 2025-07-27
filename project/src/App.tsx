import React, { useState } from 'react';
import { Beaker, FlaskConical, Microscope, BarChart3, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import HomePage from './components/HomePage';
import ExperimentPage from './components/ExperimentPage';
import ResultsPage from './components/ResultsPage';
import HomeworkDrawer from './components/HomeworkDrawer';
import RetroNavigation from './components/RetroNavigation';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const pages = [
    { id: 'home', title: 'Home', icon: FlaskConical, component: HomePage },
    { id: 'experiment', title: 'Experiment', icon: Beaker, component: ExperimentPage },
    { id: 'results', title: 'Results', icon: BarChart3, component: ResultsPage },
  ];

  const CurrentComponent = pages.find(p => p.id === currentPage)?.component || HomePage;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-green-400 font-mono overflow-hidden">
      {/* Retro Grid Background */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-green-500/30 bg-slate-900/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/50">
                <Microscope className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-green-400 tracking-wider">
                  TANTALUM OXIDE LABORATORY
                </h1>
                <p className="text-xs text-green-300/70 tracking-widest">
                  HIGH-K DIELECTRIC RESEARCH FACILITY
                </p>
              </div>
            </div>
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="flex items-center space-x-2 px-4 py-2 bg-orange-600/20 border border-orange-500/50 rounded hover:bg-orange-600/30 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span className="text-sm">RESEARCH FILES</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <RetroNavigation
        pages={pages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        <CurrentComponent />
      </main>

      {/* Homework Drawer */}
      <HomeworkDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Retro CRT Scanlines Effect */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/10 to-transparent animate-pulse"></div>
      </div>
    </div>
  );
}

export default App;