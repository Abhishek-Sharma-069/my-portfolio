import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import {
  githubProfile,
  summarizeContributions,
  buildHeatmapWeeks,
  LEVEL_COLORS,
} from "../data/githubData";

const GitHubPulse = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(githubProfile.contributionsApi);
        if (!res.ok) throw new Error("Failed to load contributions");
        const json = await res.json();
        if (alive) {
          setData(json);
          setError("");
        }
      } catch (err) {
        if (alive) setError(err.message || "Could not load GitHub activity");
      } finally {
        if (alive) setLoading(false);
      }
    };
    load();
    return () => {
      alive = false;
    };
  }, []);

  const weeks = useMemo(
    () => buildHeatmapWeeks(data?.contributions || []),
    [data]
  );
  const summary = useMemo(
    () => summarizeContributions(data?.contributions || []),
    [data]
  );
  const total = data?.total?.lastYear ?? 0;

  const monthLabels = useMemo(() => {
    if (!weeks.length) return [];
    const labels = [];
    let lastMonth = "";
    weeks.forEach((week, wi) => {
      const first = week.find(Boolean);
      if (!first) return;
      const month = new Date(`${first.date}T12:00:00`).toLocaleString("en", {
        month: "short",
      });
      if (month !== lastMonth) {
        labels.push({ wi, month });
        lastMonth = month;
      }
    });
    return labels;
  }, [weeks]);

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-4">
            <span className="section-rule" />
            <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
              Contributions
            </h2>
          </div>
          <p className="font-mono text-xs text-zinc-500">
            Last 12 months · @{githubProfile.username}
          </p>
        </div>
        <a
          href={githubProfile.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost inline-flex w-fit items-center gap-2 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em]"
        >
          <FaGithub />
          GitHub
          <FaExternalLinkAlt className="text-[10px] opacity-60" />
        </a>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total", value: loading ? "—" : total.toLocaleString() },
          { label: "Active days", value: loading ? "—" : summary.activeDays },
          { label: "Max streak", value: loading ? "—" : `${summary.maxStreak}d` },
          { label: "Current", value: loading ? "—" : `${summary.currentStreak}d` },
        ].map((stat) => (
          <div
            key={stat.label}
            className="border border-white/10 bg-white/[0.02] px-4 py-4"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-600">
              {stat.label}
            </p>
            <p className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-x-auto border border-white/10 bg-black/50 p-4 sm:p-5"
      >
        {loading && (
          <div className="flex h-32 items-center justify-center font-mono text-xs text-zinc-500">
            Syncing contribution lattice…
          </div>
        )}
        {error && !loading && (
          <div className="flex h-32 items-center justify-center font-mono text-xs text-rose-300">
            {error}
          </div>
        )}
        {!loading && !error && (
          <>
            <div className="relative mb-2 h-4 overflow-hidden pl-7" style={{ minWidth: weeks.length * 14 }}>
              {monthLabels.map(({ wi, month }) => (
                <span
                  key={`${month}-${wi}`}
                  className="absolute font-mono text-[9px] uppercase tracking-wider text-zinc-600"
                  style={{ left: `calc(1.75rem + ${wi * 14}px)` }}
                >
                  {month}
                </span>
              ))}
            </div>

            <div className="flex gap-1">
              <div className="mr-1 flex flex-col justify-between py-0.5 font-mono text-[9px] text-zinc-600">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
              </div>
              <div className="flex gap-[3px]">
                {weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {week.map((day, di) => {
                      if (!day) {
                        return <div key={`${wi}-${di}`} className="h-[11px] w-[11px]" />;
                      }
                      const level = Math.min(4, Math.max(0, day.level ?? 0));
                      return (
                        <button
                          key={day.date}
                          type="button"
                          aria-label={`${day.count} contributions on ${day.date}`}
                          onMouseEnter={() => setHover(day)}
                          onMouseLeave={() => setHover(null)}
                          className={`h-[11px] w-[11px] rounded-[2px] transition hover:ring-1 hover:ring-white/50 ${LEVEL_COLORS[level]}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-[11px] text-zinc-500">
                {hover
                  ? `${hover.count} contribution${hover.count === 1 ? "" : "s"} on ${hover.date}`
                  : summary.bestDay.date
                    ? `Peak day · ${summary.bestDay.count} on ${summary.bestDay.date}`
                    : "Hover a cell for details"}
              </p>
              <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-zinc-600">
                Less
                {LEVEL_COLORS.map((c, i) => (
                  <span key={i} className={`h-2.5 w-2.5 rounded-[2px] ${c}`} />
                ))}
                More
              </div>
            </div>
          </>
        )}
      </motion.div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="border border-white/10 bg-white/[0.02] p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-600">
            Platforms
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {githubProfile.platforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/10 px-3 py-2 font-mono text-[11px] text-zinc-400 transition hover:border-white/30 hover:text-white"
              >
                {platform.name}
              </a>
            ))}
          </div>
        </div>
        <div className="border border-white/10 bg-white/[0.02] p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-600">
            Education
          </p>
          <ul className="mt-4 space-y-3">
            {githubProfile.education.map((edu) => (
              <li key={edu.qualification} className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-zinc-200">{edu.qualification}</p>
                  <p className="text-xs text-zinc-500">{edu.institute}</p>
                </div>
                <div className="text-right font-mono text-[11px] text-zinc-600">
                  <p>{edu.score}</p>
                  <p>{edu.years}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default GitHubPulse;
