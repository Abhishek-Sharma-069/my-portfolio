import React, { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { fetchPortfolioData } from "../redux/slices/portfolioSlice";
import axiosInstance from "../config/axios";
import AdminShell, { adminInputClass, adminLabelClass, adminPanelClass } from "./AdminShell";

const ResumeManager = () => {
  const resumeUrl = useSelector((state) => state.portfolio.data?.resumeUrl ?? "");
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [uploading, setUploading] = useState(false);

  const refetchPortfolio = () => dispatch(fetchPortfolioData({ force: true }));

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("resume", file);
    setUploading(true);

    try {
      await axiosInstance.put("/resume", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      await refetchPortfolio();
      setFile(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error uploading resume:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <AdminShell
      index="04 / Resume"
      title="Manage Resume"
      subtitle="Upload and preview the public PDF résumé."
      action={
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="btn-solid inline-flex items-center gap-2 px-4 py-2.5 font-display text-sm font-semibold"
        >
          <AiOutlinePlusCircle />
          {showForm ? "Hide form" : "Upload resume"}
        </button>
      }
    >
      {showForm && (
        <form onSubmit={handleSubmit} className={`${adminPanelClass} mb-10 max-w-xl space-y-4`}>
          <h2 className="font-display text-xl font-semibold text-white">Upload new resume</h2>
          <div>
            <label className={adminLabelClass}>PDF file</label>
            <input
              type="file"
              name="resume"
              accept="application/pdf"
              onChange={handleFileChange}
              className={`${adminInputClass} file:mr-4 file:border-0 file:bg-white file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-black`}
            />
          </div>
          <button
            type="submit"
            disabled={!file || uploading}
            className="btn-solid px-5 py-2.5 font-display text-sm font-semibold disabled:opacity-50"
          >
            {uploading ? "Uploading…" : "Upload"}
          </button>
        </form>
      )}

      <div className="mb-6 flex items-center gap-4">
        <span className="section-rule" />
        <h3 className="font-display text-lg font-semibold">Document</h3>
      </div>

      <div className={`${adminPanelClass} max-w-2xl`}>
        <div className="mb-4 flex items-baseline justify-between gap-3 border-b border-white/5 pb-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-600">
            Status
          </span>
          <span className={`font-display text-lg font-semibold ${resumeUrl ? "text-chroma" : "text-zinc-500"}`}>
            {resumeUrl ? "Ready" : "Missing"}
          </span>
        </div>

        {resumeUrl ? (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setShowResume(!showResume)}
                className="btn-solid px-4 py-2 font-display text-sm font-semibold"
              >
                {showResume ? "Hide preview" : "View preview"}
              </button>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em]"
              >
                Open tab
              </a>
            </div>
            {showResume && (
              <iframe
                src={`${resumeUrl}#toolbar=0`}
                title="Resume Preview"
                className="h-[500px] w-full border border-white/10 bg-white"
              />
            )}
          </div>
        ) : (
          <p className="text-sm text-zinc-500">No resume uploaded yet.</p>
        )}
      </div>
    </AdminShell>
  );
};

export default ResumeManager;
