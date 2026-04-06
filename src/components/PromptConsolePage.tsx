import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Cpu, ShieldAlert, Zap, ChevronRight, Loader2, CheckCircle } from 'lucide-react';

interface PromptConsolePageProps {
  onNext: () => void;
}

const PromptConsolePage: React.FC<PromptConsolePageProps> = ({ onNext }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    role: '',
    risk: '',
    pain: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 3000);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center px-6 relative overflow-hidden bg-[#050505]">
      {/* Matrix Code Rain Simulation */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none font-mono text-[10px] text-green-500 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -1000 }}
            animate={{ y: 1000 }}
            transition={{ repeat: Infinity, duration: 10 + Math.random() * 20, ease: "linear" }}
            className="absolute"
            style={{ left: `${i * 5}%` }}
          >
            {Array.from({ length: 50 }).map((_, j) => (
              <div key={j} className="mb-2">
                {Math.random().toString(36).substring(2, 10)}
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="z-10 w-full max-w-4xl bg-black/80 backdrop-blur-3xl border border-green-500/20 rounded-[40px] p-12 relative overflow-hidden shadow-[0_0_50px_rgba(34,197,94,0.1)]"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent"></div>

        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
            <Terminal size={24} className="text-green-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white/90">Prompt 控制台</h1>
            <p className="text-green-500/60 font-mono text-xs uppercase tracking-widest">Digital Human Soul Injection</p>
          </div>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="space-y-4">
              <label className="text-sm font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
                <Cpu size={14} className="text-green-500" /> [角色设定]
              </label>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-green-500/40 font-mono">你的名字是数字销冠，你的风格是</span>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="_____。"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-6 pl-64 text-white focus:border-green-500/50 focus:bg-green-500/5 transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
                <ShieldAlert size={14} className="text-red-500" /> [底线风控]
              </label>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-red-500/40 font-mono">当客户用降价 2 万威胁时，你绝对不能</span>
                <input
                  type="text"
                  required
                  value={formData.risk}
                  onChange={(e) => setFormData({ ...formData, risk: e.target.value })}
                  placeholder="_____。"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-6 pl-72 text-white focus:border-red-500/50 focus:bg-red-500/5 transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
                <Zap size={14} className="text-amber-500" /> [痛点转移]
              </label>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-amber-500/40 font-mono">你必须用话术把客户的注意力转移到</span>
                <input
                  type="text"
                  required
                  value={formData.pain}
                  onChange={(e) => setFormData({ ...formData, pain: e.target.value })}
                  placeholder="_____。"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-6 pl-72 text-white focus:border-amber-500/50 focus:bg-amber-500/5 transition-all outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-6 bg-green-500 text-black font-bold rounded-2xl hover:bg-green-400 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" /> 灵魂代码编译中...
                </>
              ) : (
                <>
                  注入数字人灵魂 <ChevronRight size={20} />
                </>
              )}
            </button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 space-y-8"
          >
            <div className="w-24 h-24 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mx-auto mb-8">
              <CheckCircle size={48} className="text-green-500" />
            </div>
            <h2 className="text-4xl font-bold text-white">灵魂代码编译成功！</h2>
            <p className="text-green-500 font-mono text-lg tracking-widest animate-pulse">
              [STATUS: INJECTED] [TARGET: DIGITAL_HUMAN_V3]
            </p>
            <button
              onClick={onNext}
              className="mt-12 px-12 py-4 bg-white text-black font-bold rounded-full hover:bg-green-500 hover:text-white transition-all flex items-center gap-2 mx-auto"
            >
              查看最终计分看板 <ChevronRight size={18} />
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default PromptConsolePage;
