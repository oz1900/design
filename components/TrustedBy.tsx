"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const logos = [
  {
    key: "austin",
    pre: "City of",
    main: "AUSTIN",
    className: "lm-austin",
  },
  { key: "plw", main: "PLW", sub: "Waterworks", className: "lm-plw" },
  { key: "heb", main: "H‑E‑B", className: "lm-heb" },
  { key: "hc", main: "HC", sub: "Company", className: "lm-hc" },
  { key: "goodwyn", main: "Goodwyn", sub: "Flooring Cos.", className: "lm-goodwyn" },
  { key: "mgc", main: "MGC", className: "lm-mgc" },
  { key: "mwh", main: "MWH", className: "lm-mwh" },
  { key: "xylem", main: "Xylem", className: "lm-xylem" },
];

export default function TrustedBy() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current!.querySelectorAll(".anim-head"), {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: headRef.current, start: "top 82%" },
      });

      ScrollTrigger.batch(gridRef.current!.querySelectorAll(".logo-card"), {
        onEnter: (els) =>
          gsap.from(els, {
            opacity: 0,
            y: 24,
            duration: 0.6,
            stagger: 0.07,
            ease: "power3.out",
          }),
        start: "top 85%",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .trusted {
          padding: 120px 0;
          background: var(--canvas-soft);
          position: relative;
        }
        .trusted-head {
          text-align: center;
          margin: 0 auto 56px;
          max-width: 640px;
        }
        .trusted-head .eyebrow { margin-bottom: 20px; justify-content: center; }
        .trusted-head .lede {
          margin: 16px auto 0;
          text-align: center;
          color: var(--muted);
          font-size: 16px;
          max-width: 50ch;
        }
        .logo-grid {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 16px;
        }
        .logo-card {
          background: #fff;
          border: 1px solid var(--hairline);
          aspect-ratio: 5/2;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
        }
        .logo-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(10,16,36,0.07);
          border-color: transparent;
        }
        .logo-mark {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 2px;
          text-align: center;
          color: var(--ink);
        }
        .lm-pre {
          font-size: 9px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: var(--muted);
        }
        .lm-main {
          font-family: var(--font-display);
          font-size: 26px;
          font-weight: 600;
          letter-spacing: -0.8px;
          line-height: 1;
        }
        .lm-sub {
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted);
          margin-top: 4px;
        }
        .lm-heb { color: #c8102e; }
        .lm-heb .lm-main { font-size: 32px; letter-spacing: -1px; font-weight: 700; }
        .lm-hc .lm-main { font-size: 30px; font-weight: 800; letter-spacing: -0.5px; color: #1a4d2e; }
        .lm-goodwyn .lm-main { font-family: Georgia, serif; font-size: 22px; font-weight: 400; letter-spacing: 0.5px; color: #4a2c12; font-style: italic; }
        .lm-mgc .lm-main { color: #b8002e; font-weight: 800; letter-spacing: 2px; font-family: var(--font-sans); font-size: 22px; }
        .lm-mwh .lm-main { font-size: 26px; font-weight: 700; letter-spacing: 1.5px; }
        .lm-xylem { color: #003a70; }
        .lm-xylem .lm-main { font-style: italic; font-size: 28px; font-weight: 600; letter-spacing: -0.5px; }
        .lm-plw .lm-main { font-size: 22px; }
        .lm-austin .lm-main { font-family: Inter, sans-serif; font-weight: 700; letter-spacing: -0.5px; font-size: 22px; }
        @media (max-width: 1000px) { .logo-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 720px) { .logo-grid { grid-template-columns: 1fr; } }
      `}</style>
      <section className="trusted" id="trusted" ref={sectionRef}>
        <div className="container">
          <div className="trusted-head" ref={headRef}>
            <div className="eyebrow anim-head">Trusted partners</div>
            <h2 className="section-h anim-head" style={{ marginTop: 16 }}>
              Trusted by industry leaders.
            </h2>
            <p className="lede anim-head">
              Supporting construction, infrastructure, public service, retail, industrial, and water / wastewater operations.
            </p>
          </div>
          <div className="logo-grid" ref={gridRef}>
            {logos.map((logo) => (
              <div key={logo.key} className="logo-card">
                <div className={`logo-mark ${logo.className}`}>
                  {logo.pre && <span className="lm-pre">{logo.pre}</span>}
                  <span className="lm-main">{logo.main}</span>
                  {logo.sub && <span className="lm-sub">{logo.sub}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
