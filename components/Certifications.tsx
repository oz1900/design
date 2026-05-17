"use client";

import { useRef, useEffect } from "react";

const certs = [
  {
    key: "nccer",
    abbr: "NCCER",
    full: "National Center for Construction Education & Research",
    color: "#0047AB",
  },
  {
    key: "bcsp",
    abbr: "BCSP",
    full: "Board of Certified Safety Professionals",
    color: "#003087",
  },
  {
    key: "csp",
    abbr: "CSP",
    full: "Certified Safety Professional",
    color: "#003087",
  },
  {
    key: "assp",
    abbr: "ASSP",
    full: "American Society of Safety Professionals",
    color: "#C8102E",
  },
];

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);
        ctx = gsap.context(() => {
          gsap.from(sectionRef.current!.querySelectorAll(".cert-card"), {
            opacity: 0, y: 20, duration: 0.5, stagger: 0.08, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
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
          padding: 80px 0;
          background: var(--canvas);
          border-top: 1px solid var(--hairline);
        }
        .certs-inner {
          display: flex;
          align-items: center;
          gap: 48px;
          flex-wrap: wrap;
        }
        .certs-label {
          flex-shrink: 0;
        }
        .certs-label .eyebrow { margin-bottom: 8px; }
        .certs-label p {
          font-size: 14px;
          color: var(--muted);
          max-width: 22ch;
          line-height: 1.5;
          margin: 0;
        }
        .certs-row {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          flex: 1;
        }
        .cert-card {
          flex: 1;
          min-width: 140px;
          background: var(--canvas-soft);
          border: 1px solid var(--hairline);
          padding: 24px 20px;
          text-align: center;
          transition: box-shadow .22s ease, transform .22s ease, border-color .22s ease;
        }
        .cert-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 28px rgba(10,16,36,0.08);
          border-color: transparent;
        }
        .cert-abbr {
          font-family: var(--font-display);
          font-size: 28px;
          font-weight: 800;
          letter-spacing: 0.04em;
          line-height: 1;
          display: block;
          margin-bottom: 8px;
        }
        .cert-full {
          font-size: 10px;
          font-weight: 600;
          color: var(--muted);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          line-height: 1.4;
          display: block;
        }
        @media (max-width: 860px) {
          .certs-inner { flex-direction: column; align-items: flex-start; gap: 32px; }
          .certs-label p { max-width: none; }
          .certs-row { width: 100%; }
        }
        @media (max-width: 540px) {
          .cert-card { min-width: calc(50% - 8px); }
        }
      `}</style>

      <section className="certs" ref={sectionRef}>
        <div className="container">
          <div className="certs-inner">
            <div className="certs-label">
              <div className="eyebrow">Certifications</div>
              <p>Professional affiliations &amp; industry credentials</p>
            </div>
            <div className="certs-row">
              {certs.map((c) => (
                <div key={c.key} className="cert-card">
                  <span className="cert-abbr" style={{ color: c.color }}>{c.abbr}</span>
                  <span className="cert-full">{c.full}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
