import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { FaReact, FaPython, FaNodeJs, FaJava, FaCode } from "react-icons/fa";
import { SiPytorch, SiLangchain, SiDotnet } from "react-icons/si";
import PageShell from "./PageShell";
import GitHubPulse from "./GitHubPulse";
import { githubProfile } from "../data/githubData";

const focusIconMap = {
  FaReact,
  FaPython,
  FaNodeJs,
  FaJava,
  FaCode,
  SiPytorch,
  SiLangchain,
  SiDotnet,
};

const DEFAULT_FOCUS = [
  {
    title: "AI systems",
    icon: "SiLangchain",
    points: ["LangChain / LangGraph workflows", "Model APIs & retrieval", "Practical ML tooling"],
  },
  {
    title: "Full stack",
    icon: "FaReact",
    points: ["React + Node products", "APIs, auth, data layers", "Dark, high-signal UI"],
  },
  {
    title: "Engineering craft",
    icon: "FaPython",
    points: ["Java / .NET / Python", "Clean shipping cadence", "Open-source contribution"],
  },
];

const DEFAULT_INTRO =
  "I'm Abhishek Sharma — B.Tech CSE at United Institute of Technology. Campus Ambassador at GeeksforGeeks, GSSoC'24 Extended contributor, and focused on full-stack + AI products with real-world impact.";

const About = () => {
  const about = useSelector((state) => state.portfolio.data?.about);

  const tagline = about?.tagline?.trim() || githubProfile.tagline;
  const aboutHeadline = about?.aboutHeadline?.trim() || "Building systems that ship.";
  const aboutIntro = about?.aboutIntro?.trim() || DEFAULT_INTRO;
  const email = about?.email?.trim() || githubProfile.email;
  const handle = about?.handle?.trim() || githubProfile.handle;
  const pronouns = about?.pronouns?.trim() || githubProfile.identity.pronouns;

  const codeTags =
    Array.isArray(about?.codeTags) && about.codeTags.length
      ? about.codeTags
      : githubProfile.identity.code;

  const highlights =
    Array.isArray(about?.highlights) && about.highlights.length
      ? about.highlights
      : githubProfile.highlights;

  const focusAreas = useMemo(() => {
    const source =
      Array.isArray(about?.focusAreas) && about.focusAreas.length
        ? about.focusAreas
        : DEFAULT_FOCUS;
    return source.map((area) => ({
      title: area.title,
      points: Array.isArray(area.points) ? area.points : [],
      Icon: focusIconMap[area.icon] || FaCode,
    }));
  }, [about]);

  const education =
    Array.isArray(about?.education) && about.education.length
      ? about.education
      : githubProfile.education;

  const platforms =
    Array.isArray(about?.platforms) && about.platforms.length
      ? about.platforms
      : githubProfile.platforms;

  return (
    <PageShell index="01 / About" title="About" subtitle={tagline}>
      <div className="flex flex-col gap-16 sm:gap-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-500">
              {handle} · {pronouns}
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {aboutHeadline}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              {aboutIntro}
            </p>
            <p className="mt-4 text-sm text-zinc-500">
              Reach me at{" "}
              <a
                href={`mailto:${email}`}
                className="text-zinc-300 underline underline-offset-4 transition hover:text-[var(--accent-a)]"
                style={{ textDecorationColor: "color-mix(in srgb, var(--accent-a) 35%, transparent)" }}
              >
                {email}
              </a>
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {codeTags.map((lang) => (
                <span
                  key={lang}
                  className="accent-hover-border border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-500"
                >
                  {lang}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="grid grid-cols-1 gap-3"
          >
            {highlights.map((item, i) => (
              <div
                key={item}
                className="accent-hover-border flex items-center gap-4 border border-white/10 bg-white/[0.02] px-4 py-4"
              >
                <span className="font-mono text-[10px] text-[var(--accent-a)]/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-zinc-300">{item}</span>
              </div>
            ))}
            <div className="accent-hover-border flex items-center gap-4 border border-white/10 px-4 py-4">
              <FaNodeJs className="text-[var(--accent-a)]/55" />
              <SiPytorch className="text-[var(--accent-b)]/55" />
              <FaReact className="text-[var(--accent-c)]/55" />
              <span className="font-mono text-[11px] text-zinc-600">stack in motion</span>
            </div>
          </motion.div>
        </div>

        <GitHubPulse education={education} platforms={platforms} />

        <div>
          <div className="mb-8 flex items-center gap-4">
            <span className="section-rule" />
            <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
              Focus
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {focusAreas.map((area, index) => {
              const Icon = area.Icon;
              return (
                <motion.div
                  key={`${area.title}-${index}`}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="accent-card border border-white/10 bg-white/[0.02] p-5"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <Icon className="text-chroma text-xl" />
                    <h3 className="font-display text-lg font-semibold text-white">
                      {area.title}
                    </h3>
                  </div>
                  <ul className="space-y-2 text-sm text-zinc-500">
                    {area.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default About;
