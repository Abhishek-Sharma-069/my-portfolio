import React from "react";
import { motion } from "framer-motion";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaPython,
  FaDatabase,
} from "react-icons/fa";
import { SiTailwindcss, SiFirebase, SiFlask, SiPytorch, SiKeras } from "react-icons/si";
import { MdAnalytics } from "react-icons/md";
import PageShell from "./PageShell";

import codingIllustration from "../assets/images/hello.svg";
import dataIllustration from "../assets/images/data_science.svg";
import fullStackIllustration from "../assets/images/fullstack.svg";

const About = () => {
  return (
    <PageShell
      title="About"
      subtitle="Developer and problem solver from Sultanpur — building AI tools, IoT systems, and interfaces with real-world impact."
    >
      <div className="flex flex-col gap-20 sm:gap-28">
        <div className="flex flex-col items-center gap-10 md:flex-row md:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center md:w-1/2"
          >
            <img
              src={codingIllustration}
              alt="Developer Illustration"
              className="w-10/12 max-w-md opacity-90"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-4 md:w-1/2"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-500">
              Profile
            </p>
            <p className="text-base leading-relaxed text-zinc-300 sm:text-lg">
              Hi, I&apos;m Abhishek Sharma — currently pursuing B.Tech in Computer Science
              and Engineering at United Institute of Technology.
            </p>
            <p className="text-base leading-relaxed text-zinc-500 sm:text-lg">
              I specialize in meaningful digital solutions, from AI-based health tools to
              IoT-powered smart systems. Always exploring tech that lands in the real world.
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col gap-16">
          <div className="flex items-center gap-4">
            <span className="section-rule" />
            <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
              What I Do
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-start gap-10 md:flex-row md:gap-14"
          >
            <div className="flex justify-center md:w-1/2">
              <img
                src={dataIllustration}
                alt="Data Science Illustration"
                className="w-10/12 max-w-md opacity-90"
              />
            </div>
            <div className="flex flex-col gap-4 md:w-1/2">
              <h3 className="flex items-center gap-3 font-display text-xl font-semibold sm:text-2xl">
                <MdAnalytics className="text-chroma text-2xl" /> Data Science & AI
              </h3>
              <div className="flex flex-wrap gap-4 text-2xl text-zinc-400">
                <SiKeras className="transition hover:text-white" />
                <SiPytorch className="transition hover:text-white" />
                <FaPython className="transition hover:text-white" />
                <FaDatabase className="transition hover:text-white" />
              </div>
              <ul className="space-y-2 text-base leading-relaxed text-zinc-400 sm:text-lg">
                <li>Production-ready models for deep learning use cases</li>
                <li>Computer Vision, NLP, and forecasting</li>
                <li>Time-series, tuning, and visualization</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-start gap-10 md:flex-row-reverse md:gap-14"
          >
            <div className="flex justify-center md:w-1/2">
              <img
                src={fullStackIllustration}
                alt="Full Stack Dev Illustration"
                className="w-10/12 max-w-md opacity-90"
              />
            </div>
            <div className="flex flex-col gap-4 md:w-1/2">
              <h3 className="flex items-center gap-3 font-display text-xl font-semibold sm:text-2xl">
                <FaReact className="text-chroma text-2xl" /> Full Stack Development
              </h3>
              <div className="flex flex-wrap gap-4 text-2xl text-zinc-400">
                <FaHtml5 className="transition hover:text-white" />
                <FaCss3Alt className="transition hover:text-white" />
                <FaJs className="transition hover:text-white" />
                <FaReact className="transition hover:text-white" />
                <SiTailwindcss className="transition hover:text-white" />
                <FaNodeJs className="transition hover:text-white" />
                <SiFirebase className="transition hover:text-white" />
                <SiFlask className="transition hover:text-white" />
              </div>
              <ul className="space-y-2 text-base leading-relaxed text-zinc-400 sm:text-lg">
                <li>Responsive frontends with React, Tailwind & Vite</li>
                <li>Mobile with Flutter and Android / Kotlin</li>
                <li>Backends with Node.js, Express, and Flask</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </PageShell>
  );
};

export default About;
