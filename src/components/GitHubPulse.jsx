import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { githubProfile, githubStatCards } from "../data/githubData";

const GitHubPulse = () => {
  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-4">
            <span className="section-rule" />
            <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
              GitHub Pulse
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-zinc-500 sm:text-base">
            Live contribution graph, streaks, and language mix — pulled from{" "}
            <span className="font-mono text-zinc-300">@{githubProfile.username}</span>
          </p>
        </div>
        <a
          href={githubProfile.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost inline-flex w-fit items-center gap-2 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em]"
        >
          <FaGithub />
          Open profile
          <FaExternalLinkAlt className="text-[10px] opacity-60" />
        </a>
      </div>

      <div className="flex flex-wrap gap-2">
        {githubProfile.highlights.map((item) => (
          <span
            key={item}
            className="border border-white/10 bg-white/[0.02] px-3 py-1.5 font-mono text-[11px] text-zinc-400"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden border border-white/10 bg-black/40 p-2"
        >
          <img
            src={githubStatCards.stats}
            alt="GitHub stats"
            className="h-auto w-full"
            loading="lazy"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="overflow-hidden border border-white/10 bg-black/40 p-2"
        >
          <img
            src={githubStatCards.streak}
            alt="GitHub streak"
            className="h-auto w-full"
            loading="lazy"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.12 }}
          className="overflow-hidden border border-white/10 bg-black/40 p-2 lg:col-span-2"
        >
          <img
            src={githubStatCards.activity}
            alt="GitHub contribution activity"
            className="h-auto w-full"
            loading="lazy"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.16 }}
          className="overflow-hidden border border-white/10 bg-black/40 p-2"
        >
          <img
            src={githubStatCards.topLangs}
            alt="Top languages"
            className="h-auto w-full"
            loading="lazy"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col justify-between border border-white/10 bg-white/[0.02] p-5"
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-600">
              Competitive coding
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {githubProfile.platforms.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/10 px-3 py-2 font-mono text-[11px] text-zinc-400 transition hover:border-white/30 hover:text-white"
                >
                  {platform.name}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-6 border-t border-white/5 pt-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-600">
              Education snapshot
            </p>
            <ul className="mt-3 space-y-2">
              {githubProfile.education.map((edu) => (
                <li key={edu.qualification} className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="text-zinc-300">{edu.qualification}</span>
                  <span className="font-mono text-[11px] text-zinc-600">{edu.score}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubPulse;
