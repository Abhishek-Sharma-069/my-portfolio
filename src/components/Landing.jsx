import React, { Suspense, lazy, useRef } from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaInstagram, FaDiscord } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
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

const marquee = [
  "React",
  "LangChain",
  "LangGraph",
  "Spring Boot",
  ".NET",
  "Python",
  "Three.js",
  "Node",
  "PostgreSQL",
  "Redis",
  "Docker",
];

const Landing = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${springX}px ${springY}px, rgba(125,211,252,0.12), transparent 55%)`;

  const onMove = (e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={onMove}
      className="relative isolate min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-[#030303] text-white"
    >
      {/* 3D stage — right-weighted on desktop */}
      <div className="absolute inset-0 z-0 md:left-[28%]">
        <Suspense fallback={<div className="h-full w-full bg-[#030303]" />}>
          <NeuralField intensity={1} />
        </Suspense>
      </div>

      {/* Readability veil — stronger on left for type */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,#030303_0%,rgba(3,3,3,0.88)_34%,rgba(3,3,3,0.35)_58%,rgba(3,3,3,0.55)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_70%_45%,transparent_0%,#030303_78%)] md:bg-[radial-gradient(ellipse_at_75%_40%,transparent_10%,#030303_82%)]" />
      <motion.div
        className="pointer-events-none absolute inset-0 z-[2] hidden md:block"
        style={{ background: spotlight }}
      />
      <div className="noise-overlay absolute inset-0 z-[2]" />

      {/* Corner marks */}
      <div className="pointer-events-none absolute left-4 top-4 z-20 hidden h-8 w-8 border-l border-t border-white/25 sm:left-8 sm:top-6 md:block" />
      <div className="pointer-events-none absolute right-4 top-4 z-20 hidden h-8 w-8 border-r border-t border-white/25 sm:right-8 sm:top-6 md:block" />
      <div className="pointer-events-none absolute bottom-24 left-4 z-20 hidden h-8 w-8 border-b border-l border-white/25 sm:left-8 md:block" />
      <div className="pointer-events-none absolute bottom-24 right-4 z-20 hidden h-8 w-8 border-b border-r border-white/25 sm:right-8 md:block" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl grid-cols-1 items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-7 inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] px-3 py-1.5 backdrop-blur-md"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-400">
              System online · available for work
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="mb-4 font-mono text-[11px] uppercase tracking-[0.38em] text-zinc-500"
          >
            Abhishek Sharma
          </motion.p>

          <h1 className="font-display font-semibold tracking-[-0.04em]">
            {"Engineer".split("").map((ch, i) => (
              <motion.span
                key={`e-${i}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.08 + i * 0.035, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block text-[clamp(3.2rem,11vw,7.25rem)] leading-[0.88] text-white"
              >
                {ch}
              </motion.span>
            ))}
            <br />
            <span className="inline-flex flex-wrap">
              {"of systems".split("").map((ch, i) => (
                <motion.span
                  key={`s-${i}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.32 + i * 0.028, ease: [0.22, 1, 0.36, 1] }}
                  className={`inline-block text-[clamp(3.2rem,11vw,7.25rem)] leading-[0.88] ${
                    ch === " " ? "w-[0.28em]" : "text-chroma"
                  }`}
                >
                  {ch === " " ? "\u00A0" : ch}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-7 max-w-md"
          >
            <p className="font-mono text-sm text-zinc-400">
              <span className="text-zinc-600">role/</span>
              <TypeAnimation
                sequence={[
                  "full-stack",
                  2000,
                  "AI systems",
                  2000,
                  ".NET & Java",
                  2000,
                  "product engineer",
                  2000,
                ]}
                wrapper="span"
                speed={55}
                repeat={Infinity}
                className="text-white"
              />
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-zinc-400 sm:text-base">
              I design and ship intelligent products — dark interfaces, reliable backends,
              and AI workflows that feel inevitable.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <button
              type="button"
              onClick={() => navigate("/projects")}
              className="btn-solid group relative overflow-hidden px-7 py-3.5 font-display text-sm font-semibold tracking-wide"
            >
              <span className="relative z-10">View work</span>
            </button>
            <button
              type="button"
              onClick={() => navigate("/contact")}
              className="btn-ghost px-7 py-3.5 font-display text-sm font-semibold tracking-wide"
            >
              Start a project
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.85 }}
            className="mt-10 flex flex-wrap items-center gap-4"
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
                  className="text-zinc-600 transition duration-300 hover:text-white hover:scale-110"
                  aria-label={social.icon}
                >
                  <IconComponent className="text-lg" />
                </a>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Tech marquee */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-20 w-full border-t border-white/5 bg-black/40 backdrop-blur-md">
        <div className="marquee-track flex gap-10 whitespace-nowrap py-3 font-mono text-[10px] uppercase tracking-[0.32em] text-zinc-500">
          {[...marquee, ...marquee].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-10">
              {item}
              <span className="text-zinc-700">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Landing;
