"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    num: "01",
    title: "Construction-focused safety support",
    body: "Real experience on commercial, industrial, infrastructure, and water / wastewater jobsites — not classroom theory.",
  },
  {
    num: "02",
    title: "Practical OSHA compliance guidance",
    body: "Clear answers for 29 CFR 1926 and 1910 questions, audit-ready documentation, and corrective actions that close out.",
  },
  {
    num: "03",
    title: "Hands-on field inspections",
    body: "Walk-the-floor reviews led by SHEP-, CHSO-, and SSH-certified professionals. Findings on your desk, not in a binder.",
  },
  {
    num: "04",
    title: "Rapid project safety staffing",
    body: "EHS professionals deployed in days, not weeks — for turnarounds, peak schedules, and unplanned coverage.",
  },
  {
    num: "05",
    title: "Real-world training for active crews",
    body: "OSHA 10 / 30, HAZWOPER, fall protection, confined space, and LOTO — delivered on-site, in English and Spanish.",
  },
  {
    num: "06",
    title: "Clear communication, top to bottom",
    body: "Executive briefings, foreman walk-backs, and crew-level toolbox talks — same message, right level of detail.",
  },
];

export default function WhyGreenberg() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current!.querySelectorAll(".anim-head"), {
        opacity: 0,
        y: 28,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: headRef.current, start: "top 80%" },
      });

      gsap.from(gridRef.current!.querySelectorAll(".why-card"), {
        opacity: 0,
        y: 30,
        duration: 0.65,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .why {
          padding: 120px 0;
          background: var(--ink);
          color: #fff;
          position: relative;
          overflow: hidden;
        }
        .why::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, transparent 0%, transparent 60%, rgba(15,75,243,0.06) 100%),
            radial-gradient(circle at 85% 20%, rgba(15,75,243,0.18) 0%, transparent 50%);
          pointer-events: none;
        }
        .why-inner { position: relative; z-index: 1; }
        .why-head {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          margin-bottom: 72px;
          align-items: end;
        }
        .why h2.section-h { color: #fff; }
        .why .eyebrow { color: #6da3ff; }
        .why .eyebrow::before { background: #6da3ff; }
        .why-lede { color: #b8c0d6; font-size: 17px; line-height: 1.55; }
        .why-grid {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 1px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .why-card {
          padding: 36px 28px;
          background: var(--ink);
          transition: background-color .25s ease;
        }
        .why-card:hover { background: var(--ink-soft); }
        .why-num {
          font-family: var(--font-mono);
          font-size: 11px;
          color: #6da3ff;
          letter-spacing: 0.12em;
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .why-num::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.12);
        }
        .why-card h3 {
          font-family: var(--font-sans);
          color: #fff;
          font-size: 17px;
          font-weight: 600;
          margin: 0 0 8px;
          line-height: 1.3;
          letter-spacing: -0.2px;
        }
        .why-card p { color: #b8c0d6; font-size: 14px; line-height: 1.55; margin: 0; }
        @media (max-width: 1000px) {
          .why-head { grid-template-columns: 1fr; gap: 32px; }
          .why-grid { grid-template-columns: 1fr; }
        }
      `}</style>
      <section className="why" id="about" ref={sectionRef}>
        <div className="container why-inner">
          <div className="why-head" ref={headRef}>
            <div>
              <div className="eyebrow anim-head">Why Greenberg Safety</div>
              <h2 className="section-h anim-head" style={{ marginTop: 16 }}>
                Built for the field.<br />Trusted by leadership.
              </h2>
            </div>
            <p className="why-lede anim-head">
              A senior safety partner that talks plainly to executives, walks the deck with superintendents, and writes the corrective-action plan your project manager will actually use.
            </p>
          </div>
          <div className="why-grid" ref={gridRef}>
            {cards.map((c) => (
              <div key={c.num} className="why-card">
                <div className="why-num">{c.num}</div>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
