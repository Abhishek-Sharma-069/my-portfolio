export const THEMES = [
  { key: "void", label: "Void", swatch: "#7dd3fc", bg: "#030303" },
  { key: "ember", label: "Ember", swatch: "#fb923c", bg: "#0a0503" },
  { key: "forest", label: "Forest", swatch: "#6ee7b7", bg: "#020705" },
  { key: "midnight", label: "Midnight", swatch: "#60a5fa", bg: "#02040c" },
  { key: "violet", label: "Violet", swatch: "#c084fc", bg: "#07030c" },
];

export const DEFAULT_THEME = "void";

const STORAGE_KEY = "portfolio-theme";

export function getStoredTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return THEMES.some((t) => t.key === stored) ? stored : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

export function applyTheme(key) {
  const theme = THEMES.some((t) => t.key === key) ? key : DEFAULT_THEME;
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // storage unavailable — theme still applies for this session
  }
  return theme;
}
