import { Config } from "tailwindcss";

const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette");

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        white: "#efeff3",
        border: "rgba(255, 255, 255, 0.12)",
        primary: "#6F3AFF",
        secondary: "#0E0B18",
      },
      padding: {
        layout: "1.25rem",
      },
      animation: {
        "spin-slow": "spin 10s linear infinite",
      },
      shadow: {
        white: "0 35px 35px rgba(255, 255, 255, 0.25)",
      },
    },
  },
  plugins: [addVariablesForColors],
};
export default config;

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]));

  addBase({
    ":root": newVars,
  });
}
