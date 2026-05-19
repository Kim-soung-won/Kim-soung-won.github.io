export default function AboutStrip() {
  return (
    <section className="about-strip">
      <div>
        <div className="about-eyebrow">// 0x00.author</div>
        <h2 className="about-title">
          백엔드 출신,<br />
          <em>다시 프론트를 배우는 중.</em>
        </h2>
      </div>
      <div className="about-body">
        <p>
          백엔드 경험을 토대로 프론트엔드·시스템·AI 영역까지 호기심을 옮겨가며 매일 하나의 작은 사실을 정리합니다. 거대한 글보다 작고 정확한 단편을 모으는 쪽을 좋아합니다.
        </p>
        <p style={{ color: "var(--muted)" }}>
          글은 개인 Notion에서 시작해 AI 도움으로 .mdx로 변환·발행되고, 모든 게시물은 GitHub에 그대로 보관됩니다. 한 번에 한 가지만 명확히.
        </p>
        <div className="about-tags">
          <span>Backend → Frontend</span>
          <span>Systems</span>
          <span>AI / LLM Tooling</span>
          <span>Architecture</span>
          <span>Daily ✱</span>
        </div>
      </div>
    </section>
  );
}
