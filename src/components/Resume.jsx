import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import myResume from "../assets/resume/Abhishek_Sharma_Resume.pdf";
import { FaFileDownload } from "react-icons/fa";

const Resume = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="w-full container bg-black text-white px-2 sm:px-4 py-8 sm:py- flex flex-col items-center">
      <div className="text-center max-w-4xl w-full">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6"
        >
          <h2 className="text-purple-600 font-bold text-2xl sm:text-3xl md:text-4xl">
            My Resume
          </h2>
          <div className="bg-purple-600 h-1 w-12 sm:w-20 md:w-40 rounded-md"></div>
        </motion.div>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-gray-300 mb-6 sm:mb-8 text-base sm:text-lg"
        >
          Here's a preview of my resume. You can also download it using the
          button below.
        </motion.p>

        {isMobile ? (
          <div className="w-full mb-8 p-4 bg-gray-900 border-2 border-purple-600 rounded-lg text-gray-200">
            PDF preview is not available on mobile devices.
            <br />
            Please use the button below to download and view the resume.
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="w-full mb-8 border-2 border-purple-600 rounded-lg overflow-hidden shadow-lg h-72 sm:h-96 md:h-[65vh]"
          >
            <iframe
              src={`${myResume}#toolbar=0`}
              title="Abhishek Sharma Resume"
              className="w-full h-full"
            ></iframe>
          </motion.div>
        )}

        <motion.a
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          href={myResume}
          download="Abhishek_Sharma_Resume.pdf"
          className="bg-purple-600 px-4 sm:px-6 py-2 sm:py-3 rounded-md hover:bg-purple-700 transition-all inline-flex items-center gap-2 text-base sm:text-lg"
        >
          <FaFileDownload className="text-xl" />
          Download Resume
        </motion.a>
      </div>
    </div>
  );
};

export default Resume;
