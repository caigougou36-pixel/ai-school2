import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Eye, 
  Mic, 
  ChevronRight, 
  Zap, 
  LayoutDashboard, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  Clock,
  Maximize2,
  RefreshCw,
  FileText,
  MessageSquare,
  X
} from 'lucide-react';

interface ShowroomRadarPageProps {
  onNext: () => void;
}

interface ProbeData {
  id: string;
  type: 'vision' | 'audio';
  x: number;
  y: number;
  label: string;
  count?: number;
  duration?: string;
  stt?: string;
}

const VISION_PROBES: ProbeData[] = [
  { id: 'v1', type: 'vision', x: 15, y: 20, label: '展厅主入口', count: 12, duration: '45s' },
  { id: 'v2', type: 'vision', x: 45, y: 35, label: '热门车型 A', count: 8, duration: '120s' },
  { id: 'v3', type: 'vision', x: 75, y: 25, label: '热门车型 B', count: 5, duration: '95s' },
  { id: 'v4', type: 'vision', x: 30, y: 70, label: '洽谈区 1', count: 4, duration: '18m' },
  { id: 'v5', type: 'vision', x: 65, y: 75, label: '洽谈区 2', count: 6, duration: '22m' },
];

const AUDIO_PROBES: ProbeData[] = [
  { id: 'a1', type: 'audio', x: 35, y: 65, label: '销售-张伟', stt: '客户对内饰颜色有异议，正在对比竞品价格...' },
  { id: 'a2', type: 'audio', x: 55, y: 45, label: '销售-李娜', stt: '正在介绍自动驾驶辅助功能，客户兴趣很高。' },
  { id: 'a3', type: 'audio', x: 25, y: 30, label: '销售-王强', stt: '客户询问分期方案，预算在25-30万之间。' },
];

