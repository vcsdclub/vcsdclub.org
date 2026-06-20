import defaultTheme from "tailwindcss/defaultTheme";
import typographyPlugin from "@tailwindcss/typography";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,json,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        paper: "var(--aw-color-bg-page)",
        raised: "var(--aw-color-bg-raised)",
        ink: "var(--aw-color-ink)",
        "ink-soft": "var(--aw-color-ink-soft)",
        muted: "var(--aw-color-muted)",
        rule: "var(--aw-color-rule)",
        accent: "var(--aw-color-accent)",
        "accent-ink": "var(--aw-color-accent-ink)",
        primary: "var(--aw-color-primary)",
        secondary: "var(--aw-color-secondary)",
        default: "var(--aw-color-text-default)",
      },
      fontFamily: {
        sans: [
          "var(--aw-font-sans)",
          ...defaultTheme.fontFamily.sans,
        ],
        serif: [
          "var(--aw-font-serif)",
          ...defaultTheme.fontFamily.serif,
        ],
        heading: [
          "var(--aw-font-serif)",
          ...defaultTheme.fontFamily.serif,
        ],
        mono: [
          "var(--aw-font-mono)",
          ...defaultTheme.fontFamily.mono,
        ],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
    },
  },
  plugins: [typographyPlugin],
  darkMode: "class",
};
