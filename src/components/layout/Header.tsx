import Link from 'next/link';
import ThemeToggle from './ThemeToggle';


export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md transition-colors dark:border-slate-800 dark:bg-slate-900/80">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-amber-500 text-white shadow-lg transition-transform group-hover:scale-105">
            <span className="font-bold text-lg">D</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
            Dev<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">Log</span>
          </span>
        </Link>
        
        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-6 sm:flex">
            <Link 
              href="/posts" 
              className="text-sm font-semibold text-slate-600 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 transition-colors"
            >
              Blog
            </Link>
            <Link 
              href="/about" 
              className="text-sm font-semibold text-slate-600 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 transition-colors"
            >
              Docs
            </Link>
          </nav>

          <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 mx-2" />
          
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}