const ShowroomRadarPage: React.FC<ShowroomRadarPageProps> = ({ onNext }) => {
  const [selectedAudio, setSelectedAudio] = useState<ProbeData | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full flex flex-col bg-[#050505] text-white overflow-hidden">
      {/* Top Header */}
      <header className="h-20 border-b border-white/10 flex items-center justify-between px-8 bg-black/40 backdrop-blur-xl z-20">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
              <Eye className="text-cyan-400" size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">视听风控：展厅 3D 拓扑雷达</h1>
              <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest">Visual & Auditory Risk Control System</p>
            </div>
          </div>
          <div className="h-8 w-px bg-white/10"></div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] text-white/40 font-mono uppercase tracking-widest">当前状态</span>
              <span className="text-xs font-bold text-green-400 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                实时监控中
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-white/40 font-mono uppercase tracking-widest">系统时间</span>
              <span className="text-xs font-mono text-white/80">{currentTime.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold hover:bg-white/10 transition-all flex items-center gap-2">
            <RefreshCw size={14} /> 刷新数据
          </button>
          <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold hover:bg-white/10 transition-all flex items-center gap-2">
            <Maximize2 size={14} /> 全屏展示
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left: 3D Topology Map */}
        <div className="flex-1 relative bg-[radial-gradient(circle_at_center,#111,transparent)] overflow-hidden p-8">
          {/* Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"></div>

          {/* 3D Floor Plan Container */}
          <div className="w-full h-full flex items-center justify-center perspective-[2000px]">
            <motion.div 
              initial={{ rotateX: 45, rotateZ: -25, scale: 0.8, opacity: 0 }}
              animate={{ rotateX: 45, rotateZ: -25, scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative w-[1000px] h-[600px] border border-white/10 bg-white/[0.02] rounded-[40px] transform-style-3d shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
            >
              {/* Floor Texture */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-[40px]"></div>
              
              {/* Car Models (3D Boxes) */}
              <div className="absolute top-[25%] left-[40%] w-40 h-20 bg-cyan-500/10 border border-cyan-500/30 rounded-xl flex items-center justify-center transform translateZ(20px)">
                <span className="text-[10px] font-mono text-cyan-400/60 uppercase tracking-widest">Model S-Plus</span>
              </div>
              <div className="absolute top-[15%] left-[70%] w-40 h-20 bg-blue-500/10 border border-blue-500/30 rounded-xl flex items-center justify-center transform translateZ(20px)">
                <span className="text-[10px] font-mono text-blue-400/60 uppercase tracking-widest">Model Y-Max</span>
              </div>
              <div className="absolute top-[65%] left-[25%] w-48 h-24 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center transform translateZ(10px) border-dashed">
                <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Negotiation Zone A</span>
              </div>

              {/* Flow Lines (SVG) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                <motion.path
                  d="M 150 120 Q 300 150 450 210 T 750 150"
                  fill="none"
                  stroke="url(#flowGradient)"
                  strokeWidth="2"
                  strokeDasharray="10 10"
                  initial={{ strokeDashoffset: 100 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                />
                <defs>
                  <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity="0" />
                    <stop offset="50%" stopColor="#22c55e" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Vision Probes (Green) */}
              {VISION_PROBES.map((probe) => (
                <div 
                  key={probe.id}
                  className="absolute transform translateZ(40px)"
                  style={{ left: `${probe.x}%`, top: `${probe.y}%` }}
                >
                  <div className="relative">
                    <div className="w-4 h-4 bg-green-500 rounded-full shadow-[0_0_20px_#22c55e]">
                      <motion.div
                        animate={{ scale: [1, 3], opacity: [0.5, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute inset-0 rounded-full bg-green-500"
                      />
                    </div>
                    {/* Floating Data */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 backdrop-blur-md border border-green-500/30 rounded-lg p-2 flex flex-col items-center gap-1 scale-75 origin-bottom">
                      <span className="text-[10px] font-bold text-white/90">{probe.label}</span>
                      <div className="flex gap-3">
                        <span className="text-[10px] text-green-400 font-mono">👥 {probe.count}人</span>
                        <span className="text-[10px] text-green-400 font-mono">⏱️ {probe.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Audio Probes (Blue) */}
              {AUDIO_PROBES.map((probe) => (
                <div 
                  key={probe.id}
                  className="absolute transform translateZ(30px) cursor-pointer group"
                  style={{ left: `${probe.x}%`, top: `${probe.y}%` }}
                  onClick={() => setSelectedAudio(probe)}
                >
                  <div className="relative">
                    <div className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_15px_#3b82f6]">
                      <motion.div
                        animate={{ scale: [1, 4], opacity: [0.6, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="absolute inset-0 rounded-full bg-blue-500"
                      />
                    </div>
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-blue-500/20 border border-blue-500/30 rounded px-2 py-0.5 text-[8px] font-mono text-blue-300 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      {probe.label}
                    </div>
                  </div>
                </div>
              ))}

              {/* STT Popup */}
              <AnimatePresence>
                {selectedAudio && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    className="absolute z-50 bg-black/90 backdrop-blur-xl border border-blue-500/40 rounded-2xl p-4 w-64 shadow-2xl"
                    style={{ left: `${selectedAudio.x}%`, top: `${selectedAudio.y - 15}%` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Mic size={14} className="text-blue-400" />
                        <span className="text-xs font-bold text-blue-100">{selectedAudio.label}</span>
                      </div>
                      <button onClick={() => setSelectedAudio(null)} className="text-white/40 hover:text-white">
                        <X size={14} />
                      </button>
                    </div>
                    <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                      <p className="text-xs text-blue-100/80 leading-relaxed italic">
                        "{selectedAudio.stt}"
                      </p>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex-1 h-1 bg-blue-500/20 rounded-full overflow-hidden">
                        <motion.div 
                          animate={{ x: [-20, 100] }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                          className="w-1/3 h-full bg-blue-400"
                        />
                      </div>
                      <span className="text-[8px] font-mono text-blue-400 uppercase">Live STT</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Legend */}
          <div className="absolute bottom-10 left-10 flex flex-col gap-4 bg-black/40 backdrop-blur-md p-6 rounded-3xl border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]"></div>
              <span className="text-xs font-mono text-white/60 uppercase tracking-widest">AI 视觉探头 (Macro)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]"></div>
              <span className="text-xs font-mono text-white/60 uppercase tracking-widest">AI 拾音铭牌 (Micro)</span>
            </div>
            <div className="h-px bg-white/10 my-1"></div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 border border-white/30 rounded-sm"></div>
              <span className="text-xs font-mono text-white/40 uppercase tracking-widest">展厅数字化拓扑</span>
            </div>
          </div>
        </div>

        {/* Right: Data Panel */}
        <div className="w-[400px] border-l border-white/10 bg-black/20 backdrop-blur-md p-8 flex flex-col gap-8 overflow-y-auto">
          <h2 className="text-sm font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-2">
            <LayoutDashboard size={16} /> 展厅实时看板
          </h2>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-white/[0.03] border border-white/10 rounded-3xl">
              <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest mb-2">今日进店总量</p>
              <h3 className="text-3xl font-bold text-white">128</h3>
              <div className="mt-2 flex items-center gap-1 text-green-400 text-[10px] font-bold">
                <TrendingUp size={10} /> +12%
              </div>
            </div>
            <div className="p-6 bg-white/[0.03] border border-white/10 rounded-3xl">
              <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest mb-2">平均停留时长</p>
              <h3 className="text-3xl font-bold text-white">32m</h3>
              <div className="mt-2 flex items-center gap-1 text-amber-400 text-[10px] font-bold">
                <Clock size={10} /> 较昨日持平
              </div>
            </div>
          </div>

          {/* Circular Progress: Hot Zone Occupancy */}
          <div className="p-8 bg-white/[0.03] border border-white/10 rounded-[40px] flex flex-col items-center">
            <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest mb-6">展厅热力饱和度</p>
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                <motion.circle 
                  cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
                  strokeDasharray="364"
                  initial={{ strokeDashoffset: 364 }}
                  animate={{ strokeDashoffset: 364 * (1 - 0.65) }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="text-cyan-500" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">65%</span>
                <span className="text-[8px] text-white/40 uppercase">Optimal</span>
              </div>
            </div>
          </div>

          {/* Hot Models Chart */}
          <div className="space-y-6">
            <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest">热门车型关注排行</p>
            <div className="space-y-4">
              {[
                { name: '宋 PLUS DM-i', value: 85, color: 'bg-cyan-500' },
                { name: '秦 PLUS EV', value: 62, color: 'bg-blue-500' },
                { name: '汉 EV 旗舰型', value: 45, color: 'bg-indigo-500' },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/80">{item.name}</span>
                    <span className="text-white/40 font-mono">{item.value}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 1, delay: i * 0.2 }}
                      className={`h-full ${item.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts Section */}
          <div className="mt-auto space-y-4">
            <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest flex items-center gap-2">
              <AlertTriangle size={12} className="text-amber-400" /> 实时风控预警
            </p>
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl animate-pulse">
              <p className="text-xs text-red-200 font-medium leading-relaxed">
                洽谈区 3 号桌客户停留过久 (45m+)，未见销售介入，建议值班经理立即跟进。
              </p>
            </div>
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
              <p className="text-xs text-amber-200 font-medium leading-relaxed">
                入口处客流激增，当前排队人数 5 人，建议开启备用接待位。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <footer className="h-20 border-t border-white/10 bg-black/60 backdrop-blur-xl px-8 flex items-center justify-between z-20">
        <div className="flex gap-4">
          <button className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold hover:bg-white/10 transition-all flex items-center gap-2">
            <MessageSquare size={14} /> 切换视角
          </button>
          <button className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold hover:bg-white/10 transition-all flex items-center gap-2">
            <FileText size={14} /> 导出风控报告
          </button>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-white/40 font-mono uppercase tracking-widest">下一环节</span>
            <span className="text-xs font-bold text-white/80">老板决策器：竞品对比与策略生成</span>
          </div>
          <button 
            onClick={onNext}
            className="px-10 py-3 bg-cyan-500 text-black font-bold rounded-full hover:bg-cyan-400 transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)] flex items-center gap-2 group"
          >
            跳转老板决策器 <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ShowroomRadarPage;
