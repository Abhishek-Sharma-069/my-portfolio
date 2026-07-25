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
import PageShell from "./PageShell";

const iconMap = {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaDiscord,
};

const Contact = () => {
  const [submitStatus, setSubmitStatus] = useState("");
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
        subject: "New Contact Form Submission",
      };

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitStatus("Thank you for your message!");
        event.target.reset();
      } else {
        setSubmitStatus("Something went wrong. Please try again.");
      }
    } catch {
      setSubmitStatus("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageShell title={contactData.title} subtitle={contactData.description}>
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-14">
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex w-full flex-col items-center text-center lg:w-1/2 lg:items-start lg:text-left"
        >
          <img
            src={contactIllustration}
            alt="Developer Illustration"
            className="my-4 w-full max-w-[220px] scale-x-[-1] opacity-90 lg:max-w-xs"
          />
          <div className="mt-4 flex flex-wrap justify-center gap-5 lg:justify-start">
            {contactData.socials.map((social, index) => {
              const IconComponent = iconMap[social.icon];
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 transition duration-300 hover:text-white"
                >
                  <IconComponent className="text-2xl" />
                </a>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="w-full border border-white/10 bg-white/[0.02] p-5 sm:p-8 lg:w-1/2"
        >
          <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            {submitStatus && (
              <div
                className={`text-center text-sm ${
                  submitStatus.includes("Thank you") ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {submitStatus}
              </div>
            )}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full border border-white/10 bg-black/40 p-3 text-sm text-white outline-none transition focus:border-white/40"
                placeholder="Your name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full border border-white/10 bg-black/40 p-3 text-sm text-white outline-none transition focus:border-white/40"
                placeholder="your.email@example.com"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full border border-white/10 bg-black/40 p-3 text-sm text-white outline-none transition focus:border-white/40"
                placeholder="Your message here..."
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-solid w-full py-3 font-display text-sm font-semibold disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.div>
      </div>
    </PageShell>
  );
};

export default Contact;
