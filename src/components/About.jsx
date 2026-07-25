import React from "react";
import { motion } from "framer-motion";
import { FaReact, FaPython, FaNodeJs } from "react-icons/fa";
import { SiPytorch, SiLangchain } from "react-icons/si";
import PageShell from "./PageShell";
import GitHubPulse from "./GitHubPulse";
import { githubProfile } from "../data/githubData";

const focusAreas = [
  {
    title: "AI systems",
    icon: SiLangchain,
    points: ["LangChain / LangGraph workflows", "Model APIs & retrieval", "Practical ML tooling"],
  },
  {
    title: "Full stack",
    icon: FaReact,
    points: ["React + Node products", "APIs, auth, data layers", "Dark, high-signal UI"],
  },
  {
    title: "Engineering craft",
    icon: FaPython,
    points: ["Java / .NET / Python", "Clean shipping cadence", "Open-source contribution"],
  },
];

const About = () => {
  return (
    <PageShell index="01 / About" title="About" subtitle={githubProfile.tagline}>
      <div className="flex flex-col gap-16 sm:gap-20">
        {/* Intro */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-500">
              {githubProfile.handle} · {githubProfile.identity.pronouns}
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Building systems that ship.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              I&apos;m Abhishek Sharma — B.Tech CSE at United Institute of Technology.
              Campus Ambassador at GeeksforGeeks, GSSoC&apos;24 Extended contributor, and
              focused on full-stack + AI products with real-world impact.
            </p>
            <p className="mt-4 text-sm text-zinc-500">
              Reach me at{" "}
              <a
                href={`mailto:${githubProfile.email}`}
                className="text-zinc-300 underline decoration-white/20 underline-offset-4 hover:text-white"
              >
                {githubProfile.email}
              </a>
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {githubProfile.identity.code.map((lang) => (
                <span
                  key={lang}
                  className="border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-500"
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
            {githubProfile.highlights.map((item, i) => (
              <div
                key={item}
                className="flex items-center gap-4 border border-white/10 bg-white/[0.02] px-4 py-4"
              >
                <span className="font-mono text-[10px] text-zinc-600">0{i + 1}</span>
                <span className="text-sm text-zinc-300">{item}</span>
              </div>
            ))}
            <div className="flex items-center gap-4 border border-white/10 px-4 py-4">
              <FaNodeJs className="text-zinc-500" />
              <SiPytorch className="text-zinc-500" />
              <FaReact className="text-zinc-500" />
              <span className="font-mono text-[11px] text-zinc-600">stack in motion</span>
            </div>
          </motion.div>
        </div>

        {/* Live contributions */}
        <GitHubPulse />

        {/* Focus */}
        <div>
          <div className="mb-8 flex items-center gap-4">
            <span className="section-rule" />
            <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
              Focus
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {focusAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="border border-white/10 bg-white/[0.02] p-5"
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
