import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { GrDown } from "react-icons/gr";
import { FaArrowRight } from "react-icons/fa";
import PageShell from "./PageShell";

const SECTION_ORDER = ["Volunteership", "Internship", "Work"];

const domains = [
  { label: "Volunteership", hint: "Communities · open source" },
  { label: "Internship", hint: "Shipping · mentorship" },
  { label: "Work", hint: "Products · ownership" },
];

const Experience = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const experienceData = useSelector((state) => state.portfolio.data?.experience ?? { sections: [] });
  const loading = useSelector((state) => state.portfolio.loading);

  const orderedSections = useMemo(() => {
    const sections = experienceData?.sections ?? [];
    return [...sections].sort((a, b) => {
      const ai = SECTION_ORDER.indexOf(a.type);
      const bi = SECTION_ORDER.indexOf(b.type);
      return (ai === -1 ? SECTION_ORDER.length : ai) - (bi === -1 ? SECTION_ORDER.length : bi);
    });
  }, [experienceData]);

  const totalRoles = useMemo(
    () => orderedSections.reduce((sum, s) => sum + (s.items?.length || 0), 0),
    [orderedSections]
  );

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <PageShell
      index="05 / Experience"
      title="Experience"
      subtitle="Volunteership, internships, and work — shipping products, mentoring communities, and building in public."
    >
      {/* Intro above timeline — mirrors Projects page */}
      <div className="mb-14 grid grid-cols-1 gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-500">
            Career path
          </p>
          <h2 className="mt-3 max-w-xl font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Roles that taught me to ship, lead, and contribute.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            Application development and frontend design across healthcare and IoT,
            campus ambassador work at GeeksforGeeks, and open-source collaboration.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {domains.map((d) => (
              <div
                key={d.label}
                className="accent-chip border border-white/10 bg-white/[0.02] px-3 py-2"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-300">
                  {d.label}
                </p>
                <p className="mt-0.5 text-[11px] text-zinc-600">{d.hint}</p>
              </div>
            ))}
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
              Total roles
            </span>
            <span className="font-display text-3xl font-semibold text-chroma">
              {loading ? "—" : String(totalRoles).padStart(2, "0")}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-zinc-500">
            Expand a section below for timeline details. Order: volunteership → internship → work.
          </p>
          <Link
            to="/resume"
            className="accent-link mt-1 inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400"
          >
            View resume
            <FaArrowRight className="text-[10px]" />
          </Link>
        </motion.div>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <span className="section-rule" />
        <h3 className="font-display text-lg font-semibold text-white sm:text-xl">
          Timeline
        </h3>
      </div>

      {loading && (
        <div className="py-8 text-center font-mono text-sm text-zinc-500">Loading experience data...</div>
      )}

      {!loading && orderedSections.length === 0 && (
        <div className="py-8 text-center text-zinc-500">No experience data available</div>
      )}

      {!loading && orderedSections.map((section, index) => (
        <motion.div
          key={section.type}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.08 }}
          className="mb-3"
        >
          <button
            type="button"
            onClick={() => toggleAccordion(index)}
            className="accent-hover-border flex w-full items-center justify-between border border-white/10 bg-white/[0.02] px-5 py-4 text-left"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-[var(--accent-a)]/65">
                0{index + 1}
              </span>
              <h3 className="font-display text-lg font-semibold text-white">{section.type}</h3>
              <span className="font-mono text-[10px] text-zinc-600">
                {section.items?.length || 0} roles
              </span>
            </div>
            <GrDown
              className={`text-zinc-400 transition-transform duration-300 ${
                activeAccordion === index ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence mode="wait">
            {activeAccordion === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="relative mt-6 ml-2 overflow-hidden pl-6"
              >
                <div
                  className="absolute left-4 top-0 h-full w-px"
                  style={{
                    background:
                      "linear-gradient(to bottom, color-mix(in srgb, var(--accent-a) 65%, transparent), color-mix(in srgb, var(--accent-b) 40%, transparent), transparent)",
                  }}
                />

                <div className="flex flex-col gap-8">
                  {section.items.map((item, idx) => (
                    <div key={idx} className="relative flex gap-6">
                      <div
                        className="absolute left-[-0.65rem] top-2 h-3 w-3 rounded-full border bg-black"
                        style={{ borderColor: "var(--accent-a)" }}
                      />
                      <div className="accent-hover-border w-full border border-white/10 bg-black/40 p-4">
                        <h4 className="font-display text-base font-semibold text-white">
                          {item.company || item.organization}
                        </h4>
                        <p className="mt-1 text-sm text-zinc-300">{item.role}</p>
                        <p className="font-mono text-xs italic text-[var(--accent-a)]/55">{item.duration}</p>
                        <p className="mt-2 text-sm leading-relaxed text-zinc-500">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </PageShell>
  );
};

export default Experience;
