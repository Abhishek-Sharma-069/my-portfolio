import React, { Suspense, lazy, useRef } from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaInstagram, FaDiscord } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
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

const DEFAULT_HERO_HEADLINE =
  "Engineering _scalable_\nproducts with *AI‑first*\n_experiences_.";

const DEFAULT_HERO_SUBTITLE =
  "I build full-stack products at the intersection of clean engineering and thoughtful design. Focused on React, Node.js, and AI-powered applications.";

/** Parse `_text_` → outlined span, `*text*` → chroma span.
 * `counter` alternates outline stroke color across the whole headline. */
function renderHeroLine(line, counter) {
  const parts = line.split(/(\*[^*]+\*|_[^_]+_)/g).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <span key={i} className="text-chroma">
          {part.slice(1, -1)}
        </span>
      );
    }
    if (part.startsWith("_") && part.endsWith("_")) {
      const alt = counter.outline++ % 2 === 1;
      return (
        <span key={i} className={`text-outline ${alt ? "text-outline-b" : ""}`}>
          {part.slice(1, -1)}
        </span>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

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
  const about = useSelector((state) => state.portfolio.data?.about);
  const heroLines = (about?.heroHeadline?.trim() || DEFAULT_HERO_HEADLINE).split("\n");
  const heroSubtitle = about?.heroSubtitle?.trim() || DEFAULT_HERO_SUBTITLE;
  const heroRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${springX}px ${springY}px, color-mix(in srgb, var(--accent-a) 13%, transparent), transparent 55%)`;

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
      className="relative isolate min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-[var(--bg)] text-white"
    >
      {/* 3D stage — right-weighted on desktop */}
      <div className="absolute inset-0 z-0 md:left-[28%]">
        <Suspense fallback={<div className="h-full w-full bg-[var(--bg)]" />}>
          <NeuralField intensity={1} />
        </Suspense>
      </div>

      {/* Readability veil — stronger on left for type */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(90deg, var(--bg) 0%, color-mix(in srgb, var(--bg) 88%, transparent) 34%, color-mix(in srgb, var(--bg) 35%, transparent) 58%, color-mix(in srgb, var(--bg) 55%, transparent) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at 73% 42%, transparent 6%, var(--bg) 80%)",
        }}
      />
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
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-7 inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] px-3 py-1.5 backdrop-blur-md transition hover:border-[color-mix(in_srgb,var(--accent-a)_30%,transparent)]"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                style={{ background: "var(--accent-a)" }}
              />
              <span
                className="relative inline-flex h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--accent-a)" }}
              />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-400">
              System online · available for work
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.38em] text-zinc-300"
          >
            Abhishek Sharma
          </motion.p>

          <h1 className="font-display text-[clamp(2.1rem,5.6vw,4rem)] font-bold leading-[1.05] tracking-[-0.035em]">
            {(() => {
              const counter = { outline: 0 };
              return heroLines.map((line, i) => (
                <motion.span
                  key={`${line}-${i}`}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="block text-white"
                >
                  {renderHeroLine(line, counter)}
                </motion.span>
              ));
            })()}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-7 max-w-xl"
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
              {heroSubtitle}
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
