import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  FaJava, FaPhp, FaJsSquare, FaPython, FaReact,
  FaNodeJs, FaAndroid, FaGitAlt, FaDocker, FaHtml5,
  FaCss3Alt, FaBootstrap, FaSass, FaLess, FaAws,
  FaGoogle, FaMicrosoft, FaUbuntu, FaLinux, FaFlask, FaGithub
} from "react-icons/fa";
import {
  SiMysql, SiC, SiCplusplus, SiMongodb, SiNextdotjs,
  SiTypescript, SiJavascript, SiVuedotjs, SiAngular, SiPostgresql,
  SiRedis, SiSpring, SiSpringboot, SiSpringsecurity, SiHibernate,
  SiApachemaven, SiGradle, SiJunit5, SiApachekafka, SiRabbitmq,
  SiApachetomcat, SiPython, SiDjango, SiFlask, SiFastapi, SiPandas,
  SiNumpy, SiScipy, SiPytorch, SiTensorflow, SiKeras, SiScikitlearn,
  SiJupyter, SiAnaconda, SiStreamlit, SiCelery, SiPoetry, SiOpenai,
  SiHuggingface, SiLangchain, SiDotnet, SiBlazor, SiNuget, SiKubernetes,
  SiDocker, SiJenkins, SiPostman, SiSwagger, SiGraphql
} from "react-icons/si";
import { DiRedis, DiJava, DiPython, DiDotnet, DiVisualstudio } from "react-icons/di";
import { TbBrandCSharp, TbBrandAzure, TbBrandXamarin, TbBrandVisualStudio } from "react-icons/tb";
import { BiLogoSpringBoot } from "react-icons/bi";
import { skillsData } from "../data/indexData.js";
import PageShell from "./PageShell";

const SiLanggraph = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="5" cy="12" r="2.5" />
    <circle cx="12" cy="5" r="2.5" />
    <circle cx="19" cy="12" r="2.5" />
    <circle cx="12" cy="19" r="2.5" />
    <path d="M7.1 10.7L9.9 7.3M14.1 7.3L16.9 10.7M16.9 13.3L14.1 16.7M9.9 16.7L7.1 13.3" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
  </svg>
);

const iconMap = {
  FaJava, FaPhp, FaJsSquare, FaPython, FaReact,
  FaNodeJs, FaAndroid, FaGitAlt, FaDocker, FaHtml5,
  FaCss3Alt, FaBootstrap, FaSass, FaLess, FaAws,
  FaGoogle, FaMicrosoft, FaUbuntu, FaLinux, FaFlask, FaGithub,
  SiMysql, SiC, SiCplusplus, SiMongodb, SiNextdotjs,
  SiTypescript, SiJavascript, SiVuedotjs, SiAngular, SiPostgresql,
  SiRedis, DiRedis,
  DiJava, SiSpring, SiSpringboot, SiSpringsecurity, SiHibernate,
  SiApachemaven, SiGradle, SiJunit5, SiApachekafka, SiRabbitmq,
  SiApachetomcat, BiLogoSpringBoot,
  DiPython, SiPython, SiDjango, SiFlask, SiFastapi, SiPandas,
  SiNumpy, SiScipy, SiPytorch, SiTensorflow, SiKeras, SiScikitlearn,
  SiJupyter, SiAnaconda, SiStreamlit, SiCelery, SiPoetry, SiOpenai,
  SiHuggingface, SiLangchain, SiLanggraph,
  SiDotnet, DiDotnet, TbBrandCSharp, SiBlazor, SiNuget,
  DiVisualstudio, TbBrandVisualStudio, TbBrandAzure, TbBrandXamarin,
  SiKubernetes, SiDocker, SiJenkins, SiPostman, SiSwagger, SiGraphql
};

const accentMap = {
  "General": "from-[var(--accent-d)]/45 via-white/10 to-transparent",
  "Web Development": "from-[var(--accent-a)]/45 via-white/10 to-transparent",
  "Mobile Development": "from-[var(--accent-b)]/45 via-white/10 to-transparent",
  "Databases": "from-[var(--accent-c)]/45 via-white/10 to-transparent",
  "DevOps & Tools": "from-[var(--accent-a)]/30 via-[var(--accent-b)]/25 to-transparent",
};

const Skills = () => {
  const apiSkills = useSelector((state) => state.portfolio.data?.skills);
  const loading = useSelector((state) => state.portfolio.loading);
  const error = useSelector((state) => state.portfolio.error);

  const skills = useMemo(() => {
    if (error && !apiSkills) return skillsData;
    const raw = apiSkills || {};
    return {
      "General": Array.isArray(raw.General) ? raw.General : [],
      "Web Development": Array.isArray(raw["Web Development"]) ? raw["Web Development"] : [],
      "Mobile Development": Array.isArray(raw["Mobile Development"]) ? raw["Mobile Development"] : [],
      "Databases": Array.isArray(raw.Databases) ? raw.Databases : [],
      "DevOps & Tools": Array.isArray(raw["DevOps & Tools"]) ? raw["DevOps & Tools"] : [],
    };
  }, [apiSkills, error]);

  if (loading) {
    return (
      <PageShell title="Skills">
        <div className="flex justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border border-white/20 border-t-white" />
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell
      index="04 / Skills"
      title="Skills"
      subtitle="A living stack — languages, frameworks, and tools shaped by shipping real products."
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(skills).map(([category, skillsList], index) => {
          const skillsArray = Array.isArray(skillsList) ? skillsList : [];
          return (
            <motion.div
              key={category}
              initial={{ y: 32, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="accent-card relative overflow-hidden border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm"
            >
              <div className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r ${accentMap[category] || "from-[var(--accent-a)]/40 to-transparent"}`} />
              <div className="mb-6 flex items-baseline justify-between gap-3">
                <h3 className="font-display text-lg font-semibold text-white">{category}</h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent-a)]/50">
                  {skillsArray.length} nodes
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {skillsArray.map((skill, skillIndex) => {
                  const IconComponent = iconMap[skill.icon];
                  return (
                    <motion.div
                      key={`${skill.name}-${skillIndex}`}
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.25, delay: skillIndex * 0.03 }}
                      className="group flex flex-col items-center border border-transparent p-3 transition hover:border-[color-mix(in_srgb,var(--accent-a)_25%,transparent)] hover:bg-white/[0.03]"
                    >
                      {IconComponent ? (
                        <IconComponent className={`${skill.color} text-2xl transition duration-200 group-hover:scale-110`} />
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-xs font-bold text-white">
                          {skill.name.charAt(0)}
                        </div>
                      )}
                      <p className="mt-2 text-center text-[11px] text-zinc-500 transition group-hover:text-zinc-200">
                        {skill.name}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </PageShell>
  );
};

export default Skills;
