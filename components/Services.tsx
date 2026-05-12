"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: "01",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="m9 12 2 2 4-4"/>
      </svg>
    ),
    title: "Safety consulting",
    body: "Practical safety solutions for active jobsites and growing teams.",
  },
  {
    num: "02",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
    title: "Site safety inspections",
    body: "Identify risks, document findings, and keep work moving safely.",
  },
  {
    num: "03",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
    title: "OSHA & risk management training",
    body: "Training that builds safer teams and stronger compliance.",
  },
  {
    num: "04",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Project safety staffing",
    body: "Reliable safety professionals when your project needs support.",
  },
  {
    num: "05",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
      </svg>
    ),
    title: "Compliance support",
    body: "Clear guidance for OSHA, site requirements, and project expectations.",
  },
  {
    num: "06",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
    title: "Subcontractor safety support",
    body: "Field-focused oversight to improve contractor performance.",
  },
  {
    num: "07",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4"/>
      </svg>
    ),
    title: "Hands-on project safety management",
    body: "On-site leadership for complex construction and industrial work.",
  },
  {
    num: "08",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    title: "Accident prevention & crisis support",
    body: "Practical support before, during, and after critical events.",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from(headRef.current!.querySelectorAll(".anim-head"), {
        opacity: 0,
        y: 28,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headRef.current,
          start: "top 80%",
        },
      });

      // Cards stagger
      gsap.from(gridRef.current!.querySelectorAll(".svc"), {
        opacity: 0,
        y: 32,
        duration: 0.65,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .services { padding: 120px 0; }
        .services-head {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          margin-bottom: 64px;
          align-items: end;
        }
        .services-head .lede { margin: 0; }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 0;
          border-top: 1px solid var(--hairline);
          border-left: 1px solid var(--hairline);
        }
        .svc {
          padding: 36px 32px 40px;
          border-right: 1px solid var(--hairline);
          border-bottom: 1px solid var(--hairline);
          background: #fff;
          position: relative;
          transition: background-color .25s ease;
          cursor: default;
        }
        .svc::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          height: 3px; width: 0;
          background: var(--brand-blue);
          transition: width .35s cubic-bezier(0.4,0,0.2,1);
        }
        .svc:hover { background: var(--brand-blue-tint); }
        .svc:hover::before { width: 100%; }
        .svc-icon {
          width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          color: var(--brand-blue);
          margin-bottom: 24px;
        }
        .svc-icon svg { width: 28px; height: 28px; }
        .svc-title {
          font-family: var(--font-sans);
          font-size: 17px;
          font-weight: 600;
          color: var(--ink);
          margin: 0 0 8px;
          line-height: 1.3;
          letter-spacing: -0.2px;
        }
        .svc-body {
          font-size: 14px;
          line-height: 1.5;
          color: var(--text);
          margin: 0;
        }
        .svc-num {
          position: absolute;
          top: 18px; right: 18px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--muted);
          letter-spacing: 0.04em;
        }
        @media (max-width: 1000px) {
          .services-head { grid-template-columns: 1fr; gap: 24px; }
          .services-grid { grid-template-columns: repeat(2,1fr); }
        }
        @media (max-width: 720px) {
          .services-grid { grid-template-columns: 1fr; }
        }
      `}</style>
      <section className="services" id="services" ref={sectionRef}>
        <div className="container">
          <div className="services-head" ref={headRef}>
            <div>
              <div className="eyebrow anim-head" style={{ marginBottom: 22 }}>What we do</div>
              <h2 className="section-h anim-head">Safety support that<br />keeps work moving.</h2>
            </div>
            <p className="lede anim-head">
              Eight focused services covering the full project lifecycle — from program design and OSHA compliance to embedded field staffing and crisis response.
            </p>
          </div>
          <div className="services-grid" ref={gridRef}>
            {services.map((s) => (
              <div key={s.num} className="svc">
                <div className="svc-num">{s.num}</div>
                <div className="svc-icon">{s.icon}</div>
                <h3 className="svc-title">{s.title}</h3>
                <p className="svc-body">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
