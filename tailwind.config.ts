import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography';

const config: Config = {
  darkMode: 'selector',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // TanStack 스타일의 커스텀 컬러 팔레트
        tanstack: {
          500: '#ef4444', // Red-500
          600: '#e11d48', // Rose-600
          gradientStart: '#FF416C',
          gradientEnd: '#FF4B2B',
        },
        dark: {
          bg: '#0f172a', // Slate-900 (메인 배경)
          card: '#1e293b', // Slate-800 (카드 배경)
          border: '#334155', // Slate-700 (테두리)
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular'],
      },
    },
  },
  plugins: [
    typography,
  ],
};
export default config;