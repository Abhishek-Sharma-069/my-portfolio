import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaFileDownload } from "react-icons/fa";
import axiosInstance from "../config/axios";
import PageShell from "./PageShell";

const Resume = () => {
  const [isMobile, setIsMobile] = useState(false);
  const resumeUrl = useSelector((state) => state.portfolio.data?.resumeUrl ?? "");
  const loading = useSelector((state) => state.portfolio.loading);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <PageShell
      title="Resume"
      subtitle="Preview the latest résumé, or download a copy for offline reading."
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        {loading ? (
          <div className="mb-8 w-full border border-white/10 bg-white/[0.02] p-4 text-zinc-400">
            Loading resume...
          </div>
        ) : !resumeUrl ? (
          <div className="mb-8 w-full border border-white/10 bg-white/[0.02] p-4 text-zinc-400">
            Resume not available. Please try again later.
          </div>
        ) : isMobile ? (
          <div className="mb-8 w-full border border-white/10 bg-white/[0.02] p-4 text-zinc-400">
            PDF preview is not available on mobile devices.
            <br />
            Please use the button below to download and view the resume.
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="mb-8 flex w-full max-w-xl justify-center"
          >
            <div
              className="overflow-hidden border border-white/15 bg-white shadow-[0_0_60px_rgba(103,232,249,0.08)]"
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

        {resumeUrl && (
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            whileHover={{ scale: 1.02 }}
            type="button"
            onClick={async () => {
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
              }
            }}
            className="btn-solid inline-flex cursor-pointer items-center gap-2 px-6 py-3 font-display text-sm font-semibold"
          >
            <FaFileDownload className="text-lg" />
            Download Resume
          </motion.button>
        )}
      </div>
    </PageShell>
  );
};

export default Resume;
