"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";


type LogoEntry =
  | { key: string; type: "img"; src: string; alt: string; width: number; height: number; style?: React.CSSProperties }
  | { key: string; type: "css"; render: () => React.ReactNode };

const logos: LogoEntry[] = [
  {
    key: "austin",
    type: "img",
    src: "/logos/austin.svg",
    alt: "Austin",
    width: 120,
    height: 60,
  },
  {
    key: "hc",
    type: "img",
    src: "/logos/hc-company.svg",
    alt: "HC Company — 100% Employee Owned",
    width: 160,
    height: 56,
  },
  {
    key: "mgc",
    type: "img",
    src: "/logos/mgc.png",
    alt: "MGC — Quality · Performance · Value",
    width: 160,
    height: 64,
  },
  {
    key: "mwh",
    type: "img",
    src: "/logos/mwh-square.png",
    alt: "MWH Constructors",
    width: 72,
    height: 72,
  },
  {
    key: "heb",
    type: "img",
    src: "/logos/heb.png",
    alt: "H-E-B",
    width: 100,
    height: 40,
  },
  {
    key: "topmar",
    type: "img",
    src: "/logos/topmar.png",
    alt: "Topmar Construction",
    width: 160,
    height: 45,
  },
  {
    key: "plw",
    type: "css",
    render: () => (
      <div className="logo-css" style={{ textAlign: "center", lineHeight: 1 }}>
        <span style={{
          fontFamily: "var(--font-display)",
          fontSize: 36,
          fontWeight: 700,
          color: "#111827",
          letterSpacing: "-1px",
          lineHeight: 1,
          display: "block",
        }}>plw</span>
        <span style={{
          fontFamily: "var(--font-sans)",
          fontSize: 10,
          fontWeight: 600,
          color: "#1f2937",
          letterSpacing: "0.14em",
          marginTop: 5,
          display: "block",
          textTransform: "uppercase",
        }}>waterworks</span>
      </div>
    ),
  },
  {
    key: "goodwyn",
    type: "css",
    render: () => (
      <div className="logo-css" style={{ textAlign: "center", lineHeight: 1 }}>
        <span style={{
          fontFamily: "var(--font-display)",
          fontSize: 22,
          fontWeight: 800,
          color: "#111827",
          letterSpacing: "0.06em",
          lineHeight: 1,
          display: "block",
        }}>GOODWYN</span>
        <span style={{
          fontFamily: "var(--font-sans)",
          fontSize: 9,
          fontWeight: 600,
          color: "#1f2937",
          letterSpacing: "0.18em",
          marginTop: 6,
          display: "block",
          textTransform: "uppercase",
        }}>Flooring Companies</span>
      </div>
    ),
  },
  {
    key: "xylem",
    type: "css",
    render: () => (
      <div className="logo-css" style={{
        fontFamily: "var(--font-display)",
        fontSize: 30,
        fontWeight: 600,
        color: "#111827",
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
    let ctx: { revert: () => void } | undefined;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);
        ctx = gsap.context(() => {
          gsap.from(headRef.current!.querySelectorAll(".anim-head"), {
            opacity: 0, y: 24, duration: 0.6, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: headRef.current, start: "top 82%" },
          });
          ScrollTrigger.batch(gridRef.current!.querySelectorAll(".logo-card"), {
            onEnter: (els) => gsap.from(els, { opacity: 0, y: 20, duration: 0.5, stagger: 0.06, ease: "power3.out" }),
            start: "top 85%",
          });
        }, sectionRef);
      }
    );
    return () => ctx?.revert();
  }, []);

  return (
    <>
      <style>{`
        .trusted {
          padding: 112px 0;
          background: var(--canvas-soft);
        }
        .trusted-head {
          text-align: center;
          margin: 0 auto 64px;
          max-width: 560px;
        }
        .trusted-head .eyebrow {
          margin-bottom: 16px;
          justify-content: center;
        }
        .trusted-head .lede {
          margin: 14px auto 0;
          color: var(--muted);
          font-size: 16px;
          max-width: 48ch;
          line-height: 1.6;
        }

        /* ── 3 columns, 3 rows ── */
        .logo-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .logo-card {
          background: #fff;
          border: 1px solid var(--hairline);
          height: 96px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px 32px;
          transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease;
          overflow: hidden;
        }
        .logo-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 28px rgba(10,16,36,0.08);
          border-color: transparent;
        }
        .logo-card img {
          max-width: 120px;
          max-height: 48px;
          width: auto;
          height: auto;
          object-fit: contain;
          filter: grayscale(1);
          opacity: 0.55;
          transition: filter .22s ease, opacity .22s ease;
        }
        .logo-card:hover img {
          filter: grayscale(0);
          opacity: 1;
        }
        .logo-css {
          transition: opacity .22s ease;
          opacity: 0.85;
        }
        .logo-card:hover .logo-css {
          opacity: 1;
        }

        @media (max-width: 860px)  { .logo-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 540px)  { .logo-grid { grid-template-columns: 1fr; } }
      `}</style>

      <section className="trusted" id="trusted" ref={sectionRef}>
        <div className="container">
          <div className="trusted-head" ref={headRef}>
            <div className="eyebrow anim-head">Trusted partners</div>
            <h2 className="section-h anim-head" style={{ marginTop: 12 }}>
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
