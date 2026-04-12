import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaFileDownload } from "react-icons/fa";
import axiosInstance from '../config/axios';


const Resume = () => {
  const [isMobile, setIsMobile] = useState(false);
  const resumeUrl = useSelector((state) => state.portfolio.data?.resumeUrl ?? '');
  const loading = useSelector((state) => state.portfolio.loading);

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

        {loading ? (
          <div className="w-full mb-8 p-4 bg-gray-900 border-2 border-purple-600 rounded-lg text-gray-200">
            Loading resume...
          </div>
        ) : !resumeUrl ? (
          <div className="w-full mb-8 p-4 bg-gray-900 border-2 border-purple-600 rounded-lg text-gray-200">
            Resume not available. Please try again later.
          </div>
        ) : isMobile ? (
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
            className="w-full max-w-2xl mx-auto mb-8 flex justify-center"
          >
            <div className="bg-white border-2 border-purple-600 rounded-lg shadow-2xl overflow-hidden" style={{ aspectRatio: '8.7/11', width: '100%', maxWidth: '540px', minHeight: '60vh', height: 'auto' }}>
              <iframe
                src={`${resumeUrl}#toolbar=0`}
                title="Abhishek Sharma Resume"
                className="w-full h-full"
                style={{ minHeight: '60vh', height: '100%', border: '0px solid pink', padding: '0px', boxSizing: 'border-box' }}
              ></iframe>
            </div>
          </motion.div>
        )}

        {resumeUrl && (
          <motion.button
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            onClick={async () => {
              try {
                const response = await axiosInstance.get(resumeUrl, { responseType: 'blob' });
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'Abhishek_Sharma_Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
              } catch (error) {
                console.error('Error downloading resume:', error);
                // Fallback to opening in new tab if download fails
                window.open(resumeUrl, '_blank');
              }
            }}
            className="bg-purple-600 px-4 sm:px-6 py-2 sm:py-3 rounded-md hover:bg-purple-700 transition-all inline-flex items-center gap-2 text-base sm:text-lg cursor-pointer"
          >
            <FaFileDownload className="text-xl" />
            Download Resume
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default Resume;
