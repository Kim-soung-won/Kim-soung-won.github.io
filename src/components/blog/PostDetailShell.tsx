import Link from "next/link";
import type { ReactNode } from "react";
import type { PostData } from "@/lib/posts";
import { CATEGORIES } from "@/lib/categories";
import TOC from "./TOC";
import ReadingProgress from "@/components/effects/ReadingProgress";

export default function PostDetailShell({
  post, body, prev, next, totalCount, indexFromNewest,
}: {
  post: PostData;
  body: ReactNode;
  prev?: PostData;
  next?: PostData;
  totalCount: number;
  indexFromNewest: number;
}) {
  const cat = CATEGORIES[post.category] || { color: "#888" };
  const entryNo = String(totalCount - indexFromNewest).padStart(3, "0");

  return (
    <>
      <ReadingProgress />
      <section className="detail">
        <div>
          <Link href="/" className="detail-back" data-hover>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            cd ../
          </Link>

          <div className="detail-meta">
            <span className="post-cat" style={{ color: cat.color }}>
              <span className="dot" style={{ background: cat.color }} />
              {post.category}
            </span>
            <span className="sep">·</span>
            <span>{post.date}</span>
            <span className="sep">·</span>
            <span>{post.readMin} min read</span>
            <span className="sep">·</span>
            <span># entry/{entryNo}</span>
          </div>

          <h1 className="detail-title">{post.title}</h1>
          {post.description && <p className="detail-desc">{post.description}</p>}

          <div id="detail-body" className="detail-body">
            {body}
          </div>

          <div className="detail-nav">
            {prev ? (
              <Link href={`/posts/${prev.id}`} className="detail-nav-card prev" data-hover>
                <div className="k">← prev</div>
                <div className="t">{prev.title}</div>
              </Link>
            ) : <div />}
            {next ? (
              <Link href={`/posts/${next.id}`} className="detail-nav-card next" data-hover>
                <div className="k">next →</div>
                <div className="t">{next.title}</div>
              </Link>
            ) : <div />}
          </div>
        </div>

        <TOC />
      </section>
    </>
  );
}
