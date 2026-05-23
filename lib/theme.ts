// Maps Tailwind color names to hex values for CSS variable theming
export const patternColorHex: Record<string, string> = {
  emerald: "#34d399",
  sky: "#38bdf8",
  amber: "#fbbf24",
  rose: "#fb7185",
  violet: "#a78bfa",
  cyan: "#22d3ee",
  orange: "#fb923c",
  pink: "#f472b6",
  teal: "#2dd4bf",
  indigo: "#818cf8",
  lime: "#a3e635",
  fuchsia: "#e879f9",
  yellow: "#facc15",
  slate: "#94a3b8",
  zinc: "#a1a1aa",
};

export function setPatternColor(colorName: string) {
  const hex = patternColorHex[colorName] || "#a1a1aa";
  if (typeof document !== "undefined") {
    document.documentElement.style.setProperty("--pattern-accent", hex);
  }
}
