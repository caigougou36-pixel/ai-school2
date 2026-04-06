import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  Zap, 
  ShieldAlert, 
  ChevronRight, 
  Radar, 
  Target, 
  BarChart3, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  ArrowRightLeft,
  Cpu,
  Battery,
  DollarSign,
  RefreshCw
} from 'lucide-react';
import { 
  Radar as RechartsRadar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer 
} from 'recharts';

interface DecisionMakerPageProps {
  onNext: () => void;
}

const COMPETITOR_DATA = [
  { subject: '续航', A: 120, B: 110, fullMark: 150 },
  { subject: '价格', A: 98, B: 130, fullMark: 150 },
  { subject: '智驾', A: 86, B: 140, fullMark: 150 },
  { subject: '补能', A: 99, B: 80, fullMark: 150 },
  { subject: '空间', A: 130, B: 90, fullMark: 150 },
  { subject: '内饰', A: 140, B: 70, fullMark: 150 },
];

const DecisionMakerPage: React.FC<DecisionMakerPageProps> = ({ onNext }) => {
  const [isDispatching, setIsDispatching] = useState(false);
  const [dispatched, setDispatched] = useState(false);
  const [activeStrategy, setActiveStrategy] = useState(0);

  const strategies = [
    {
      title: "限时万元置换补贴",
      trigger: "针对特斯拉 Model 3 降价 1.5 万",
      content: "针对关注特斯拉的客户，主动推送‘置换补贴+终身质保’组合拳，对冲竞品价格优势。",
      impact: "+15% 转化率提升",
      icon: <DollarSign className="text-amber-400" size={20} />
    },
    {
      title: "强化‘刀片电池’话术",
      trigger: "针对蔚来新车发布安全质疑",
      content: "在对话中自动识别‘安全’关键词，AI 实时弹窗提醒销售强调针刺实验与结构安全。",
      impact: "+22% 信任度提升",
      icon: <Battery className="text-green-400" size={20} />
    },
    {
      title: "智驾功能深度对比",
      trigger: "竞品智驾系统出现负面舆情",
      content: "利用竞品智驾事故案例，强调我司‘全场景辅助驾驶’的稳定性和冗余设计。",
      impact: "+10% 意向度提升",
      icon: <Cpu className="text-blue-400" size={20} />
    }
  ];

  const handleDispatch = () => {
    setIsDispatching(true);
    setTimeout(() => {
      setIsDispatching(false);
      setDispatched(true);
      setTimeout(() => setDispatched(false), 3000);
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col bg-[#050505] text-white overflow-hidden">
      {/* Header */}
      <header className="h-20 border-b border-white/10 flex items-center justify-between px-8 bg-black/40 backdrop-blur-xl z-20">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
            <Target className="text-amber-400" size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">老板决策器：竞品对比与策略生成</h1>
            <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest">Competitor Analysis & AI Strategy Engine</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-white/40 font-mono uppercase tracking-widest">策略覆盖率</span>
            <div className="flex items-center gap-2">
              <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} className="h-full bg-amber-500" />
              </div>
              <span className="text-xs font-bold text-amber-400">85%</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden p-6 gap-6">
        {/* Left Column: Competitor Analysis */}
        <div className="w-[380px] flex flex-col gap-6">
          <div className="flex-1 bg-white/[0.02] border border-white/10 rounded-[32px] p-6 flex flex-col gap-6 overflow-hidden">
            <h2 className="text-xs font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
              <TrendingUp size={14} className="text-blue-400" /> 竞品动态与对比
            </h2>

            {/* Competitor News */}
            <div className="space-y-3">
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-bold text-red-400 uppercase">Tesla</span>
                  <span className="text-[8px] text-red-400/60 font-mono">10m ago</span>
                </div>
                <p className="text-xs text-red-100 font-medium leading-relaxed">特斯拉 Model 3 宣布降价 15,000 元，并赠送 3 个月 FSD 体验。</p>
              </div>
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-bold text-blue-400 uppercase">NIO</span>
                  <span className="text-[8px] text-blue-400/60 font-mono">1h ago</span>
                </div>
                <p className="text-xs text-blue-100 font-medium leading-relaxed">蔚来发布全新 ES6 选装包，强化家庭露营场景配置。</p>
              </div>
            </div>

            {/* Radar Chart */}
            <div className="flex-1 min-h-[200px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={COMPETITOR_DATA}>
                  <PolarGrid stroke="#ffffff10" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#ffffff40', fontSize: 10 }} />
                  <RechartsRadar name="我司" dataKey="A" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.4} />
                  <RechartsRadar name="竞品" dataKey="B" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                </RadarChart>
              </ResponsiveContainer>
              <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-[8px] text-white/40 uppercase">我司车型</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-[8px] text-white/40 uppercase">竞品车型</span>
                </div>
              </div>
            </div>

            {/* Churn Warning */}
            <div className="p-5 bg-gradient-to-br from-red-500/20 to-transparent border border-red-500/30 rounded-2xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                <ShieldAlert className="text-red-400" size={20} />
              </div>
              <div>
                <p className="text-[10px] text-red-400 font-mono uppercase tracking-widest">用户流失预警</p>
                <p className="text-sm font-bold text-white">20% 进店客户关注特斯拉</p>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column: AI Strategy Generation */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex-1 bg-white/[0.03] border border-white/10 rounded-[40px] p-8 flex flex-col gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono text-amber-400 uppercase tracking-widest flex items-center gap-2">
                <Zap size={16} /> AI 策略实时生成
              </h2>
              <div className="flex gap-1">
                {strategies.map((_, i) => (
                  <div key={i} className={`w-6 h-1 rounded-full transition-all ${activeStrategy === i ? 'bg-amber-500' : 'bg-white/10'}`}></div>
                ))}
              </div>
            </div>

            {/* Strategy Cards */}
            <div className="flex-1 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStrategy}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
                        {strategies[activeStrategy].icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white tracking-tight">{strategies[activeStrategy].title}</h3>
                    </div>
                    <div className="flex items-center gap-2 text-amber-400/60 text-xs font-mono">
                      <AlertCircle size={12} />
                      触发条件：{strategies[activeStrategy].trigger}
                    </div>
                  </div>

                  <div className="p-8 bg-white/[0.03] border border-white/10 rounded-[32px] relative group">
                    <div className="absolute -top-3 -left-3 p-2 bg-amber-500 text-black rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-lg">AI Suggestion</div>
                    <p className="text-lg text-white/80 leading-relaxed">
                      {strategies[activeStrategy].content}
                    </p>
                    <div className="mt-8 flex items-center justify-between">
                      <div className="px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-xs font-bold">
                        预期影响：{strategies[activeStrategy].impact}
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setActiveStrategy((prev) => (prev > 0 ? prev - 1 : strategies.length - 1))}
                          className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <ChevronRight size={16} className="rotate-180" />
                        </button>
                        <button 
                          onClick={() => setActiveStrategy((prev) => (prev < strategies.length - 1 ? prev + 1 : 0))}
                          className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dispatch Button */}
            <button 
              onClick={handleDispatch}
              disabled={isDispatching}
              className={`w-full py-6 rounded-[24px] font-bold text-lg flex items-center justify-center gap-3 transition-all relative overflow-hidden ${
                dispatched 
                ? 'bg-green-500 text-black' 
                : 'bg-amber-500 text-black hover:bg-amber-400 shadow-[0_0_40px_rgba(245,158,11,0.2)]'
              }`}
            >
              {isDispatching ? (
                <>
                  <RefreshCw className="animate-spin" size={24} />
                  正在下发策略至全店铭牌...
                </>
              ) : dispatched ? (
                <>
                  <CheckCircle2 size={24} />
                  策略已成功下发
                </>
              ) : (
                <>
                  <Send size={24} />
                  一键下发至全店 AI 拾音铭牌
                </>
              )}
              {isDispatching && (
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Execution Monitoring */}
        <div className="w-[320px] flex flex-col gap-6">
          <div className="flex-1 bg-white/[0.02] border border-white/10 rounded-[32px] p-6 flex flex-col gap-8">
            <h2 className="text-xs font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
              <BarChart3 size={14} className="text-green-400" /> 执行监控
            </h2>

            {/* Execution Progress */}
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-white/60">话术执行率</span>
                  <span className="text-green-400 font-bold">92%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '92%' }} className="h-full bg-green-500" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-white/60">竞品对比提及率</span>
                  <span className="text-blue-400 font-bold">78%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '78%' }} className="h-full bg-blue-500" />
                </div>
              </div>
            </div>

            {/* Keywords Cloud */}
            <div className="p-6 bg-white/[0.03] border border-white/10 rounded-2xl space-y-4">
              <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest">高频执行关键词</p>
              <div className="flex flex-wrap gap-2">
                {['刀片电池', '置换补贴', '终身质保', '智驾冗余', '补能网络', '空间优势'].map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-white/60">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Conversion Lift */}
            <div className="mt-auto p-6 bg-gradient-to-br from-green-500/20 to-transparent border border-green-500/30 rounded-3xl text-center">
              <p className="text-[10px] text-green-400 font-mono uppercase tracking-widest mb-2">策略带动转化提升</p>
              <h3 className="text-5xl font-bold text-white">+18.5%</h3>
              <p className="mt-2 text-xs text-green-400/60">预计增加月订单 24 台</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="h-20 border-t border-white/10 bg-black/60 backdrop-blur-xl px-8 flex items-center justify-between z-20">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
            <ArrowRightLeft size={14} className="text-white/40" />
            <span className="text-xs text-white/60 font-medium">对比模式：我司 vs 特斯拉</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-white/40 font-mono uppercase tracking-widest">下一环节</span>
            <span className="text-xs font-bold text-white/80">提示词工程：打造你的专属 AI 销售冠军</span>
          </div>
          <button 
            onClick={onNext}
            className="px-10 py-3 bg-white text-black font-bold rounded-full hover:bg-cyan-400 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] flex items-center gap-2 group"
          >
            进入提示词工程 <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default DecisionMakerPage;

