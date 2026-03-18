import { ReactNode } from 'react';

type BadgeColor = "blue" | "green" | "red" | "amber" | "purple" | "slate" | "cyan";

const styles: Record<BadgeColor, string> = {
  blue:   "bg-blue-100   text-blue-700   dark:bg-blue-900/50   dark:text-blue-300",
  green:  "bg-green-100  text-green-700  dark:bg-green-900/50  dark:text-green-300",
  red:    "bg-red-100    text-red-700    dark:bg-red-900/50    dark:text-red-300",
  amber:  "bg-amber-100  text-amber-700  dark:bg-amber-900/50  dark:text-amber-300",
  purple: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300",
  slate:  "bg-slate-100  text-slate-600  dark:bg-slate-800     dark:text-slate-300",
  cyan:   "bg-cyan-100   text-cyan-700   dark:bg-cyan-900/50   dark:text-cyan-300",
};

export function Badge({ children, color = "slate" }: { children: ReactNode; color?: BadgeColor }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[color]}`}>
      {children}
    </span>
  );
}
