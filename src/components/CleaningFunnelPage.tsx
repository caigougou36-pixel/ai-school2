import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ShieldAlert, 
  ShieldCheck, 
  Star, 
  ChevronRight, 
  Database, 
  Zap, 
  PhoneCall, 
  Eye, 
  Smartphone, 
  Clock, 
  User, 
  TrendingUp,
  Activity,
  Filter,
  Layers,
  ExternalLink,
  X,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface CleaningFunnelPageProps {
  onNext: () => void;
}

interface Lead {
  id: string;
  source: '懂车帝' | '汽车之家' | '抖音' | '小红书' | '快手';
  phone: string;
  description: string;
  type: 'red' | 'blue';
  time: string;
  tags: string[];
  painPoints: string;
  needs: string;
  device: string;
  profile: string;
  spendingPower: number;
  confidence: number;
}

const SOURCES = ['懂车帝', '汽车之家', '抖音', '小红书', '快手'] as const;

const MOCK_LEADS: Lead[] = [
  {
    id: '1',
    source: '懂车帝',
    phone: '138****8821',
    description: '刚摇号成功，急需一台空间大的家用SUV，预算30万左右。',
    type: 'red',
    time: '14:23',
    tags: ['二胎奶爸', '30-35岁', '刚需购车'],
    painPoints: '目前轿车空间不足，二胎出生后无法满足全家出行需求。',
    needs: '安全性能高，至少6/7座，后备箱空间大。',
    device: 'iPhone 15 Pro',
    profile: '二胎家庭，关注家庭安全与出行舒适度，消费能力中上，决策周期短。',
    spendingPower: 75,
    confidence: 88
  },
  {
    id: '2',
    source: '抖音',
    phone: '159****2234',
    description: '关注智驾系统，想了解最新款纯电轿车的自动泊车功能。',
    type: 'blue',
    time: '14:25',
    tags: ['科技极客', '25-30岁', '关注智驾'],
    painPoints: '新手司机，对侧方停车有恐惧感，希望技术能解决痛点。',
    needs: '高阶智驾系统，颜值高，充电速度快。',
    device: 'Xiaomi 14 Ultra',
    profile: '单身职场精英，追求前沿科技体验，对品牌忠诚度一般，看重产品力。',
    spendingPower: 65,
    confidence: 72
  },
  {
    id: '3',
    source: '小红书',
    phone: '186****5567',
    description: '周末喜欢露营，看中后备箱外放电功能，咨询续航里程。',
    type: 'blue',
    time: '14:28',
    tags: ['户外达人', '精致女性', '露营爱好者'],
    painPoints: '现有燃油车无法提供户外用电，露营体验受限。',
    needs: '外放电功能，V2L技术，超长续航，内饰精致。',
    device: 'iPhone 14',
    profile: '精致生活追求者，社交属性强，看重车辆的社交价值与户外拓展能力。',
    spendingPower: 80,
    confidence: 65
  },
  {
    id: '4',
    source: '汽车之家',
    phone: '135****1190',
    description: '对比某品牌和某品牌，想知道置换补贴政策。',
    type: 'red',
    time: '14:30',
    tags: ['置换用户', '理性消费', '40岁+'],
    painPoints: '旧车残值评估不透明，希望获得更高的置换补贴。',
    needs: '性价比高，售后服务好，品牌口碑稳定。',
    device: 'Huawei Mate 60 Pro',
    profile: '成熟家庭用户，消费理性，对价格敏感，看重品牌长期价值与服务。',
    spendingPower: 70,
    confidence: 92
  }
];

