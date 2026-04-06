import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  ChevronRight, 
  ShieldAlert, 
  Zap, 
  User, 
  Clock, 
  Activity, 
  MessageSquare, 
  TrendingUp, 
  Tag, 
  Star, 
  CheckCircle2, 
  ArrowLeft,
  LayoutDashboard,
  Settings,
  Volume2,
  AlertTriangle,
  Flame
} from 'lucide-react';

interface OutboundMonitorPageProps {
  onNext: () => void;
}

type CallStatus = 'idle' | 'calling' | 'connected' | 'ended';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  interrupted?: boolean;
  highlights?: string[];
}

const CONVERSATION_SCRIPT: Message[] = [
  { id: '1', sender: 'ai', text: '您好，王先生！我是您的AI购车顾问。看到您最近在关注新能源SUV，请问您目前主要看中哪些方面的性能呢？', timestamp: '14:23:01' },
  { id: '2', sender: 'user', text: '我在看比亚迪宋PLUS，感觉空间还可以。', timestamp: '14:23:08', highlights: ['比亚迪宋PLUS'] },
  { id: '3', sender: 'ai', text: '太好了！宋PLUS确实是非常全能的选择，尤其是它的空间表现和刀片电池安全性...', timestamp: '14:23:15', interrupted: true },
  { id: '4', sender: 'user', text: '价格多少？现在店里有优惠吗？', timestamp: '14:23:18', highlights: ['价格', '优惠'] },
  { id: '5', sender: 'ai', text: '目前宋PLUS旗舰版指导价15.98万，本月我们针对二胎家庭有专项的5000元置换补贴，以及2年0息金融方案。', timestamp: '14:23:25', highlights: ['15.98万', '5000元置换补贴'] },
  { id: '6', sender: 'user', text: '那还可以，这周末有试驾车吗？我想带家里人去看看。', timestamp: '14:23:35', highlights: ['这周末', '试驾'] },
  { id: '7', sender: 'ai', text: '有的，本周六下午两点为您预留一台试驾车如何？到店还有精美礼品。', timestamp: '14:23:42' },
];

const KEYWORDS = ['比亚迪宋', '15万预算', '试驾', '优惠', '二胎家庭', '置换补贴', '空间大', '刀片电池'];

