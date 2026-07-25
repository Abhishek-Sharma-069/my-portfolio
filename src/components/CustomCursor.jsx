import React, { useEffect, useRef, useState } from "react";

const INTERACTIVE =
  'a, button, [role="button"], input, textarea, select, label, summary, .cursor-pointer, [href]';

function isInteractive(el) {
  if (!el || el === document.body || el === document.documentElement) return false;
  return Boolean(el.closest(INTERACTIVE));
}

/** Outlined hand / pointer — stroke uses currentColor (theme accent). */
function HandOutline({ className = "" }) {
  return (
    <svg
      className={className}
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M8.5 11.5V7.25a1.25 1.25 0 0 1 2.5 0V11M11 11V5.75a1.25 1.25 0 0 1 2.5 0V11M13.5 10.75V6.5a1.25 1.25 0 1 1 2.5 0v6.25M16 12.5V9.75a1.25 1.25 0 1 1 2.5 0v5.5c0 2.9-1.85 5.25-5.1 5.25H12.2c-1.55 0-2.95-.55-4.05-1.55L5.5 16.3a1.4 1.4 0 0 1 .1-2.05l.85-.7a1.5 1.5 0 0 1 1.85-.1L8.5 14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const handRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const raf = useRef(0);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
      setHovering(isInteractive(e.target));
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const tick = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.22;
      ring.current.y += (pos.current.y - ring.current.y) * 0.22;

      const { x, y } = pos.current;
      const rx = ring.current.x;
      const ry = ring.current.y;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      if (handRef.current) {
        handRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-20%, -10%)`;
      }

      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    raf.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] hidden md:block ${
        visible ? "opacity-100" : "opacity-0"
      } transition-opacity duration-200`}
      aria-hidden
    >
      {/* Outer void ring — hidden while hand is shown */}
      <div
        ref={ringRef}
        className={`absolute left-0 top-0 h-8 w-8 rounded-full border border-[var(--accent-a)] bg-transparent transition-opacity duration-150 ease-out ${
          hovering ? "opacity-0" : "opacity-100"
        }`}
        style={{ willChange: "transform" }}
      />

      {/* Inner solid dot — hidden while hand is shown */}
      <div
        ref={dotRef}
        className={`absolute left-0 top-0 h-2 w-2 rounded-full bg-[var(--accent-a)] transition-opacity duration-150 ease-out ${
          hovering ? "opacity-0" : "opacity-100"
        }`}
        style={{ willChange: "transform" }}
      />

      {/* Theme-outlined hand on links / routes / clickables */}
      <div
        ref={handRef}
        className={`absolute left-0 top-0 text-[var(--accent-a)] transition-opacity duration-150 ${
          hovering ? "opacity-100" : "opacity-0"
        }`}
        style={{ willChange: "transform" }}
      >
        <HandOutline />
      </div>
    </div>
  );
};

export default CustomCursor;
