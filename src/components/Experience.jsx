import React, { useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { GrDown } from "react-icons/gr";
import PageShell from "./PageShell";
import experience from "../assets/images/experience.svg";

const Experience = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const experienceData = useSelector((state) => state.portfolio.data?.experience ?? { sections: [] });
  const loading = useSelector((state) => state.portfolio.loading);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <PageShell
      index="05 / Experience"
      title="Experience"
      subtitle="Work, internships, and volunteership — shipping products, mentoring communities, and building in public."
    >
      <div className="mb-10 flex flex-col items-center gap-8 lg:flex-row">
        <p className="max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          Application development and frontend design across healthcare and IoT,
          campus ambassador work at GeeksforGeeks, and open-source collaboration.
        </p>
        <img src={experience} alt="experience" className="w-56 object-contain opacity-90 sm:w-80" />
      </div>

      {loading && (
        <div className="py-8 text-center font-mono text-sm text-zinc-500">Loading experience data...</div>
      )}

      {!loading && (!experienceData.sections || experienceData.sections.length === 0) && (
        <div className="py-8 text-center text-zinc-500">No experience data available</div>
      )}

      {!loading && experienceData?.sections?.map((section, index) => (
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
            className="flex w-full items-center justify-between border border-white/10 bg-white/[0.02] px-5 py-4 text-left transition hover:border-white/25 hover:bg-white/[0.04]"
          >
            <h3 className="font-display text-lg font-semibold text-white">{section.type}</h3>
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
                <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-cyan-300/60 via-violet-300/40 to-transparent" />

                <div className="flex flex-col gap-8">
                  {section.items.map((item, idx) => (
                    <div key={idx} className="relative flex gap-6">
                      <div className="absolute left-[-0.65rem] top-2 h-3 w-3 rounded-full border border-white bg-black" />
                      <div className="w-full border border-white/10 bg-black/40 p-4">
                        <h4 className="font-display text-base font-semibold text-white">
                          {item.company || item.organization}
                        </h4>
                        <p className="mt-1 text-sm text-zinc-300">{item.role}</p>
                        <p className="font-mono text-xs italic text-zinc-600">{item.duration}</p>
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
