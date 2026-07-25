import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { THEMES, applyTheme, getStoredTheme } from "../theme";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/skills", label: "Skills" },
  { to: "/experience", label: "Experience" },
  { to: "/resume", label: "Resume" },
  { to: "/contact", label: "Contact" },
];

const ThemePicker = ({ className = "" }) => {
  const [theme, setTheme] = useState(getStoredTheme);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const select = (key) => {
    setTheme(applyTheme(key));
    setOpen(false);
  };

  const active = THEMES.find((t) => t.key === theme) ?? THEMES[0];

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 border border-white/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400 transition hover:border-[color-mix(in_srgb,var(--accent-a)_40%,transparent)] hover:text-[var(--accent-a)]"
      >
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ background: active.swatch }}
        />
        {active.label}
        <FaChevronDown className={`text-[8px] transition ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            role="listbox"
            className="absolute right-0 z-50 mt-2 w-40 border border-white/10 bg-[var(--bg)]/95 p-1 backdrop-blur-xl"
          >
            {THEMES.map((t) => (
              <li key={t.key}>
                <button
                  type="button"
                  role="option"
                  aria-selected={t.key === theme}
                  onClick={() => select(t.key)}
                  className={`flex w-full items-center gap-2.5 px-2.5 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition ${
                    t.key === theme
                      ? "bg-[color-mix(in_srgb,var(--accent-a)_10%,transparent)] text-white"
                      : "text-zinc-500 hover:bg-white/[0.04] hover:text-[var(--accent-a)]"
                  }`}
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full ring-1 ring-white/20"
                    style={{ background: t.swatch }}
                  />
                  {t.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/[0.06] bg-[var(--bg)]/75 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          className="group font-display text-base font-semibold tracking-tight text-white"
          onClick={() => setMenuOpen(false)}
        >
          AS
          <span className="text-chroma transition group-hover:tracking-widest">.</span>
        </NavLink>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `relative px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] transition-colors duration-300 ${
                    isActive ? "text-white" : "text-zinc-500 hover:text-[var(--accent-a)]"
                  }`
                }
              >
                {({ isActive }) => (
                  <span className="relative">
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 h-px w-full"
                        style={{ background: "var(--chroma)" }}
                      />
                    )}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemePicker className="hidden sm:block" />
          <button
            type="button"
            className="text-white md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/5 bg-[var(--bg)]/98 md:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-6">
              {navLinks.map((link, i) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-baseline gap-3 py-3 font-display text-2xl transition ${
                        isActive ? "text-white" : "text-zinc-500 hover:text-[var(--accent-a)]"
                      }`
                    }
                  >
                    <span className="font-mono text-[10px] text-[var(--accent-a)]/45">0{i + 1}</span>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="px-4 pb-6 sm:hidden">
              <ThemePicker />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
