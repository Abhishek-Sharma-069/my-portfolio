import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaInstagram ,FaDiscord } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';

import AbhishekImg from '../assets/images/feeling-proud.svg';
import { contactData } from '../data/indexData';

const iconMap = {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaDiscord,
};

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className='w-full min-h-screen bg-black flex flex-col-reverse md:flex-row justify-center items-center gap-4 px-2 md:px-4 pt-0'>
      <div className='w-full flex items-center justify-center flex-col px-2'>
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className='text-3xl sm:text-4xl text-white font-bold text-center'
        >
          Hello, I'm{' '}
          <span className='text-purple-600'>
            Abhishek Sharma
          </span>
        </motion.h1>
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className='text-2xl sm:text-4xl text-white font-bold text-center'
        >
          <span className='text-purple-600'>
            <TypeAnimation
              sequence={[
                'Full Stack Web Developer',
                2000,
                'Software Engineer',
                2000,
                'ML/AI Developer',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='text-gray-400 font-bold text-center mt-2 text-base sm:text-lg px-2'
        >
          I'm a passionate web developer with a knack for creating dynamic and responsive web applications. I love coding and am always eager to learn new technologies. Let's connect and build something amazing together!
        </motion.p>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='w-full flex flex-col sm:flex-row justify-evenly mt-8 px-1 gap-4 sm:gap-0'
        >
          <button 
            onClick={() => navigate('/contact')}
            className='text-purple-600 rounded-full bg-black border-2 px-5 py-2 w-full sm:w-auto'
          >
            Contact Me
          </button>
          <button 
            onClick={() => navigate('/projects')}
            className='text-purple-600 rounded-full bg-black border-2 px-5 py-2 w-full sm:w-auto'
          >
            View Projects
          </button>
        </motion.div>

        <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    className="flex gap-3 sm:gap-4 md:gap-6 mb-8 mt-4 lg:mb-0 flex-wrap justify-center lg:justify-start"
                  >
                    {contactData.socials.map((social, index) => {
                      const IconComponent = iconMap[social.icon];
                      return (
                        <a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 text-3xl hover:text-red-600 transition duration-300"
                        >
                          <IconComponent />
                        </a>
                      );
                    })}
                  </motion.div>
      </div>

      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className='w-full flex justify-center mb-8 md:mb-0'
      >
        <img className='text-white max-w-xs sm:max-w-md md:max-w-lg w-full object-contain' src={AbhishekImg} alt="Abhishek Sharma" />
      </motion.div>
    </div>
  );
};

export default Landing;