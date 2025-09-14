import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  FaJava, FaPhp, FaJsSquare, FaPython, FaReact,
  FaNodeJs, FaAndroid, FaGitAlt, FaDocker, FaHtml5,
  FaCss3Alt, FaBootstrap, FaSass, FaLess, FaAws,
  FaGoogle, FaMicrosoft, FaUbuntu, FaLinux
} from "react-icons/fa";
import {
  SiMysql, SiC, SiCplusplus, SiMongodb, SiNextdotjs,
  SiTypescript, SiJavascript, SiVuedotjs, SiAngular, SiPostgresql
} from "react-icons/si";

import { skillsData } from "../data/indexData.js";

const iconMap = {
  FaJava, FaPhp, FaJsSquare, FaPython, FaReact,
  FaNodeJs, FaAndroid, FaGitAlt, FaDocker, FaHtml5,
  FaCss3Alt, FaBootstrap, FaSass, FaLess, FaAws,
  FaGoogle, FaMicrosoft, FaUbuntu, FaLinux,
  SiMysql, SiC, SiCplusplus, SiMongodb, SiNextdotjs,
  SiTypescript, SiJavascript, SiVuedotjs, SiAngular, SiPostgresql
};

const Skills = () => {
  const [skills, setSkills] = useState({
    "General": [],
    "Web Development": [],
    "Mobile Development": [],
    "Databases": [],
    "DevOps & Tools": []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/portfolio-data');
      console.log('API Response:', res.data);
      console.log('Skills from API:', res.data.skills);
      
      const apiSkills = res.data.skills || {};
      
      // Ensure each category is an array
      const formattedSkills = {
        "General": Array.isArray(apiSkills.General) ? apiSkills.General : [],
        "Web Development": Array.isArray(apiSkills["Web Development"]) ? apiSkills["Web Development"] : [],
        "Mobile Development": Array.isArray(apiSkills["Mobile Development"]) ? apiSkills["Mobile Development"] : [],
        "Databases": Array.isArray(apiSkills.Databases) ? apiSkills.Databases : [],
        "DevOps & Tools": Array.isArray(apiSkills["DevOps & Tools"]) ? apiSkills["DevOps & Tools"] : []
      };
      
      console.log('Formatted Skills:', formattedSkills);
      setSkills(formattedSkills);
    } catch (error) {
      console.error('Error fetching skills:', error);
      // Fallback to static data if API fails
      setSkills(skillsData);
    } finally {
      setLoading(false);
    }
  };

  const renderSkillCard = (category, skills, index) => {
    // Ensure skills is always an array
    const skillsArray = Array.isArray(skills) ? skills : [];
    
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
          {skillsArray.map((skill, skillIndex) => {
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
                {IconComponent ? (
                  <IconComponent 
                    className={`${skill.color} text-3xl group-hover:scale-110 transition-transform duration-200`} 
                  />
                ) : (
                  <div className={`${skill.color} text-3xl group-hover:scale-110 transition-transform duration-200 w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center`}>
                    <span className="text-xs font-bold">{skill.name.charAt(0)}</span>
                  </div>
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

  if (loading) {
    return (
      <div className="w-full bg-black text-white py-10 px-2 sm:py-16 sm:px-6 flex flex-col items-center">
        <div className="container w-full max-w-7xl">
          <div className="flex items-center gap-2 sm:gap-3 mb-12 sm:mb-16 justify-center">
            <h2 className="text-2xl sm:text-4xl font-bold text-purple-500">Skills</h2>
            <div className="h-1 w-12 sm:w-24 bg-purple-500 rounded-md"></div>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
        </div>
      </div>
    );
  }

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
          {Object.entries(skills).map(([category, skillsList], index) => 
            renderSkillCard(category, skillsList, index)
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Skills;
