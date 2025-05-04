import React from "react";
import { motion } from "framer-motion";

const pathVariants = {
  hidden: { pathLength: 0 },
  visible: i => ({
    pathLength: 1,
    transition: {
      pathLength: { delay: i * 0.2, type: "spring", duration: 1.5, bounce: 0 }
    }
  })
};

const Preloader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <svg
          width="200"
          height="200"
          viewBox="-10 -10 220 220"
          xmlns="http://www.w3.org/2000/svg"
          className="h-50 w-50"
        >
          <defs>
            <linearGradient id="hexagonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9333ea" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>

          {/* Draw hexagon with individual lines */}
          {[
            "M100,20 L180,70",    // Top right
            "M180,70 L180,130",   // Right
            "M180,130 L100,180",  // Bottom right
            "M100,180 L20,130",   // Bottom left
            "M20,130 L20,70",     // Left
            "M20,70 L100,20"      // Top left
          ].map((path, i) => (
            <motion.path
              key={i}
              d={path}
              stroke="url(#hexagonGradient)"
              strokeWidth="4"
              fill="none"
              custom={i}
              variants={pathVariants}
              initial="hidden"
              animate="visible"
            />
          ))}
          <motion.text
            x="100"
            y="105"
            textAnchor="middle"
            fill="url(#hexagonGradient)"
            fontSize="36"
            fontWeight="bold"
            fontFamily="Signature"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            AS
          </motion.text>
        </svg>
      </motion.div>

      <motion.div 
        className="mt-6 flex items-center text-2xl text-purple-600  "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <motion.span
          className="font-mono"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          &lt;
        </motion.span>
        <motion.span 
          className="font-signature text-4xl px-2 bg-gradient-to-r from-purple-600 to-red-500 text-transparent bg-clip-text"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.8,
            delay: 1,
            ease: "easeOut"
          }}
        >
          Abhishek Sharma
        </motion.span>
        <motion.span
          className="font-mono"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          /&gt;
        </motion.span>
      </motion.div>
    </div>
  );
};

export default Preloader;
