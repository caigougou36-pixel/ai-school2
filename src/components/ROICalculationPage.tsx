import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, ChevronRight, Zap, ShieldAlert, CheckCircle } from 'lucide-react';

interface ROICalculationPageProps {
  onNext: () => void;
}

const ROICalculationPage: React.FC<ROICalculationPageProps> = ({ onNext }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center px-6 relative overflow-hidden bg-[#050505]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-green-500/5 blur-[250px] rounded-full pointer-events-none"></div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold tracking-tight mb-16 text-white/90"
      >
        ROI 成本利润核算：终极反差暴击
      </motion.h1>

      <div className="z-10 w-full max-w-6xl grid grid-cols-2 gap-12">
        {/* Left: Traditional Strategy */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="bg-white/[0.03] border border-white/10 rounded-[40px] p-12 flex flex-col relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-red-500/40"></div>
          
          <h3 className="text-sm font-mono text-white/40 uppercase tracking-widest mb-10 flex items-center gap-2">
            <ShieldAlert size={14} className="text-red-500" /> 传统竞品策略
          </h3>

          <div className="flex-1 flex flex-col justify-center items-center text-center">
            <p className="text-xl text-white/60 mb-4">疯狂打折，血亏现金</p>
            <div className="flex items-center gap-4 text-red-500 mb-8">
              <span className="text-6xl font-bold">-500</span>
              <TrendingDown size={48} />
            </div>
            <p className="text-sm text-red-400/60 font-mono uppercase tracking-widest">Net Profit: Negative</p>
          </div>

          <div className="mt-10 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl">
            <p className="text-xs text-red-200/80 leading-relaxed italic">
              “打折是慢性自杀。当所有人都降价时，你只是在加速流血。”
            </p>
          </div>
        </motion.div>

        {/* Right: AI Strategy */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="bg-white/[0.03] border border-white/10 rounded-[40px] p-12 flex flex-col relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.8)]"></div>
          
          <h3 className="text-sm font-mono text-green-400 uppercase tracking-widest mb-10 flex items-center gap-2">
            <Zap size={14} /> 我们的 AI 智慧策略
          </h3>

          <div className="flex-1 flex flex-col justify-center items-center text-center">
            <div className="mb-12">
              <p className="text-xs font-mono text-white/40 uppercase tracking-widest mb-2">门店实际支出</p>
              <h4 className="text-4xl font-bold text-white">10 元！</h4>
            </div>

            <div className="relative">
              <p className="text-xs font-mono text-green-400 uppercase tracking-widest mb-2">客户感知价值</p>
              <motion.h4
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-green-400 to-green-600 drop-shadow-[0_0_30px_rgba(34,197,94,0.5)]"
              >
                1200 元！
              </motion.h4>
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute -right-12 top-0 text-green-500"
              >
                <TrendingUp size={64} />
              </motion.div>
            </div>
          </div>

          <div className="mt-10 p-6 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center gap-4">
            <CheckCircle size={24} className="text-green-500" />
            <p className="text-xs text-green-200/80 leading-relaxed font-bold uppercase tracking-widest">
              降维打击：用极低边际成本创造极高客户价值
            </p>
          </div>
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={onNext}
        className="mt-16 px-10 py-3 bg-white text-black font-bold rounded-full hover:bg-green-500 hover:text-white transition-all flex items-center gap-2"
      >
        进入手搓数字人控制台 <ChevronRight size={18} />
      </motion.button>
    </div>
  );
};

export default ROICalculationPage;
