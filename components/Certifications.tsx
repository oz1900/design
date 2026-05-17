"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";

type CertEntry =
  | { key: string; type: "img"; src: string; alt: string; width: number; height: number }
  | { key: string; type: "css"; abbr: string; full: string; color: string };

const certs: CertEntry[] = [
  {
    key: "nccer",
    type: "img",
    src: "/logos/nccer.svg",
    alt: "NCCER — National Center for Construction Education & Research",
    width: 160,
    height: 48,
  },
  {
    key: "bcsp",
    type: "img",
    src: "/logos/bcsp.png",
    alt: "BCSP — Board of Certified Safety Professionals",
    width: 160,
    height: 44,
  },
  {
    key: "csp",
    type: "img",
    src: "/logos/csp.png",
    alt: "CSP — Certified Safety Professional",
    width: 120,
    height: 54,
  },
  {
    key: "assp",
    type: "img",
    src: "/logos/assp.png",
    alt: "ASSP — American Society of Safety Professionals",
    width: 160,
    height: 56,
  },
  {
    key: "shep",
    type: "css",
    abbr: "SHEP",
    full: "Safety & Health Evaluation Professional",
    color: "#0F4BF3",
  },
  {
    key: "chso",
    type: "css",
    abbr: "CHSO",
    full: "Certified Health & Safety Official",
    color: "#0F4BF3",
  },
  {
    key: "ssh",
    type: "css",
    abbr: "SSH",
    full: "Site Safety & Health Officer",
    color: "#0F4BF3",
  },
];

export default function Certifications() {
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
          ScrollTrigger.batch(gridRef.current!.querySelectorAll(".cert-card"), {
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
        .certs {
          padding: 112px 0;
          background: var(--canvas);
          border-top: 1px solid var(--hairline);
        }
        .certs-head {
          text-align: center;
          margin: 0 auto 64px;
          max-width: 560px;
        }
        .certs-head .eyebrow {
          margin-bottom: 16px;
          justify-content: center;
        }
        .certs-head .lede {
          margin: 14px auto 0;
          color: var(--muted);
          font-size: 16px;
          max-width: 48ch;
          line-height: 1.6;
        }
        .cert-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .cert-card {
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
        .cert-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 28px rgba(10,16,36,0.08);
          border-color: transparent;
        }
        .cert-card img {
          max-width: 120px;
          max-height: 48px;
          width: auto;
          height: auto;
          object-fit: contain;
          filter: grayscale(1);
          opacity: 0.55;
          transition: filter .22s ease, opacity .22s ease;
        }
        .cert-card:hover img {
          filter: grayscale(0);
          opacity: 1;
        }
        .cert-css {
          text-align: center;
          opacity: 0.7;
          transition: opacity .22s ease;
        }
        .cert-card:hover .cert-css { opacity: 1; }
        .cert-abbr {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 800;
          letter-spacing: 0.06em;
          line-height: 1;
          display: block;
          margin-bottom: 5px;
        }
        .cert-full {
          font-family: var(--font-sans);
          font-size: 8px;
          font-weight: 600;
          color: var(--muted);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          line-height: 1.4;
          display: block;
          max-width: 14ch;
          margin: 0 auto;
        }
        @media (max-width: 860px) { .cert-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 540px) { .cert-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>

      <section className="certs" ref={sectionRef}>
        <div className="container">
          <div className="certs-head" ref={headRef}>
            <div className="eyebrow anim-head">Certifications & Affiliations</div>
            <h2 className="section-h anim-head" style={{ marginTop: 12 }}>
              Backed by top industry credentials.
            </h2>
            <p className="lede anim-head">
              Our team holds certifications from the leading safety and construction professional bodies in the United States.
            </p>
          </div>
          <div className="cert-grid" ref={gridRef}>
            {certs.map((c) => (
              <div key={c.key} className="cert-card">
                {c.type === "img" ? (
                  <Image
                    src={c.src}
                    alt={c.alt}
                    width={c.width}
                    height={c.height}
                    unoptimized
                  />
                ) : (
                  <div className="cert-css">
                    <span className="cert-abbr" style={{ color: c.color }}>{c.abbr}</span>
                    <span className="cert-full">{c.full}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
