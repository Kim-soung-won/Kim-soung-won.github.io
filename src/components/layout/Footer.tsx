export default function Footer() {
  const ascii =
`   ╭─ daily.log ─────────────────────────╮
   │   curiosity > noise.                 │
   │   one entry per day · since 2026     │
   ╰──────────────────────────────────────╯`;
  return (
    <footer className="footer">
      <pre className="ascii">{ascii}</pre>
      <div style={{ textAlign: "right" }}>
        <div style={{ color: "var(--ink-2)" }}>v2.0.0 · built with .mdx + GitHub</div>
        <div style={{ marginTop: 4, color: "var(--muted-2)" }}>© 2026 — keep it simple.</div>
      </div>
    </footer>
  );
}
