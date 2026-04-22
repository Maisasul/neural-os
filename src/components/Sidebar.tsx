"use client";
import { motion } from "framer-motion";
import { Brain, Activity, Thermometer, Share2 } from "lucide-react";
import React from "react";

interface SidebarItem {
 id: string;
 label: string;
 icon: React.ReactNode;
 active: boolean;
}
const sidebarItems: SidebarItem[] = [
 { id: "neural", label: "NEURAL_LINK", icon: <Brain size={20} />, active: true },
 { id: "stats", label: "BIO_METRICS", icon: <Activity size={20} />, active: false },
 { id: "temp", label: "CORE_TEMP", icon: <Thermometer size={20} />, active: false },
 { id: "hub", label: "SYNAPSE_LOAD", icon: <Share2 size={20} />, active: false },
];

const Sidebar = () => {
 return (
  <aside className="fixed left-0 top-20 h-[calc(100vh-5rem)] z-40 flex flex-col items-center py-8 bg-surface/80 backdrop-blur-2xl w-20 border-r border-primary/20 shadow-[20px_0_40px_rgba(0,0,0,0.8)]">
   <div className="flex flex-col gap-10">
    {sidebarItems.map((item) => (
     <div
      key={item.id}
      className={`flex flex-col items-center gap-1 p-3 cursor-pointer transition-all duration-500 ease-out group ${item.active
       ? "bg-primary/10 border-r-2 border-primary text-primary shadow-[0_0_15px_rgba(0,212,255,0.3)]"
       : "text-slate-700 opacity-40 hover:opacity-100 hover:translate-x-1"
       }`}
     >
      {/* {item.icon} */}
      <div className="group-hover:scale-110 transition-transform duration-500">
       {item.icon}
      </div>
      {/* title */}
      <span className="font-space text-[8px] tracking-widest hidden lg:block uppercase">
       {item.label}
      </span>
     </div>
    ))}
   </div>

   {/* profile */}
   <div className="mt-auto flex flex-col items-center gap-2">
    <div className="w-8 h-8 rounded-full border border-primary/30 p-0.5 overflow-hidden">
     <div className="w-full h-full bg-primary/20 rounded-full flex items-center justify-center text-[10px] text-primary">
      A1
     </div>
    </div>
    <span className="font-space text-[8px] text-primary opacity-60">NODE_01</span>
   </div>
  </aside>
 )
}

export default Sidebar