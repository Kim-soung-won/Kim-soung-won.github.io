"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const pathname = usePathname();
  const isActive = (p: string) =>
    p === "/" ? pathname === "/" : pathname.startsWith(p);

  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="brand" data-hover>
          <span className="brand-mark" />
          <span className="brand-name">daily<b>.log</b></span>
        </Link>

        <nav className="nav">
          <Link href="/" className={isActive("/") && !pathname.startsWith("/posts") && !pathname.startsWith("/categories") && !pathname.startsWith("/about") ? "active" : ""} data-hover>Posts</Link>
          <Link href="/categories" className={isActive("/categories") ? "active" : ""} data-hover>Categories</Link>
          <Link href="/about" className={isActive("/about") ? "active" : ""} data-hover>About</Link>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
