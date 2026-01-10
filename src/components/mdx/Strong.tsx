export function Strong({ children }: { children: React.ReactNode }) {
  return (
    <strong className="font-bold text-slate-900 dark:text-slate-100">
      {children}
    </strong>
  );
}