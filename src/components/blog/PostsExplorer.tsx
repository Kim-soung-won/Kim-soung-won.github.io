"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { PostData } from "@/lib/posts";
import { CATEGORIES } from "@/lib/categories";

export default function PostsExplorer({ posts }: { posts: PostData[] }) {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string>("All");
  const inputRef = useRef<HTMLInputElement>(null);

  const counts = useMemo(() => posts.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1; return acc;
  }, {}), [posts]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter(p => {
      if (activeCat !== "All" && p.category !== activeCat) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q)
      );
    });
  }, [posts, query, activeCat]);

  return (
    <>
      <section className="cmd">
        <div className="cmd-window">
          <div className="cmd-titlebar">
            <span className="cmd-dot r" /><span className="cmd-dot y" /><span className="cmd-dot g" />
            <span className="cmd-title">~/daily.log — filter</span>
            <span style={{ width: 30 }} />
          </div>
          <div className="cmd-search-row">
            <span className="cmd-prompt">$</span>
            <input
              ref={inputRef}
              className="cmd-input"
              placeholder="grep title, description, category…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <span className="cmd-kbd">⌘K</span>
          </div>
          <div className="cmd-filters">
            <button
              className={"chip " + (activeCat === "All" ? "active" : "")}
              onClick={() => setActiveCat("All")}
              data-hover
            >
              <span className="dot" style={{ background: "var(--accent)" }} />
              <span>All</span>
              <span className="ct">{posts.length}</span>
            </button>
            {Object.entries(CATEGORIES).filter(([k]) => counts[k]).map(([k, meta]) => (
              <button
                key={k}
                className={"chip " + (activeCat === k ? "active" : "")}
                style={{ ["--c" as never]: meta.color } as React.CSSProperties}
                onClick={() => setActiveCat(k)}
                data-hover
              >
                <span className="dot" style={{ background: meta.color }} />
                <span>{k}</span>
                <span className="ct">{counts[k]}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="posts">
        <div className="posts-head">
          <div>// date</div>
          <div className="col-cat">// topic</div>
          <div>// entry</div>
          <div className="col-read">// read</div>
          <div />
        </div>

        {filtered.length === 0 && (
          <div style={{ padding: "60px 0", textAlign: "center", color: "var(--muted)", fontFamily: "var(--f-mono)", fontSize: 13 }}>
            // no entries match this filter.
          </div>
        )}

        {filtered.map((p, i) => {
          const cat = CATEGORIES[p.category] || { color: "#888" };
          return (
            <Link
              key={p.id}
              href={`/posts/${p.id}`}
              className="post-row"
              data-hover
              style={{ animationDelay: (i * 28) + "ms" }}
            >
              <div className="post-date">{p.date}</div>
              <div>
                <span className="post-cat" style={{ color: cat.color }}>
                  <span className="dot" style={{ background: cat.color }} />
                  {p.category}
                </span>
              </div>
              <div className="post-title">
                {p.title}
                <small>{p.description}</small>
              </div>
              <div className="post-read">{p.readMin} min</div>
              <div className="post-arrow">→</div>
            </Link>
          );
        })}
      </section>
    </>
  );
}
