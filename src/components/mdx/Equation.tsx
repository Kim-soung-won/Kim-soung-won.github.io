import { ReactNode } from 'react';

export function Equation({ children, caption }: { children: ReactNode; caption?: string }) {
  return (
    <div className="my-8 flex flex-col items-center">
      <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 px-6 py-8 text-center dark:border-slate-800 dark:bg-[#1e1e1e]">
        <div className="text-lg font-medium text-slate-800 dark:text-slate-100">
          {children}
        </div>
      </div>
      {caption && (
        <span className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {caption}
        </span>
      )}
    </div>
  );
}