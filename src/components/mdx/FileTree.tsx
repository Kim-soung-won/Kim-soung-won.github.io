import { File, FolderOpen } from 'lucide-react';
import { ReactNode } from 'react';

interface FileTreeProps {
  children: ReactNode;
}

export function FileTree({ children }: FileTreeProps) {
  return (
    <div className="my-6 rounded-lg border border-slate-200 bg-slate-50 p-4 font-mono text-sm dark:border-slate-800 dark:bg-[#1e1e1e]">
      <div className="flex flex-col gap-1.5">{children}</div>
    </div>
  );
}

export function FolderItem({ name, children, defaultOpen = false }: { name: string; children: ReactNode; defaultOpen?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
        <FolderOpen className="h-4 w-4 text-blue-500" />
        <span className="font-medium">{name}</span>
      </div>
      <div className="ml-4 flex flex-col gap-1.5 border-l border-slate-200 pl-4 dark:border-slate-700">
        {children}
      </div>
    </div>
  );
}

export function FileItem({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
      <File className="h-4 w-4" />
      <span>{name}</span>
    </div>
  );
}