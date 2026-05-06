import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Home, 
  PlusCircle, 
  Radio, 
  Users, 
  User, 
  Bell, 
  Mic, 
  Check, 
  AlertTriangle,
  Send,
  Leaf,
  MessageCircle,
  Settings,
  ChevronRight,
  Wind,
  Utensils
} from "lucide-react";
import { AuthProvider, useAuth } from "./lib/AuthContext";
import { cn } from "./lib/utils";

// --- Theme Constants ---
const THEME = {
  background: "bg-zinc-950",
  surface: "bg-zinc-900",
  card: "bg-zinc-900/50",
  border: "border-zinc-800",
  primary: "text-indigo-400",
  primaryBg: "bg-indigo-600",
  secondary: "text-zinc-400",
  accent: "bg-indigo-500",
  textMuted: "text-zinc-500",
};

// --- Mock Data ---
const CIRCLE_POSTS = [
  { id: 1, user: "NightOwl99", time: "10m ago", content: "Feeling a bit stressed tonight, but sticking to my plan.", likes: 12, hands: 4, color: "bg-indigo-500" },
  { id: 2, user: "QuietStorm", time: "2h ago", content: "Just finished a 10-minute urge surfing session. The wave passed. Proud of myself today.", likes: 24, hands: 8, color: "bg-zinc-700" }
];

// --- Types ---
type Screen = "home" | "onboarding" | "sos" | "circles" | "profile" | "add" | "food";

function Dashboard({ onSOS }: { onSOS: () => void }) {
  return (
    <div className="flex-grow grid grid-cols-1 md:grid-cols-4 grid-rows-auto gap-4 pb-32">
      {/* AI Sponsor Card - Large Bento Card */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(THEME.card, THEME.border, "p-8 rounded-[32px] border md:col-span-2 md:row-span-2 relative overflow-hidden flex flex-col justify-between group")}
      >
        <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        <div className="flex gap-4 items-start relative z-10 text-left">
          <div className="w-14 h-14 rounded-[20px] bg-indigo-500/10 flex items-center justify-center shrink-0 border border-indigo-500/20 shadow-inner">
            <Leaf className="text-indigo-400 size-7" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold font-mono">SYSTEM_SPONSOR</span>
              <span className="size-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            </div>
            <p className="text-zinc-100 text-xl leading-snug font-light italic">
              "You've been doing great today. Remember to take a deep breath. We are here when you are ready."
            </p>
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-1 gap-2 relative z-10 text-left">
           <p className="text-[9px] text-zinc-600 uppercase font-bold tracking-widest mb-1">Encrypted_Logs</p>
           <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
             <div className="h-full bg-indigo-500 w-[65%]" />
           </div>
           <div className="flex justify-between text-[8px] font-mono text-zinc-500">
             <span>INTEGRITY: HIGH</span>
             <span>SYNC_DELAY: 12ms</span>
           </div>
        </div>
      </motion.section>

      {/* Stats Card - Smaller Bento */}
      <div className={cn(THEME.card, THEME.border, "p-6 rounded-[32px] border md:col-span-1 flex flex-col justify-center items-center text-center gap-2 group")}>
        <div className="relative size-20 flex items-center justify-center">
          <svg className="size-full -rotate-90">
            <circle cx="40" cy="40" r="36" fill="transparent" stroke="#27272a" strokeWidth="6" />
            <circle cx="40" cy="40" r="36" fill="transparent" stroke="#6366f1" strokeWidth="6" strokeDasharray="226" strokeDashoffset="56" />
          </svg>
          <span className="absolute text-xl font-bold font-mono text-zinc-100">05</span>
        </div>
        <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold font-mono">Log_Streak</p>
      </div>

      {/* Identity Card - Smaller Bento */}
      <div className={cn(THEME.card, THEME.border, "p-6 rounded-[32px] border md:col-span-1 flex flex-col justify-between group overflow-hidden relative")}>
        <div className="absolute right-0 top-0 size-20 bg-indigo-500/10 blur-2xl group-hover:bg-indigo-500/20 transition-all pointer-events-none" />
        <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-4 font-mono">MESH_RANK</p>
        <p className="text-3xl font-mono text-indigo-400">#42</p>
        <p className="text-[9px] text-zinc-600 mt-1 uppercase">Top 12% Anonymity</p>
      </div>

      {/* Check-ins - Medium Bento Card */}
      <section className={cn(THEME.card, THEME.border, "p-6 rounded-[32px] border md:col-span-2 space-y-6 flex flex-col justify-center")}>
        <div className="flex justify-between items-center px-2">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 font-mono">DAILY_PROTOCOL</h2>
          <Check className="size-4 text-zinc-600" />
        </div>
        <div className="flex flex-wrap gap-2 px-2">
          {["Breakfast", "Lunch"].map((m) => (
            <div key={m} className="px-4 py-2 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center gap-3 shadow-inner">
              <div className="size-4 rounded-full bg-indigo-500 flex items-center justify-center">
                <Check className="size-2.5 text-zinc-950" />
              </div>
              <span className="text-xs font-medium text-zinc-100 font-mono uppercase">{m}</span>
            </div>
          ))}
          <div className="px-4 py-2 rounded-2xl bg-zinc-950/30 border border-zinc-800/50 opacity-50 flex items-center gap-3">
            <div className="size-4 rounded-full border border-zinc-700" />
            <span className="text-xs font-medium text-zinc-500 font-mono uppercase">Dinner</span>
          </div>
        </div>
      </section>

      {/* SOS Button - Final Block */}
      <div className="md:col-span-4 flex justify-center py-4">
        <motion.button 
          whileHover={{ scale: 1.01, backgroundColor: "#e11d48" }}
          whileTap={{ scale: 0.99 }}
          onClick={onSOS}
          className="w-full max-w-2xl h-[72px] rounded-[32px] bg-rose-600 text-white font-bold flex items-center justify-center gap-4 shadow-xl shadow-rose-900/20 uppercase tracking-[0.2em] text-xs font-mono"
        >
          <div className="size-8 rounded-lg bg-white/20 flex items-center justify-center">
             <Radio className="size-4" />
          </div>
          <span>INITIATE_SOS_SIGNAL</span>
          <span className="px-2 py-0.5 bg-black/20 rounded-md border border-white/10 uppercase">LVL_4</span>
        </motion.button>
      </div>
    </div>
  );
}

