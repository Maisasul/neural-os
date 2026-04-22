import type { Config } from "tailwindcss";

const config: Config = {
  // هذا السطر هو الأهم: يخبر Tailwind أين يبحث عن الكلاسات
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // نستخدم نفس الأسماء الموجودة في الـ Navbar والـ Layout
        primary: "#00D4FF",
        surface: "#050505",
        "neural-glow": "#00D4FF",
        "neural-surface": "#050505",
      },
      fontFamily: {
        // نربطها بالـ variables التي وضعناها في Layout
        consciousness: ["var(--font-epilogue)", "sans-serif"],
        space: ["var(--font-space)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;