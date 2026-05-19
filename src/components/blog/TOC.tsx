"use client";

import { useEffect, useState } from "react";

export default function TOC({ rootSelector = "#detail-body" }: { rootSelector?: string }) {
  const [items, setItems] = useState<{ id: string; text: string }[]>([]);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const root = document.querySelector(rootSelector);
    if (!root) return;
    const hs = Array.from(root.querySelectorAll<HTMLHeadingElement>("h2"));
    hs.forEach((h, i) => {
      if (!h.id) h.id = "h-" + i;
    });
    setItems(hs.map(h => ({ id: h.id, text: h.textContent || "" })));

    const onScroll = () => {
      let cur = hs[0]?.id;
      for (const h of hs) {
        if (h.getBoundingClientRect().top < 120) cur = h.id;
      }
      if (cur) setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [rootSelector]);

  if (items.length === 0) return null;

  return (
    <aside className="toc">
      <div className="toc-head">// on this page</div>
      <ul className="toc-list">
        {items.map(it => (
          <li
            key={it.id}
            className={active === it.id ? "active" : ""}
            data-hover
            onClick={() => document.getElementById(it.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
          >
            {it.text}
          </li>
        ))}
      </ul>
    </aside>
  );
}
