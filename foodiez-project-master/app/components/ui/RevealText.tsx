import React from "react";
import { motion } from "framer-motion";

const RevealText = ({ children }: { children: string }) => {
  const DURATION = 0.15; // Increased duration for smoother animation
  const STAGGER = 0.05; // Increased stagger for better timing

  return (
    <motion.div
      initial="initial"
      whileHover="hovered"
      className="relative block overflow-hidden whitespace-nowrap "
    >
      {/* Top Layer */}
      <div className="relative">
        {children.split("").map((l, index) => (
          <motion.span
            key={index}
            variants={{
              initial: {
                y: 0,
                opacity: 1,
              },
              hovered: {
                y: "-100%",
                opacity: 0.5, // Add opacity for a fade effect
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * index,
            }}
            className="inline-block"
          >
            {l}
          </motion.span>
        ))}
      </div>

      {/* Bottom Layer */}
      <div className="absolute inset-0">
        {children.split("").map((l, index) => (
          <motion.span
            key={index}
            variants={{
              initial: {
                y: "100%",
                opacity: 0.5, // Start with lower opacity
              },
              hovered: {
                y: 0,
                opacity: 1, // Fade in smoothly
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * index,
            }}
            className="inline-block"
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default RevealText;