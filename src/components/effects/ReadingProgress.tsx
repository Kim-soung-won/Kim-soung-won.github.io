"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setW(max <= 0 ? 0 : Math.min(100, (h.scrollTop / max) * 100));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="read-progress" style={{ width: w + "%" }} />;
}
