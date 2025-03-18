import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        heading: ['var(--font-heading)'],
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--font-sans)',
            '--tw-prose-headings': 'var(--font-heading)',
            h1: {
              fontFamily: 'var(--font-heading)',
              fontWeight: '600',
              letterSpacing: '-0.025em',
            },
            h2: {
              fontFamily: 'var(--font-heading)',
              fontWeight: '600',
              letterSpacing: '-0.025em',
            },
            h3: {
              fontFamily: 'var(--font-heading)',
              fontWeight: '600',
              letterSpacing: '-0.015em',
            },
            p: {
              fontFamily: 'var(--font-sans)',
              fontSize: '1.125rem',
              lineHeight: '1.75',
            },
            a: {
              fontWeight: '500',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config