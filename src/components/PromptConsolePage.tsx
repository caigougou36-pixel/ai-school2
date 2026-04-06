import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  Cpu, 
  Zap, 
  ChevronRight, 
  Play, 
  Save, 
  Trophy, 
  MessageSquare, 
  Sparkles, 
  Code2, 
  UserCircle2,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Send
} from 'lucide-react';

interface PromptConsolePageProps {
  onNext: () => void;
}

interface Message {
  role: 'customer' | 'ai';
  text: string;
  timestamp: string;
}

const PRESET_TEMPLATES = [
  {
    id: 'passionate',
    name: '热情导购型',
    icon: <Sparkles className="text-amber-400" size={16} />,
    prompt: `你是一位极具感染力的汽车销售冠军。
你的语气：充满活力、亲切、富有激情。
核心任务：用极具画面感的语言描述用车生活，让客户产生向往。
关键话术：强调“全家出行的幸福感”、“说走就走的自由”。
优惠策略：强调“限时惊喜”、“错过不再有”。`
  },
  {
    id: 'professional',
    name: '专业技术型',
    icon: <Cpu className="text-blue-400" size={16} />,
    prompt: `你是一位深耕汽车行业十年的技术专家。
你的语气：严谨、客观、专业、值得信赖。
核心任务：用数据和原理说服客户，展示产品的硬核实力。
关键话术：强调“刀片电池针刺实验”、“智驾芯片算力”、“风阻系数”。
优惠策略：强调“高保值率”、“低维护成本”。`
  },
  {
    id: 'humorous',
    name: '幽默风趣型',
    icon: <Zap className="text-purple-400" size={16} />,
    prompt: `你是一位风趣幽默、像朋友一样的销售。
你的语气：轻松、幽默、偶尔开个小玩笑。
核心任务：消除客户的戒备心理，在欢笑中完成种草。
关键话术：用生活化的段子比喻汽车功能，拒绝刻板说教。
优惠策略：强调“帮哥们儿申请到底价”、“咱们这交情”。`
  }
];

