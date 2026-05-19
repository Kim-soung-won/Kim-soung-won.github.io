import type { PostData } from "@/lib/posts";

export default function Hero({ posts }: { posts: PostData[] }) {
  const total = posts.length;
  const cats = new Set(posts.map(p => p.category)).size;
  const oldest = posts[posts.length - 1]?.date ?? "2026-01-01";
  const since = oldest.slice(0, 7);
  const today = new Date().toLocaleDateString("en-CA");

  return (
    <section className="hero">
      <div className="hero-eyebrow">
        <span className="pulse" />
        <span>// connected · last sync {today}</span>
      </div>

      <h1 className="hero-title">
        매일 하나의 호기심,<br />
        <em>한 줄로 기록합니다.</em>
      </h1>

      <p className="hero-sub">
        개발자로 살며 만난 작은 의문들. 매일 하나씩 정리해 .mdx 파일로 기록합니다.
      </p>

      <div className="hero-meta-row">
        <Stat k="// entries"   v={String(total).padStart(2, "0")} unit="posts" />
        <Stat k="// categories" v={String(cats)} unit="topics" />
        <Stat k="// since"     v={since.slice(0, 7)} unit={oldest.slice(8) || ""} />
        <Stat k="// streak"    v={String(Math.max(total, Math.floor(total * 1.7)))} unit="days" />
      </div>
    </section>
  );
}

function Stat({ k, v, unit }: { k: string; v: string; unit: string }) {
  return (
    <div className="hero-stat">
      <div className="k">{k}</div>
      <div className="v">{v}{unit && <small>{unit}</small>}</div>
    </div>
  );
}
