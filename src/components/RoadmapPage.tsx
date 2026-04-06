import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface RoadmapPageProps {
  onNext: () => void;
  currentStep: number;
}

const steps = [
  { id: 1, name: "数据清洗", color: "from-cyan-500 to-blue-500" },
  { id: 2, name: "外呼防守", color: "from-blue-500 to-indigo-500" },
  { id: 3, name: "视听风控", color: "from-indigo-500 to-purple-500" },
  { id: 4, name: "边际成本", color: "from-purple-500 to-pink-500" },
  { id: 5, name: "克隆灵魂", color: "from-pink-500 to-rose-500" }
];

const RoadmapPage: React.FC<RoadmapPageProps> = ({ onNext, currentStep }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center px-6 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none"></div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold tracking-tight mb-20 text-white/80"
      >
        系统 Loading 与闯关路线图
      </motion.h1>

      <div className="relative w-full max-w-5xl flex items-center justify-between">
        {/* Connecting Line */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/10 -translate-y-1/2 z-0 overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          />
        </div>

        {steps.map((step, idx) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.2, duration: 0.8 }}
            className="relative z-10 flex flex-col items-center gap-6 group"
          >
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} p-[1px] shadow-2xl shadow-blue-500/20`}>
              <div className={`w-full h-full rounded-2xl flex items-center justify-center text-xl font-bold transition-all duration-500 ${idx === currentStep ? 'bg-transparent text-white' : 'bg-[#050505] text-white/40'}`}>
                {step.id}
                {idx === currentStep && (
                  <motion.div
                    layoutId="active-glow"
                    className="absolute inset-0 rounded-2xl bg-white/20 blur-xl"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                )}
              </div>
            </div>
            
            <div className="text-center">
              <p className={`text-sm font-mono tracking-widest uppercase mb-1 transition-colors duration-500 ${idx === currentStep ? 'text-cyan-400' : 'text-white/20'}`}>
                Stage 0{step.id}
              </p>
              <h3 className={`text-xl font-bold transition-colors duration-500 ${idx === currentStep ? 'text-white' : 'text-white/40'}`}>
                {step.name}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={onNext}
        className="mt-24 px-10 py-3 border border-white/10 rounded-full hover:bg-white/5 transition-all flex items-center gap-2 text-white/60 hover:text-white"
      >
        开始第一关 <ChevronRight size={18} />
      </motion.button>
    </div>
  );
};

export default RoadmapPage;
