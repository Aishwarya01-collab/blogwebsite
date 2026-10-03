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
        base: "#07120D",
        surface: "#0D1F16",
        "surface-raised": "#123524",
        "green-loki": "#1F6B45",
        "green-bright": "#48D597",
        gold: "#C7A94A",
        "gold-muted": "#8B7230",
        "text-primary": "#E8F0E9",
        "text-muted": "#91A59A",
        border: "#244634",
        "border-bright": "#1F6B45",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-cinzel)", "serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "radial-green":
          "radial-gradient(ellipse at center, #1F6B4520 0%, transparent 70%)",
        "radial-gold":
          "radial-gradient(ellipse at center, #C7A94A15 0%, transparent 70%)",
        "hero-gradient":
          "linear-gradient(135deg, #07120D 0%, #0D1F16 50%, #07120D 100%)",
        "card-gradient": "linear-gradient(135deg, #0D1F16 0%, #123524 100%)",
      },
      boxShadow: {
        "glow-green":
          "0 0 20px rgba(72, 213, 151, 0.15), 0 0 60px rgba(31, 107, 69, 0.1)",
        "glow-gold":
          "0 0 20px rgba(199, 169, 74, 0.2), 0 0 60px rgba(199, 169, 74, 0.05)",
        card: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(72,213,151,0.05)",
        "card-hover":
          "0 8px 40px rgba(0,0,0,0.6), 0 0 30px rgba(31,107,69,0.2), inset 0 1px 0 rgba(72,213,151,0.1)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.9" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "border-flow": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-in-slow": "fade-in 1s ease-out forwards",
        "fade-in-up": "fade-in-up 0.7s ease-out forwards",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        float: "float 5s ease-in-out infinite",
        "border-flow": "border-flow 4s ease infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "spin-slow": "rotate 12s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
