export function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex min-h-[20px] items-center justify-center rounded border border-slate-200 bg-slate-100 px-1.5 text-xs font-medium text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 mx-1 align-middle shadow-[0_2px_0_0_rgba(0,0,0,0.05)] dark:shadow-none">
      {children}
    </kbd>
  );
}