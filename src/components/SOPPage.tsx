import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Clock, Mail, ChevronRight, Zap, CheckCircle } from 'lucide-react';

interface SOPPageProps {
  onNext: () => void;
}

const SOPPage: React.FC<SOPPageProps> = ({ onNext }) => {
  const [timeLeft, setTimeLeft] = useState({ h: 71, m: 59, s: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { h, m, s } = prev;
        if (s > 0) s--;
        else if (m > 0) { m--; s = 59; }
        else if (h > 0) { h--; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center px-6 relative overflow-hidden bg-[#0a0a0a]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-red-500/5 blur-[250px] rounded-full pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 w-full max-w-6xl grid grid-cols-2 gap-12"
      >
        {/* Left: Battle Report */}
        <div className="space-y-8">
          <div className="p-10 bg-red-500/10 border border-red-500/20 rounded-[40px] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
            <h2 className="text-sm font-mono text-red-500 uppercase tracking-widest mb-6 flex items-center gap-2">
              <ShieldAlert size={16} /> 战报与标准化 SOP
            </h2>
            <h1 className="text-4xl font-bold tracking-tight mb-6 text-white">系统判定：客户防备心重</h1>
            <p className="text-xl text-white/60 leading-relaxed mb-10">
              当前痛点未激活，直接推销可能导致客户流失。系统已自动调整策略。
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-5 bg-white/5 rounded-2xl border border-white/10">
                <CheckCircle size={20} className="text-green-500" />
                <span className="text-white/80">已标记为“沉睡客户”</span>
              </div>
              <div className="flex items-center gap-4 p-5 bg-white/5 rounded-2xl border border-white/10">
                <CheckCircle size={20} className="text-green-500" />
                <span className="text-white/80">已自动发送“全家露营试驾会”邀请函</span>
              </div>
            </div>
          </div>

          <div className="p-10 bg-white/[0.03] border border-white/10 rounded-[40px]">
            <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Zap size={16} /> SOP 建议
            </h3>
            <p className="text-lg text-white/80 leading-relaxed italic">
              “不要在客户没准备好时强行推销。利用 AI 自动化的社交触达，在 72 小时内通过软性价值点重新激活。”
            </p>
          </div>
        </div>

        {/* Right: Countdown Card */}
        <div className="flex flex-col items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="w-full aspect-[4/5] bg-gradient-to-br from-red-500 to-red-900 rounded-[60px] p-12 shadow-2xl shadow-red-500/20 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center mb-8">
                <Clock size={32} className="text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">沉睡唤醒倒计时</h3>
              <p className="text-white/60 font-mono text-sm uppercase tracking-widest">Re-activation Window</p>
            </div>

            <div className="relative z-10 flex items-center justify-center gap-4">
              <div className="flex flex-col items-center">
                <span className="text-7xl font-bold text-white font-mono">{timeLeft.h.toString().padStart(2, '0')}</span>
                <span className="text-xs text-white/40 uppercase tracking-widest mt-2">Hours</span>
              </div>
              <span className="text-5xl font-bold text-white/20 mb-6">:</span>
              <div className="flex flex-col items-center">
                <span className="text-7xl font-bold text-white font-mono">{timeLeft.m.toString().padStart(2, '0')}</span>
                <span className="text-xs text-white/40 uppercase tracking-widest mt-2">Minutes</span>
              </div>
              <span className="text-5xl font-bold text-white/20 mb-6">:</span>
              <div className="flex flex-col items-center">
                <span className="text-7xl font-bold text-white font-mono">{timeLeft.s.toString().padStart(2, '0')}</span>
                <span className="text-xs text-white/40 uppercase tracking-widest mt-2">Seconds</span>
              </div>
            </div>

            <div className="relative z-10 p-6 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 flex items-center gap-4">
              <Mail size={24} className="text-white" />
              <div>
                <p className="text-white font-bold">试驾邀请函已送达</p>
                <p className="text-white/60 text-xs">预计 72 小时内点击率：12.5%</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={onNext}
        className="mt-16 px-10 py-3 bg-white text-black font-bold rounded-full hover:bg-red-500 hover:text-white transition-all flex items-center gap-2"
      >
        进入展厅客流诊断 <ChevronRight size={18} />
      </motion.button>
    </div>
  );
};

export default SOPPage;
