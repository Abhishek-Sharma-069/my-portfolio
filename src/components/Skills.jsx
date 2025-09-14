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
  const renderSkillCard = (category, skills, index) => {
    const colorMap = {
      "General": {
        bg: "bg-gradient-to-br from-yellow-900/20 to-yellow-700/10",
        border: "border-yellow-500/30",
        title: "text-yellow-400",
        accent: "bg-yellow-500"
      },
      "Web Development": {
        bg: "bg-gradient-to-br from-green-900/20 to-green-700/10",
        border: "border-green-500/30",
        title: "text-green-400",
        accent: "bg-green-500"
      },
      "Mobile Development": {
        bg: "bg-gradient-to-br from-blue-900/20 to-blue-700/10",
        border: "border-blue-500/30",
        title: "text-blue-400",
        accent: "bg-blue-500"
      },
      "Databases": {
        bg: "bg-gradient-to-br from-teal-900/20 to-teal-700/10",
        border: "border-teal-500/30",
        title: "text-teal-400",
        accent: "bg-teal-500"
      },
      "DevOps & Tools": {
        bg: "bg-gradient-to-br from-purple-900/20 to-purple-700/10",
        border: "border-purple-500/30",
        title: "text-purple-400",
        accent: "bg-purple-500"
      }
    };

    const colors = colorMap[category] || {
      bg: "bg-gradient-to-br from-gray-900/20 to-gray-700/10",
      border: "border-gray-500/30",
      title: "text-gray-400",
      accent: "bg-gray-500"
    };

    return (
      <motion.div
        key={category}
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={`relative p-6 rounded-2xl border-2 ${colors.bg} ${colors.border} backdrop-blur-sm hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20`}
      >
        {/* Category Title */}
        <div className="flex items-center mb-6">
          <div className={`w-1 h-8 ${colors.accent} rounded-full mr-3`}></div>
          <h3 className={`text-xl font-bold ${colors.title}`}>
            {category}
          </h3>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-3 gap-4">
          {skills.map((skill, skillIndex) => {
            const IconComponent = iconMap[skill.icon];
            return (
              <motion.div
                key={skillIndex}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                className="flex flex-col items-center p-3 rounded-lg bg-black/20 hover:bg-black/40 transition-all duration-200 group"
              >
                {IconComponent && (
                  <IconComponent 
                    className={`${skill.color} text-3xl group-hover:scale-110 transition-transform duration-200`} 
                  />
                )}
                <p className="text-xs text-center mt-2 text-gray-300 group-hover:text-white transition-colors duration-200">
                  {skill.name}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-white/20 rounded-full"></div>
        <div className="absolute bottom-4 right-4 w-1 h-1 bg-white/30 rounded-full"></div>
      </motion.div>
    );
  };

  return (
    <div className="w-full bg-black text-white py-10 px-2 sm:py-16 sm:px-6 flex flex-col items-center">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="container w-full max-w-7xl"
      >
        {/* Header */}
        <div className="flex items-center gap-2 sm:gap-3 mb-12 sm:mb-16 justify-center">
          <h2 className="text-2xl sm:text-4xl font-bold text-purple-500">Skills</h2>
          <div className="h-1 w-12 sm:w-24 bg-purple-500 rounded-md"></div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skillsData).map(([category, skills], index) => 
            renderSkillCard(category, skills, index)
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Skills;
