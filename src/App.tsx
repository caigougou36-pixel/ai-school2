/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight,
  ChevronLeft,
  LayoutDashboard,
  Users,
  Home,
  Database,
  PhoneCall,
  Eye,
  Zap,
  Terminal,
  Trophy,
  Settings,
  Plus,
  Minus,
  X,
  Maximize2,
  Volume2
} from 'lucide-react';

// Components
import Sidebar from './components/Sidebar';
import ScoringPanel from './components/ScoringPanel';

// Pages
import WelcomePage from './components/WelcomePage';
import TeamSetupPage from './components/TeamSetupPage';
import CleaningFunnelPage from './components/CleaningFunnelPage';
import OutboundMonitorPage from './components/OutboundMonitorPage';
import ShowroomRadarPage from './components/ShowroomRadarPage';
import DecisionMakerPage from './components/DecisionMakerPage';
import PromptConsolePage from './components/PromptConsolePage';
import FinalScoreboardPage from './components/FinalScoreboardPage';

export type PageId = 
  | 'welcome' 
  | 'team-setup'
  | 'cleaning' 
  | 'outbound' 
  | 'showroom' 
  | 'decision' 
  | 'prompt' 
  | 'scoreboard';

export interface Group {
  id: string;
  name: string;
  englishName: string;
  color: string;
  score: number;
  icon: string;
}

export const INITIAL_GROUPS: Group[] = [
  { id: '1', name: '涡轮', englishName: 'Turbo', color: '#00d4ff', score: 0, icon: '🌀' },
  { id: '2', name: '引擎', englishName: 'Engine', color: '#ff4757', score: 0, icon: '⚙️' },
  { id: '3', name: '极光', englishName: 'Aurora', color: '#00e5a0', score: 0, icon: '✨' },
  { id: '4', name: '脉冲', englishName: 'Pulse', color: '#ff6b35', score: 0, icon: '⚡' },
  { id: '5', name: '量子', englishName: 'Quantum', color: '#7b61ff', score: 0, icon: '⚛️' },
  { id: '6', name: '矩阵', englishName: 'Matrix', color: '#ffd32a', score: 0, icon: '🔳' },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('welcome');
  const [groups, setGroups] = useState<Group[]>(INITIAL_GROUPS.slice(0, 4));
  const [isScoringPanelOpen, setIsScoringPanelOpen] = useState(false);

  const handleAddPoint = (groupId: string, points: number) => {
    setGroups(prev => prev.map(g => g.id === groupId ? { ...g, score: g.score + points } : g));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'welcome': return <WelcomePage onNext={() => setCurrentPage('team-setup')} />;
      case 'team-setup': return <TeamSetupPage groups={groups} setGroups={setGroups} onNext={() => setCurrentPage('cleaning')} />;
      case 'cleaning': return <CleaningFunnelPage onNext={() => setCurrentPage('outbound')} />;
      case 'outbound': return <OutboundMonitorPage onNext={() => setCurrentPage('showroom')} />;
      case 'showroom': return <ShowroomRadarPage onNext={() => setCurrentPage('decision')} />;
      case 'decision': return <DecisionMakerPage onNext={() => setCurrentPage('prompt')} />;
      case 'prompt': return <PromptConsolePage onNext={() => setCurrentPage('scoreboard')} />;
      case 'scoreboard': return <FinalScoreboardPage groups={groups} onRestart={() => {
        setGroups(INITIAL_GROUPS.slice(0, 4));
        setCurrentPage('welcome');
      }} />;
      default: return <WelcomePage onNext={() => setCurrentPage('team-setup')} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#0a0a0f] text-white font-sans overflow-hidden">
      {/* Sidebar */}
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden flex flex-col">
        {/* Top Bar for Global Controls */}
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-black/20 backdrop-blur-md z-30">
          <div className="flex items-center gap-4">
            <span className="text-white/40 text-xs font-mono uppercase tracking-widest">System Status:</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs font-medium text-green-500/80 uppercase">Operational</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="text-white/40 hover:text-white transition-colors">
              <Volume2 size={18} />
            </button>
            <button className="text-white/40 hover:text-white transition-colors">
              <Maximize2 size={18} />
            </button>
            <button className="text-white/40 hover:text-white transition-colors">
              <Settings size={18} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Floating Scoring Panel */}
        <ScoringPanel 
          groups={groups} 
          onAddPoint={handleAddPoint} 
          isOpen={isScoringPanelOpen} 
          setIsOpen={setIsScoringPanelOpen} 
        />
      </main>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-500/5 blur-[120px] rounded-full"></div>
      </div>
    </div>
  );
}
