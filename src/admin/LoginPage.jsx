import React, { useState } from "react";
import axiosInstance from "../config/axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axiosInstance.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      navigate("/admin/dashboard");
    } catch {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[var(--bg)] text-white">
      {/* Atmosphere */}
      <div className="page-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="login-blob-a page-blob-a pointer-events-none absolute -left-24 top-[12%] h-[28rem] w-[28rem] rounded-full blur-[130px]" />
      <div className="login-blob-b page-blob-b pointer-events-none absolute -right-20 bottom-[8%] h-[24rem] w-[24rem] rounded-full blur-[120px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 50% 45% at 28% 40%, color-mix(in srgb, var(--accent-a) 12%, transparent), transparent 68%), radial-gradient(ellipse 40% 35% at 78% 70%, color-mix(in srgb, var(--accent-c) 8%, transparent), transparent 70%)",
        }}
      />
      <div className="noise-overlay absolute inset-0 z-[1]" />

      {/* Corner marks */}
      <div className="pointer-events-none absolute left-4 top-4 z-20 hidden h-7 w-7 border-l border-t border-white/20 sm:left-8 sm:top-8 sm:block" />
      <div className="pointer-events-none absolute right-4 top-4 z-20 hidden h-7 w-7 border-r border-t border-white/20 sm:right-8 sm:top-8 sm:block" />
      <div className="pointer-events-none absolute bottom-4 left-4 z-20 hidden h-7 w-7 border-b border-l border-white/20 sm:bottom-8 sm:left-8 sm:block" />
      <div className="pointer-events-none absolute bottom-4 right-4 z-20 hidden h-7 w-7 border-b border-r border-white/20 sm:bottom-8 sm:right-8 sm:block" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-20">
        {/* Brand column */}
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative text-center lg:text-left"
        >
          <p className="mb-5 inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-400 backdrop-blur-md">
            <span className="relative flex h-1.5 w-1.5">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-55"
                style={{ background: "var(--accent-a)" }}
              />
              <span
                className="relative inline-flex h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--accent-a)" }}
              />
            </span>
            Console · restricted
          </p>

          <Link
            to="/"
            className="group inline-block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color-mix(in_srgb,var(--accent-a)_50%,transparent)]"
            aria-label="Back to portfolio home"
          >
            <span className="font-display text-[clamp(4.5rem,14vw,8.5rem)] font-bold leading-none tracking-[-0.06em] text-white transition group-hover:opacity-90">
              AS
              <span className="text-chroma">.</span>
            </span>
          </Link>

          <div className="mt-6 flex flex-col items-center gap-4 lg:items-start">
            <span className="section-rule" />
            <h1 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Admin access
            </h1>
            <p className="max-w-sm text-sm leading-relaxed text-zinc-500 sm:text-base">
              Sign in to manage projects, experience, skills, and resume.
            </p>
          </div>

          <p className="mt-10 hidden font-mono text-[10px] uppercase tracking-[0.32em] text-zinc-600 lg:block">
            Portfolio · control plane
          </p>
        </motion.div>

        {/* Form column */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md lg:mx-0 lg:ml-auto"
        >
          <div className="login-panel accent-hover-border relative border border-white/10 bg-white/[0.025] p-6 backdrop-blur-md sm:p-8">
            <div className="mb-7 flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-chroma">
                  Auth // Session
                </p>
                <h2 className="mt-2 font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  Sign in
                </h2>
              </div>
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600 sm:inline">
                01
              </span>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label
                  htmlFor="admin-username"
                  className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500"
                >
                  Username
                </label>
                <input
                  id="admin-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  placeholder="Enter username"
                  className="accent-field w-full border border-white/10 bg-black/45 px-3.5 py-3 text-sm text-white outline-none placeholder:text-zinc-600"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="admin-password"
                  className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500"
                >
                  Password
                </label>
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  placeholder="Enter password"
                  className="accent-field w-full border border-white/10 bg-black/45 px-3.5 py-3 text-sm text-white outline-none placeholder:text-zinc-600"
                  required
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert"
                  className="border px-3.5 py-3 font-mono text-sm"
                  style={{
                    borderColor: "color-mix(in srgb, var(--accent-c) 45%, transparent)",
                    background: "color-mix(in srgb, var(--accent-c) 8%, transparent)",
                    color: "var(--accent-c)",
                  }}
                >
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-solid group relative w-full overflow-hidden py-3.5 font-display text-sm font-semibold tracking-wide disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="relative z-10">
                  {loading ? "Signing in…" : "Enter console"}
                </span>
              </button>
            </form>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <Link
              to="/"
              className="accent-link inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-600"
            >
              ← Back to site
            </Link>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-700">
              Encrypted · local
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
