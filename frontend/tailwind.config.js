// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Bank-specific colors
        baybank: {
          primary: '#0EA5A4',
          accent: '#0F172A',
          50: '#f0fdfa',
          100: '#ccfbf1',
          500: '#0EA5A4',
          600: '#0d9488',
          700: '#0f766e',
          900: '#134e4a',
        },
        oasisbank: {
          primary: '#16A34A',
          accent: '#F3F4F6',
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#16A34A',
          600: '#15803d',
          700: '#166534',
          900: '#14532d',
        },
        ZenBank: {
          primary: '#F59E0B',
          accent: '#111827',
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#F59E0B',
          600: '#d97706',
          700: '#b45309',
          900: '#78350f',
        },
        ArcBank: {
          primary: '#2563EB',
          accent: '#E0F2FE',
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#2563EB',
          600: '#1d4ed8',
          700: '#1e40af',
          900: '#1e3a8a',
        },
        NexBank: {
          primary: '#7C3AED',
          accent: '#FDE68A',
          50: '#faf5ff',
          100: '#f3e8ff',
          500: '#7C3AED',
          600: '#6d28d9',
          700: '#5b21b6',
          900: '#4c1d95',
        }
      },
      borderRadius: {
        lg: "12px",
        md: "10px",
        sm: "8px",
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
        "pulse-soft": "pulse-soft 2s infinite",
        "bounce-soft": "bounce-soft 2s infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in": {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
