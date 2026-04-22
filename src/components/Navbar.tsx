"use client";
import { motion } from "framer-motion";

interface NavLink {
 name: string;
 href: string;
 active: boolean;
}

const navLinks: NavLink[] =[
 {name: "SYNC", href: "#", active: true},
 {name: "CORE", href: "#", active: false},
 {name: "NETWORK", href: "#", active: false},
 {name: "PROTOCOLS", href: "#", active: false},
]
export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 h-20 bg-surface/60 backdrop-blur-xl border-b border-primary/20">
      {/* logo section */}
      <div className="text-3xl font-bold tracking-tighter text-primary drop-shadow-[0_0_10px_rgba(0,212,255,0.5)] font-consciousness">
        NEURAL
      </div>

      {/* navigation links (Hidden on Mobile)*/}
      <div className="hidden md:flex gap-12">
        {navLinks.map((link) => (
         <a
          key={link.name}
          href={link.href}
          className={`font-space tracking-[0.2em] uppercase text-sm font-light transition-all pb-1 ${
              link.active 
                ? "text-primary border-b border-primary" 
                : "text-slate-500 hover:text-primary/70"
            }`}
         >
          {link.name}
         </a>
        ))}
      </div>

      {/* Action Button */}
      <motion.button 
        whileHover={{ backgroundColor: "rgba(0, 212, 255, 0.1)" }}
        whileTap={{ scale: 0.95 }}
        className="font-space tracking-[0.2em] uppercase text-sm font-light text-primary border border-primary/40 px-6 py-2 transition-all cursor-pointer"
      >
        INITIALIZE
      </motion.button>
    </nav>
  );
}