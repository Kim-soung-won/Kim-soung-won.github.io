export default function AboutView() {
  const cardStyle = {
    border: "1px solid var(--line)",
    borderRadius: 8,
    padding: 22,
  };
  const eyebrow = {
    fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--muted)",
    letterSpacing: ".14em", textTransform: "uppercase" as const,
  };
  const h3 = {
    fontFamily: "var(--f-display)", fontSize: 22, margin: "10px 0 8px",
    fontWeight: 600, letterSpacing: "-0.022em",
  };

  return (
    <section className="cats">
      <div className="cats-head">
        <div className="about-eyebrow">// readme.md</div>
        <h1>안녕하세요,<br /><em>매일 작은 것을 적습니다.</em></h1>
        <p style={{ maxWidth: 640 }}>
          백엔드를 오래 다루다 프론트엔드·시스템·AI 영역으로 호기심이 옮겨가고 있는 개발자입니다. 매일 마주친 작은 의문 하나를 골라 글로 정리합니다.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 960 }}>
        <div style={cardStyle}>
          <div style={eyebrow}>// principle</div>
          <h3 style={h3}>작고, 정확하게, 매일.</h3>
          <p style={{ color: "var(--ink-2)", margin: 0 }}>
            거대한 시리즈보다 짧고 또렷한 단편이 더 오래 기억된다고 믿습니다. 그래서 하루 한 편, 그날의 작은 발견을 그대로 적어둡니다.
          </p>
        </div>
        <div style={cardStyle}>
          <div style={eyebrow}>// stack</div>
          <h3 style={h3}>Notion → AI → mdx → GitHub.</h3>
          <p style={{ color: "var(--ink-2)", margin: 0 }}>
            먼저 Notion에 자유롭게 쓰고, AI의 도움으로 구조를 잡아 .mdx 파일로 변환합니다. Next.js와 GitHub Pages로 배포되며 모든 글이 코드처럼 버전 관리됩니다.
          </p>
        </div>
        <div style={cardStyle}>
          <div style={eyebrow}>// focus</div>
          <h3 style={h3}>네트워크 · 런타임 · AI.</h3>
          <p style={{ color: "var(--ink-2)", margin: 0 }}>
            HTTP/TCP의 디테일, V8과 Bun 같은 런타임의 내부, LLM 도구 체계 — 이 세 축에서 가장 자주 쓰고 가장 자주 막힙니다.
          </p>
        </div>
        <div style={cardStyle}>
          <div style={eyebrow}>// contact</div>
          <h3 style={h3}>언제든 읽고 있어요.</h3>
          <p style={{ color: "var(--ink-2)", margin: 0 }}>
            제안·피드백·오류 지적 모두 환영합니다.
          </p>
        </div>
      </div>
    </section>
  );
}
