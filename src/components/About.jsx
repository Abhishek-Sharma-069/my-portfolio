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

import codingIllustration from "../assets/images/hello.svg";
import dataIllustration from "../assets/images/data_science.svg"; // Replace with actual illustration path
import fullStackIllustration from "../assets/images/fullstack.svg";

const About = () => {
  return (
    <div className="w-full bg-black text-white px-6 py-16 flex flex-col items-center gap-24">

      {/* About Me Section */}
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center gap-12 mb-6">
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/2 flex justify-center"
        >
          <img
            src={codingIllustration}
            alt="Developer Illustration"
            className="w-10/12"
          />
        </motion.div>
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:w-1/2 flex flex-col gap-6"
        >
          <div className="flex items-center gap-4">
            <h2 className="text-purple-500 text-4xl font-bold">ABOUT ME</h2>
            <div className="h-1 w-20 bg-purple-500 rounded-lg"></div>
          </div>
          <p className="text-lg leading-relaxed text-gray-300">
            Hi, I’m Abhishek Sharma — a passionate developer and problem solver from
            Sultanpur, Uttar Pradesh. I’m currently pursuing my B.Tech in Computer
            Science and Engineering at United Institute of Technology.
          </p>
          <p className="text-lg text-gray-400">
            I specialize in building meaningful digital solutions, ranging from AI-based
            health tools to IoT-powered smart systems. I'm always exploring ways to
            create tech that has real-world impact.
          </p>
        </motion.div>
      </div>

      {/* What I Do Section */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="max-w-7xl w-full flex flex-col gap-16"
      >
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex items-center gap-4"
        >
          <div className="h-1 w-20 bg-purple-500 rounded-lg"></div>
          <h2 className="text-purple-500 text-4xl font-bold">What I Do?</h2>
        </motion.div>

        {/* Data Science & AI */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col md:flex-row items-start gap-12"
        >
          <div className="md:w-1/2 flex justify-center">
            <img
              src={dataIllustration}
              alt="Data Science Illustration"
              className="w-10/12"
            />
          </div>
          <div className="md:w-1/2 flex flex-col gap-4">
            <h3 className="text-3xl font-semibold flex items-center gap-2">
              <MdAnalytics className="text-purple-400" /> Data Science & AI
            </h3>
            <div className="flex gap-4 text-3xl text-purple-400 hover:text-red-500 transition duration-300 flex-wrap">  
              <SiKeras />
              <SiPytorch />
              <FaPython />
              <FaDatabase />
            </div>
            <ul className="list-disc ml-6 text-xl text-gray-300 leading-relaxed mt-3">
              <li>Developing scalable production-ready models for deep learning use cases</li>
              <li>Experience with Computer Vision, NLP, and forecasting problems</li>
              <li>Hands-on with time-series, model tuning, and visualization tools</li>
            </ul>
          </div>
        </motion.div>

        {/* Full Stack Development */}
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex flex-col md:flex-row-reverse items-start gap-12"
        >
          <div className="md:w-1/2 flex justify-center">
            <img
              src={fullStackIllustration}
              alt="Full Stack Dev Illustration"
              className="w-10/12"
            />
          </div>
          <div className="md:w-1/2 flex flex-col gap-4">
            <h3 className="text-3xl font-semibold flex items-center gap-2">
              <FaReact className="text-purple-400" /> Full Stack Development
            </h3>
            <div className="flex gap-4 text-3xl text-purple-400 flex-wrap hover:text-red-500 transition duration-300">
              <FaHtml5 />
              <FaCss3Alt />
              <FaJs />
              <FaReact />
              <SiTailwindcss />
              <FaNodeJs />
              <SiFirebase />
              <SiFlask />
            </div>
            <ul className="list-disc ml-6 text-xl text-gray-300  leading-relaxed mt-3">
              <li>Responsive frontend development with React, Tailwind & Vite</li>
              <li>Mobile apps using Flutter and solo Android apps with Kotlin</li>
              <li>Backend development with Node.js, Express, and Flask</li>
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
