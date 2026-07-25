import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaDiscord,
  FaArrowRight,
} from "react-icons/fa";
import { contactData } from "../data/indexData";
import { githubProfile } from "../data/githubData";
import PageShell from "./PageShell";

const iconMap = {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaDiscord,
};

const domains = [
  { label: "Collaborate", hint: "Projects · ideas" },
  { label: "Hire", hint: "Roles · internships" },
  { label: "Say hi", hint: "Questions · feedback" },
];

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
    <PageShell
      index="07 / Contact"
      title={contactData.title}
      subtitle={contactData.description}
    >
      {/* Intro above form — mirrors Projects / Experience / Resume */}
      <div className="mb-14 grid grid-cols-1 gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-500">
            Get in touch
          </p>
          <h2 className="mt-3 max-w-xl font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Tell me what you&apos;re building — I&apos;ll reply.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            Open to collaborations, product work, and thoughtful conversations.
            Prefer socials? Find me on the channels below.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {domains.map((d) => (
              <div
                key={d.label}
                className="border border-white/10 bg-white/[0.02] px-3 py-2"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-300">
                  {d.label}
                </p>
                <p className="mt-0.5 text-[11px] text-zinc-600">{d.hint}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            {contactData.socials.map((social) => {
              const IconComponent = iconMap[social.icon];
              if (!IconComponent) return null;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-zinc-500 transition duration-300 hover:scale-110 hover:text-white"
                >
                  <IconComponent className="text-xl" />
                </a>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="flex flex-col gap-3 border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-5"
        >
          <div className="flex items-baseline justify-between gap-4 border-b border-white/5 pb-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-600">
              Direct line
            </span>
            <span className="font-display text-lg font-semibold text-white">
              {String(contactData.socials.length).padStart(2, "0")}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-zinc-500">
            Channels online. Or email me straight — I check it often.
          </p>
          <a
            href={`mailto:${githubProfile.email}`}
            className="mt-1 inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400 transition hover:text-white"
          >
            {githubProfile.email}
            <FaArrowRight className="text-[10px]" />
          </a>
        </motion.div>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <span className="section-rule" />
        <h3 className="font-display text-lg font-semibold text-white sm:text-xl">
          Message
        </h3>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mx-auto w-full max-w-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-8"
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
              rows={5}
              className="w-full border border-white/10 bg-black/40 p-3 text-sm text-white outline-none transition focus:border-white/40"
              placeholder="What are you working on?"
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
    </PageShell>
  );
};

export default Contact;
