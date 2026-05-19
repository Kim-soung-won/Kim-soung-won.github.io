"use client";

import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";

export default function CategoriesView({ counts }: { counts: Record<string, number> }) {
  return (
    <section className="cats">
      <div className="cats-head">
        <div className="about-eyebrow">// taxonomy</div>
        <h1>여덟 개의 토픽,<br /><em>하나의 습관.</em></h1>
        <p>매일 한 개씩 쌓아온 글들을 자동으로 분류한 결과입니다. 카드를 누르면 해당 토픽의 글만 모아 보여줍니다.</p>
      </div>
      <div className="cats-grid">
        {Object.entries(CATEGORIES).filter(([k]) => k !== "Misc" || counts[k]).map(([k, meta]) => (
          <CatCard key={k} name={k} meta={meta} count={counts[k] || 0} />
        ))}
      </div>
    </section>
  );
}

function CatCard({
  name, meta, count,
}: { name: string; meta: { color: string; glyph: string; desc: string }; count: number }) {
  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
    e.currentTarget.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
  };
  return (
    <Link
      href={`/?cat=${encodeURIComponent(name)}`}
      className="cat-card"
      data-hover
      onMouseMove={onMove}
      style={{ ["--c" as never]: meta.color } as React.CSSProperties}
    >
      <span className="glyph">{meta.glyph}</span>
      <div>
        <div className="name">{name}</div>
        <div className="desc">{meta.desc}</div>
      </div>
      <div className="count">
        <span>entries</span>
        <b>{String(count).padStart(2, "0")}</b>
      </div>
    </Link>
  );
}
