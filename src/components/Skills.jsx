import React from "react";
import { motion } from "framer-motion";
import {
  FaJava, FaPhp, FaJsSquare, FaPython, FaReact,
  FaNodeJs, FaAndroid, FaGitAlt, FaDocker
} from "react-icons/fa";
import {
  SiMysql, SiC, SiCplusplus, SiMongodb, SiNextdotjs
} from "react-icons/si";

import { skillsData } from "../data/indexData.js";

const iconMap = {
  FaJava, FaPhp, FaJsSquare, FaPython, FaReact,
  FaNodeJs, FaAndroid, FaGitAlt, FaDocker,
  SiMysql, SiC, SiCplusplus, SiMongodb, SiNextdotjs,
};

const Skills = () => {
  const renderSkillSection = (title, skills, titleColor) => (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="relative pl-6 ml-4 mb-16 w-full max-w-6xl"
    >
      <div className="absolute left-0 top-1">
        <span className="block h-full w-1 bg-purple-500 rounded-full"></span>
      </div>

      <h3 className={`text-xl sm:text-2xl font-bold mb-4 ${titleColor}`}>
        {title}
      </h3>

      <div className="flex flex-wrap gap-x-10 gap-y-6">
        {skills.map((skill, index) => {
          const IconComponent = iconMap[skill.icon];
          return (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex flex-col items-center w-20"
            >
              {IconComponent && (
                <IconComponent className={`${skill.color} text-4xl hover:scale-125 transition-transform`} />
              )}
              <p className="text-xs text-center mt-2 text-gray-300">
                {skill.name}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );

  return (
    <div className="w-full bg-black text-white py-16 px-6 flex flex-col items-center">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="container w-full"
      >
        <div className="flex items-center gap-3 mb-10">
          <h2 className="text-4xl font-bold text-purple-500">Skills</h2>
          <div className="h-1 w-24 bg-purple-500 rounded-md"></div>
        </div>

        {renderSkillSection("Programming Languages", skillsData.languages, "text-yellow-400")}
        {renderSkillSection("Frameworks/Libraries", skillsData.frameworksAndTechnologies, "text-green-400")}
        {renderSkillSection("Tools", skillsData.toolsAndPlatforms, "text-blue-400")}
        {renderSkillSection("Databases", skillsData.databases, "text-teal-400")}
      </motion.div>
    </div>
  );
};

export default Skills;
