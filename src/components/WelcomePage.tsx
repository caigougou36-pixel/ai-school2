import React from 'react';
import { motion } from 'motion/react';
import { Zap } from 'lucide-react';

interface WelcomePageProps {
  onNext: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onNext }) => {
  const rules = [
    "身份确认，自由结盟：忘掉班级，你是手握重金的“投资人”。",
    "小组讨论，集体决策：开启“董事会闭门讨论”，用商业嗅觉战胜对手。",
    "赚取利润，赢取大奖：今天没有对错，只有盈亏。正确决策转化为门店市值。"
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center relative px-6 text-center">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10"
      >
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
          未来主理人计划
        </h1>
        <p className="text-xl md:text-2xl text-cyan-400/80 font-light tracking-[0.3em] uppercase mb-16">
          用 AI 开一家汽车智慧 4S 门店
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="max-w-3xl w-full bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-3xl p-10 relative overflow-hidden group"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
        
        <h2 className="text-sm font-mono text-cyan-400 uppercase tracking-widest mb-8 flex items-center justify-center gap-2">
          <Zap size={14} /> 系统即将启动，请查收您的【沙盘生存法则】
        </h2>

        <div className="space-y-6 text-left">
          {rules.map((rule, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 + idx * 0.5, duration: 0.8 }}
              className="flex gap-4 items-start"
            >
              <span className="text-cyan-500 font-mono text-lg">0{idx + 1}</span>
              <p className="text-lg text-white/80 leading-relaxed">{rule}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
        onClick={onNext}
        className="mt-16 px-12 py-4 bg-white text-black font-bold rounded-full hover:bg-cyan-400 hover:scale-105 transition-all active:scale-95 group flex items-center gap-2"
      >
        进入系统
        <motion.span
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          →
        </motion.span>
      </motion.button>
    </div>
  );
};

export default WelcomePage;
