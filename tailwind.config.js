/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
        "3xl": "1600px",
      },
    },
    extend: {
      colors: {
        border: '#E5E7EB',
        uxblue: '#0F172A',
        uxlight: '#FFFFFF',
        uxsky: '#38BDF8',
        uxorange: '#F97316',
        uxgreen: '#22C55E',
        uxred: '#EF4444',
        uxpurple: '#8B5CF6',
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
      },
      borderColor: {
        border: '#E5E7EB',
        uxblue: '#0F172A',
        uxsky: '#38BDF8',
        uxorange: '#F97316',
        uxgreen: '#22C55E',
        uxred: '#EF4444',
        uxpurple: '#8B5CF6',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1.5rem",
        full: "9999px",
      },
      boxShadow: {
        'ux': '0 4px 32px 0 rgba(56,189,248,0.10)',
        'ux-lg': '0 8px 40px 0 rgba(16,23,42,0.12)',
        'ux-inset': 'inset 0 2px 8px 0 rgba(56,189,248,0.08)',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        sans: ['Inter', 'Space Grotesk', 'Montserrat', 'Roboto', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} 