import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "2rem",
        lg: "3rem",
        xl: "4rem",
      },
      screens: {
        "2xl": "1360px",
      },
    },
    extend: {
      colors: {
        noir: {
          50: "#F7F5F1",
          100: "#EFEAE1",
          200: "#DED6C7",
          300: "#BDB2A0",
          400: "#8E8577",
          500: "#6B6357",
          600: "#4A443C",
          700: "#302C27",
          800: "#1C1917",
          900: "#121110",
          950: "#0A0909",
        },
        cream: {
          DEFAULT: "#EFE6D8",
          soft: "#D9CDBA",
          muted: "#A79C8A",
        },
        brass: {
          100: "#F3E4C2",
          200: "#E6CF9C",
          300: "#D6B878",
          400: "#C6A15B",
          500: "#B08A45",
          600: "#8F6E35",
          700: "#6D5228",
        },
        wine: {
          400: "#8C3A3A",
          500: "#6E2B2B",
          600: "#522020",
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', "Georgia", "serif"],
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['Jost', '"Inter"', "system-ui", "sans-serif"],
      },
      letterSpacing: {
        luxe: "0.28em",
        wide2: "0.18em",
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 8vw, 6.5rem)", { lineHeight: "0.98", letterSpacing: "-0.01em" }],
        "display-lg": ["clamp(2.25rem, 5.5vw, 4.25rem)", { lineHeight: "1.02", letterSpacing: "-0.01em" }],
        "display-md": ["clamp(1.9rem, 4vw, 3rem)", { lineHeight: "1.08" }],
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slow-pan": {
          "0%": { transform: "scale(1.08) translate3d(0,0,0)" },
          "100%": { transform: "scale(1.18) translate3d(0,-1.5%,0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "marquee-x": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "pulse-ring": {
          "0%": { opacity: "0.6", transform: "scale(0.9)" },
          "70%": { opacity: "0", transform: "scale(1.6)" },
          "100%": { opacity: "0", transform: "scale(1.6)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "slow-pan": "slow-pan 24s ease-in-out infinite alternate",
        shimmer: "shimmer 2.4s linear infinite",
        "marquee-x": "marquee-x 32s linear infinite",
        "pulse-ring": "pulse-ring 2.4s ease-out infinite",
      },
      backgroundImage: {
        "brass-line":
          "linear-gradient(90deg, transparent, rgba(198,161,91,0.65), transparent)",
        "noir-fade":
          "radial-gradient(120% 90% at 50% 0%, rgba(198,161,91,0.10), transparent 60%)",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [animate],
};
