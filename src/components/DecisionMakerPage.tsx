import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, CheckCircle, ChevronRight, Zap, ShieldAlert, Users } from 'lucide-react';

interface DecisionMakerPageProps {
  onNext: () => void;
}

const DecisionMakerPage: React.FC<DecisionMakerPageProps> = ({ onNext }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const options = [
    { id: 'A', text: "监控销售是否过早报底价（防止利润流血）", correct: true },
    { id: 'B', text: "监控销售有没有跟客户聊家常（抓摸鱼）", correct: false }
  ];

  const handleOptionSelect = (id: string) => {
    setSelectedOption(id);
    setShowResult(true);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center px-6 relative overflow-hidden bg-[#050505]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-cyan-500/5 blur-[250px] rounded-full pointer-events-none"></div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold tracking-tight mb-16 text-white/90"
      >
        客流验证与老板决策器
      </motion.h1>

      <div className="z-10 w-full max-w-6xl grid grid-cols-2 gap-12">
        {/* Left: Video Simulation */}
        <div className="relative aspect-video bg-white/[0.03] border border-white/10 rounded-[40px] overflow-hidden group">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play size={32} className="text-white ml-1" />
            </div>
          </div>
          
          {/* AI Tracking Simulation Overlay */}
          <div className="absolute inset-0 p-8 pointer-events-none">
            <div className="w-32 h-48 border-2 border-green-500/50 rounded-lg absolute top-20 left-40">
              <span className="absolute -top-6 left-0 bg-green-500 text-black text-[10px] font-bold px-2 py-0.5 rounded uppercase">Customer #01</span>
              <div className="absolute bottom-2 left-2 text-[8px] text-green-400 font-mono">Dwell: 12m 45s</div>
            </div>
            <div className="w-24 h-40 border-2 border-blue-500/50 rounded-lg absolute top-40 left-80">
              <span className="absolute -top-6 left-0 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">Sales #04</span>
              <div className="absolute bottom-2 left-2 text-[8px] text-blue-400 font-mono">Active Talk</div>
            </div>
          </div>

          <div className="absolute bottom-8 left-8 right-8 p-4 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10">
            <p className="text-xs text-white/60 font-mono uppercase tracking-widest mb-1">AI 视觉实时追踪</p>
            <p className="text-sm text-white">验证客流真实性，驳斥店长“无效客流”谎言。</p>
          </div>
        </div>

        {/* Right: Interactive Quiz */}
        <div className="flex flex-col justify-center">
          <div className="p-10 bg-white/[0.03] border border-white/10 rounded-[40px] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500"></div>
            
            <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-widest mb-8 flex items-center gap-2">
              <Zap size={16} /> 互动决策环节
            </h3>
            
            <p className="text-2xl font-bold text-white mb-10 leading-tight">
              作为投资人，你要求 AI 铭牌重点监控哪个指标？
            </p>

            <div className="space-y-4">
              {options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  disabled={showResult}
                  className={`w-full p-6 rounded-3xl border text-left transition-all duration-300 flex items-center justify-between group ${
                    selectedOption === option.id
                      ? option.correct
                        ? 'bg-green-500/10 border-green-500/50'
                        : 'bg-red-500/10 border-red-500/50'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-colors ${
                      selectedOption === option.id
                        ? option.correct ? 'bg-green-500 text-black' : 'bg-red-500 text-white'
                        : 'bg-white/10 text-white/40 group-hover:text-white'
                    }`}>
                      {option.id}
                    </span>
                    <span className={`text-lg font-medium ${
                      selectedOption === option.id ? 'text-white' : 'text-white/60 group-hover:text-white'
                    }`}>
                      {option.text}
                    </span>
                  </div>
                  {selectedOption === option.id && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      {option.correct ? <CheckCircle className="text-green-500" /> : <ShieldAlert className="text-red-500" />}
                    </motion.div>
                  )}
                </button>
              ))}
            </div>

            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-10 p-6 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl"
                >
                  <p className="text-cyan-200 text-sm leading-relaxed">
                    <span className="font-bold">解析：</span>
                    {selectedOption === 'A' 
                      ? "正确！监控底价报出时机是保护门店利润的关键。AI 拾音能精准捕捉价格博弈点。"
                      : "错误。家常聊天是建立信任的过程，不应被视为摸鱼。重点应放在商业转化节点上。"}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={onNext}
        className="mt-16 px-10 py-3 bg-white text-black font-bold rounded-full hover:bg-cyan-400 transition-all flex items-center gap-2"
      >
        进入千人千面营销 <ChevronRight size={18} />
      </motion.button>
    </div>
  );
};

export default DecisionMakerPage;