const CleaningFunnelPage: React.FC<CleaningFunnelPageProps> = ({ onNext }) => {
  const [streamLeads, setStreamLeads] = useState<Lead[]>([]);
  const [totalLeads, setTotalLeads] = useState(12480);
  const [activeTab, setActiveTab] = useState<'red' | 'blue'>('red');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [funnelData, setFunnelData] = useState([
    { label: '原始线索', value: 12480, color: 'bg-blue-500/20' },
    { label: '去重清洗', value: 8640, color: 'bg-cyan-500/30' },
    { label: '语义分析', value: 5210, color: 'bg-indigo-500/40' },
    { label: '意向评分', value: 2180, color: 'bg-purple-500/50' },
    { label: '高价值筛选', value: 452, color: 'bg-pink-500/60' },
  ]);

  // Lead Stream Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const randomLead = MOCK_LEADS[Math.floor(Math.random() * MOCK_LEADS.length)];
      const newLead = { ...randomLead, id: Date.now().toString() };
      setStreamLeads(prev => [newLead, ...prev].slice(0, 8));
      setTotalLeads(prev => prev + 1);
      
      // Randomly update funnel values slightly
      setFunnelData(prev => prev.map(item => ({
        ...item,
        value: item.value + Math.floor(Math.random() * 5)
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const redPool = MOCK_LEADS.filter(l => l.type === 'red');
  const bluePool = MOCK_LEADS.filter(l => l.type === 'blue');

  return (
    <div className="w-full h-full bg-[#050505] p-6 flex flex-col gap-6 overflow-hidden relative">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>

      {/* Top Row */}
      <div className="grid grid-cols-3 gap-6 h-[45%]">
        {/* Area A: Real-time Lead Stream */}
        <div className="col-span-2 glass rounded-3xl p-6 flex flex-col relative overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                <Activity size={20} />
              </div>
              <h3 className="font-bold tracking-tight uppercase">实时线索流</h3>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">今日线索总量</div>
              <motion.div 
                key={totalLeads}
                initial={{ scale: 1.1, color: '#60a5fa' }}
                animate={{ scale: 1, color: '#ffffff' }}
                className="text-3xl font-black font-mono"
              >
                {totalLeads.toLocaleString()}
              </motion.div>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-hidden relative">
            <AnimatePresence initial={false}>
              {streamLeads.map((lead) => (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0, x: -50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="group relative flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer overflow-hidden"
                  onClick={() => {
                    setSelectedLead(lead);
                    setIsDrawerOpen(true);
                  }}
                >
                  {/* Flowing light effect */}
                  <motion.div 
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent skew-x-12"
                  />

                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-lg shadow-inner">
                    {lead.source === '懂车帝' && '🚗'}
                    {lead.source === '汽车之家' && '🏠'}
                    {lead.source === '抖音' && '🎵'}
                    {lead.source === '小红书' && '📕'}
                    {lead.source === '快手' && '⚡'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-white/90">{lead.phone}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/40 font-mono">{lead.source}</span>
                    </div>
                    <p className="text-xs text-white/60 truncate">{lead.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-white/20 mb-1">{lead.time}</div>
                    <ChevronRight size={14} className="text-white/20 group-hover:text-white/60 transition-colors" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none"></div>
          </div>
        </div>

        {/* Area B: Channel Connection Status */}
        <div className="glass rounded-3xl p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-green-500/20 text-green-400">
              <Zap size={20} />
            </div>
            <h3 className="font-bold tracking-tight uppercase">渠道连接状态</h3>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-4">
            {SOURCES.map((source, i) => (
              <div key={source} className="relative group">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center text-center transition-all hover:bg-white/10">
                  <div className="relative mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-2xl">
                      {source === '懂车帝' && '🚗'}
                      {source === '汽车之家' && '🏠'}
                      {source === '抖音' && '🎵'}
                      {source === '小红书' && '📕'}
                      {source === '快手' && '⚡'}
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0a0a0f] animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                  </div>
                  <span className="text-xs font-bold text-white/80 mb-1">{source}</span>
                  <span className="text-[10px] font-mono text-green-500/60">{(1200 + i * 450).toLocaleString()} 线索</span>
                </div>
                
                {/* Connection Lines (Visual only) */}
                {i < 4 && (
                  <div className="absolute top-1/2 -right-2 w-4 h-[1px] bg-gradient-to-r from-green-500/20 to-transparent hidden lg:block"></div>
                )}
              </div>
            ))}
            <div className="p-4 rounded-2xl border-2 border-dashed border-white/5 flex flex-center items-center justify-center opacity-40">
              <span className="text-[10px] font-bold uppercase tracking-widest">更多渠道...</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-4 gap-6 flex-1 min-h-0">
        {/* Area C: Dual Lead Pools */}
        <div className="col-span-2 glass rounded-3xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                <Database size={20} />
              </div>
              <h3 className="font-bold tracking-tight uppercase">双线索池</h3>
            </div>
            <div className="flex p-1 bg-white/5 rounded-xl border border-white/5">
              <button 
                onClick={() => setActiveTab('red')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'red' ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'text-white/40 hover:text-white'}`}
              >
                红海线索池
              </button>
              <button 
                onClick={() => setActiveTab('blue')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'blue' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'text-white/40 hover:text-white'}`}
              >
                蓝海高净值
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
            {(activeTab === 'red' ? redPool : bluePool).map((lead) => (
              <div 
                key={lead.id}
                className={`p-4 rounded-2xl border transition-all cursor-pointer group ${
                  activeTab === 'red' 
                    ? 'bg-red-500/5 border-red-500/10 hover:bg-red-500/10 hover:border-red-500/20' 
                    : 'bg-blue-500/5 border-blue-500/10 hover:bg-blue-500/10 hover:border-blue-500/20'
                }`}
                onClick={() => {
                  setSelectedLead(lead);
                  setIsDrawerOpen(true);
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex gap-2">
                    {lead.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/60">{tag}</span>
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-white/20">{lead.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-white/90">{lead.phone}</p>
                  <div className="flex items-center gap-1 text-[10px] text-white/40 uppercase tracking-widest">
                    <span>{lead.source}</span>
                    <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Area D: AI Funnel */}
        <div className="glass rounded-3xl p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
              <Filter size={20} />
            </div>
            <h3 className="font-bold tracking-tight uppercase">AI 语义分析漏斗</h3>
          </div>

          <div className="flex-1 flex flex-col justify-between py-2">
            {funnelData.map((item, i) => (
              <div key={item.label} className="relative">
                <div className="flex items-center justify-between mb-1 px-2">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{item.label}</span>
                  <span className="text-xs font-mono font-bold text-white/80">{item.value.toLocaleString()}</span>
                </div>
                <div className="h-8 relative overflow-hidden rounded-lg">
                  <div 
                    className={`absolute inset-y-0 left-0 ${item.color} transition-all duration-1000 border-r-2 border-white/20`}
                    style={{ width: `${100 - i * 15}%`, margin: '0 auto', left: `${i * 7.5}%` }}
                  >
                    {/* Flowing light */}
                    <motion.div 
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Area E: Action Panel */}
        <div className="flex flex-col gap-4">
          <button 
            onClick={() => {
              setSelectedLead(MOCK_LEADS[0]);
              setIsDrawerOpen(true);
            }}
            className="flex-1 glass rounded-3xl p-6 flex flex-col items-center justify-center text-center group hover:bg-white/10 transition-all border-blue-500/20"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Eye size={32} />
            </div>
            <span className="text-sm font-bold uppercase tracking-widest mb-1">查看线索详情</span>
            <span className="text-[10px] text-white/30">Deep Analysis Report</span>
          </button>

          <button 
            onClick={onNext}
            className="flex-1 glass rounded-3xl p-6 flex flex-col items-center justify-center text-center group hover:bg-orange-500/10 transition-all border-orange-500/20"
          >
            <div className="w-16 h-16 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <PhoneCall size={32} />
            </div>
            <span className="text-sm font-bold uppercase tracking-widest mb-1">跳转 AI 外呼</span>
            <span className="text-[10px] text-white/30">Module 02: Smart Outbound</span>
          </button>
        </div>
      </div>

      {/* Lead Detail Drawer */}
      <AnimatePresence>
        {isDrawerOpen && selectedLead && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[400px] bg-[#0a0a0f] border-l border-white/10 z-[70] flex flex-col shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-gradient-to-br from-white/5 to-transparent">
                <div>
                  <h3 className="text-xl font-black tracking-tight uppercase mb-1">线索详情</h3>
                  <div className="flex items-center gap-2 text-white/40 text-[10px] font-mono uppercase tracking-widest">
                    <Smartphone size={12} />
                    {selectedLead.phone}
                  </div>
                </div>
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
                {/* Tags */}
                <section>
                  <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <User size={12} /> 用户标签
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedLead.tags.map(tag => (
                      <span key={tag} className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs font-medium text-blue-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </section>

                {/* Pain Points & Needs */}
                <div className="grid grid-cols-1 gap-6">
                  <section className="p-4 rounded-2xl bg-red-500/5 border border-red-500/10">
                    <h4 className="text-[10px] font-bold text-red-400/60 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <AlertCircle size={12} /> 核心痛点
                    </h4>
                    <p className="text-sm text-white/80 leading-relaxed">{selectedLead.painPoints}</p>
                  </section>
                  <section className="p-4 rounded-2xl bg-green-500/5 border border-green-500/10">
                    <h4 className="text-[10px] font-bold text-green-400/60 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <CheckCircle2 size={12} /> 购车刚需
                    </h4>
                    <p className="text-sm text-white/80 leading-relaxed">{selectedLead.needs}</p>
                  </section>
                </div>

                {/* Device & Time */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3">
                    <Smartphone size={16} className="text-white/20" />
                    <div className="text-xs text-white/60">{selectedLead.device}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={16} className="text-white/20" />
                    <div className="text-xs text-white/60">{selectedLead.time}</div>
                  </div>
                </div>

                {/* Profile Description */}
                <section>
                  <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-4">用户画像</h4>
                  <p className="text-sm text-white/60 leading-relaxed italic">"{selectedLead.profile}"</p>
                </section>

                {/* Analysis Bars */}
                <section className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white/80">消费能力</span>
                      <span className="text-xs font-mono text-blue-400">{selectedLead.spendingPower}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedLead.spendingPower}%` }}
                        className="h-full bg-gradient-to-r from-blue-600 to-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-6 rounded-3xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 relative overflow-hidden">
                    <div>
                      <div className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-1">置信度打分</div>
                      <div className="text-3xl font-black text-white">{selectedLead.confidence}%</div>
                    </div>
                    <div className="relative w-16 h-16">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path
                          className="text-white/5"
                          strokeDasharray="100, 100"
                          strokeWidth="3"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <motion.path
                          initial={{ strokeDasharray: "0, 100" }}
                          animate={{ strokeDasharray: `${selectedLead.confidence}, 100` }}
                          className="text-purple-500"
                          strokeWidth="3"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <TrendingUp size={16} className="text-purple-500" />
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Drawer Footer */}
              <div className="p-8 border-t border-white/5 bg-black/40">
                <button 
                  onClick={onNext}
                  className="w-full py-4 rounded-2xl bg-white text-black font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-white/5"
                >
                  一键外呼
                  <PhoneCall size={18} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CleaningFunnelPage;
