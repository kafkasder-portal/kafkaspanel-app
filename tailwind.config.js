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
        // Ringku Finansal Renk Paleti
        'financial-primary': "hsl(var(--financial-primary))",
        'financial-secondary': "hsl(var(--financial-secondary))",
        'financial-accent': "hsl(var(--financial-accent))",
        'financial-gray': {
          50: "hsl(var(--financial-gray-50))",
          100: "hsl(var(--financial-gray-100))",
          200: "hsl(var(--financial-gray-200))",
          300: "hsl(var(--financial-gray-300))",
          400: "hsl(var(--financial-gray-400))",
          500: "hsl(var(--financial-gray-500))",
          600: "hsl(var(--financial-gray-600))",
          700: "hsl(var(--financial-gray-700))",
          800: "hsl(var(--financial-gray-800))",
          900: "hsl(var(--financial-gray-900))",
        },
        'status-success': "hsl(var(--status-success))",
        'status-warning': "hsl(var(--status-warning))",
        'status-error': "hsl(var(--status-error))",
        'status-info': "hsl(var(--status-info))",
      },
      fontFamily: {
        'financial': 'var(--font-financial-primary)',
        'financial-mono': 'var(--font-financial-mono)',
      },
      fontSize: {
        'financial-xs': 'var(--text-financial-xs)',
        'financial-sm': 'var(--text-financial-sm)',
        'financial-base': 'var(--text-financial-base)',
        'financial-lg': 'var(--text-financial-lg)',
        'financial-xl': 'var(--text-financial-xl)',
        'financial-2xl': 'var(--text-financial-2xl)',
        'financial-3xl': 'var(--text-financial-3xl)',
        'financial-4xl': 'var(--text-financial-4xl)',
      },
      lineHeight: {
        'financial-tight': 'var(--leading-financial-tight)',
        'financial-normal': 'var(--leading-financial-normal)',
        'financial-relaxed': 'var(--leading-financial-relaxed)',
      },
      letterSpacing: {
        'financial-tight': 'var(--tracking-financial-tight)',
        'financial-normal': 'var(--tracking-financial-normal)',
        'financial-wide': 'var(--tracking-financial-wide)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}
