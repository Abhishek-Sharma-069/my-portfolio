import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaDiscord,
} from "react-icons/fa";
import { contactData } from "../data/indexData";
import contactIllustration from "../assets/images/contact_illustration.svg";

// Map JSON icon names to React Icons
const iconMap = {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaDiscord,
};

const Contact = () => {
  const [submitStatus, setSubmitStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    try {
      const formData = {
        access_key: "398273e9-b9d4-48e1-ae35-f80afff23673",
        name: event.target.name.value,
        email: event.target.email.value,
        message: event.target.message.value,
        subject: "New Contact Form Submission"
      };

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        setSubmitStatus('Thank you for your message!');
        event.target.reset();
      } else {
        setSubmitStatus('Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full text-white bg-black py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-2 sm:px-6 flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12">
        {/* Left Side */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6"
          >
            <h2 className="text-purple-600 font-bold text-2xl sm:text-3xl md:text-4xl">{contactData.title}</h2>
            <div className="bg-purple-600 h-1 w-12 sm:w-20 md:w-40 rounded-md"></div>
          </motion.div>
          
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            src={contactIllustration}
            alt="Developer Illustration"
            className="w-full max-w-[180px] sm:max-w-[250px] lg:max-w-xs my-4 sm:my-6 rounded-lg scale-x-[-1] transform hover:scale-105"
          />

          <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-4 sm:mb-6 px-2 sm:px-0">
            {contactData.description}
          </p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="flex gap-3 sm:gap-4 md:gap-6 mb-8 lg:mb-0 flex-wrap justify-center lg:justify-start"
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
        </motion.div>

        {/* Right Side: Contact Form */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="w-full lg:w-1/2 bg-gray-800 p-3 sm:p-4 md:p-6 lg:p-8 rounded-lg shadow-lg"
        >
          <form className="flex flex-col gap-3 sm:gap-4 md:gap-6" onSubmit={onSubmit}>
            {submitStatus && (
              <div className={`text-center text-sm ${submitStatus.includes('Thank you') ? 'text-green-500' : 'text-red-500'}`}>
                {submitStatus}
              </div>
            )}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-gray-300 text-sm font-bold">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full p-2 sm:p-3 rounded-md bg-gray-700 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Your name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-gray-300 text-sm font-bold">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full p-2 sm:p-3 rounded-md bg-gray-700 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="your.email@example.com"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-gray-300 text-sm font-bold">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full p-2 sm:p-3 rounded-md bg-gray-700 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Your message here..."
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 text-white py-2 sm:py-3 rounded-md font-bold text-sm sm:text-base hover:bg-purple-700 transition duration-300 disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
