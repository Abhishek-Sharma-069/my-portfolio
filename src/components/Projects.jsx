import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { projectsData } from "../data/indexData.js";
import chatbotImage from "../assets/projectCard/chatbot.jpg";
import projectImage from "../assets/projectCard/project_image.jpg";
import project_illustration from "../assets/images/mindmap.svg";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Projects = () => {
  return (
    <div className="w-full text-white bg-black py-8 sm:py-12 lg:py-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-2 sm:px-6 flex flex-col gap-8 lg:gap-12"
      >
        {/* Upper Side */}
        <motion.div
          variants={itemVariants}
          className="w-full flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          {/* Left side */}
          <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6"
                  >
                    <h2 className="text-purple-600 font-bold text-2xl sm:text-3xl md:text-4xl">
                      My Projects
                    </h2>
                    <div className="bg-purple-600 h-1 w-12 sm:w-20 md:w-40 rounded-md"></div>
                  </motion.div>
          {/* Left side */}
          <motion.div
            variants={itemVariants}
            className="w-full max-w-8xl flex flex-col lg:flex-row items-center gap-6 sm:gap-12 mb-3"
          >
            <motion.p
              variants={itemVariants}
              className="w-full text-base leading-relaxed sm:text-lg text-gray-300 mb-4 sm:mb-6 px-2 sm:px-0"
            >
              My projects leverage a diverse stack of modern technologies, from
              Android and IoT systems to React-based web applications. I’m most
              experienced in building full-stack applications with a focus on
              AI, healthcare, and smart systems, often integrating cloud
              services like Firebase for real-time data and deployment.
            </motion.p>

            <motion.img
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              src={project_illustration}
              alt="Projects Illustration"
              className="w-full max-w-xs sm:max-w-xs lg:max-w-md my-4 sm:my-6 rounded-lg"
            />
          </motion.div>
        </motion.div>

        {/* Project Cards Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="bg-gray-800 border border-purple-600 rounded-lg overflow-hidden shadow-lg flex flex-col max-w-[320px] mx-auto w-full"
            >
              <img
                src={projectImage}
                alt={project.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-purple-600 mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-300 mb-3 flex-grow">
                  {project.description}
                </p>
                <a
                  href={project.buttonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-500 py-1.5 px-3 rounded-md hover:bg-red-500 transition duration-300 text-center text-sm w-full sm:w-auto"
                >
                  {project.buttonText}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* See All Projects Button */}
        <motion.div
          variants={itemVariants}
          className="w-full flex justify-center mt-8"
        >
          <motion.a
            href="https://github.com/Abhishek-Sharma-069?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-600 text-white px-8 py-3 rounded-md hover:bg-purple-700 transition-colors duration-300 text-lg font-semibold flex items-center gap-2"
          >
            See All Projects
            <FaArrowRight />
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Projects;
