"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Settings, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { p } from "framer-motion/client";

/*  TYPES  */
type Message = {
  id: number;
  role: "user" | "ai";
  text: string;
  glitch?: boolean;
};

type Props = {
  onClose: () => void;
};

/*  SOUND  */
const playSound = (type: "boot" | "send" | "ai") => {
  const audio = new Audio(
    type === "boot"
      ? "/sounds/boot.mp3"
      : type === "send"
      ? "/sounds/send.mp3"
      : "/sounds/ai.mp3"
  );
  audio.volume = type === "ai" ? 0.2 : 0.4;
  audio.currentTime = 0;
  audio.play().catch(() => { });
};

/*  AI LOGIC (simple mock)  */
const getAIResponse = (input: string) => {
  const text = input.toLowerCase();

  if (text.includes("hello") || text.includes("hi") || text.includes("hey") || text.includes("السلام عليكم")) {
    return "👁️ Connection established. Hello user.";
  }

  if (text.includes("who are you")) {
    return "I am NEURAL_CORE. A simulated consciousness layer.";
  }

  if (text.includes("build") || text.includes("code")) {
    return "I can assist. Architecture patterns detected in your request.";
  }

  if (text.includes("name")) {
    return "You may call me CORE.";
  }

  return "Signal received... processing neural patterns...";
};

/*  TYPING DOTS  */
const Typing = () => (
  <div className="flex gap-1 items-center">
    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.2s]" />
    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.1s]" />
    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
  </div>
);


/*  COMPONENT  */
export default function ChatInterface({ onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "ai",
      text: "NEURAL CORE ONLINE. Awaiting input...",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  /* auto scroll */
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  /* send */
  const sendMessage = () => {
    if (!input.trim()) return;

    const userInput = input;

    playSound("send");

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      text: userInput,
      glitch: true,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      setLoading(true);
    }, 300);

    setTimeout(() => {
      const aiMsg: Message = {
        id: Date.now() + 1,
        role: "ai",
        text: getAIResponse(userInput),
        glitch: true,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setLoading(false);

      setTimeout(() => {
        playSound("ai");
      }, 200);
    }, 1200);
  };

  return (
    <div className="w-full max-w-5xl mx-auto h-[85vh] md:h-[75vh] flex flex-col rounded-t-2xl md:rounded-2xl overflow-hidden border border-cyan-400/20 bg-black/80 backdrop-blur-2xl shadow-2xl">

      {/* HEADER */}
      <div className="flex justify-between items-center p-3 md:p-4 border-b border-cyan-400/10 bg-cyan-400/5">
        <div className="flex items-center gap-2 md:gap-3">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_#2ff801]" />
          <p className="text-[8px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] text-cyan-300 font-mono">
            NEURAL_CORE_ACTIVE
          </p>
        </div>

        <div className="flex gap-3 text-gray-400">
          <Settings size={14} className="md:w-4 md:h-4 cursor-pointer hover:text-white transition"/>
          <X 
            size={16} 
            onClick={onClose} 
            className="cursor-pointer hover:text-white transition"
          />
        </div>
      </div>

      {/* CHAT */}
      <div className="flex-1 p-3 md:p-5 overflow-y-auto space-y-4 md:space-y-5 text-sm font-mono scrollbar-hide">

        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              className={`flex gap-2 md:gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"
                }`}
            >
              {msg.role === "ai" && (
                <div className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 rounded bg-cyan-400/20 border border-cyan-400/30" />
              )}

              <div
                className={`max-w-[86%] md:max-w-[70%] p-2.5 md:p-3 rounded-xl border text-[11px] md:text-xs leading-relaxed ${msg.role === "user"
                  ? "bg-cyan-400/10 border-cyan-400/30 text-cyan-200"
                  : "bg-white/5 border-white/10 text-gray-200"
                  } ${msg.glitch ? "animate-pulse" : ""}`}
              >
                <p className="opacity-50 text-[8px] md:text-[9px] mb-1">
                  {msg.role === "ai" ? "SYSTEM" : "YOU"}
                </p>
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <div className="flex gap-2 md:gap-3 items-center">
            <div className="w-5 h-5 md:w-6 md:h-6 bg-cyan-400/20 border border-cyan-400/30 rounded" />
            <Typing />
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      {/* INPUT */}
      <div className="p-3 md:p-4 border-t border-cyan-400/10 bg-black/40">
        <div className="relative max-w-4xl mx-auto">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="ENTER COMMAND..."
            className="w-full bg-white/5 border border-cyan-400/20 rounded-full py-2.5 md:py-3 px-4 md:px-5 text-[11px] md:text-xs outline-none focus:border-cyan-400/50 transition-all placeholder:text-cyan-900 text-cyan-100"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button
            onClick={sendMessage}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-9 md:h-9 bg-cyan-400 rounded-full flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={12} className="md:w-[14px] md:h-[14px]" />
          </button>
        </div>
      </div>
    </div>
  );
}