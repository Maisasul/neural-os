"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import ChatInterface from "@/components/ChatInterface";
import { audio, b, s } from "framer-motion/client";

/*  TYPES  */
type Stage =
  | "idle"
  | "glitch"
  | "ignite"
  | "awake-eye"
  | "typing"
  | "online"
  | "chat"
  | "closing";

/*  NEURAL TEXTURE  */
const NeuralTexture = ({ isActive }: { isActive: boolean }) => (
  <motion.svg
    viewBox="0 0 200 200"
    className="absolute w-full h-full opacity-30 mix-blend-screen p-10"
    animate={{ scale: isActive ? [1, 1.1, 1] : [1, 1.05, 1] }}
    transition={{ duration: 4, repeat: Infinity }}
  >
    {[...Array(8)].map((_, i) => (
      <motion.path
        key={i}
        d={`M ${10 + i * 25} 0 Q ${100 + (i - 4) * 20} 100 ${190 - i * 25} 200`}
        fill="none"
        stroke="#00D4FF"
        strokeWidth="0.5"
        initial={{ pathLength: 0, opacity: 0.1 }}
        animate={{
          pathLength: [0.2, 0.8, 0.2],
          opacity: isActive ? [0.3, 0.7, 0.3] : [0.1, 0.3, 0.1],
          pathOffset: [0, 1],
        }}
        transition={{
          duration: 3 + i,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    ))}
  </motion.svg>
);

/*  TYPING  */
const useTyping = (text: string, speed = 30) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayed("");

    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text]);

  return displayed;
};

/*  sound  */


