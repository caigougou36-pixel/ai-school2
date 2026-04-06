import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Zap, ChevronRight, LayoutDashboard, Database, CheckCircle } from 'lucide-react';

interface ResourceMatchingPageProps {
  onNext: () => void;
}

const customers = [
  { id: 'c1', label: '越野老炮', icon: '🏔️' },
  { id: 'c2', label: '二胎妈妈', icon: '🤱' },
  { id: 'c3', label: '科技尊客', icon: '🤖' }
];

const resources = [
  { id: 'r1', label: '闲置洗车机 (耗材成本10元)', icon: '🚿' },
  { id: 'r2', label: 'V3.0车机内测包 (纯软件0元)', icon: '💿' },
  { id: 'r3', label: '技师空闲工时 (0元)', icon: '🛠️' }
];

const ResourceMatchingPage: React.FC<ResourceMatchingPageProps> = ({ onNext }) => {
  const [connections, setConnections] = useState<Record<string, string>>({});
  const [activeCustomer, setActiveCustomer] = useState<string | null>(null);

  const handleCustomerClick = (id: string) => {
    setActiveCustomer(id);
  };

  const handleResourceClick = (id: string) => {
    if (activeCustomer) {
      setConnections(prev => ({ ...prev, [activeCustomer]: id }));
      setActiveCustomer(null);
    }
  };

  const isMatched = Object.keys(connections).length === customers.length;

  return (
    <div className="h-full flex flex-col items-center justify-center px-6 relative overflow-hidden bg-[#050505]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-purple-500/5 blur-[250px] rounded-full pointer-events-none"></div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold tracking-tight mb-16 text-white/90"
      >
        CDP 资源匹配工作台
      </motion.h1>

      <div className="z-10 w-full max-w-5xl grid grid-cols-2 gap-24 relative">
        {/* Left Column: Customer Tags */}
        <div className="space-y-6">
          <h3 className="text-sm font-mono text-white/40 uppercase tracking-widest mb-10 flex items-center gap-2">
            <Users size={14} className="text-purple-400" /> 客户标签 (CDP)
          </h3>
          {customers.map((c) => (
            <motion.button
              key={c.id}
              onClick={() => handleCustomerClick(c.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full p-8 rounded-[32px] border transition-all duration-300 flex items-center justify-between group relative overflow-hidden ${
                activeCustomer === c.id 
                  ? 'bg-purple-500/20 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.3)]' 
                  : connections[c.id] 
                    ? 'bg-green-500/10 border-green-500/30' 
                    : 'bg-white/[0.03] border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-6">
                <span className="text-4xl">{c.icon}</span>
                <span className={`text-xl font-bold ${activeCustomer === c.id ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                  {c.label}
                </span>
              </div>
              {connections[c.id] && <CheckCircle size={24} className="text-green-500" />}
            </motion.button>
          ))}
        </div>

        {/* Right Column: Resource Library */}
        <div className="space-y-6">
          <h3 className="text-sm font-mono text-white/40 uppercase tracking-widest mb-10 flex items-center gap-2 text-right justify-end">
            闲置资源库 (CDP) <Database size={14} className="text-cyan-400" />
          </h3>
          {resources.map((r) => (
            <motion.button
              key={r.id}
              onClick={() => handleResourceClick(r.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full p-8 rounded-[32px] border transition-all duration-300 flex items-center justify-between group relative overflow-hidden ${
                Object.values(connections).includes(r.id)
                  ? 'bg-cyan-500/10 border-cyan-500/30'
                  : 'bg-white/[0.03] border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-6">
                <span className="text-4xl">{r.icon}</span>
                <span className={`text-xl font-bold ${Object.values(connections).includes(r.id) ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                  {r.label}
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Connection Lines (Simplified SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
          {Object.entries(connections).map(([cId, rId]) => {
            const cIdx = customers.findIndex(c => c.id === cId);
            const rIdx = resources.findIndex(r => r.id === rId);
            const startY = 100 + cIdx * 120;
            const endY = 100 + rIdx * 120;
            return (
              <motion.path
                key={`${cId}-${rId}`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                d={`M 400 ${startY} C 500 ${startY}, 500 ${endY}, 600 ${endY}`}
                stroke="rgba(168, 85, 247, 0.4)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="10 5"
              />
            );
          })}
        </svg>
      </div>

      <div className="mt-16 text-center">
        <p className="text-sm text-white/40 font-mono uppercase tracking-widest mb-4">
          老板决策：把对的东西送给对的人
        </p>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={onNext}
          disabled={!isMatched}
          className={`px-10 py-3 font-bold rounded-full transition-all flex items-center gap-2 ${
            isMatched 
              ? 'bg-purple-500 text-white hover:bg-purple-400' 
              : 'bg-white/5 text-white/20 border border-white/10 cursor-not-allowed'
          }`}
        >
          查看 ROI 成本利润核算 <ChevronRight size={18} />
        </motion.button>
      </div>
    </div>
  );
};

export default ResourceMatchingPage;
