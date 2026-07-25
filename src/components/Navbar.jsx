import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/projects", label: "Projects" },
    { to: "/skills", label: "Skills" },
    { to: "/experience", label: "Experience" },
    { to: "/resume", label: "Resume" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/[0.06] bg-[#030303]/75 backdrop-blur-2xl">
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
                    isActive ? "text-white" : "text-zinc-500 hover:text-zinc-200"
                  }`
                }
              >
                {({ isActive }) => (
                  <span className="relative">
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-sky-300 via-violet-300 to-rose-300"
                      />
                    )}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="text-white md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/5 bg-[#030303]/98 md:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-6">
              {navLinks.map((link, i) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-baseline gap-3 py-3 font-display text-2xl ${
                        isActive ? "text-white" : "text-zinc-500"
                      }`
                    }
                  >
                    <span className="font-mono text-[10px] text-zinc-700">0{i + 1}</span>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
