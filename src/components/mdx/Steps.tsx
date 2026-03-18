'use client';

import { createContext, useContext, Children, ReactNode } from 'react';

const StepIndexContext = createContext(1);

export function Steps({ children }: { children: ReactNode }) {
  const arr = Children.toArray(children);
  return (
    <div className="my-8 ml-4 border-l-2 border-slate-200 pl-8 dark:border-slate-700">
      {arr.map((child, i) => (
        <StepIndexContext.Provider key={i} value={i + 1}>
          {child}
        </StepIndexContext.Provider>
      ))}
    </div>
  );
}

export function Step({ title, children }: { title: string; children: ReactNode }) {
  const n = useContext(StepIndexContext);
  return (
    <div className="relative pb-10 last:pb-0">
      <div className="absolute -left-12 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white text-sm font-bold ring-4 ring-white shadow-sm dark:bg-slate-100 dark:text-slate-900 dark:ring-slate-950">
        {n}
      </div>
      <h3 className="mb-2 mt-0 text-base font-bold leading-8 text-slate-900 dark:text-slate-100">
        {title}
      </h3>
      <div className="leading-relaxed text-slate-600 dark:text-slate-400">
        {children}
      </div>
    </div>
  );
}
