import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experienceData } from "../data/indexData.js";
import { GrDown } from "react-icons/gr";
import experience from "../assets/images/experience.svg";

const Experience = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className="w-full bg-black text-white py-14 px-6 flex flex-col items-center">
      <div className="container w-full">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3 mb-3"
        >
          <h2 className="text-4xl font-bold text-purple-500">Experience</h2>
          <div className="h-1 w-24 bg-purple-500 rounded-md"></div>
        </motion.div>

        {/* Intro Text and Illustration */}
        <div className="flex flex-col lg:flex-row items-center gap-6 mb-3">
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-gray-300 text-xl leading-relaxed max-w-2xl"
          >
            Work, Internship and Volunteership — I’ve worked on real-world
            projects as an Application Developer and Frontend Designer,
            particularly in the healthcare and IoT domains. I’ve also
            contributed to impactful college-level hackathons and served as a
            Campus Ambassador at GeeksforGeeks. Beyond development, I enjoy
            participating in tech events and collaborating with open-source
            communities to drive meaningful change.
          </motion.p>
          <motion.img
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            src={experience}
            alt="experience"
            className="w-80 sm:w-96 lg:w-[420px] object-contain"
          />
        </div>

        {/* Accordion Timeline */}
        {experienceData.sections.map((section, index) => (
          <motion.div
            key={section.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="mb-3"
          >
            {/* Accordion Header */}
            <div
              onClick={() => toggleAccordion(index)}
              className="flex justify-between items-center bg-[#1a1a1a] border border-purple-500 rounded-md px-6 py-4 cursor-pointer hover:bg-purple-900/20 transition-all"
            >
              <h3 className="text-xl font-semibold text-white">
                {section.type}
              </h3>
              <GrDown
                className={`text-white transition-transform duration-300 ${
                  activeAccordion === index ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Accordion Content */}
            <AnimatePresence mode="wait">
              {activeAccordion === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative mt-8 ml-4 pl-6"
                >
                  {/* Timeline Vertical Line */}
                  <div className="absolute left-4 top-0 h-full w-1 bg-purple-500 rounded"></div>

                  {/* Timeline Items */}
                  <div className="flex flex-col gap-10">
                    {section.items.map((item, idx) => (
                      <div key={idx} className="relative flex gap-6">
                        {/* Timeline Dot */}
                        <div className="absolute left-[-0.7rem] top-2 w-4 h-4 bg-purple-500 border-2 border-white rounded-full"></div>

                        {/* Experience Card */}
                        <div className="bg-[#121212] border border-purple-500 rounded-lg p-4 w-full shadow-md">
                          <h4 className="text-purple-400 font-bold text-lg">
                            {item.company || item.organization}
                          </h4>
                          <p className="text-white font-medium">{item.role}</p>
                          <p className="text-gray-400 text-sm italic">
                            {item.duration}
                          </p>
                          <p className="text-gray-300 mt-2 text-sm leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
