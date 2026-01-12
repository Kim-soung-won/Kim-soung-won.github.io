import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { ReactNode } from 'react';

export function ProsCons({ children }: { children: ReactNode }) {
  return (
    <div className="my-8 grid gap-4 md:grid-cols-2">
      {children}
    </div>
  );
}

// [수정 포인트] flex 기반 -> relative + absolute 기반으로 변경하여 레이아웃 깨짐 방지
const commonStyles = `
  prose-sm text-slate-700 dark:text-slate-300 
  [&>ul]:list-none [&>ul]:p-0 [&>ul]:m-0 
  [&_li]:relative [&_li]:pl-6 [&_li]:mb-2 
  [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-0.5 [&_li]:before:font-bold
`;

export function Pros({ title = "장점 (Pros)", children }: { title?: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-green-200 bg-green-50/50 p-4 dark:border-green-900/50 dark:bg-green-900/20">
      <div className="mb-3 flex items-center gap-2 text-green-700 dark:text-green-400">
        <ThumbsUp className="h-5 w-5 shrink-0" />
        <span className="font-bold">{title}</span>
      </div>
      <div className={`${commonStyles} [&_li]:before:content-['✓'] [&_li]:before:text-green-500`}>
        {children}
      </div>
    </div>
  );
}

export function Cons({ title = "단점 (Cons)", children }: { title?: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50/50 p-4 dark:border-red-900/50 dark:bg-red-900/20">
      <div className="mb-3 flex items-center gap-2 text-red-700 dark:text-red-400">
        <ThumbsDown className="h-5 w-5 shrink-0" />
        <span className="font-bold">{title}</span>
      </div>
      <div className={`${commonStyles} [&_li]:before:content-['✕'] [&_li]:before:text-red-500`}>
        {children}
      </div>
    </div>
  );
}