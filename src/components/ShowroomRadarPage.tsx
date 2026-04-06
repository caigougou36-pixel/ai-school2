import React from 'react';
import { motion } from 'motion/react';
import { Eye, Mic, ChevronRight, Zap, LayoutDashboard } from 'lucide-react';

interface ShowroomRadarPageProps {
  onNext: () => void;
}

const ShowroomRadarPage: React.FC<ShowroomRadarPageProps> = ({ onNext }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center px-6 relative overflow-hidden bg-[#050505]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-blue-500/5 blur-[250px] rounded-full pointer-events-none"></div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold tracking-tight mb-16 text-white/90"
      >
        展厅 3D 拓扑雷达图
      </motion.h1>

      <div className="z-10 w-full max-w-6xl grid grid-cols-3 gap-12">
        {/* Left: Info */}
        <div className="space-y-8 flex flex-col justify-center">
          <div className="p-10 bg-white/[0.03] border border-white/10 rounded-[40px]">
            <h2 className="text-sm font-mono text-cyan-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <LayoutDashboard size={16} /> 消除老板视角的“盲区”
            </h2>
            <p className="text-2xl font-bold text-white mb-6 leading-tight">
              宏观漏斗看摄像头，微观死因听录音。
            </p>
            <p className="text-white/40 leading-relaxed">
              通过 AI 视觉探头与拾音铭牌的实时联动，将展厅的每一个角落数字化。
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-6 bg-green-500/10 border border-green-500/20 rounded-3xl">
              <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center">
                <Eye size={24} className="text-green-400" />
              </div>
              <div>
                <p className="text-white font-bold">5 个 AI 视觉探头</p>
                <p className="text-green-400/60 text-xs uppercase tracking-widest">Macro Funnel</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-blue-500/10 border border-blue-500/20 rounded-3xl">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                <Mic size={24} className="text-blue-400" />
              </div>
              <div>
                <p className="text-white font-bold">AI 拾音铭牌</p>
                <p className="text-blue-400/60 text-xs uppercase tracking-widest">Micro Analysis</p>
              </div>
            </div>
          </div>
        </div>

        {/* Center & Right: 3D Floor Plan */}
        <div className="col-span-2 relative aspect-video bg-white/[0.02] border border-white/10 rounded-[60px] overflow-hidden p-12 flex items-center justify-center group">
          {/* Floor Plan Simulation */}
          <div className="relative w-full h-full border border-white/5 rounded-3xl transform rotateX-45 rotateZ-[-30deg] scale-110 transition-transform duration-1000 group-hover:scale-125 group-hover:rotateX-50">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
            
            {/* Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            {/* Camera Points (Green Ripples) */}
            {[
              { t: '10%', l: '10%' },
              { t: '10%', l: '80%' },
              { t: '80%', l: '10%' },
              { t: '80%', l: '80%' },
              { t: '45%', l: '45%' },
            ].map((pos, i) => (
              <div key={i} className="absolute w-4 h-4 bg-green-500 rounded-full" style={{ top: pos.t, left: pos.l }}>
                <motion.div
                  animate={{ scale: [1, 4], opacity: [0.5, 0] }}
                  transition={{ repeat: Infinity, duration: 2, delay: i * 0.4 }}
                  className="absolute inset-0 rounded-full bg-green-500"
                />
              </div>
            ))}

            {/* Audio Points (Blue Ripples) */}
            {[
              { t: '30%', l: '30%' },
              { t: '60%', l: '70%' },
              { t: '20%', l: '60%' },
            ].map((pos, i) => (
              <div key={i} className="absolute w-3 h-3 bg-blue-500 rounded-full" style={{ top: pos.t, left: pos.l }}>
                <motion.div
                  animate={{ scale: [1, 3], opacity: [0.5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.5 }}
                  className="absolute inset-0 rounded-full bg-blue-500"
                />
              </div>
            ))}

            {/* Car Models Simulation */}
            <div className="absolute top-[40%] left-[20%] w-32 h-16 bg-white/10 rounded-xl border border-white/20 flex items-center justify-center text-[10px] text-white/20 font-mono uppercase tracking-widest">Car A</div>
            <div className="absolute top-[20%] left-[50%] w-32 h-16 bg-white/10 rounded-xl border border-white/20 flex items-center justify-center text-[10px] text-white/20 font-mono uppercase tracking-widest">Car B</div>
            <div className="absolute top-[60%] left-[60%] w-32 h-16 bg-white/10 rounded-xl border border-white/20 flex items-center justify-center text-[10px] text-white/20 font-mono uppercase tracking-widest">Car C</div>
          </div>

          {/* Legend Overlay */}
          <div className="absolute bottom-10 right-10 flex gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-[10px] text-white/60 font-mono uppercase tracking-widest">AI Vision</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-[10px] text-white/60 font-mono uppercase tracking-widest">AI Audio</span>
            </div>
          </div>
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={onNext}
        className="mt-16 px-10 py-3 bg-cyan-500 text-black font-bold rounded-full hover:bg-cyan-400 transition-all flex items-center gap-2"
      >
        进入客流验证与老板决策器 <ChevronRight size={18} />
      </motion.button>
    </div>
  );
};

export default ShowroomRadarPage;
