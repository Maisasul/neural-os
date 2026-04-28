"use client";
import { motion } from "framer-motion";

export default function Navbar() {

  return (
    <nav className="fixed top-0 left-0 w-full z-[60] flex justify-between items-center px-8 h-20 bg-surface/60 backdrop-blur-xl border-b border-primary/20">
      {/* logo section */}
      <div className="text-3xl font-bold tracking-tighter text-primary drop-shadow-[0_0_10px_rgba(0,212,255,0.5)] font-consciousness">
        NEURAL
      </div>

      {/* system status */}
      <div className="text-[10px] tracking-[0.4em] text-cyan-400/70 uppercase">
        SYSTEM ARCHITECT: MAISA
      </div>

      {/* Action Button */}
      {/* <motion.button
        whileHover={{ backgroundColor: "rgba(0, 212, 255, 0.1)" }}
        whileTap={{ scale: 0.95 }}
        className="font-space tracking-[0.2em] uppercase text-sm font-light text-primary border border-primary/40 px-6 py-2 transition-all cursor-pointer"
      >
        INITIALIZE
      </motion.button> */}
    </nav>
  );
}