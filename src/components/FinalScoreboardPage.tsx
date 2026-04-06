import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  TrendingUp, 
  ChevronRight, 
  Zap, 
  Star, 
  ShieldCheck, 
  Users, 
  RefreshCw, 
  Download,
  Coins,
  Medal,
  Crown
} from 'lucide-react';
import { Group } from '../App';

interface FinalScoreboardPageProps {
  groups: Group[];
  onRestart: () => void;
}

const FinalScoreboardPage: React.FC<FinalScoreboardPageProps> = ({ groups, onRestart }) => {
  const [showPodium, setShowPodium] = useState(false);
  const [showAwards, setShowAwards] = useState(false);

  // Sort groups by score (market value)
  const sortedGroups = [...groups].sort((a, b) => b.score - a.score);
  
  useEffect(() => {
    const timer1 = setTimeout(() => setShowPodium(true), 500);
    const timer2 = setTimeout(() => setShowAwards(true), 2500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const awards = [
    { title: '最佳策略奖', group: sortedGroups[0]?.name, icon: <Zap className="text-amber-400" />, desc: '提示词评分最高，AI 资产估值拔得头筹' },
    { title: '风控大师奖', group: sortedGroups[1]?.name || sortedGroups[0]?.name, icon: <ShieldCheck className="text-blue-400" />, desc: '视听风控环节预警处理最及时' },
    { title: '获客之星奖', group: sortedGroups[2]?.name || sortedGroups[0]?.name, icon: <Users className="text-green-400" />, desc: '线索清洗转化率全场最高' },
  ];

  return (
    <div className="h-full flex flex-col bg-[#050505] text-white overflow-hidden relative">
      {/* Confetti / Particle Effect Simulation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -20, x: Math.random() * 100 + '%', opacity: 1 }}
            animate={{ y: '110vh', rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3 + Math.random() * 5, ease: "linear", delay: Math.random() * 5 }}
            className="absolute"
          >
            <Coins size={12 + Math.random() * 12} className="text-amber-500/30" />
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <header className="h-24 flex flex-col items-center justify-center z-10 mt-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3 mb-2"
        >
          <Trophy className="text-amber-500" size={32} />
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">未来主理人 · 最终战绩榜</h1>
          <Trophy className="text-amber-500" size={32} />
        </motion.div>
        <p className="text-white/40 font-mono text-xs uppercase tracking-[0.3em]">Future Manager Program - Final Market Value Ranking</p>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-8 gap-12 z-10">
        {/* Podium Section */}
        <div className="flex items-end justify-center gap-6 h-[400px] w-full max-w-4xl">
          {/* 2nd Place */}
          <AnimatePresence>
            {showPodium && sortedGroups[1] && (
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">{sortedGroups[1].icon}</div>
                  <p className="text-lg font-bold text-white/80">{sortedGroups[1].name}</p>
                  <p className="text-xs font-mono text-white/40 uppercase">¥{(sortedGroups[1].score).toLocaleString()}</p>
                </div>
                <div className="w-48 h-48 bg-gradient-to-t from-white/10 to-white/5 border-x border-t border-white/10 rounded-t-3xl flex flex-col items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Medal size={48} className="text-slate-400 mb-2" />
                  <span className="text-4xl font-black text-slate-400/50">2</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 1st Place */}
          <AnimatePresence>
            {showPodium && sortedGroups[0] && (
              <motion.div
                initial={{ opacity: 0, y: 150 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="text-center">
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-4xl mb-2"
                  >
                    👑
                  </motion.div>
                  <p className="text-2xl font-black text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">{sortedGroups[0].name}</p>
                  <p className="text-sm font-mono text-amber-400/60 uppercase">¥{(sortedGroups[0].score).toLocaleString()}</p>
                </div>
                <div className="w-56 h-64 bg-gradient-to-t from-amber-500/20 to-amber-500/5 border-x border-t border-amber-500/30 rounded-t-[40px] flex flex-col items-center justify-center relative overflow-hidden group shadow-[0_0_50px_rgba(245,158,11,0.1)]">
                  <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Crown size={64} className="text-amber-500 mb-2 drop-shadow-lg" />
                  <span className="text-6xl font-black text-amber-500/50">1</span>
                  {/* Market Value Breakdown Tooltip Simulation */}
                  <div className="absolute bottom-4 left-0 right-0 text-center">
                    <p className="text-[8px] text-amber-400/40 uppercase tracking-widest">Market Value Leader</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3rd Place */}
          <AnimatePresence>
            {showPodium && sortedGroups[2] && (
              <motion.div
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">{sortedGroups[2].icon}</div>
                  <p className="text-lg font-bold text-white/80">{sortedGroups[2].name}</p>
                  <p className="text-xs font-mono text-white/40 uppercase">¥{(sortedGroups[2].score).toLocaleString()}</p>
                </div>
                <div className="w-48 h-36 bg-gradient-to-t from-white/10 to-white/5 border-x border-t border-white/10 rounded-t-3xl flex flex-col items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-amber-700/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Medal size={40} className="text-amber-700/60 mb-1" />
                  <span className="text-4xl font-black text-amber-700/30">3</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Awards Section */}
        <div className="w-full max-w-6xl grid grid-cols-3 gap-6">
          <AnimatePresence>
            {showAwards && awards.map((award, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 3 + i * 0.2 }}
                className="p-6 bg-white/[0.03] border border-white/10 rounded-[32px] flex flex-col items-center text-center relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {award.icon}
                </div>
                <h3 className="text-sm font-mono text-white/40 uppercase tracking-widest mb-1">{award.title}</h3>
                <p className="text-xl font-bold text-white mb-2">{award.group}</p>
                <p className="text-xs text-white/40 leading-relaxed">{award.desc}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Actions */}
      <footer className="h-24 border-t border-white/10 bg-black/60 backdrop-blur-xl px-12 flex items-center justify-between z-20">
        <div className="flex gap-4">
          <button 
            onClick={onRestart}
            className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-xs font-bold hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <RefreshCw size={14} /> 重新开始模拟
          </button>
          <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-xs font-bold hover:bg-white/10 transition-all flex items-center gap-2">
            <Download size={14} /> 导出学习报告 (PDF)
          </button>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-white/40 font-mono uppercase tracking-widest">Simulation Complete</span>
            <span className="text-xs font-bold text-green-400">所有数据已存档至教务系统</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center border border-green-500/30">
            <ShieldCheck className="text-green-400" size={24} />
          </div>
        </div>
      </footer>

      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-amber-500/5 blur-[200px] rounded-full pointer-events-none"></div>
    </div>
  );
};

export default FinalScoreboardPage;

