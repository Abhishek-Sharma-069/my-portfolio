import React from "react";
import { motion } from "framer-motion";
import myResume from "../assets/resume/Abhishek_Sharma_Resume.pdf";
import { FaFileDownload } from "react-icons/fa";

const Resume = () => {
  return (
    <div className="w-full min-h-screen bg-black text-white px-4 py-12 flex flex-col items-center">
      <div className="text-center max-w-4xl w-full">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-4xl font-bold text-purple-600 mb-4"
        >
          My Resume
        </motion.h1>
        
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-gray-300 mb-8 text-lg"
        >
          Here's a preview of my resume. You can also download it using the
          button below.
        </motion.p>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="w-full h-[135vh] mb-8 border-2 border-purple-600 rounded-lg overflow-hidden shadow-lg"
        >
          <iframe
            src={`${myResume}#toolbar=0`}
            title="Abhishek Sharma Resume"
            className="w-full h-full"
          ></iframe>
        </motion.div>

        <motion.a
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          href={myResume}
          download="Abhishek_Sharma_Resume.pdf"
          className="bg-purple-600 px-6 py-3 rounded-md hover:bg-purple-700 transition-all inline-flex items-center gap-2 text-lg"
        >
          <FaFileDownload className="text-xl" />
          Download Resume
        </motion.a>
      </div>
    </div>
  );
};

export default Resume;
