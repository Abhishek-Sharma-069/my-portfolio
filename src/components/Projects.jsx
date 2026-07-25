import React from "react";
import { useSelector } from "react-redux";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import PageShell from "./PageShell";

const domains = [
  { label: "AI systems", hint: "LangChain · models · agents" },
  { label: "Full stack", hint: "React · Node · APIs" },
  { label: "Healthcare", hint: "Real users · real data" },
  { label: "IoT & cloud", hint: "Devices · Firebase · deploy" },
];

const Projects = () => {
  const projects = useSelector((state) => state.portfolio.data?.projects ?? []);
  const loading = useSelector((state) => state.portfolio.loading);

  if (loading && !projects.length) {
    return (
      <PageShell title="Projects">
        <div className="flex justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border border-white/20 border-t-white" />
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell
      index="03 / Projects"
      title="Projects"
      subtitle="Selected builds — AI, healthcare, IoT, and cloud products shipped with modern stacks."
    >
      {/* Intro above cards */}
      <div className="mb-14 grid grid-cols-1 gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-500">
            Selected work
          </p>
          <h2 className="mt-3 max-w-xl font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Products that move from idea → interface → shipped system.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            From Android and IoT to React web apps — focused on AI-forward products
            with cloud deployment, clean UX, and measurable impact.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {domains.map((d) => (
              <div
                key={d.label}
                className="accent-chip border border-white/10 bg-white/[0.02] px-3 py-2"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-300">
                  {d.label}
                </p>
                <p className="mt-0.5 text-[11px] text-zinc-600">{d.hint}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="flex flex-col gap-3 border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-5"
        >
          <div className="flex items-baseline justify-between gap-4 border-b border-white/5 pb-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-600">
              Live catalog
            </span>
            <span className="font-display text-3xl font-semibold text-chroma">
              {String(projects.length).padStart(2, "0")}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-zinc-500">
            Featured projects below. More experiments and forks live on GitHub.
          </p>
          <a
            href="https://github.com/Abhishek-Sharma-069?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400 transition hover:text-[var(--accent-a)]"
          >
            Browse repos
            <FaArrowRight className="text-[10px]" />
          </a>
        </motion.div>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <span className="section-rule" />
        <h3 className="font-display text-lg font-semibold text-white sm:text-xl">
          Featured
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects?.map((project, index) => (
          <motion.article
            key={project._id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="accent-card group flex flex-col overflow-hidden border border-white/10 bg-white/[0.02]"
          >
            <div className="relative overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="h-44 w-full object-cover grayscale transition duration-500 group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition duration-500 group-hover:opacity-100"
                style={{ background: "var(--chroma)", backgroundSize: "200% 100%" }}
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-display text-lg font-semibold text-white">{project.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-500">{project.description}</p>
              <a
                href={project.buttonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost mt-5 inline-flex w-fit items-center gap-2 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em]"
              >
                {project.buttonText}
                <FaArrowRight className="text-xs" />
              </a>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <motion.a
          href="https://github.com/Abhishek-Sharma-069?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-solid inline-flex items-center gap-2 px-8 py-3 font-display text-sm font-semibold"
        >
          See All Projects
          <FaArrowRight />
        </motion.a>
      </div>
    </PageShell>
  );
};

export default Projects;
