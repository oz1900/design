"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Logo definitions ─────────────────────────────────────── */
// type: "img"  → real file in /public/logos/
// type: "css"  → CSS/SVG recreation
type LogoEntry =
  | { key: string; type: "img"; src: string; alt: string; width: number; height: number; style?: React.CSSProperties }
  | { key: string; type: "css"; render: () => React.ReactNode };

const logos: LogoEntry[] = [
  // ── Real SVG files ──────────────────────────────────────────
  {
    key: "austin",
    type: "img",
    src: "/logos/austin.svg",
    alt: "Austin",
    width: 120,
    height: 90,
  },
  {
    key: "hc",
    type: "img",
    src: "/logos/hc-company.svg",
    alt: "HC Company — 100% Employee Owned",
    width: 180,
    height: 64,
  },

  // ── PLW Waterworks: gold "plw" + grey "waterworks" ──────────
  {
    key: "plw",
    type: "css",
    render: () => (
      <div style={{ textAlign: "center", lineHeight: 1 }}>
        <div style={{
          fontFamily: "var(--font-display)",
          fontSize: 42,
          fontWeight: 700,
          color: "#D4A017",
          letterSpacing: "-1px",
          lineHeight: 1,
        }}>plw</div>
        <div style={{
          fontFamily: "var(--font-sans)",
          fontSize: 13,
          fontWeight: 400,
          color: "#888",
          letterSpacing: "0.04em",
          marginTop: 4,
        }}>waterworks</div>
      </div>
    ),
  },

  // ── H-E-B ───────────────────────────────────────────────────
  {
    key: "heb",
    type: "css",
    render: () => (
      <div style={{
        fontFamily: "var(--font-display)",
        fontSize: 36,
        fontWeight: 800,
        color: "#c8102e",
        letterSpacing: "-1px",
        lineHeight: 1,
      }}>H‑E‑B</div>
    ),
  },

  // ── Goodwyn Flooring Companies: navy bg, house icon, text ───
  {
    key: "goodwyn",
    type: "css",
    render: () => (
      <div style={{
        background: "#1e2d5a",
        borderRadius: 3,
        padding: "14px 18px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        width: "100%",
        justifyContent: "center",
      }}>
        {/* House + flooring icon */}
        <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 20L24 5L42 20V42H30V30H18V42H6V20Z" stroke="white" strokeWidth="2.5" fill="none"/>
          <rect x="14" y="32" width="20" height="2.5" fill="white"/>
          <rect x="14" y="36" width="20" height="2.5" fill="white"/>
          <rect x="20" y="12" width="8" height="8" stroke="white" strokeWidth="2" fill="none"/>
        </svg>
        <div>
          <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 15, color: "#fff", letterSpacing: "0.08em", lineHeight: 1.2 }}>GOODWYN</div>
          <div style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: 9, color: "rgba(255,255,255,0.75)", letterSpacing: "0.22em", textTransform: "uppercase", marginTop: 3 }}>Flooring Companies</div>
        </div>
      </div>
    ),
  },

  // ── MGC: dark crimson letters, "QUALITY · PERFORMANCE · VALUE"
  {
    key: "mgc",
    type: "css",
    render: () => (
      <div style={{ textAlign: "center" }}>
        <div style={{
          fontFamily: "var(--font-display)",
          fontSize: 44,
          fontWeight: 900,
          color: "#8b0016",
          letterSpacing: "-1px",
          lineHeight: 1,
          textShadow: "1px 1px 0 rgba(0,0,0,0.15)",
        }}>MGC</div>
        <div style={{
          fontFamily: "var(--font-sans)",
          fontSize: 8,
          fontWeight: 600,
          letterSpacing: "0.18em",
          color: "#555",
          marginTop: 5,
          textTransform: "uppercase",
        }}>Quality · Performance · Value</div>
      </div>
    ),
  },

  // ── MWH Constructors ────────────────────────────────────────
  {
    key: "mwh",
    type: "css",
    render: () => (
      <div style={{ textAlign: "center" }}>
        <div style={{
          fontFamily: "var(--font-display)",
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: "2px",
          color: "var(--ink)",
          lineHeight: 1,
        }}>MWH</div>
        <div style={{
          fontFamily: "var(--font-sans)",
          fontSize: 8,
          letterSpacing: "0.28em",
          color: "var(--muted)",
          marginTop: 5,
          textTransform: "uppercase",
          fontWeight: 500,
        }}>Constructors</div>
      </div>
    ),
  },

  // ── Xylem ────────────────────────────────────────────────────
  {
    key: "xylem",
    type: "css",
    render: () => (
      <div style={{
        fontFamily: "var(--font-display)",
        fontSize: 30,
        fontWeight: 600,
        color: "#003a70",
        letterSpacing: "-0.5px",
        fontStyle: "italic",
        lineHeight: 1,
      }}>Xylem</div>
    ),
  },
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
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .logo-card {
          background: #fff;
          border: 1px solid var(--hairline);
          aspect-ratio: 5/2;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px 24px;
          transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
          overflow: hidden;
        }
        .logo-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(10,16,36,0.07);
          border-color: transparent;
        }
        @media (max-width: 1000px) { .logo-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 720px)  { .logo-grid { grid-template-columns: 1fr; } }
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
                {logo.type === "img" ? (
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", ...logo.style }}
                    unoptimized
                  />
                ) : (
                  logo.render()
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
