"use client";

import { useState, type ReactNode } from "react";

export function CodeBlock({
  lang = "",
  title = "",
  children,
}: {
  lang?: string;
  title?: string;
  children: ReactNode;
}) {
  const text = typeof children === "string" ? children : String(children ?? "");
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  };
  return (
    <div className="code-block">
      <div className="code-head">
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          {lang && <span className="lang">{lang}</span>}
          {title && <span className="title">— {title}</span>}
        </div>
        <button className={"code-copy" + (copied ? " copied" : "")} onClick={onCopy} data-hover>
          {copied ? "✓ copied" : "copy"}
        </button>
      </div>
      <pre>
        <code>{text}</code>
      </pre>
    </div>
  );
}
