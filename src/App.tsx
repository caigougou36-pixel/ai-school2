/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight,
  ChevronLeft,
  LayoutDashboard
} from 'lucide-react';

// Pages
import WelcomePage from './components/WelcomePage';
import RoadmapPage from './components/RoadmapPage';
import CleaningFunnelPage from './components/CleaningFunnelPage';
import CDPProfilePage from './components/CDPProfilePage';
import OutboundMonitorPage from './components/OutboundMonitorPage';
import SOPPage from './components/SOPPage';
import ShowroomRadarPage from './components/ShowroomRadarPage';
import DecisionMakerPage from './components/DecisionMakerPage';
import ResourceMatchingPage from './components/ResourceMatchingPage';
import ROICalculationPage from './components/ROICalculationPage';
import PromptConsolePage from './components/PromptConsolePage';
import FinalScoreboardPage from './components/FinalScoreboardPage';
import MicDropPage from './components/MicDropPage';

export type PageId = 
  | 'welcome' 
  | 'roadmap' 
  | 'cleaning' 
  | 'cdp' 
  | 'outbound' 
  | 'sop' 
  | 'showroom' 
  | 'decision' 
  | 'matching' 
  | 'roi' 
  | 'prompt' 
  | 'scoreboard' 
  | 'micdrop';

const PAGES: PageId[] = [
  'welcome', 'roadmap', 'cleaning', 'cdp', 'outbound', 'sop', 'showroom', 'decision', 'matching', 'roi', 'prompt', 'scoreboard', 'micdrop'
];

export default function App() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [showNav, setShowNav] = useState(false);

  const currentPage = PAGES[currentPageIndex];

  const nextPage = () => {
    if (currentPageIndex < PAGES.length - 1) {
      setCurrentPageIndex(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
    }
  };

  const goToPage = (index: number) => {
    setCurrentPageIndex(index);
    setShowNav(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextPage();
      if (e.key === 'ArrowLeft') prevPage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPageIndex]);

  const renderPage = () => {
    switch (currentPage) {
      case 'welcome': return <WelcomePage onNext={nextPage} />;
      case 'roadmap': return <RoadmapPage onNext={nextPage} currentStep={0} />;
      case 'cleaning': return <CleaningFunnelPage onNext={nextPage} />;
      case 'cdp': return <CDPProfilePage onNext={nextPage} />;
      case 'outbound': return <OutboundMonitorPage onNext={nextPage} />;
      case 'sop': return <SOPPage onNext={nextPage} />;
      case 'showroom': return <ShowroomRadarPage onNext={nextPage} />;
      case 'decision': return <DecisionMakerPage onNext={nextPage} />;
      case 'matching': return <ResourceMatchingPage onNext={nextPage} />;
      case 'roi': return <ROICalculationPage onNext={nextPage} />;
      case 'prompt': return <PromptConsolePage onNext={nextPage} />;
      case 'scoreboard': return <FinalScoreboardPage onNext={nextPage} />;
      case 'micdrop': return <MicDropPage />;
      default: return <WelcomePage onNext={nextPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30 overflow-hidden relative">
      {/* Background Noise/Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      {/* Global Navigation Overlay (Hidden by default, triggered by hover or key) */}
      <div 
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${showNav ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}
        onMouseEnter={() => setShowNav(true)}
      >
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center gap-4 shadow-2xl">
          <button onClick={prevPage} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-2">
            {PAGES.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => goToPage(idx)}
                className={`w-2 h-2 rounded-full transition-all ${idx === currentPageIndex ? 'bg-cyan-400 w-6' : 'bg-white/20 hover:bg-white/40'}`}
              />
            ))}
          </div>
          <button onClick={nextPage} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Navigation Trigger Area */}
      <div 
        className="fixed top-0 left-0 right-0 h-16 z-40" 
        onMouseEnter={() => setShowNav(true)}
        onMouseLeave={() => setShowNav(false)}
      />

      {/* Page Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="h-screen w-full"
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>

      {/* Footer Branding */}
      <div className="fixed bottom-6 right-8 flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity pointer-events-none">
        <LayoutDashboard size={16} className="text-cyan-400" />
        <span className="text-[10px] tracking-[0.2em] font-mono uppercase">Future Manager System v3.1</span>
      </div>
    </div>
  );
}
