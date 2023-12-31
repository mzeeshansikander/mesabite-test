import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Views/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

    // Flowbite Config
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        monserrat: ["var(--font-montserrat)"],
        primary: "recoleta",
      },
      colors: {
        primary: "#FFCD00",
        secondary: "#852E2C",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
export default config;
