import React from "react";
import { motion } from "framer-motion";

const PageShell = ({
  title,
  subtitle,
  children,
  className = "",
  dense = false,
  index,
}) => (
  <div className={`relative w-full min-h-[calc(100vh-4rem)] overflow-hidden bg-[var(--bg)] text-[var(--fg)] ${className}`}>
    <div className="page-grid pointer-events-none absolute inset-0 opacity-60" />
    <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-sky-400/5 blur-[100px]" />
    <div className="pointer-events-none absolute -left-16 bottom-20 h-64 w-64 rounded-full bg-rose-400/5 blur-[90px]" />
    <div className="noise-overlay pointer-events-none absolute inset-0" />

    <div className={`relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 ${dense ? "py-10 sm:py-12" : "py-14 sm:py-20"}`}>
      {(title || subtitle) && (
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 sm:mb-14"
        >
          {index && (
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-zinc-600">
              {index}
            </p>
          )}
          {title && (
            <div className="mb-4 flex flex-wrap items-end gap-4">
              <h1 className="font-display text-3xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
                {title}
              </h1>
              <span className="section-rule mb-2 hidden sm:block" />
            </div>
          )}
          {subtitle && (
            <p className="max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              {subtitle}
            </p>
          )}
        </motion.header>
      )}
      {children}
    </div>
  </div>
);

export default PageShell;
