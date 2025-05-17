'use client';

import { motion } from "framer-motion";

export default function Loader2() {
  return (
     <div className="flex  items-center justify-center min-h-[200px]">
              <div className="relative w-24 h-24">
            {/* Outer Ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-t-transparent border-l-blue-500 border-r-purple-500 border-b-transparent"
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: "linear",
              }}
            />
    
            {/* Inner Ring (opposite direction) */}
            <motion.div
              className="absolute inset-4 rounded-full border-4 border-t-transparent border-l-pink-500 border-r-cyan-500 border-b-transparent"
              animate={{ rotate: -360 }}
              transition={{
                repeat: Infinity,
                duration: 1.8,
                ease: "linear",
              }}
            />
    
            {/* Center Glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 opacity-30 blur-2xl"></div>
            </div>
          </div>
            </div>
  );
}
