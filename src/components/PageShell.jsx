import React from "react";
import { motion } from "framer-motion";

const PageShell = ({
  title,
  subtitle,
  children,
  className = "",
  dense = false,
}) => (
  <div className={`relative w-full min-h-[calc(100vh-4rem)] overflow-hidden bg-[var(--bg)] text-[var(--fg)] ${className}`}>
    <div className="page-grid pointer-events-none absolute inset-0 opacity-70" />
    <div className="noise-overlay pointer-events-none absolute inset-0" />

    <div className={`relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 ${dense ? "py-10 sm:py-12" : "py-14 sm:py-20"}`}>
      {(title || subtitle) && (
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-10 sm:mb-14"
        >
          {title && (
            <div className="mb-3 flex items-center gap-4">
              <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                {title}
              </h1>
              <span className="section-rule hidden sm:block" />
            </div>
          )}
          {subtitle && (
            <p className="max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
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
