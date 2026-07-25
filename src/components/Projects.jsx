import React from "react";
import { useSelector } from "react-redux";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import PageShell from "./PageShell";
import project_illustration from "../assets/images/mindmap.svg";

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
      title="Projects"
      subtitle="Full-stack builds across AI, healthcare, IoT, and cloud — shipped with modern web stacks and real users in mind."
    >
      <div className="mb-12 flex flex-col items-center gap-8 lg:flex-row lg:items-start">
        <p className="flex-1 text-base leading-relaxed text-zinc-400 sm:text-lg">
          From Android and IoT systems to React web apps — most experienced in AI-forward
          products with Firebase and cloud deployment in the loop.
        </p>
        <img
          src={project_illustration}
          alt="Projects Illustration"
          className="w-full max-w-xs opacity-90 lg:max-w-sm"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects?.map((project, index) => (
          <motion.article
            key={project._id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group flex flex-col overflow-hidden border border-white/10 bg-white/[0.02]"
          >
            <div className="relative overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="h-44 w-full object-cover grayscale transition duration-500 group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
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
