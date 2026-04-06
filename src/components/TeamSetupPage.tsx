import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Plus, 
  Minus, 
  ChevronRight, 
  Settings, 
  Check, 
  X,
  Zap,
  Shield,
  Target,
  Flame,
  Dna,
  Cpu
} from 'lucide-react';
import { Group, INITIAL_GROUPS } from '../App';

interface TeamSetupPageProps {
  groups: Group[];
  setGroups: (groups: Group[]) => void;
  onNext: () => void;
}

export default function TeamSetupPage({ groups, setGroups, onNext }: TeamSetupPageProps) {
  const [isEditing, setIsEditing] = useState<string | null>(null);

  const addGroup = () => {
    if (groups.length < 6) {
      setGroups([...groups, INITIAL_GROUPS[groups.length]]);
    }
  };

  const removeGroup = (id: string) => {
    if (groups.length > 2) {
      setGroups(groups.filter(g => g.id !== id));
    }
  };

  const updateGroupName = (id: string, name: string) => {
    setGroups(groups.map(g => g.id === id ? { ...g, name } : g));
  };

  return (
    <div className="w-full h-full flex flex-col p-12 overflow-y-auto scrollbar-hide bg-gradient-to-br from-black via-[#0a0a0f] to-black">
      {/* Header */}
      <div className="mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-500">
            <Users size={32} />
          </div>
          <div>
            <h2 className="text-4xl font-black tracking-tighter uppercase">小组结盟</h2>
            <p className="text-white/40 font-mono tracking-widest uppercase">Team Formation & Strategy Setup</p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl text-white/60 text-lg leading-relaxed"
        >
          忘掉班级，你是手握重金的“投资人”。开启“董事会闭门讨论”，用商业嗅觉战胜对手。
        </motion.div>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <AnimatePresence mode="popLayout">
          {groups.map((group, index) => (
            <motion.div
              key={group.id}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-br from-white/10 to-transparent rounded-[2.5rem] blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative h-full p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col items-center text-center transition-all duration-500 group-hover:bg-white/10 group-hover:translate-y-[-8px]">
                
                {/* Remove Button */}
                {groups.length > 2 && (
                  <button
                    onClick={() => removeGroup(group.id)}
                    className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-white/20 hover:bg-red-500/20 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <X size={16} />
                  </button>
                )}

                {/* Team Icon */}
                <div 
                  className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl mb-6 shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                  style={{ backgroundColor: `${group.color}20`, color: group.color, boxShadow: `0 20px 40px -10px ${group.color}40` }}
                >
                  {group.icon}
                </div>

                {/* Team Info */}
                <div className="mb-8 w-full">
                  {isEditing === group.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        autoFocus
                        type="text"
                        value={group.name}
                        onChange={(e) => updateGroupName(group.id, e.target.value)}
                        onBlur={() => setIsEditing(null)}
                        onKeyDown={(e) => e.key === 'Enter' && setIsEditing(null)}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-center text-xl font-bold focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  ) : (
                    <div 
                      onClick={() => setIsEditing(group.id)}
                      className="cursor-pointer group/name"
                    >
                      <h3 className="text-2xl font-black tracking-tight mb-1 flex items-center justify-center gap-2">
                        {group.name}
                        <Settings size={16} className="text-white/20 opacity-0 group-hover/name:opacity-100 transition-opacity" />
                      </h3>
                      <p className="text-sm font-mono text-white/30 uppercase tracking-widest">{group.englishName}</p>
                    </div>
                  )}
                </div>

                {/* Stats / Badges */}
                <div className="flex gap-3 mt-auto">
                  <div className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-widest text-white/40">
                    Level 01
                  </div>
                  <div className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-widest text-white/40">
                    Seed: {group.id}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Add Team Button */}
          {groups.length < 6 && (
            <motion.button
              layout
              onClick={addGroup}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="h-full min-h-[300px] rounded-[2.5rem] border-2 border-dashed border-white/10 hover:border-white/30 hover:bg-white/5 transition-all flex flex-col items-center justify-center gap-4 group"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/20 group-hover:text-white/60 group-hover:scale-110 transition-all duration-500">
                <Plus size={32} />
              </div>
              <span className="text-sm font-bold uppercase tracking-widest text-white/20 group-hover:text-white/60">添加小组</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Action Bar */}
      <div className="mt-auto flex items-center justify-between p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
        <div className="flex items-center gap-8">
          <div className="flex -space-x-3">
            {groups.map((g, i) => (
              <div 
                key={g.id} 
                className="w-10 h-10 rounded-full border-2 border-[#0a0a0f] flex items-center justify-center text-lg z-[10-i]"
                style={{ backgroundColor: g.color }}
              >
                {g.icon}
              </div>
            ))}
          </div>
          <div>
            <div className="text-sm font-bold">已就绪 {groups.length} 个小组</div>
            <div className="text-xs text-white/40 uppercase tracking-widest">Ready for simulation</div>
          </div>
        </div>

        <button
          onClick={onNext}
          className="group relative px-10 py-5 rounded-2xl bg-white text-black font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 overflow-hidden"
        >
          <div className="relative z-10 flex items-center gap-3">
            启动系统
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
        </button>
      </div>
    </div>
  );
}
