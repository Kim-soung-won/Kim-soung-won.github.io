import { ReactNode } from 'react';
import { FileCode } from 'lucide-react';

export function CodeTitle({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-slate-800">
      <div className="flex items-center gap-2 border-b border-slate-800 bg-[#161620] px-4 py-2.5">
        <FileCode className="h-3.5 w-3.5 shrink-0 text-slate-500" />
        <span className="font-mono text-xs text-slate-400">{name}</span>
      </div>
      <div className="[&>pre]:my-0 [&>pre]:rounded-none [&>pre]:border-0 [&>pre]:shadow-none">
        {children}
      </div>
    </div>
  );
}
