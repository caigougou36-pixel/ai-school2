import React from 'react';
import { motion } from 'motion/react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { User, ShieldCheck, Zap, ChevronRight, Baby, Briefcase, MapPin } from 'lucide-react';

interface CDPProfilePageProps {
  onNext: () => void;
}

const data = [
  { subject: '车机卡顿', A: 120, fullMark: 150 },
  { subject: '空间不足', A: 98, fullMark: 150 },
  { subject: '家庭露营', A: 86, fullMark: 150 },
  { subject: '自动驾驶', A: 99, fullMark: 150 },
  { subject: '换车意向', A: 85, fullMark: 150 },
  { subject: '消费能力', A: 65, fullMark: 150 },
];

const CDPProfilePage: React.FC<CDPProfilePageProps> = ({ onNext }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-amber-500/5 blur-[250px] rounded-full pointer-events-none"></div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold tracking-tight mb-16 text-white/90"
      >
        蓝海客户 CDP 画像生成
      </motion.h1>

      <div className="z-10 w-full max-w-6xl grid grid-cols-2 gap-12">
        {/* Left: Avatar & Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="bg-white/[0.03] border border-white/10 rounded-[40px] p-12 flex flex-col items-center relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          
          <div className="w-48 h-48 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center mb-10 relative">
            <User size={80} className="text-white/40" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="absolute inset-0 rounded-full border-t-2 border-amber-400/40"
            />
          </div>

          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-white">疲惫二胎奶爸</h2>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-white/60 flex items-center gap-2">
                <Briefcase size={12} /> 天天加班到深夜
              </span>
              <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-white/60 flex items-center gap-2">
                <Baby size={12} /> 带俩娃
              </span>
              <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-white/60 flex items-center gap-2">
                <MapPin size={12} /> 城市通勤
              </span>
            </div>
          </div>

          <div className="mt-12 w-full space-y-6">
            <div className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
              <p className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-3">痛点提取</p>
              <p className="text-lg text-amber-100 font-medium tracking-tight">车机卡顿、空间不足、极度疲劳</p>
            </div>
            <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
              <p className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-3">核心需求</p>
              <p className="text-lg text-blue-100 font-medium tracking-tight">家庭露营、自动驾驶休息、大空间</p>
            </div>
          </div>
        </motion.div>

        {/* Right: Radar Chart & Probability */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="bg-white/[0.03] border border-white/10 rounded-[40px] p-12 flex flex-col"
        >
          <h3 className="text-sm font-mono text-white/40 uppercase tracking-widest mb-10 flex items-center gap-2">
            <Zap size={14} className="text-amber-400" /> 需求雷达图与转化预测
          </h3>

          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                <PolarGrid stroke="#ffffff10" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#ffffff60', fontSize: 12 }} />
                <Radar
                  name="Mike"
                  dataKey="A"
                  stroke="#fbbf24"
                  fill="#fbbf24"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-10 p-8 bg-gradient-to-br from-amber-500/20 to-transparent border border-amber-500/30 rounded-3xl flex items-center justify-between">
            <div>
              <p className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-1">转化概率预测</p>
              <h4 className="text-4xl font-bold text-white">85%</h4>
            </div>
            <div className="text-right">
              <p className="text-sm text-amber-200/80 mb-1">随时爆发换车需求</p>
              <div className="flex items-center gap-1 text-green-400">
                <ShieldCheck size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">High Potential</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={onNext}
        className="mt-16 px-10 py-3 bg-white text-black font-bold rounded-full hover:bg-amber-400 transition-all flex items-center gap-2"
      >
        进入 DCC 实时外呼监控 <ChevronRight size={18} />
      </motion.button>
    </div>
  );
};

export default CDPProfilePage;
