import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, TrendingUp, ChevronRight, LayoutDashboard, Zap } from 'lucide-react';

interface FinalScoreboardPageProps {
  onNext: () => void;
}

interface Board {
  id: number;
  name: string;
  score: number;
  color: string;
}

const initialBoards: Board[] = [
  { id: 1, name: "第一董事会", score: 8500, color: "from-cyan-500 to-blue-500" },
  { id: 2, name: "第二董事会", score: 7200, color: "from-blue-500 to-indigo-500" },
  { id: 3, name: "第三董事会", score: 9100, color: "from-indigo-500 to-purple-500" },
  { id: 4, name: "第四董事会", score: 6800, color: "from-purple-500 to-pink-500" },
  { id: 5, name: "第五董事会", score: 7900, color: "from-pink-500 to-rose-500" },
  { id: 6, name: "第六董事会", score: 8200, color: "from-rose-500 to-orange-500" }
];

const FinalScoreboardPage: React.FC<FinalScoreboardPageProps> = ({ onNext }) => {
  const [boards, setBoards] = useState<Board[]>(initialBoards);

  // Simulate real-time score updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBoards(prev => {
        const next = prev.map(b => ({
          ...b,
          score: b.score + Math.floor(Math.random() * 500)
        }));
        return [...next].sort((a, b) => b.score - a.score);
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const maxScore = Math.max(...boards.map(b => b.score));

  return (
    <div className="h-full flex flex-col items-center justify-center px-6 relative overflow-hidden bg-[#050505]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-cyan-500/5 blur-[250px] rounded-full pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold tracking-tight mb-4 text-white/90">未来主理人 - 董事会最终市值排行榜</h1>
        <p className="text-cyan-400/60 font-mono text-sm uppercase tracking-widest flex items-center justify-center gap-2">
          <Zap size={14} /> Correct decisions transformed into store market value
        </p>
      </motion.div>

      <div className="z-10 w-full max-w-5xl space-y-6">
        <AnimatePresence mode="popLayout">
          {boards.map((board, index) => (
            <motion.div
              key={board.id}
              layout
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-20 flex items-center"
            >
              {/* Rank */}
              <div className="w-16 flex justify-center items-center">
                <span className={`text-2xl font-black font-mono ${index === 0 ? 'text-cyan-400' : 'text-white/20'}`}>
                  {index + 1}
                </span>
              </div>

              {/* Bar Container */}
              <div className="flex-1 h-full bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden relative flex items-center px-8 group">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(board.score / maxScore) * 100}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className={`absolute inset-y-0 left-0 bg-gradient-to-r ${board.color} opacity-20 group-hover:opacity-40 transition-opacity`}
                />
                
                <div className="relative z-10 flex justify-between items-center w-full">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${board.color} flex items-center justify-center shadow-lg shadow-black/40`}>
                      <Trophy size={20} className="text-white" />
                    </div>
                    <span className="text-xl font-bold text-white">{board.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <motion.span
                      key={board.score}
                      initial={{ scale: 1.2, color: "#fff" }}
                      animate={{ scale: 1, color: "rgba(255,255,255,0.8)" }}
                      className="text-2xl font-black font-mono"
                    >
                      ¥{board.score.toLocaleString()}
                    </motion.span>
                    <TrendingUp size={20} className="text-green-500" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={onNext}
        className="mt-16 px-10 py-3 bg-white text-black font-bold rounded-full hover:bg-cyan-400 transition-all flex items-center gap-2"
      >
        THE MIC DROP <ChevronRight size={18} />
      </motion.button>
    </div>
  );
};

export default FinalScoreboardPage;
