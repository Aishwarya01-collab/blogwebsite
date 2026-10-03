import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tva: {
          base: "#050A07",
          surface: "#09140E",
          deep: "#102A1C",
          emerald: "#1D6B45",
          bright: "#3BE58B",
          olive: "#39452A",
          amber: "#C49A45",
          gold: "#E0BD65",
          text: "#E9EFE9",
          muted: "#91A096",
          border: "#263F30",
        }
      },
      fontFamily: {
        display: ["var(--font-cinzel)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      backgroundImage: {
        "radial-emerald": "radial-gradient(circle at center, rgba(29, 107, 69, 0.15) 0%, transparent 70%)",
        "radial-amber": "radial-gradient(circle at center, rgba(196, 154, 69, 0.1) 0%, transparent 70%)",
      },
      animation: {
        "scanline": "scanline 8s linear infinite",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite alternate",
        "float": "float 10s ease-in-out infinite alternate",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" }
        },
        "glow-pulse": {
          "0%": { opacity: "0.3" },
          "100%": { opacity: "0.8" }
        },
        float: {
          "0%": { transform: "translateY(0px) translateX(0px)" },
          "100%": { transform: "translateY(-20px) translateX(10px)" }
        },
        scanWidth: {
          "0%, 100%": { width: "0%" },
          "50%": { width: "100%" }
        }
      }
    },
  },
  plugins: [],
};

export default config;
