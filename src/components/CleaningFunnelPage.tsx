import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShieldAlert, ShieldCheck, Star, ChevronRight } from 'lucide-react';

interface CleaningFunnelPageProps {
  onNext: () => void;
}

const leads = [
  { id: 1, text: "线索01: 刚摇号成功，想看SUV", score: 1, label: "红海常规线索" },
  { id: 2, text: "线索02: 刚摇号，关注新能源", score: 1, label: "红海常规线索" },
  { id: 3, text: "线索03: 换新能源，预算20万", score: 1, label: "红海常规线索" },
  { id: 4, text: "线索04: 修后视镜，咨询配件", score: 0, label: "噪音/水军 - 已销毁" },
  { id: 5, text: "线索05: 车机卡、想露营、要智驾", score: 3, label: "蓝海高净值线索 - 极度稀缺" },
  { id: 6, text: "线索06: 炒股，咨询理财", score: 0, label: "噪音/水军 - 已销毁" },
  { id: 7, text: "线索07: 刚需代步，看二手车", score: 1, label: "红海常规线索" },
  { id: 8, text: "线索08: 咨询保险，非购车", score: 0, label: "噪音/水军 - 已销毁" },
  { id: 9, text: "线索09: 二胎家庭，空间需求大", score: 3, label: "蓝海高净值线索 - 极度稀缺" },
  { id: 10, text: "线索10: 刚拿驾照，看练手车", score: 1, label: "红海常规线索" },
  { id: 11, text: "线索11: 咨询充电桩安装", score: 0, label: "噪音/水军 - 已销毁" },
  { id: 12, text: "线索12: 关注智驾，想试驾", score: 3, label: "蓝海高净值线索 - 极度稀缺" },
  { id: 13, text: "线索13: 咨询分期方案", score: 1, label: "红海常规线索" },
  { id: 14, text: "线索14: 咨询保养，非购车", score: 0, label: "噪音/水军 - 已销毁" },
  { id: 15, text: "线索15: 关注露营，看MPV", score: 3, label: "蓝海高净值线索 - 极度稀缺" }
];

const CleaningFunnelPage: React.FC<CleaningFunnelPageProps> = ({ onNext }) => {
  const [activeLeads, setActiveLeads] = useState<typeof leads>([]);
  const [scanning, setScanning] = useState(false);
  const [processedLeads, setProcessedLeads] = useState<typeof leads>([]);
  const [currentLeadIndex, setCurrentLeadIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentLeadIndex < leads.length) {
        setActiveLeads(prev => [...prev, leads[currentLeadIndex]]);
        setCurrentLeadIndex(prev => prev + 1);
      } else {
        clearInterval(timer);
        setTimeout(() => setScanning(true), 1000);
      }
    }, 200);
    return () => clearInterval(timer);
  }, [currentLeadIndex]);

  useEffect(() => {
    if (scanning) {
      const processTimer = setInterval(() => {
        if (activeLeads.length > 0) {
          const lead = activeLeads[0];
          setProcessedLeads(prev => [...prev, lead]);
          setActiveLeads(prev => prev.slice(1));
        } else {
          clearInterval(processTimer);
        }
      }, 500);
      return () => clearInterval(processTimer);
    }
  }, [scanning, activeLeads]);

  return (
    <div className="h-full flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-cyan-500/5 blur-[200px] rounded-full"></div>
      </div>

      <div className="z-10 w-full max-w-6xl grid grid-cols-3 gap-12 h-[70vh]">
        {/* Left: Regular Leads Pool */}
        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 flex flex-col">
          <h3 className="text-sm font-mono text-blue-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <ShieldCheck size={14} /> 红海常规线索
          </h3>
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
            {processedLeads.filter(l => l.score === 1).map(lead => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-sm text-blue-200"
              >
                {lead.text}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Center: Scanning Funnel */}
        <div className="relative flex flex-col items-center">
          <h2 className="text-2xl font-bold tracking-tight mb-8 text-white/90">AI 语义清洗漏斗</h2>
          
          <div className="flex-1 w-full bg-white/[0.03] border border-white/10 rounded-3xl relative overflow-hidden flex flex-col items-center justify-center">
            {/* Scanning Line */}
            {scanning && (
              <motion.div
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                className="absolute left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)] z-20"
              />
            )}

            <AnimatePresence>
              {activeLeads.map((lead, idx) => (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
                  className="absolute top-1/2 -translate-y-1/2 p-6 bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl text-center w-4/5 shadow-2xl"
                >
                  <p className="text-lg font-medium text-white mb-2">{lead.text}</p>
                  <div className="flex justify-center gap-2">
                    <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] uppercase tracking-widest text-white/60">Analyzing...</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {activeLeads.length === 0 && !scanning && (
              <div className="text-white/20 font-mono text-sm uppercase tracking-widest animate-pulse">
                Waiting for leads...
              </div>
            )}
          </div>
        </div>

        {/* Right: High Value Leads */}
        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 flex flex-col">
          <h3 className="text-sm font-mono text-amber-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Star size={14} fill="currentColor" /> 蓝海高净值线索
          </h3>
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
            {processedLeads.filter(l => l.score === 3).map(lead => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                className="p-5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-sm text-amber-200 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <p className="relative z-10 font-bold">{lead.text}</p>
                <p className="relative z-10 text-[10px] mt-2 text-amber-400/60 uppercase tracking-widest">Priority: High</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5 }}
        onClick={onNext}
        className="mt-16 px-10 py-3 bg-cyan-500 text-black font-bold rounded-full hover:bg-cyan-400 transition-all flex items-center gap-2"
      >
        生成蓝海客户画像 <ChevronRight size={18} />
      </motion.button>

      {/* Destroyed Leads Animation (Bottom) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 opacity-20">
        {processedLeads.filter(l => l.score === 0).slice(-5).map(lead => (
          <motion.div
            key={lead.id}
            initial={{ opacity: 0.5, y: 0 }}
            animate={{ opacity: 0, y: 50 }}
            className="text-[10px] text-red-500 font-mono border border-red-500/20 px-2 py-1 rounded"
          >
            [DESTROYED] {lead.text.substring(0, 10)}...
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CleaningFunnelPage;
