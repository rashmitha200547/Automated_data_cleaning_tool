/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-dark': '#0a0e1a',
        'cyber-darker': '#060810',
        'cyber-card': '#111827',
        'cyber-border': '#1f2937',
        'cyber-accent': '#06b6d4',
        'cyber-accent-dim': '#0891b2',
        'cyber-text': '#e2e8f0',
        'cyber-text-dim': '#94a3b8',
        'cyber-success': '#10b981',
        'cyber-warning': '#f59e0b',
        'cyber-error': '#ef4444',
      },
      fontFamily: {
        'display': ['Space Grotesk', 'sans-serif'],
        'sans': ['Inter', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(6, 182, 212, 0.6)',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #06b6d4, 0 0 10px #06b6d4' },
          '100%': { boxShadow: '0 0 10px #06b6d4, 0 0 20px #06b6d4, 0 0 30px #06b6d4' },
        },
      },
    },
  },
  plugins: [],
}
