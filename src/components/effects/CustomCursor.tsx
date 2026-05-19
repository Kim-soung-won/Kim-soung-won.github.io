"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my, dx = mx, dy = my;

    const onMove = (e: PointerEvent) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener("pointermove", onMove);

    let raf = 0;
    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      dx += (mx - dx) * 0.55;
      dy += (my - dy) * 0.55;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      if (dotRef.current)  dotRef.current.style.transform  = `translate(${dx}px, ${dy}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    const onOver = (e: PointerEvent) => {
      const t = (e.target as HTMLElement | null)?.closest(
        "a, button, .post-row, .cat-card, .chip, .detail-nav-card, .brand, [data-hover]"
      );
      if (ringRef.current) ringRef.current.classList.toggle("hover", !!t);
    };
    document.addEventListener("pointerover", onOver);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef}  className="cursor-dot" />
    </>
  );
}
