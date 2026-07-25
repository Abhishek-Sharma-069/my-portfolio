import React from "react";
import { motion } from "framer-motion";

const pathVariants = {
  hidden: { pathLength: 0 },
  visible: (i) => ({
    pathLength: 1,
    transition: {
      pathLength: { delay: i * 0.12, type: "spring", duration: 1.4, bounce: 0 },
    },
  }),
};

const Preloader = () => {
  return (
    <div className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-[var(--bg)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(103,232,249,0.08),transparent_55%)]" />
      <div className="noise-overlay absolute inset-0" />

      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45 }}
        className="relative z-10"
      >
        <svg width="180" height="180" viewBox="-10 -10 220 220" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="hexagonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#67e8f9">
                <animate attributeName="stop-color" values="#67e8f9;#c4b5fd;#fda4af;#fde68a;#67e8f9" dur="4s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#c4b5fd">
                <animate attributeName="stop-color" values="#c4b5fd;#fda4af;#fde68a;#67e8f9;#c4b5fd" dur="4s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
          </defs>

          {[
            "M100,20 L180,70",
            "M180,70 L180,130",
            "M180,130 L100,180",
            "M100,180 L20,130",
            "M20,130 L20,70",
            "M20,70 L100,20",
          ].map((path, i) => (
            <motion.path
              key={i}
              d={path}
              stroke="url(#hexagonGradient)"
              strokeWidth="3"
              fill="none"
              custom={i}
              variants={pathVariants}
              initial="hidden"
              animate="visible"
            />
          ))}
          <motion.text
            x="100"
            y="108"
            textAnchor="middle"
            fill="url(#hexagonGradient)"
            fontSize="34"
            fontWeight="700"
            fontFamily="Syne, sans-serif"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.45 }}
          >
            AS
          </motion.text>
        </svg>
      </motion.div>

      <motion.div
        className="relative z-10 mt-8 flex items-center font-mono text-sm tracking-wide text-zinc-400"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75, duration: 0.45 }}
      >
        <span className="opacity-50">&lt;</span>
        <span className="mx-2 font-display text-2xl font-semibold text-chroma sm:text-3xl">
          Abhishek Sharma
        </span>
        <span className="opacity-50">/&gt;</span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ delay: 1.1, duration: 1.6, repeat: Infinity }}
        className="relative z-10 mt-4 font-mono text-[10px] uppercase tracking-[0.35em] text-zinc-600"
      >
        Initializing neural field
      </motion.p>
    </div>
  );
};

export default Preloader;