function SOSScreen() {
  const [remind, setRemind] = useState(false);
  const [showTellPrompt, setShowTellPrompt] = useState(false);

  return (
    <div className="flex-grow flex flex-col items-center justify-center gap-12 pb-32 max-w-sm mx-auto w-full relative">
      <h1 className="text-4xl font-extralight text-zinc-100 tracking-tight text-center italic uppercase tracking-widest leading-none">Take a breath.</h1>
      
      <div className="relative size-64 flex items-center justify-center">
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full border-2 border-indigo-500/20"
        />
        <motion.div 
          animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 5, delay: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-8 rounded-full border border-indigo-500/10"
        />
        <div className="size-32 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-indigo-500/5 group-hover:bg-indigo-500/10 transition-colors" />
          <Wind className="text-indigo-400 size-12 relative z-10" />
        </div>
      </div>

      <div className="w-full space-y-4">
        <div className={cn(THEME.card, THEME.border, "p-8 rounded-[32px] border text-center min-h-[120px] flex items-center justify-center overflow-hidden")}>
          <AnimatePresence mode="wait">
            {!remind ? (
              <motion.p 
                key="orig" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="text-zinc-300 text-lg font-light leading-relaxed font-mono uppercase text-xs"
              >
                It's 11:40pm. You've had a long day. What's really going on?
              </motion.p>
            ) : (
              <motion.p 
                key="remind" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="text-indigo-400 text-sm font-bold leading-relaxed italic"
              >
                Recall the clarity you felt on day 1. You started this because you value your presence more than the urge. 10 minutes is all we ask.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          <button 
            onClick={() => setRemind(!remind)}
            className="h-[64px] rounded-[24px] bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-all font-medium uppercase tracking-widest text-[10px] font-mono"
          >
            I need 10 minutes
          </button>
          <button 
            onClick={() => setShowTellPrompt(true)}
            className="h-[64px] rounded-[24px] bg-indigo-600 text-white font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-indigo-500/20 font-mono"
          >
            Tell my circle
          </button>
        </div>
        
        <button className="w-full py-2 text-[10px] text-zinc-600 uppercase tracking-widest hover:text-zinc-400 transition-colors text-center font-mono">
          I'm going to order anyway
        </button>
      </div>

      <AnimatePresence>
        {showTellPrompt && (
          <FloatingPrompt 
            title="Signal the Circle"
            placeholder="Type your signal..."
            onClose={() => setShowTellPrompt(false)}
            onSend={(msg) => { console.log("Signal sent:", msg); setShowTellPrompt(false); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function CircleScreen() {
  const [posts, setPosts] = useState(CIRCLE_POSTS);
  const [promptData, setPromptData] = useState<{ title: string; onSend: (s: string) => void } | null>(null);
  const [aiChat, setAIChat] = useState(false);

  const handleReaction = (id: number, type: 'likes' | 'hands') => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, [type]: p[type] + 1 } : p));
  };

  return (
    <div className="flex-grow flex flex-col gap-8 pb-32 relative">
      <section className={cn(THEME.card, THEME.border, "p-6 rounded-[24px] border")}>
        <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4 font-mono">Your Circle</h2>
        <div className="flex -space-x-3">
          {[1,2,3].map(i => (
            <div key={i} className={cn("size-12 rounded-full border-4 border-zinc-900 flex items-center justify-center font-bold text-xs shadow-lg", 
              i === 1 ? "bg-indigo-500" : i === 2 ? "bg-rose-500" : "bg-emerald-500")}>
              U{i}
            </div>
          ))}
          <div className="size-12 rounded-full border-4 border-zinc-900 bg-zinc-800 flex items-center justify-center font-bold text-xs text-zinc-500 italic">
            +4
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* SOS Card - Large in Flow */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-8 rounded-[32px] bg-rose-500/10 border border-rose-500/20 border-l-4 border-l-rose-500 space-y-6 md:col-span-2"
        >
          <div className="flex gap-4 items-center text-rose-500">
            <AlertTriangle className="size-5" />
            <span className="text-xs font-bold uppercase tracking-widest font-mono">Support Needed</span>
          </div>
          <p className="text-zinc-100 leading-relaxed font-light text-lg text-left">
            <strong>User-420</strong> just hit SOS. Send support?
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => { console.log("Support heart sent"); }}
              className="px-8 h-[56px] rounded-[20px] bg-indigo-600 text-white font-bold text-[10px] uppercase tracking-widest font-mono hover:bg-indigo-500 transition-colors"
            >
              Send 💙
            </button>
            <button 
              onClick={() => setPromptData({ 
                title: "Support User-420", 
                onSend: (m) => { console.log("Message sent to User-420:", m); setPromptData(null); } 
              })}
              className="px-8 h-[56px] rounded-[20px] bg-zinc-900 border border-zinc-800 text-zinc-300 text-[10px] uppercase tracking-widest font-mono hover:bg-zinc-800 transition-colors"
            >
              Message
            </button>
          </div>
        </motion.div>

        {posts.map(post => (
          <article key={post.id} className={cn(THEME.card, THEME.border, "p-8 rounded-[32px] border space-y-6")}>
            <div className="flex gap-4 items-center text-left">
              <div className={cn("size-8 rounded-full", post.color.replace('bg-[#', 'bg-zinc-700'))} />
              <div>
                <p className="text-sm font-bold text-zinc-100 font-mono uppercase text-xs">{post.user}</p>
                <p className="text-[10px] text-zinc-500 uppercase font-mono">{post.time} • #TheHole</p>
              </div>
            </div>
            <p className="text-zinc-300 leading-relaxed font-light italic text-left">"{post.content}"</p>
            <div className="flex gap-2">
              <button 
                onClick={() => handleReaction(post.id, 'likes')}
                className="px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-[10px] text-zinc-400 flex items-center gap-2 hover:bg-zinc-800 transition-colors uppercase font-mono"
              >
                <span className="text-indigo-400">💙</span> {post.likes}
              </button>
              <button 
                onClick={() => handleReaction(post.id, 'hands')}
                className="px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-[10px] text-zinc-400 flex items-center gap-2 hover:bg-zinc-800 transition-colors uppercase font-mono"
              >
                <span className="text-indigo-400">🙌</span> {post.hands}
              </button>
            </div>
          </article>
        ))}
      </div>

      <button 
        onClick={() => setAIChat(true)}
        className="fixed bottom-28 right-8 size-14 rounded-full bg-indigo-600 shadow-2xl shadow-indigo-500/40 flex items-center justify-center text-white transition-transform hover:scale-110 active:scale-95 z-40"
      >
        <MessageCircle className="size-6" />
      </button>

      <AnimatePresence>
        {promptData && (
          <FloatingPrompt 
            title={promptData.title}
            placeholder="Type your words..."
            onClose={() => setPromptData(null)}
            onSend={promptData.onSend}
          />
        )}
        {aiChat && (
          <AIChatModal onClose={() => setAIChat(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function FloatingPrompt({ title, placeholder, onClose, onSend }: { title: string; placeholder: string; onClose: () => void; onSend: (s: string) => void }) {
  const [text, setText] = useState("");
  return (
    <motion.div 
      initial={{ y: 200, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 200, opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end justify-center p-6 bg-black/40 backdrop-blur-sm pointer-events-auto"
    >
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-[32px] p-6 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-bold font-mono text-zinc-500 uppercase tracking-widest">{title}</h3>
          <button onClick={onClose} className="text-zinc-600 hover:text-white p-1 transition-colors"><Check className="size-4 rotate-45" /></button>
        </div>
        <textarea 
          autoFocus
          value={text} onChange={e => setText(e.target.value)}
          placeholder={placeholder}
          className="w-full h-32 bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-sm text-white placeholder-zinc-700 outline-none focus:border-indigo-500/50 transition-colors"
        />
        <button 
          onClick={() => onSend(text)}
          className="w-full h-[56px] bg-indigo-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 uppercase tracking-widest text-[10px] font-mono shadow-lg shadow-indigo-600/20 active:scale-95 transition-transform"
        >
          Send Signal <Send className="size-4" />
        </button>
      </div>
    </motion.div>
  );
}

function AIChatModal({ onClose }: { onClose: () => void }) {
  const [input, setInput] = useState("");
  return (
    <motion.div 
      initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 300, opacity: 0 }}
      className="fixed inset-y-0 right-0 w-full max-w-sm z-[100] bg-zinc-950 border-l border-zinc-800 shadow-2xl flex flex-col pointer-events-auto"
    >
      <header className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-950/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <Leaf className="text-white size-4" />
          </div>
          <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest">AI_SPONSOR_LLM</span>
        </div>
        <button onClick={onClose} className="text-zinc-500 hover:text-white font-mono text-[10px] uppercase tracking-widest transition-colors">Disconnect</button>
      </header>
      <div className="flex-grow p-6 space-y-6 overflow-y-auto">
        <div className="bg-zinc-900 p-4 rounded-2xl text-left border border-zinc-800/50">
          <p className="text-zinc-300 text-sm italic font-light leading-relaxed">
            "Hello Shadow Mouse. I've noticed you've been surfing some heavy waves today. How can I facilitate your calm?"
          </p>
        </div>
      </div>
      <div className="p-6 border-t border-zinc-800 bg-zinc-950">
        <div className="relative">
          <input 
            type="text" 
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Encrypt signal..." 
            className="w-full h-12 bg-zinc-900 border border-zinc-800 rounded-xl px-4 pr-12 text-sm outline-none focus:border-indigo-500 transition-colors"
          />
          <button 
            onClick={() => { setInput(""); }}
            className="absolute right-2 top-2 p-2 text-indigo-400 hover:text-white transition-colors"
          >
            <Send className="size-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function FoodLoggingScreen() {
  const [isLogging, setIsLogging] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const startLogging = () => {
    setIsLogging(true);
    setTimeout(() => {
      setIsLogging(false);
      setShowResult(true);
    }, 3000);
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center gap-12 pb-32 max-w-sm mx-auto w-full">
      <h1 className="text-4xl font-extralight text-zinc-100 tracking-tight text-center italic uppercase tracking-widest leading-none">What did you eat?</h1>
      
      <div className="relative size-64 flex items-center justify-center">
        <motion.div 
          animate={isLogging ? { scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] } : { scale: 1, opacity: 0.1 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full border-2 border-emerald-500/20"
        />
        <motion.button 
          onClick={startLogging}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "size-32 rounded-full border flex items-center justify-center shadow-2xl transition-all duration-500 active:bg-zinc-800",
            isLogging ? "bg-emerald-600 border-emerald-400 shadow-emerald-500/20" : "bg-zinc-900 border-zinc-800"
          )}
        >
          <Mic className={cn("size-10 transition-colors", isLogging ? "text-white" : "text-emerald-400")} />
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {isLogging ? (
          <motion.div 
            key="logging" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-emerald-400 font-mono text-xs uppercase tracking-widest animate-pulse"
          >
            Listening...
          </motion.div>
        ) : !showResult ? (
          <motion.div 
            key="prompt" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className={cn(THEME.card, THEME.border, "p-8 rounded-[32px] border text-center w-full")}
          >
            <p className="text-zinc-500 text-sm font-light leading-relaxed italic">
              "I just had a grilled chicken salad with some..."
            </p>
          </motion.div>
        ) : (
          <motion.div 
            key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className={cn(THEME.card, THEME.border, "p-6 rounded-[32px] border bg-zinc-900/80 backdrop-blur-xl w-full space-y-6")}
          >
            <div className="flex gap-4 items-center text-left">
              <div className="size-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <Utensils className="text-emerald-400 size-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-100 font-mono uppercase tracking-tight">Grilled Chicken Salad</h3>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Suggested Match</p>
              </div>
            </div>

            <div className="flex gap-2">
              <span className="px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-[10px] text-zinc-400 font-mono">450 KCAL</span>
              <span className="px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-[10px] text-emerald-500 font-mono uppercase">Healthy</span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button 
                onClick={() => setShowResult(false)}
                className="h-[56px] rounded-[20px] bg-emerald-600 text-white font-bold text-[10px] uppercase tracking-widest font-mono flex items-center justify-center gap-2"
              >
                Looks Right <Check className="size-4" />
              </button>
              <button 
                className="h-[56px] rounded-[20px] bg-zinc-950 border border-zinc-800 text-zinc-300 text-[10px] uppercase tracking-widest font-mono hover:bg-zinc-800 transition-colors text-center flex items-center justify-center"
              >
                Edit
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AliasScreen() {
  const { profile, logout } = useAuth();
  return (
    <div className="flex-grow flex flex-col gap-8 pb-32 max-w-md mx-auto w-full">
      <section className={cn(THEME.card, THEME.border, "p-8 rounded-[32px] border text-center space-y-6 bg-gradient-to-br from-zinc-900 to-zinc-950")}>
        <div className="size-24 rounded-[32px] bg-indigo-600 mx-auto flex items-center justify-center shadow-2xl relative group overflow-hidden">
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="size-12 bg-white rounded-lg rotate-45 transform group-hover:rotate-[225deg] transition-transform duration-700 shadow-lg" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white tracking-widest uppercase font-mono">Shadow_Mous_{profile?.uid?.slice(-5)}</h2>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="size-1.5 rounded-full bg-green-500 animate-pulse" />
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Identity Rating: Excellent</p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-3 uppercase font-mono text-[10px] tracking-widest font-bold">
        <p className="px-6 text-zinc-600 mb-2">Security Protocol</p>
        <button className="w-full h-[64px] bg-zinc-900 border border-zinc-800 rounded-[20px] px-6 flex items-center justify-between hover:bg-zinc-800 transition-all text-zinc-300 group">
          <span>Rotate_Alias_Key</span>
          <ChevronRight className="size-4 text-zinc-600 group-hover:text-indigo-400 transform group-hover:translate-x-1 transition-all" />
        </button>
        <button className="w-full h-[64px] bg-zinc-900 border border-zinc-800 rounded-[20px] px-6 flex items-center justify-between hover:bg-zinc-800 transition-all text-zinc-300 group">
          <span>Encryption_Logs</span>
          <ChevronRight className="size-4 text-zinc-600 group-hover:text-indigo-400 transform group-hover:translate-x-1 transition-all" />
        </button>
        
        <p className="px-6 text-zinc-600 mt-6 mb-2">Vault Settings</p>
        <button className="w-full h-[64px] bg-zinc-900 border border-zinc-800 rounded-[20px] px-6 flex items-center justify-between hover:bg-zinc-800 transition-all text-zinc-300 group">
          <span>Clean_Profile_Metadata</span>
          <ChevronRight className="size-4 text-zinc-600 group-hover:text-indigo-400 transform group-hover:translate-x-1 transition-all" />
        </button>
        <button className="w-full h-[64px] bg-zinc-900 border border-zinc-800 rounded-[20px] px-6 flex items-center justify-between hover:bg-zinc-800 transition-all text-zinc-300 group">
          <span>Advanced_Privacy</span>
          <ChevronRight className="size-4 text-zinc-600 group-hover:text-indigo-400 transform group-hover:translate-x-1 transition-all" />
        </button>

        <button 
          onClick={logout}
          className="w-full h-[64px] bg-rose-900/10 border border-rose-900/30 text-rose-500 rounded-[24px] px-6 flex items-center justify-between hover:bg-rose-900/20 active:scale-95 transition-all mt-8"
        >
          <span>Terminate_Session_Immediate</span>
          <Radio className="size-4 text-rose-500 animate-pulse" />
        </button>
      </div>
    </div>
  );
}

function MainApp() {
  const [screen, setScreen] = useState<Screen>("home");
  const { loading, user, profile, signIn } = useAuth();

  if (loading) return (
    <div className={cn(THEME.background, "min-h-screen flex items-center justify-center")}>
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="size-8 border-2 border-indigo-500 border-t-transparent rounded-full"
      />
    </div>
  );

  if (!user) {
    return (
      <div className={cn(THEME.background, "min-h-screen flex flex-col items-center justify-center p-8 text-center space-y-12")}>
        <div className="space-y-4">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="size-24 bg-indigo-600 rounded-[32px] mx-auto flex items-center justify-center shadow-2xl shadow-indigo-500/20"
          >
            <div className="size-12 bg-white rounded-lg rotate-45" />
          </motion.div>
          <h1 className="text-4xl font-extralight text-zinc-100 tracking-tighter uppercase italic">Anonymouse</h1>
          <p className="text-zinc-500 max-w-xs mx-auto text-sm leading-relaxed font-light">
            A secure, anonymous harbor for mindful habit tracking and mutual support.
          </p>
        </div>

        <button 
          onClick={signIn}
          className="w-full max-w-xs h-[64px] bg-zinc-100 text-zinc-900 rounded-[24px] font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-white transition-all shadow-xl shadow-white/5"
        >
          <User className="size-4" />
          Enter the Safe Harbor
        </button>
        
        <p className="text-[10px] text-zinc-700 uppercase tracking-[0.2em] font-mono">
          SIGNAL_STATUS: ENCRYPTED
        </p>
      </div>
    );
  }

  return (
    <div className={cn(THEME.background, "min-h-screen flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200 font-sans")}>
      {/* AppBar */}
      <header className="px-container_padding h-20 border-b border-zinc-900 flex justify-between items-center sticky top-0 bg-zinc-950/80 backdrop-blur-md z-50">
        <div className="flex gap-4 items-center">
          <div className="size-10 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-900/20">
            <div className="size-5 bg-white rounded-sm rotate-45" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold font-mono leading-none">ALIAS_ACTIVE</span>
            <h1 className="text-sm font-mono text-zinc-100 tracking-tighter">Shadow_Mous_{profile?.displayName?.split('_')[1] || "42"}</h1>
          </div>
        </div>
        
        <nav className="hidden lg:flex gap-8 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] font-mono">
          <button onClick={() => setScreen("home")} className={cn("hover:text-indigo-400 transition-colors", screen === "home" && "text-indigo-400")}>Vault</button>
          <button onClick={() => setScreen("circles")} className={cn("hover:text-indigo-400 transition-colors", screen === "circles" && "text-indigo-400")}>Mesh Feed</button>
          <button className="hover:text-indigo-400 transition-colors">The Holes</button>
        </nav>

        <button 
          onClick={() => setScreen("profile")}
          className={cn("size-10 rounded-lg border border-zinc-800 bg-zinc-900 flex items-center justify-center transition-colors", screen === "profile" ? "text-indigo-400 border-indigo-500/50" : "text-zinc-500 hover:text-indigo-400")}
        >
          <Settings className="size-4" />
        </button>
      </header>

      {/* Screen Content */}
      <main className="px-container_padding pt-8 flex-grow flex flex-col container mx-auto max-w-5xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex flex-col flex-grow"
          >
            {screen === "home" && <Dashboard onSOS={() => setScreen("sos")} />}
            {screen === "sos" && <SOSScreen />}
            {screen === "food" && <FoodLoggingScreen />}
            {screen === "circles" && <CircleScreen />}
            {screen === "profile" && <AliasScreen />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none z-[60]">
        <div className="max-w-md mx-auto h-[64px] bg-zinc-900/90 backdrop-blur-2xl rounded-[20px] border border-zinc-800 flex items-center justify-around px-2 shadow-2xl pointer-events-auto">
          {[
            { id: "home", icon: Home, label: "Vault" },
            { id: "circles", icon: Users, label: "Mesh" },
            { id: "food", icon: PlusCircle, label: "Log", customStyle: "bg-emerald-600/10 text-emerald-400 border border-emerald-500/20 rounded-xl" },
            { id: "sos", icon: Radio, label: "SOS" },
            { id: "profile", icon: User, label: "Alias" }
          ].map((item: any) => (
            <button
              key={item.id}
              onClick={() => setScreen(item.id)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-all duration-300 px-4 h-full",
                item.customStyle && "mx-1 mt-1 mb-1",
                screen === item.id 
                  ? item.customStyle ? "text-emerald-400 border-none scale-105" : "text-indigo-400 border-b-2 border-indigo-500 -mb-0.5" 
                  : "text-zinc-600 hover:text-zinc-300"
              )}
            >
              <div className={cn("p-1.5", screen === item.id && item.customStyle && item.customStyle)}>
                <item.icon className="size-5" />
              </div>
              <span className="text-[8px] font-bold uppercase tracking-widest font-mono">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Status Bar */}
      <footer className="h-8 bg-indigo-600 text-white flex items-center justify-between px-8 text-[9px] font-mono tracking-widest uppercase shrink-0 sticky bottom-0 z-[70] overflow-hidden">
        <div className="flex gap-4">
          <span className="flex items-center gap-1"><span className="size-1 bg-white rounded-full animate-pulse" /> Node: AIS-EAST-1</span>
          <span>Mesh Latency: 12ms</span>
        </div>
        <div className="hidden sm:flex gap-4">
          <span>Security Status: Optimal</span>
          <span>Identity Rating: Excellent</span>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