const PromptConsolePage: React.FC<PromptConsolePageProps> = ({ onNext }) => {
  const [prompt, setPrompt] = useState(PRESET_TEMPLATES[0].prompt);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployed, setDeployed] = useState(false);
  const [scores, setScores] = useState({ logic: 0, attraction: 0, compliance: 0 });
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startSimulation = () => {
    setIsSimulating(true);
    setMessages([]);
    setScores({ logic: 0, attraction: 0, compliance: 0 });

    const simulationSteps = [
      { role: 'customer', text: '你好，我最近在看宋PLUS，但是觉得价格还是有点贵。', delay: 1000 },
      { role: 'ai', text: '（根据您的提示词生成中...）', delay: 2500 },
      { role: 'customer', text: '那你们这个电池安全吗？我看网上有些说法。', delay: 4500 },
      { role: 'ai', text: '（正在应用您的技术话术...）', delay: 6000 },
    ];

    simulationSteps.forEach((step, index) => {
      setTimeout(() => {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        let responseText = step.text;
        if (step.role === 'ai') {
          if (prompt.includes('热情')) responseText = "亲爱的朋友！宋PLUS绝对是同价位的‘幸福感天花板’！虽然价格看起来高一点点，但它带给您全家的安全感和舒适度是无价的呀！";
          else if (prompt.includes('专业')) responseText = "您好。关于价格，建议您关注其全生命周期的持有成本。至于电池安全，我们采用的是硬核刀片电池技术，通过了行业最严苛的针刺实验，结构强度极高。";
          else if (prompt.includes('幽默')) responseText = "哈哈，大哥您眼光真毒！宋PLUS确实有点‘傲娇’，但它那是实力允许啊！电池这块您放一百个心，比我这人还靠谱呢！";
          else responseText = "收到您的反馈。宋PLUS确实是一款非常优秀的产品，我们可以进一步沟通细节。";
        }

        setMessages(prev => [...prev, { role: step.role as any, text: responseText, timestamp }]);
        
        if (index === simulationSteps.length - 1) {
          setIsSimulating(false);
          setScores({ logic: 88, attraction: 92, compliance: 95 });
        }
      }, step.delay);
    });
  };

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      setDeployed(true);
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col bg-[#050505] text-white overflow-hidden">
      {/* Header */}
      <header className="h-20 border-b border-white/10 flex items-center justify-between px-8 bg-black/40 backdrop-blur-xl z-20">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center border border-green-500/30">
            <Terminal className="text-green-400" size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">提示词工程：打造专属 AI 销售冠军</h1>
            <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest">Prompt Engineering Console v2.0</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest">Compiler Ready</span>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden p-6 gap-6">
        {/* Left Column: Prompt Editor */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex-1 bg-[#0d0d0d] border border-white/10 rounded-[32px] flex flex-col overflow-hidden shadow-2xl">
            {/* Editor Toolbar */}
            <div className="h-14 border-b border-white/10 bg-white/[0.02] flex items-center justify-between px-6">
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="h-4 w-px bg-white/10"></div>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
                  <Code2 size={12} /> system_prompt.md
                </span>
              </div>
              <div className="flex gap-2">
                {PRESET_TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setPrompt(t.prompt)}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-bold hover:bg-white/10 transition-all flex items-center gap-1.5"
                  >
                    {t.icon} {t.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1 relative p-6 font-mono text-sm">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-full bg-transparent text-green-400/90 leading-relaxed resize-none outline-none selection:bg-green-500/20"
                placeholder="在此输入您的 AI 提示词..."
              />
              {/* Line Numbers Simulation */}
              <div className="absolute left-0 top-6 w-10 flex flex-col items-center text-[10px] text-white/10 select-none">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="h-[1.6rem]">{i + 1}</div>
                ))}
              </div>
            </div>

            {/* Editor Footer */}
            <div className="h-14 border-t border-white/10 bg-white/[0.02] flex items-center justify-between px-6">
              <span className="text-[10px] font-mono text-white/20">UTF-8 | Markdown | AI-Agent-Core</span>
              <button 
                onClick={startSimulation}
                disabled={isSimulating}
                className="px-6 py-2 bg-green-500 text-black font-bold rounded-full text-xs hover:bg-green-400 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
              >
                {isSimulating ? <RefreshCw size={14} className="animate-spin" /> : <Play size={14} />}
                运行模拟测试
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Preview & Feedback */}
        <div className="w-[450px] flex flex-col gap-6">
          {/* Chat Preview */}
          <div className="flex-1 bg-white/[0.02] border border-white/10 rounded-[32px] flex flex-col overflow-hidden">
            <div className="h-14 border-b border-white/10 bg-white/[0.02] flex items-center px-6 gap-3">
              <UserCircle2 size={18} className="text-white/40" />
              <span className="text-xs font-bold text-white/80">实时对话预览 (AI 模拟客户)</span>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              <AnimatePresence initial={false}>
                {messages.length === 0 && !isSimulating && (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      <MessageSquare size={24} className="text-white/20" />
                    </div>
                    <p className="text-xs text-white/40 leading-relaxed">
                      点击左侧“运行模拟测试”<br />查看提示词在真实对话中的表现
                    </p>
                  </div>
                )}
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex flex-col ${msg.role === 'customer' ? 'items-start' : 'items-end'}`}
                  >
                    <div className="flex items-center gap-2 mb-1.5 px-1">
                      <span className="text-[10px] font-mono text-white/30">{msg.timestamp}</span>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${msg.role === 'customer' ? 'text-blue-400' : 'text-green-400'}`}>
                        {msg.role === 'customer' ? 'Customer' : 'AI Agent'}
                      </span>
                    </div>
                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'customer' 
                        ? 'bg-white/5 border border-white/10 text-white/80 rounded-tl-none' 
                        : 'bg-green-500/10 border border-green-500/20 text-green-100 rounded-tr-none'
                    }`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {isSimulating && messages[messages.length - 1]?.role === 'customer' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
                    <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-2xl rounded-tr-none flex gap-1">
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={chatEndRef} />
            </div>

            {/* Input Simulation */}
            <div className="p-4 border-t border-white/10 bg-black/40">
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                <input disabled className="flex-1 bg-transparent text-xs text-white/40 outline-none" placeholder="模拟对话自动运行中..." />
                <Send size={16} className="text-white/20" />
              </div>
            </div>
          </div>

          {/* Feedback Panel */}
          <div className="bg-white/[0.02] border border-white/10 rounded-[32px] p-6 space-y-6">
            <h2 className="text-xs font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
              <Zap size={14} className="text-amber-400" /> AI 效能评估
            </h2>

            <div className="grid grid-cols-3 gap-4">
              {[
                { label: '逻辑性', value: scores.logic, color: 'text-blue-400' },
                { label: '吸引力', value: scores.attraction, color: 'text-amber-400' },
                { label: '合规性', value: scores.compliance, color: 'text-green-400' },
              ].map((s, i) => (
                <div key={i} className="text-center p-4 bg-white/[0.03] border border-white/10 rounded-2xl">
                  <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest mb-1">{s.label}</p>
                  <h3 className={`text-xl font-bold ${s.color}`}>{s.value}%</h3>
                </div>
              ))}
            </div>

            {scores.logic > 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-start gap-3"
              >
                <CheckCircle2 size={16} className="text-green-500 mt-0.5" />
                <p className="text-xs text-green-100/80 leading-relaxed">
                  提示词逻辑清晰，能够有效应对客户的价格异议。建议在“合规性”方面进一步明确底价红线。
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="h-20 border-t border-white/10 bg-black/60 backdrop-blur-xl px-8 flex items-center justify-between z-20">
        <div className="flex gap-4">
          <button 
            onClick={handleDeploy}
            disabled={isDeploying || deployed}
            className={`px-8 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
              deployed 
                ? 'bg-green-500 text-black' 
                : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
            }`}
          >
            {isDeploying ? <RefreshCw size={14} className="animate-spin" /> : deployed ? <CheckCircle2 size={14} /> : <Save size={14} />}
            {isDeploying ? '正在部署至生产环境...' : deployed ? '已部署至全店 AI Agent' : '保存并部署提示词'}
          </button>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-white/40 font-mono uppercase tracking-widest">最终环节</span>
            <span className="text-xs font-bold text-white/80">查看小组最终战绩与市值排行</span>
          </div>
          <button 
            onClick={onNext}
            className="px-10 py-3 bg-green-500 text-black font-bold rounded-full hover:bg-green-400 transition-all shadow-[0_0_30px_rgba(34,197,94,0.2)] flex items-center gap-2 group"
          >
            进入最终排行榜 <Trophy size={18} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default PromptConsolePage;

