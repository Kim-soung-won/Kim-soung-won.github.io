import { ReactNode } from 'react';

interface QuoteProps {
  children: ReactNode;
  author?: string;
  source?: string;
}

export function Quote({ children, author, source }: QuoteProps) {
  return (
    <blockquote className="not-prose my-8 rounded-r-xl border-l-4 border-slate-900 bg-slate-50 px-6 py-5 dark:border-slate-400 dark:bg-slate-800/50">
      <span className="-mt-1 mb-2 block text-3xl font-serif leading-none text-slate-300 dark:text-slate-600 select-none">
        &ldquo;
      </span>
      <div className="text-base leading-relaxed text-slate-700 dark:text-slate-300 [&>p]:my-0">
        {children}
      </div>
      {(author || source) && (
        <footer className="mt-4 text-sm text-slate-500 dark:text-slate-400">
          {author && <span className="font-semibold text-slate-700 dark:text-slate-200">{author}</span>}
          {author && source && <span className="mx-1">—</span>}
          {source && <cite className="not-italic">{source}</cite>}
        </footer>
      )}
    </blockquote>
  );
}
