import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, PhoneOff, Mic, ChevronRight, ShieldAlert, Zap } from 'lucide-react';

interface OutboundMonitorPageProps {
  onNext: () => void;
}

const OutboundMonitorPage: React.FC<OutboundMonitorPageProps> = ({ onNext }) => {
  const [timeLeft, setTimeLeft] = useState(59);
  const [status, setStatus] = useState<'calling' | 'connected' | 'ended'>('calling');

  useEffect(() => {
    const timer = setTimeout(() => setStatus('connected'), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (status === 'connected' && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setStatus('ended');
    }
  }, [status, timeLeft]);

  return (
    <div className="h-full flex flex-col items-center justify-center px-6 relative overflow-hidden bg-[#0a0a0a]">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-red-500/5 blur-[200px] rounded-full pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="z-10 w-full max-w-5xl bg-white/[0.03] border border-white/10 rounded-[40px] p-12 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>

        <div className="flex justify-between items-start mb-16">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2 text-white/90 flex items-center gap-4">
              DCC 实时外呼监控台
              {status === 'connected' && (
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="px-3 py-1 bg-red-500/20 border border-red-500/40 rounded-full text-xs text-red-400 font-mono uppercase tracking-widest"
                >
                  Live
                </motion.span>
              )}
            </h1>
            <p className="text-white/40 font-mono text-sm uppercase tracking-widest">
              正在呼叫：目标客户-疲惫二胎奶爸...
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs font-mono text-white/40 uppercase tracking-widest mb-1">通话限时强制阻断</p>
            <div className="flex items-center gap-4">
              <div className="w-48 h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "100%" }}
                  animate={{ width: `${(timeLeft / 59) * 100}%` }}
                  className="h-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                />
              </div>
              <span className={`text-2xl font-mono font-bold ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                00:{timeLeft.toString().padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Waveform Visualization */}
        <div className="h-64 flex items-center justify-center gap-1 mb-16">
          {Array.from({ length: 60 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                height: status === 'connected' ? [20, Math.random() * 150 + 20, 20] : 20,
              }}
              transition={{
                repeat: Infinity,
                duration: 0.5 + Math.random() * 0.5,
                ease: "easeInOut",
              }}
              className={`w-1.5 rounded-full ${status === 'connected' ? 'bg-gradient-to-t from-red-500 to-amber-400' : 'bg-white/10'}`}
            />
          ))}
        </div>

        <div className="flex justify-center items-center gap-12">
          <div className="flex flex-col items-center gap-4">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 ${status === 'connected' ? 'bg-white/10 border border-white/20' : 'bg-white/5 border border-white/5'}`}>
              <Mic size={32} className={status === 'connected' ? 'text-white' : 'text-white/20'} />
            </div>
            <span className="text-xs font-mono text-white/40 uppercase tracking-widest">Mute</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={status === 'ended' ? onNext : () => setStatus('ended')}
            className={`w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${status === 'ended' ? 'bg-white text-black' : 'bg-red-500 text-white shadow-red-500/40'}`}
          >
            {status === 'ended' ? <ChevronRight size={40} /> : <PhoneOff size={40} />}
          </motion.button>

          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
              <Zap size={32} className="text-amber-400" />
            </div>
            <span className="text-xs font-mono text-white/40 uppercase tracking-widest">AI Assist</span>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {status === 'ended' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-4 max-w-xl"
          >
            <ShieldAlert size={24} className="text-red-500" />
            <p className="text-red-200 text-sm">系统判定：客户防备心重，当前痛点未激活。正在生成跟进策略...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OutboundMonitorPage;
