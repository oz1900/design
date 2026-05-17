"use client";

import { useRef, useEffect } from "react";
const items = [
  "Construction",
  "Infrastructure",
  "Industrial",
  "Public sector",
  "Water / wastewater",
  "Refinery & petrochemical",
  "Commercial build-out",
  "Environmental services",
];

export default function TrustBar() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let tween: { kill: () => void } | undefined;
    import("gsap").then(({ default: gsap }) => {
      const totalWidth = track.scrollWidth / 2;
      tween = gsap.to(track, { x: -totalWidth, duration: 28, ease: "none", repeat: -1 });
    });
    return () => { tween?.kill(); };
  }, []);

  const allItems = [...items, ...items]; // duplicate for seamless loop

  return (
    <>
      <style>{`
        .trustbar {
          background: var(--canvas-soft);
          border-top: 1px solid var(--hairline);
          border-bottom: 1px solid var(--hairline);
          padding: 24px 0;
          overflow: hidden;
          scroll-margin-top: 78px;
        }
        .trustbar-track-wrap {
          display: flex;
          align-items: center;
          gap: 0;
          overflow: hidden;
          position: relative;
        }
        .trustbar-lab {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--muted);
          white-space: nowrap;
          padding-right: 32px;
          flex-shrink: 0;
        }
        .trustbar-track {
          display: flex;
          gap: 0;
          white-space: nowrap;
          will-change: transform;
        }
        .tbm {
          font-family: var(--font-display);
          color: #6b7280;
          font-size: 17px;
          font-weight: 600;
          letter-spacing: -0.3px;
          padding: 0 28px;
          transition: color .2s ease;
          flex-shrink: 0;
        }
        .tbm:hover { color: var(--ink-soft); }
        .tbm-dot {
          font-family: var(--font-mono);
          font-size: 13px;
          padding: 0 4px;
          flex-shrink: 0;
          color: #9ca3af;
        }
      `}</style>
      <div className="trustbar">
        <div className="container" style={{ display: "flex", alignItems: "center", gap: 0, overflow: "hidden" }}>
          <div className="trustbar-lab">Field-tested across</div>
          <div style={{ overflow: "hidden", flex: 1 }}>
            <div className="trustbar-track" ref={trackRef}>
              {allItems.map((item, i) => (
                <span key={i} className="tbm">{item}<span className="tbm-dot"> ·</span></span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
