import React, { Suspense, lazy } from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaInstagram, FaDiscord } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { contactData } from "../data/indexData";

const NeuralField = lazy(() => import("./three/NeuralField"));

const iconMap = {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaDiscord,
};

const Landing = () => {
  const navigate = useNavigate();

  return (
    <section className="relative isolate min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-[var(--bg)] text-white">
      {/* Full-bleed AI field */}
      <Suspense fallback={null}>
        <NeuralField intensity={1} />
      </Suspense>

      {/* Atmospheric washes */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_72%)]" />
      <div className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-cyan-400/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-16 bottom-1/4 h-80 w-80 rounded-full bg-violet-400/10 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-rose-400/10 blur-[90px]" />
      <div className="noise-overlay absolute inset-0" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-center px-4 py-16 sm:px-6 sm:py-20">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 font-mono text-[11px] uppercase tracking-[0.35em] text-zinc-500 sm:text-xs"
        >
          Portfolio // Generative systems
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="font-display text-[clamp(2.75rem,8vw,6.5rem)] font-bold leading-[0.92] tracking-tight"
        >
          <span className="block text-white">Abhishek</span>
          <span className="block text-chroma">Sharma</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="mt-6 max-w-xl"
        >
          <p className="font-mono text-sm text-zinc-400 sm:text-base">
            <span className="text-zinc-600">$</span>{" "}
            <TypeAnimation
              sequence={[
                "full_stack_engineer",
                2200,
                "ai_systems_builder",
                2200,
                "software_craftsman",
                2200,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-chroma"
            />
            <span className="ml-1 inline-block h-4 w-[2px] animate-pulse bg-white align-middle" />
          </p>
          <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
            Building dark-room interfaces and intelligent products — web, AI, and systems that feel alive.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
        >
          <button
            type="button"
            onClick={() => navigate("/projects")}
            className="btn-solid rounded-none px-6 py-3 font-display text-sm font-semibold tracking-wide"
          >
            View Projects
          </button>
          <button
            type="button"
            onClick={() => navigate("/contact")}
            className="btn-ghost rounded-none px-6 py-3 font-display text-sm font-semibold tracking-wide"
          >
            Contact Me
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-12 flex flex-wrap items-center gap-5"
        >
          {contactData.socials.map((social, index) => {
            const IconComponent = iconMap[social.icon];
            if (!IconComponent) return null;
            return (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 transition-colors duration-300 hover:text-white"
                aria-label={social.icon}
              >
                <IconComponent className="text-xl" />
              </a>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="absolute bottom-8 left-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600 sm:left-6"
        >
          <span className="h-px w-8 bg-zinc-700" />
          Scroll the lattice
        </motion.div>
      </div>
    </section>
  );
};

export default Landing;
