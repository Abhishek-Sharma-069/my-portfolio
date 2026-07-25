import React, { useState } from "react";
import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaExternalLinkAlt } from "react-icons/fa";

const links = [
  { to: "/admin/dashboard", label: "Dashboard", index: "00" },
  { to: "/admin/projects", label: "Projects", index: "01" },
  { to: "/admin/experience", label: "Experience", index: "02" },
  { to: "/admin/skills", label: "Skills", index: "03" },
  { to: "/admin/resume", label: "Resume", index: "04" },
  { to: "/admin/about", label: "About", index: "05" },
];

const AdminLayout = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  const nav = (
    <nav className="flex flex-col gap-1">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 border px-3 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] transition duration-300 ${
              isActive
                ? "border-[color-mix(in_srgb,var(--accent-a)_35%,transparent)] bg-[color-mix(in_srgb,var(--accent-a)_8%,transparent)] text-white"
                : "border-transparent text-zinc-500 hover:border-[color-mix(in_srgb,var(--accent-a)_22%,transparent)] hover:bg-white/[0.03] hover:text-zinc-200"
            }`
          }
        >
          <span className="text-[var(--accent-a)]/50">{link.index}</span>
          {link.label}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-[var(--bg)] text-white">
      {/* Desktop sidebar */}
      <aside className="relative hidden w-64 shrink-0 flex-col border-r border-white/10 bg-black/60 p-5 md:flex">
        <div className="page-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative z-10 mb-8">
          <Link to="/admin/dashboard" className="font-display text-xl font-semibold tracking-tight">
            AS<span className="text-chroma">.</span> Admin
          </Link>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-600">
            Portfolio CMS
          </p>
        </div>
        <div className="relative z-10 flex-1">{nav}</div>
        <div className="relative z-10 mt-6 space-y-2 border-t border-white/10 pt-4">
          <Link
            to="/"
            target="_blank"
            className="accent-link flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500"
          >
            View site <FaExternalLinkAlt className="text-[9px]" />
          </Link>
          <button
            type="button"
            onClick={logout}
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500 transition hover:text-[var(--accent-c)]"
          >
            Log out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-white/10 bg-black/80 px-4 backdrop-blur-xl md:hidden">
        <span className="font-display text-base font-semibold">
          AS<span className="text-chroma">.</span> Admin
        </span>
        <button type="button" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-30 bg-black/95 px-4 pb-8 pt-20 md:hidden">
          {nav}
          <div className="mt-6 space-y-3 border-t border-white/10 pt-4">
            <Link to="/" className="block font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
              View site
            </Link>
            <button
              type="button"
              onClick={logout}
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-rose-300"
            >
              Log out
            </button>
          </div>
        </div>
      )}

      <main className="relative flex-1 overflow-x-hidden px-4 py-6 pt-20 sm:px-6 md:px-8 md:py-8 md:pt-8">
        <div className="pointer-events-none absolute inset-0 page-grid opacity-30" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
