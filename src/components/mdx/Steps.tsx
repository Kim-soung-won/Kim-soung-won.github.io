interface StepsProps {
  children: React.ReactNode;
}

export function Steps({ children }: StepsProps) {
  return (
    <div className="ml-4 border-l border-slate-200 pl-8 [counter-reset:step] dark:border-slate-800">
      {children}
    </div>
  );
}

export function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="relative pb-10 last:pb-0">
      <div className="absolute -left-12 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 ring-4 ring-white text-sm font-bold text-slate-900 [counter-increment:step] content-[counter(step)] dark:bg-slate-800 dark:ring-slate-950 dark:text-slate-100" />
      <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-slate-100 mt-0">
        {title}
      </h3>
      <div className="text-slate-600 dark:text-slate-400">
        {children}
      </div>
    </div>
  );
}