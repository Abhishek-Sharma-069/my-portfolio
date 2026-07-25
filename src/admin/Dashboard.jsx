import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaArrowRight } from "react-icons/fa";
import AdminShell from "./AdminShell";

const Dashboard = () => {
  const data = useSelector((state) => state.portfolio.data);
  const projectsCount = data?.projects?.length ?? 0;
  const experienceCount =
    data?.experience?.sections?.reduce((n, s) => n + (s.items?.length || 0), 0) ?? 0;
  const skillsCount = data?.skills
    ? Object.values(data.skills).reduce((n, arr) => n + (Array.isArray(arr) ? arr.length : 0), 0)
    : 0;
  const resumeReady = Boolean(data?.resumeUrl);

  const sections = [
    {
      name: "Projects",
      path: "/admin/projects",
      description: "Create, edit, and remove portfolio projects.",
      count: String(projectsCount).padStart(2, "0"),
      meta: "catalog",
    },
    {
      name: "Experience",
      path: "/admin/experience",
      description: "Volunteership, internships, and work roles.",
      count: String(experienceCount).padStart(2, "0"),
      meta: "roles",
    },
    {
      name: "Skills",
      path: "/admin/skills",
      description: "Categories, icons, and skill colors.",
      count: String(skillsCount).padStart(2, "0"),
      meta: "nodes",
    },
    {
      name: "Resume",
      path: "/admin/resume",
      description: "Upload and preview the PDF résumé.",
      count: resumeReady ? "ON" : "OFF",
      meta: "document",
    },
    {
      name: "About",
      path: "/admin/about",
      description: "Headlines, intro copy, tagline, and email.",
      count: data?.about?.email ? "ON" : "—",
      meta: "identity",
    },
  ];

  return (
    <AdminShell
      index="00 / Console"
      title="Dashboard"
      subtitle="Welcome back. Pick a module to update your public portfolio."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {sections.map((section) => (
          <Link
            key={section.path}
            to={section.path}
            className="group accent-card border border-white/10 bg-white/[0.02] p-5"
          >
            <div className="mb-4 flex items-baseline justify-between gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-600">
                {section.meta}
              </span>
              <span className="font-display text-2xl font-semibold text-chroma">
                {section.count}
              </span>
            </div>
            <h3 className="font-display text-xl font-semibold text-white">{section.name}</h3>
            <p className="mt-2 text-sm text-zinc-500">{section.description}</p>
            <span className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500 transition group-hover:text-[var(--accent-a)]">
              Open <FaArrowRight className="text-[10px]" />
            </span>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
};

export default Dashboard;