const OutboundMonitorPage: React.FC<OutboundMonitorPageProps> = ({ onNext }) => {
  const [status, setStatus] = useState<CallStatus>('idle');
  const [timer, setTimer] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentScriptIndex, setCurrentScriptIndex] = useState(0);
  const [intentStep, setIntentStep] = useState(0);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [intentScore, setIntentScore] = useState(0); // 0-100
  const scrollRef = useRef<HTMLDivElement>(null);

  // Call Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === 'connected') {
      interval = setInterval(() => setTimer(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [status]);

  // Conversation Simulation
  useEffect(() => {
    if (status === 'connected' && currentScriptIndex < CONVERSATION_SCRIPT.length) {
      const delay = currentScriptIndex === 0 ? 1000 : 3000;
      const timeout = setTimeout(() => {
        const nextMsg = CONVERSATION_SCRIPT[currentScriptIndex];
        setMessages(prev => [...prev, nextMsg]);
        setCurrentScriptIndex(prev => prev + 1);

        // Update Intent & Keywords based on script index
        if (currentScriptIndex === 1) {
          setIntentStep(1);
          setKeywords(prev => [...prev, '比亚迪宋', '空间大']);
          setIntentScore(45);
        } else if (currentScriptIndex === 3) {
          setIntentStep(2);
          setKeywords(prev => [...prev, '价格', '优惠']);
          setIntentScore(65);
        } else if (currentScriptIndex === 5) {
          setIntentStep(3);
          setKeywords(prev => [...prev, '试驾', '这周末']);
          setIntentScore(92);
        }
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [status, currentScriptIndex]);

  // Auto-scroll conversation
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startCall = () => {
    setStatus('calling');
    setTimeout(() => setStatus('connected'), 2000);
  };

  const endCall = () => {
    setStatus('ended');
  };

  const getIntentLabel = (score: number) => {
    if (score >= 85) return { label: 'H级', color: 'text-[#00e5a0]', bg: 'bg-[#00e5a0]/20' };
    if (score >= 60) return { label: 'A级', color: 'text-[#00d4ff]', bg: 'bg-[#00d4ff]/20' };
    if (score >= 30) return { label: 'B级', color: 'text-[#ff6b35]', bg: 'bg-[#ff6b35]/20' };
    return { label: 'C级', color: 'text-[#ff4757]', bg: 'bg-[#ff4757]/20' };
  };

  if (status === 'ended') {
    return (
      <div className="w-full h-full p-12 overflow-y-auto scrollbar-hide bg-gradient-to-br from-black via-[#0a0a0f] to-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          {/* Result Header */}
          <div className="p-1 rounded-[2.5rem] bg-gradient-to-r from-[#00e5a0] to-transparent shadow-[0_0_40px_rgba(0,229,160,0.2)]">
            <div className="p-8 rounded-[2.4rem] bg-[#0a0a0f] border border-white/5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-4xl font-black text-[#00e5a0]">H级</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />)}
                  </div>
                </div>
                <h2 className="text-xl font-bold text-white/90">意向等级：极高意向客户</h2>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">通话时长</div>
                <div className="text-2xl font-mono font-bold">{formatTime(timer)}</div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <section className="glass rounded-3xl p-8">
            <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-6 flex items-center gap-2">
              <MessageSquare size={16} /> 通话摘要
            </h3>
            <p className="text-xl text-white/80 leading-relaxed font-medium">
              "客户对比亚迪宋PLUS有明确兴趣，预算15万左右，希望本周试驾，建议尽快邀约。客户关注空间与二胎家庭补贴政策，置换意向强烈。"
            </p>
          </section>

          {/* Key Info Grid */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: '车型偏好', value: '宋PLUS', icon: '🚗' },
              { label: '预算范围', value: '15万左右', icon: '💰' },
              { label: '购车时间', value: '1个月内', icon: '📅' },
              { label: '竞品关注', value: '哈弗H6', icon: '⚔️' },
            ].map((item) => (
              <div key={item.label} className="glass rounded-2xl p-6 border-white/5 hover:border-white/20 transition-all">
                <div className="text-2xl mb-3">{item.icon}</div>
                <div className="text-[10px] text-white/30 uppercase tracking-widest mb-1">{item.label}</div>
                <div className="text-sm font-bold text-white/90">{item.value}</div>
              </div>
            ))}
          </div>

          {/* Follow-up Management */}
          <section className="glass rounded-3xl p-8 grid grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                <TrendingUp size={16} /> 跟进管理
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
                  <div>
                    <div className="text-xs text-white/40 mb-0.5">阶段成果</div>
                    <div className="text-sm font-bold">已确认意向，可邀约到店</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5" />
                  <div>
                    <div className="text-xs text-white/40 mb-0.5">推荐动作</div>
                    <div className="text-sm font-bold">发送试驾邀请函 + 展厅VR介绍</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest flex items-center gap-2 opacity-0">.</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5" />
                  <div>
                    <div className="text-xs text-white/40 mb-0.5">下次跟进</div>
                    <div className="text-sm font-bold">2026-04-08 (2天后)</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5" />
                  <div>
                    <div className="text-xs text-white/40 mb-0.5">沉睡唤醒</div>
                    <div className="text-sm font-bold">无需（高意向活跃客户）</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="flex gap-4">
            <button 
              onClick={() => {
                setStatus('idle');
                setMessages([]);
                setCurrentScriptIndex(0);
                setTimer(0);
              }}
              className="flex-1 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} /> 返回线索池
            </button>
            <button 
              onClick={onNext}
              className="flex-1 py-5 rounded-2xl bg-white text-black font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xl shadow-white/5"
            >
              跳转 CDP 配置 <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>

      {/* Top Info Bar */}
      <header className="h-24 border-b border-white/10 bg-black/40 backdrop-blur-xl px-8 flex items-center justify-between z-20">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <div className={`w-3 h-3 rounded-full shadow-[0_0_10px_currentColor] ${
              status === 'idle' ? 'text-white/20 bg-current' :
              status === 'calling' ? 'text-blue-500 bg-current animate-pulse' :
              status === 'connected' ? 'text-green-500 bg-current animate-pulse' :
              'text-red-500 bg-current'
            }`} />
            <div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">外呼状态</div>
              <div className="text-sm font-bold uppercase">
                {status === 'idle' && '待呼叫'}
                {status === 'calling' && '呼叫中...'}
                {status === 'connected' && '通话中'}
                {status === 'ended' && '已结束'}
              </div>
            </div>
          </div>

          <div className="h-10 w-[1px] bg-white/10" />

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
              <User size={20} className="text-white/40" />
            </div>
            <div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">客户信息</div>
              <div className="text-sm font-bold">王先生 (138****8821)</div>
            </div>
          </div>
        </div>

        {/* Waveform */}
        <div className="flex-1 max-w-md mx-12 h-12 flex items-center gap-1">
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                height: status === 'connected' ? [4, Math.random() * 32 + 4, 4] : 4 
              }}
              transition={{ repeat: Infinity, duration: 0.5 + Math.random() * 0.5 }}
              className={`flex-1 rounded-full ${status === 'connected' ? 'bg-blue-500/60' : 'bg-white/10'}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">通话计时</div>
            <div className="text-2xl font-mono font-bold text-glow">{formatTime(timer)}</div>
          </div>
          <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all">
            <Settings size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex min-h-0">
        {/* Left: Conversation Area */}
        <div className="flex-1 flex flex-col border-r border-white/10 relative">
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide"
          >
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex flex-col ${msg.sender === 'ai' ? 'items-start' : 'items-end'}`}
                >
                  <span className="text-[10px] font-mono text-white/20 mb-2">{msg.timestamp}</span>
                  <div className="flex items-start gap-3 max-w-[80%]">
                    {msg.sender === 'ai' && (
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 mt-1">
                        <Zap size={14} />
                      </div>
                    )}
                    <div className={`relative p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === 'ai' 
                        ? 'bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/20 text-white/90' 
                        : 'bg-white/5 border border-white/10 text-white/80'
                    }`}>
                      {msg.text.split(/(\d+万|比亚迪宋PLUS|试驾|优惠)/).map((part, i) => (
                        <span key={i} className={msg.highlights?.includes(part) ? 'text-blue-400 font-bold underline decoration-blue-500/30 underline-offset-4' : ''}>
                          {part}
                        </span>
                      ))}

                      {msg.interrupted && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute -right-4 -top-4 px-2 py-1 rounded-lg bg-red-500 text-white text-[10px] font-bold flex items-center gap-1 shadow-lg shadow-red-500/20"
                        >
                          <Flame size={10} /> 用户打断
                        </motion.div>
                      )}

                      {msg.sender === 'ai' && status === 'connected' && currentScriptIndex === messages.indexOf(msg) + 1 && (
                        <div className="absolute -right-8 top-1/2 -translate-y-1/2 flex gap-0.5">
                          {[1, 2, 3].map(i => (
                            <motion.div
                              key={i}
                              animate={{ height: [4, 12, 4] }}
                              transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.2 }}
                              className="w-1 bg-blue-400 rounded-full"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="p-8 bg-black/40 border-t border-white/5 flex items-center justify-center gap-6">
            <button className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all">
              <Mic size={24} />
            </button>
            {status === 'idle' ? (
              <button 
                onClick={startCall}
                className="px-12 py-4 rounded-2xl bg-blue-500 text-white font-black uppercase tracking-widest hover:bg-blue-400 transition-all shadow-xl shadow-blue-500/20 flex items-center gap-3"
              >
                开始外呼 <Phone size={20} />
              </button>
            ) : (
              <button 
                onClick={endCall}
                className="px-12 py-4 rounded-2xl bg-red-500 text-white font-black uppercase tracking-widest hover:bg-red-400 transition-all shadow-xl shadow-red-500/20 flex items-center gap-3"
              >
                结束通话 <PhoneOff size={20} />
              </button>
            )}
            <button className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all">
              <Volume2 size={24} />
            </button>
          </div>
        </div>

        {/* Right: AI Analysis Area */}
        <div className="w-[400px] bg-black/20 p-8 flex flex-col gap-8 overflow-y-auto scrollbar-hide">
          {/* Intent Tracking */}
          <section className="glass rounded-3xl p-6">
            <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-6 flex items-center gap-2">
              <TrendingUp size={12} /> 意图追踪
            </h3>
            <div className="space-y-6">
              {[
                { label: '了解车型', icon: '🚗' },
                { label: '比较价格', icon: '💰' },
                { label: '表达试驾意愿', icon: '📅' }
              ].map((step, i) => (
                <div key={step.label} className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all duration-500 ${
                    intentStep > i ? 'bg-green-500 text-white' : 
                    intentStep === i ? 'bg-blue-500 text-white animate-pulse' : 
                    'bg-white/5 text-white/20'
                  }`}>
                    {intentStep > i ? <CheckCircle2 size={16} /> : step.icon}
                  </div>
                  <div className={`text-sm font-bold transition-colors duration-500 ${intentStep >= i ? 'text-white/90' : 'text-white/20'}`}>
                    {step.label}
                  </div>
                  {i < 2 && (
                    <div className="absolute left-[47px] h-6 w-[1px] bg-white/10" style={{ top: `${84 + i * 56}px` }} />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Keyword Cloud */}
          <section className="glass rounded-3xl p-6 flex-1">
            <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Tag size={12} /> 关键词提取
            </h3>
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {keywords.map((kw) => (
                  <motion.span
                    key={kw}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-default"
                  >
                    {kw}
                  </motion.span>
                ))}
              </AnimatePresence>
              {keywords.length === 0 && (
                <div className="text-xs text-white/10 italic">等待对话生成关键词...</div>
              )}
            </div>
          </section>

          {/* Intent Gauge */}
          <section className="glass rounded-3xl p-6">
            <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Activity size={12} /> 意向等级仪表盘
            </h3>
            <div className="relative pt-4 flex flex-col items-center">
              {/* Semi-circle Gauge */}
              <div className="relative w-48 h-24 overflow-hidden">
                <div className="absolute inset-0 border-[12px] border-white/5 rounded-t-full" />
                <motion.div 
                  className="absolute inset-0 border-[12px] border-blue-500 rounded-t-full"
                  initial={{ rotate: -180 }}
                  animate={{ rotate: -180 + (intentScore / 100) * 180 }}
                  style={{ transformOrigin: 'bottom center', borderImage: 'linear-gradient(to right, #ff4757, #ff6b35, #00d4ff, #00e5a0) 1' }}
                />
                {/* Pointer */}
                <motion.div 
                  className="absolute bottom-0 left-1/2 w-1 h-20 bg-white origin-bottom -translate-x-1/2"
                  initial={{ rotate: -90 }}
                  animate={{ rotate: -90 + (intentScore / 100) * 180 }}
                />
              </div>
              
              <div className="mt-4 flex items-center gap-3">
                <div className={`px-4 py-1 rounded-full text-lg font-black ${getIntentLabel(intentScore).bg} ${getIntentLabel(intentScore).color}`}>
                  {getIntentLabel(intentScore).label}
                </div>
                <div className="text-2xl font-black text-white">{intentScore}%</div>
              </div>
              
              <div className="mt-4 grid grid-cols-4 w-full gap-1">
                {['C', 'B', 'A', 'H'].map((l, i) => (
                  <div key={l} className="text-center">
                    <div className={`text-[10px] font-bold ${i === Math.floor(intentScore/25) ? 'text-white' : 'text-white/20'}`}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default OutboundMonitorPage;
