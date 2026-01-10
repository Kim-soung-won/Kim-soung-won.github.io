export default function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-slate-200 bg-white py-8 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:text-left">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} DevLog. MIT Licensed.
        </p>
        <div className="flex gap-4 text-sm font-medium text-slate-600 dark:text-slate-400">
          <a href="#" className="hover:text-red-500 dark:hover:text-red-400 transition-colors">GitHub</a>
          <a href="#" className="hover:text-red-500 dark:hover:text-red-400 transition-colors">Twitter</a>
          <a href="#" className="hover:text-red-500 dark:hover:text-red-400 transition-colors">Discord</a>
        </div>
      </div>
    </footer>
  );
}