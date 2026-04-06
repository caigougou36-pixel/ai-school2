import React from 'react';
import { motion } from 'motion/react';
import { 
  Home, 
  Users, 
  Database, 
  PhoneCall, 
  Eye, 
  Zap, 
  Terminal, 
  Trophy,
  ChevronRight
} from 'lucide-react';
import { PageId } from '../App';

interface SidebarProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
}

const MENU_ITEMS: { id: PageId; label: string; icon: React.ReactNode; color: string }[] = [
  { id: 'welcome', label: '欢迎', icon: <Home size={20} />, color: 'text-blue-400' },
  { id: 'team-setup', label: '小组', icon: <Users size={20} />, color: 'text-purple-400' },
  { id: 'cleaning', label: '清洗', icon: <Database size={20} />, color: 'text-green-400' },
  { id: 'cdp', label: '画像', icon: <Users size={20} />, color: 'text-indigo-400' },
  { id: 'outbound', label: '外呼', icon: <PhoneCall size={20} />, color: 'text-orange-400' },
  { id: 'showroom', label: '展厅', icon: <Eye size={20} />, color: 'text-red-400' },
  { id: 'decision', label: '决策', icon: <Zap size={20} />, color: 'text-yellow-400' },
  { id: 'prompt', label: '提示词', icon: <Terminal size={20} />, color: 'text-cyan-400' },
  { id: 'scoreboard', label: '榜单', icon: <Trophy size={20} />, color: 'text-pink-400' },
];

export default function Sidebar({ currentPage, setCurrentPage }: SidebarProps) {
  return (
    <aside className="w-64 h-screen border-r border-white/10 bg-black/40 backdrop-blur-xl flex flex-col z-40">
      {/* Logo Area */}
      <div className="p-8 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Zap size={18} className="text-white fill-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tighter uppercase">Future Manager</h1>
            <p className="text-[10px] text-white/40 font-mono tracking-widest uppercase">AI 4S Simulation</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-hide">
        {MENU_ITEMS.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-white/10 text-white shadow-inner shadow-white/5' 
                  : 'text-white/40 hover:bg-white/5 hover:text-white/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`transition-colors duration-300 ${isActive ? item.color : 'text-inherit'}`}>
                  {item.icon}
                </div>
                <span className="text-sm font-medium tracking-wide">{item.label}</span>
              </div>
              {isActive && (
                <motion.div
                  layoutId="active-indicator"
                  className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-6 border-t border-white/5 bg-black/20">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10">
          <p className="text-[10px] text-white/30 uppercase tracking-widest mb-2">Current Phase</p>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white/80">
              {MENU_ITEMS.find(i => i.id === currentPage)?.label}
            </span>
            <div className="flex gap-1">
              {[1, 2, 3].map(i => (
                <div key={i} className={`w-1 h-1 rounded-full ${i === 1 ? 'bg-blue-500' : 'bg-white/10'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