/*  COMPONENT  */
const Hero = () => {
  const [stage, setStage] = useState<Stage>("idle");
  const bootAudio = useRef<HTMLAudioElement | null>(null);
  const shutdownAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    bootAudio.current = new Audio("/sounds/boot.mp3");
    shutdownAudio.current = new Audio("/sounds/shutdown.mp3");

    if (bootAudio.current) {
      bootAudio.current.volume = 0.4;
      bootAudio.current.loop = false;
    }
    if (shutdownAudio.current) shutdownAudio.current.volume = 0.4;
  }, []);

  const stopAudio = (audio: HTMLAudioElement | null) => {
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  };

  const startSequence = () => {
    stopAudio(shutdownAudio.current);

    bootAudio.current?.play();

    setStage("glitch");

    setTimeout(() => setStage("ignite"), 350);
    setTimeout(() => setStage("awake-eye"), 900);
    setTimeout(() => setStage("typing"), 1500);
    setTimeout(() => setStage("online"), 2400);
    setTimeout(() => setStage("chat"), 4200);
  };
  useEffect(() => {
    if (stage === "chat") {
      stopAudio(bootAudio.current); 
    }
  }, [stage]);

  const handleCloseChat = () => {
    stopAudio(bootAudio.current);
    shutdownAudio.current?.play();
    
    setStage("closing");

    shutdownAudio.current?.play();

    setTimeout(() => {
      setStage("idle");
    }, 900);
  };

  const typedText = useTyping(
    stage === "idle"
      ? "System dormant. Press to initiate..."
      : stage === "glitch"
        ? "Signal interference detected..."
        : stage === "ignite"
          ? "Booting neural core..."
          : stage === "awake-eye"
            ? "Activating visual system..."
            : stage === "typing"
              ? "Initializing consciousness..."
              : stage === "online"
                ? "System online. Connection stable."
                : ""
    , 25);



  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center overflow-hidden bg-[#050505] p-4 md:p-0 ">

      <AnimatePresence mode="wait">
        {stage !== "chat" ? (

          <motion.section
            key="hero"
            exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
            className="flex flex-col items-center text-center px-6 z-10 mt-12 md:mt-20 min-h-[40vh]"
          >

            {/*  GLITCH WRAPPER */}
            <motion.div
              animate={
                stage === "glitch"
                  ? {
                    x: [0, -10, 10, -8, 8, 0],
                    y: [0, 6, -6, 4, -4, 0],
                  }
                  : { x: 0, y: 0 }
              }
              transition={{ duration: 0.35 }}
            >

              {/*  EYE */}
              <div className="relative w-[200px] sm:w-[280px] md:w-[320px] lg:w-[380px] aspect-square flex items-center justify-center mb-4 sm:mb-8 md:mb-10">

                {/*  glitch overlay */}
                {stage === "glitch" && (
                  <motion.div
                    className="absolute inset-0 z-30"
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background:
                        "repeating-linear-gradient(0deg, rgba(0,212,255,0.05), rgba(0,212,255,0.05) 2px, transparent 2px, transparent 4px)",
                    }}
                  />
                )}

                {/* beam */}
                {stage === "online" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "100vh", opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5 }}
                    className="absolute w-[2px] bg-cyan-400 shadow-[0_0_20px_#00D4FF]"
                  />
                )}

                {/* glow */}
                <motion.div
                  animate={{
                    scale:
                      stage === "ignite" || stage === "awake-eye"
                        ? [1.5, 2.2, 1.8]
                        : [1, 1.2, 1],
                    opacity:
                      stage === "ignite" || stage === "awake-eye"
                        ? [0.5, 0.9, 0.5]
                        : 0.2,
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 bg-cyan-400/20 rounded-full blur-3xl"
                />

                {/* TOP */}
                <motion.div
                  animate={
                    stage === "awake-eye" || stage === "online"
                      ? { y: -100 }
                      : { y: 0 }
                  }
                  transition={{ duration: 1.5 }}
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: "inset(0 0 50% 0)" }}
                >
                  <div className="relative w-full h-full border border-cyan-400/30 rounded-full flex items-center justify-center bg-[#050505]">
                    <NeuralTexture isActive={stage !== "idle"} />
                    <div className="w-[90%] h-[90%] border border-cyan-400/10 rounded-full" />
                  </div>
                </motion.div>

                {/* BOTTOM */}
                <motion.div
                  animate={
                    stage === "awake-eye" || stage === "online"
                      ? { y: 80 }
                      : { y: 0 }
                  }
                  transition={{ duration: 1.2 }}
                  className="absolute inset-0 overflow-hidden flex items-end justify-center"
                  style={{ clipPath: "inset(50% 0 0 0)" }}
                >
                  <div className="relative w-full h-full border border-cyan-400/30 rounded-full flex items-center justify-center bg-[#050505]">
                    <NeuralTexture isActive={stage !== "idle"} />
                    <div className="w-[90%] h-[90%] border border-cyan-400/10 rounded-full" />
                  </div>
                </motion.div>

                {/* ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: stage === "ignite" ? 3 : 12,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute w-full h-full border-t border-b border-cyan-400/40 rounded-full"
                />
              </div>
            </motion.div>

            {/* TEXT */}
            <h1 className="w-full max-w-[90vw] text-md sm:text-2xl md:text-4xl font-bold tracking-tighter text-white mb-2 break-words px-4">
              {stage === "online" ? "AI_" : "INITIATE_"}
              <span className="text-cyan-400">CONSCIOUSNESS</span>
            </h1>

            <p className="text-slate-400 max-w-xl mx-auto mb-4 tracking-[0.2em] text-[9px] sm:text-[10px] md:text-xs uppercase h-6 font-mono max-w-[90%] sm:max-w-xl">
              {typedText}
            </p>

            {/* BUTTON */}
            {stage === "idle" && (
              <motion.button
                onClick={startSequence}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-10 md:px-12 py-3 sm:py-4 border border-cyan-400/50 bg-cyan-400/5 text-cyan-400 tracking-[0.4em] text-xs uppercase shadow-[0_0_20px_#00D4FF]"
              >
                WAKE_UP
              </motion.button>
            )}

          </motion.section>

        ) : (

          <motion.div
            key="chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-5xl z-50"
          >
            <ChatInterface onClose={handleCloseChat} />
          </motion.div>

        )}
      </AnimatePresence>

      {/* GRID */}
      <div className="absolute inset-0 grid grid-cols-12 opacity-[0.05] pointer-events-none">
        {Array.from({ length: 144 }).map((_, i) => (
          <motion.div
            key={i}
            animate={stage === "ignite" ? { opacity: [0.05, 0.2, 0.05] } : {}}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.01 }}
            className="border border-cyan-400/20"
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;