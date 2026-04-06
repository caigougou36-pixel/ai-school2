import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Plus, 
  Minus, 
  ChevronRight, 
  ChevronLeft, 
  X,
  Target,
  Zap,
  Star
} from 'lucide-react';
import { Group } from '../App';

interface ScoringPanelProps {
  groups: Group[];
  onAddPoint: (groupId: string, points: number) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const POINT_OPTIONS = [10, 50, 100, 500];

export default function ScoringPanel({ groups, onAddPoint, isOpen, setIsOpen }: ScoringPanelProps) {
  const [selectedPoints, setSelectedPoints] = useState(100);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-end gap-4 pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            className="w-80 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden pointer-events-auto"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 bg-gradient-to-br from-white/5 to-transparent">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-yellow-500/20 text-yellow-500">
                    <Trophy size={18} />
                  </div>
                  <h3 className="font-bold text-sm tracking-tight uppercase">实时积分管理</h3>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-all"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Point Selectors */}
              <div className="grid grid-cols-4 gap-2">
                {POINT_OPTIONS.map(pts => (
                  <button
                    key={pts}
                    onClick={() => setSelectedPoints(pts)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                      selectedPoints === pts 
                        ? 'bg-white text-black border-white shadow-lg shadow-white/10' 
                        : 'bg-white/5 text-white/40 border-white/5 hover:bg-white/10 hover:text-white/80'
                    }`}
                  >
                    +{pts}
                  </button>
                ))}
              </div>
            </div>

            {/* Groups List */}
            <div className="p-4 space-y-2 max-h-[400px] overflow-y-auto scrollbar-hide">
              {groups.map((group) => (
                <div 
                  key={group.id}
                  className="group flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-lg"
                      style={{ backgroundColor: `${group.color}20`, color: group.color }}
                    >
                      {group.icon}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white/90">{group.name}</div>
                      <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{group.englishName}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right mr-2">
                      <div className="text-sm font-bold text-white tracking-tight">{group.score}</div>
                      <div className="text-[8px] text-white/20 uppercase tracking-tighter">Points</div>
                    </div>
                    <button
                      onClick={() => onAddPoint(group.id, selectedPoints)}
                      className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white text-white hover:text-black transition-all flex items-center justify-center shadow-lg active:scale-95"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 bg-white/5 border-t border-white/5">
              <div className="flex items-center justify-between text-[10px] text-white/30 uppercase tracking-widest">
                <span>Total Groups: {groups.length}</span>
                <span className="flex items-center gap-1">
                  <Star size={10} className="text-yellow-500 fill-yellow-500" />
                  Live Scoring
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl pointer-events-auto transition-all duration-500 ${
          isOpen 
            ? 'bg-white text-black rotate-0' 
            : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white rotate-0 hover:shadow-blue-500/40'
        }`}
      >
        {isOpen ? <ChevronRight size={28} /> : <Trophy size={28} />}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-[#0a0a0f] flex items-center justify-center">
            <span className="text-[10px] font-bold">{groups.length}</span>
          </div>
        )}
      </motion.button>
    </div>
  );
}
