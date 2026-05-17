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
        .cert-card img {
          filter: grayscale(1);
          opacity: 0.6;
          transition: filter .22s ease, opacity .22s ease;
        }
        .cert-card:hover img {
          filter: grayscale(0);
          opacity: 1;
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
                  {c.type === "img" ? (
                    <Image
                      src={c.src}
                      alt={c.alt}
                      width={c.width}
                      height={c.height}
                      style={{ maxWidth: "100%", height: "auto", objectFit: "contain" }}
                      unoptimized
                    />
                  ) : (
                    <div style={{ textAlign: "center" }}>
                      <span style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 24,
                        fontWeight: 800,
                        color: c.color,
                        letterSpacing: "0.04em",
                        lineHeight: 1,
                        display: "block",
                        marginBottom: 6,
                      }}>{c.abbr}</span>
                      <span style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: 9,
                        fontWeight: 600,
                        color: "var(--muted)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        lineHeight: 1.4,
                        display: "block",
                      }}>{c.full}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
