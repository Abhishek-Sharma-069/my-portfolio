import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaExternalLinkAlt, FaFileDownload } from "react-icons/fa";
import axiosInstance from "../config/axios";
import PageShell from "./PageShell";

const domains = [
  { label: "Preview", hint: "In-browser PDF" },
  { label: "Download", hint: "Offline copy" },
  { label: "Share", hint: "Open in new tab" },
];

const Resume = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const resumeUrl = useSelector((state) => state.portfolio.data?.resumeUrl ?? "");
  const loading = useSelector((state) => state.portfolio.loading);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleDownload = async () => {
    if (!resumeUrl || downloading) return;
    setDownloading(true);
    try {
      const response = await axiosInstance.get(resumeUrl, { responseType: "blob" });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Abhishek_Sharma_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading resume:", error);
      window.open(resumeUrl, "_blank");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <PageShell
      index="06 / Resume"
      title="Resume"
      subtitle="Latest résumé — preview in place, download a PDF, or open a clean copy in a new tab."
    >
      {/* Intro above document — mirrors Projects / Experience */}
      <div className="mb-14 grid grid-cols-1 gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-500">
            Credentials
          </p>
          <h2 className="mt-3 max-w-xl font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            One page that captures the stack, the roles, and the work.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            Use the live preview below, grab a download for applications, or jump to
            Experience and Projects for deeper context.
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="flex flex-col gap-3 border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-5"
        >
          <div className="flex items-baseline justify-between gap-4 border-b border-white/5 pb-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-600">
              Status
            </span>
            <span className="font-display text-lg font-semibold text-white">
              {loading ? "…" : resumeUrl ? "Ready" : "Missing"}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-zinc-500">
            {resumeUrl
              ? "Document is live. Download or open in a new tab anytime."
              : "Resume file is not available yet. Try again shortly."}
          </p>
          <div className="mt-1 flex flex-wrap gap-4">
            <Link
              to="/experience"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400 transition hover:text-white"
            >
              Experience
              <FaArrowRight className="text-[10px]" />
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400 transition hover:text-white"
            >
              Projects
              <FaArrowRight className="text-[10px]" />
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="section-rule" />
          <h3 className="font-display text-lg font-semibold text-white sm:text-xl">
            Document
          </h3>
        </div>
        {resumeUrl && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleDownload}
              disabled={downloading}
              className="btn-solid inline-flex cursor-pointer items-center gap-2 px-4 py-2 font-display text-sm font-semibold disabled:opacity-60"
            >
              <FaFileDownload />
              {downloading ? "Downloading…" : "Download"}
            </button>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost inline-flex items-center gap-2 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em]"
            >
              Open tab
              <FaExternalLinkAlt className="text-[10px]" />
            </a>
          </div>
        )}
      </div>

      <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
        {loading ? (
          <div className="w-full border border-white/10 bg-white/[0.02] p-6 text-center font-mono text-sm text-zinc-500">
            Loading resume…
          </div>
        ) : !resumeUrl ? (
          <div className="w-full border border-white/10 bg-white/[0.02] p-6 text-center text-zinc-400">
            Resume not available. Please try again later.
          </div>
        ) : isMobile ? (
          <div className="w-full border border-white/10 bg-white/[0.02] p-6 text-center text-zinc-400">
            PDF preview isn&apos;t available on mobile.
            <br />
            Use Download or Open tab above.
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="flex w-full max-w-xl justify-center"
          >
            <div
              className="overflow-hidden border border-white/15 bg-white shadow-[0_0_60px_rgba(125,211,252,0.08)]"
              style={{ aspectRatio: "8.7/11", width: "100%", maxWidth: "540px", minHeight: "60vh" }}
            >
              <iframe
                src={`${resumeUrl}#toolbar=0`}
                title="Abhishek Sharma Resume"
                className="h-full w-full"
                style={{ minHeight: "60vh", border: 0 }}
              />
            </div>
          </motion.div>
        )}
      </div>
    </PageShell>
  );
};

export default Resume;
