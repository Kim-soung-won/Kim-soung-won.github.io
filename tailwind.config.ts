import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography';

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink:      { DEFAULT: '#f4f4f1', 2: '#d1d1cd', muted: '#8a8a85' },
        bg:       { DEFAULT: '#07100c', 2: '#0a1612', 3: '#0e1c17' },
        accent:   { DEFAULT: '#10b981', 2: '#facc15', 3: '#34d399' },
      },
      fontFamily: {
        display: ['"Pretendard Variable"', 'Pretendard', 'ui-sans-serif', 'system-ui'],
        sans:    ['"Pretendard Variable"', 'Pretendard', 'ui-sans-serif', 'system-ui'],
        mono:    ['var(--font-mono)', '"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular'],
      },
    },
  },
  plugins: [typography],
};
export default config;
