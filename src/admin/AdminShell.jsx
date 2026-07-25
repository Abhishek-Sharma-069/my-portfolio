import React from "react";

/** Shared page header for admin managers */
const AdminShell = ({ index, title, subtitle, action, children }) => (
  <div className="text-white">
    <header className="mb-8">
      {index && (
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.35em] text-chroma">
          {index}
        </p>
      )}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-4">
            <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {title}
            </h1>
            <span className="section-rule hidden sm:block" />
          </div>
          {subtitle && (
            <p className="max-w-xl text-sm text-zinc-500 sm:text-base">{subtitle}</p>
          )}
        </div>
        {action}
      </div>
    </header>
    {children}
  </div>
);

export const adminInputClass =
  "accent-field w-full border border-white/10 bg-black/40 p-3 text-sm text-white outline-none";

export const adminLabelClass =
  "mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500";

export const adminPanelClass =
  "accent-hover-border border border-white/10 bg-white/[0.02] p-5 sm:p-6";

export const adminListItemClass =
  "accent-hover-border border border-white/10 bg-black/30 transition";

export default AdminShell;
