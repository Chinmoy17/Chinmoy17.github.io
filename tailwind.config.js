/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: true,
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        surface: "#fcf9f4",
        "surface-dim": "#dcdad5",
        "surface-bright": "#fcf9f4",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f6f3ee",
        "surface-container": "#f1ede8",
        "surface-container-high": "#ebe8e3",
        "surface-container-highest": "#e5e2dd",
        "on-surface": "#1c1c19",
        "on-surface-variant": "#444748",
        "inverse-surface": "#31302d",
        "inverse-on-surface": "#f3f0eb",
        outline: "#747878",
        "outline-variant": "#c4c7c7",
        "surface-tint": "#5f5e5e",
        ink: "#1a1a1a",
        "on-ink": "#ffffff",
        "ink-container": "#1c1b1b",
        secondary: "#5e5e5c",
        "on-secondary": "#ffffff",
        "secondary-container": "#e1dfdc",
        tertiary: "#000000",
        "surface-variant": "#e5e2dd",
        background: "#fcf9f4",
        "on-background": "#1c1c19",
        "nav-bg": "#f5f2ed",
      },
      fontFamily: {
        newsreader: ["Newsreader", "serif"],
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        h1: [
          "4rem",
          {
            lineHeight: "1.1",
            letterSpacing: "-0.02em",
            fontWeight: "400",
          },
        ],
        h2: [
          "2.5rem",
          {
            lineHeight: "1.2",
            letterSpacing: "-0.01em",
            fontWeight: "400",
          },
        ],
        h3: [
          "1.75rem",
          {
            lineHeight: "1.3",
            letterSpacing: "0",
            fontWeight: "500",
          },
        ],
        "body-lg": [
          "1.125rem",
          {
            lineHeight: "1.7",
            letterSpacing: "0",
            fontWeight: "400",
          },
        ],
        "body-md": [
          "1rem",
          {
            lineHeight: "1.6",
            letterSpacing: "0",
            fontWeight: "400",
          },
        ],
        "label-caps": [
          "0.75rem",
          {
            lineHeight: "1",
            letterSpacing: "0.1em",
            fontWeight: "600",
          },
        ],
      },
      spacing: {
        xs: "0.5rem",
        sm: "1rem",
        md: "2rem",
        lg: "4rem",
        xl: "8rem",
        gutter: "1.5rem",
        "container-max": "1120px",
      },
      maxWidth: {
        container: "1120px",
      },
      borderRadius: {
        none: "0",
      },
    },
  },
  plugins: [],
};
