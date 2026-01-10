export function Details({ summary, children }: { summary: string; children: React.ReactNode }) {
  return (
    <details className="group my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 [&_summary]:cursor-pointer dark:border-slate-800 dark:bg-slate-900/50">
      <summary className="flex items-center font-semibold text-slate-900 dark:text-slate-100 select-none">
        <svg 
          className="mr-2 h-4 w-4 transition-transform group-open:rotate-90 text-slate-500" 
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        {summary}
      </summary>
      <div className="mt-4 border-t border-slate-200 pt-4 text-slate-600 dark:border-slate-800 dark:text-slate-400">
        {children}
      </div>
    </details>
  );
}