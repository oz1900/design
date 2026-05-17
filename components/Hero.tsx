"use client";

import { useRef, useEffect, useState } from "react";

interface StatProps {
  end: number;
  suffix: string;
  label: string;
}

function AnimatedStat({ end, suffix, label }: StatProps) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    let tween: { kill: () => void } | undefined;
    const obj = { val: 0 };
    import("gsap").then(({ default: gsap }) => {
      tween = gsap.to(obj, {
        val: end,
        duration: 2,
        ease: "power2.out",
        delay: 1.2,
        onUpdate: () => setDisplayed(Math.round(obj.val)),
      });
    });
    return () => { tween?.kill(); };
  }, [end]);

  return (
    <div className="hero-stat">
      <div className="hero-stat-num">{displayed.toLocaleString()}{suffix}</div>
      <div className="hero-stat-lab">{label}</div>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    import("gsap").then(({ default: gsap }) => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(eyebrowRef.current, { opacity: 0, y: 16, duration: 0.6 }, 0.3)
          .from(headingRef.current, { opacity: 0, y: 24, duration: 0.7 }, 0.5)
          .from(subRef.current,    { opacity: 0, y: 16, duration: 0.6 }, 0.75)
          .from(ctasRef.current,   { opacity: 0, y: 12, duration: 0.5 }, 0.9)
          .from(statsRef.current,  { opacity: 0, y: 10, duration: 0.5 }, 1.05);
      }, sectionRef);
    });
    return () => ctx?.revert();
  }, []);

  return (
    <>
      <style>{`
        .hero {
          position: relative;
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          overflow: hidden;
        }
        .hero-video {
          position: absolute;
          inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          z-index: 0;
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(
            to bottom,
            rgba(5,10,28,0.35) 0%,
            rgba(5,10,28,0.15) 40%,
            rgba(5,10,28,0.72) 75%,
            rgba(5,10,28,0.92) 100%
          );
        }
        .hero-content {
          position: relative;
          z-index: 2;
          padding: 0 0 72px;
        }
        .hero-eyebrow {
          margin-bottom: 24px;
          color: rgba(255,255,255,0.7);
        }
        .hero-eyebrow.eyebrow { color: rgba(255,255,255,0.7); }
        .hero-eyebrow.eyebrow::before { background: rgba(255,255,255,0.5); }
        .hero h1 {
          font-size: clamp(48px, 6vw, 88px);
          line-height: 1.0;
          letter-spacing: -3px;
          margin: 0 0 24px;
          text-wrap: balance;
          color: #fff;
          max-width: 18ch;
        }
        .hero h1 .accent { color: #6fa3ff; }
        .hero-sub {
          font-size: 18px;
          line-height: 1.55;
          color: rgba(255,255,255,0.75);
          max-width: 52ch;
          margin: 0 0 40px;
        }
        .hero-ctas {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 64px;
        }
        .hero .btn-secondary {
          border-color: rgba(255,255,255,0.5);
          color: #fff;
        }
        .hero .btn-secondary:hover {
          background: rgba(255,255,255,0.15);
          color: #fff;
        }
        .hero-stats {
          display: flex;
          gap: 48px;
          padding-top: 32px;
          border-top: 1px solid rgba(255,255,255,0.15);
          flex-wrap: wrap;
        }
        .hero-stat-num {
          font-family: var(--font-display);
          font-size: 34px;
          font-weight: 600;
          color: #fff;
          letter-spacing: -1px;
          line-height: 1;
          min-width: 5ch;
        }
        .hero-stat-lab {
          font-size: 12px;
          color: rgba(255,255,255,0.55);
          margin-top: 6px;
          line-height: 1.35;
          max-width: 16ch;
        }
        .hero-badge {
          position: absolute;
          bottom: 32px; right: 32px;
          z-index: 3;
          background: rgba(10,16,36,0.7);
          backdrop-filter: blur(10px);
          color: #fff;
          padding: 12px 16px;
          font-size: 12px;
          line-height: 1.4;
          display: flex;
          gap: 12px;
          align-items: center;
          border-left: 3px solid var(--brand-blue);
        }
        .hero-badge b { font-weight: 600; color: #fff; font-size: 13px; display: block; }
        .hero-badge span { color: #b8c0d6; }

        @media (max-width: 900px) {
          .hero h1 { font-size: clamp(36px, 8vw, 60px); letter-spacing: -1.5px; }
          .hero-sub { font-size: 16px; max-width: 44ch; }
          .hero-stats { gap: 24px; }
          .hero-badge { display: none; }
        }
        @media (max-width: 600px) {
          .hero { min-height: 100svh; }
          .hero-content { padding: 0 0 40px; }
          .hero h1 { font-size: clamp(32px, 9vw, 48px); letter-spacing: -1px; margin-bottom: 16px; }
          .hero-sub { font-size: 15px; margin-bottom: 28px; }
          .hero-ctas { margin-bottom: 40px; gap: 10px; }
          .hero-ctas .btn { padding: 13px 18px; font-size: 14px; }
          .hero-stats {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px 16px;
            padding-top: 24px;
          }
          .hero-stat-num { font-size: 26px; }
          .hero-stat-lab { font-size: 11px; }
          .hero-overlay {
            background: linear-gradient(
              to bottom,
              rgba(5,10,28,0.5) 0%,
              rgba(5,10,28,0.2) 35%,
              rgba(5,10,28,0.75) 65%,
              rgba(5,10,28,0.95) 100%
            );
          }
        }
      `}</style>

      <section className="hero" id="home" ref={sectionRef}>
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero.jpg"
          style={{ objectPosition: "center 30%" }}
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        <div className="hero-overlay" ref={overlayRef} />

        <div className="hero-badge">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <path d="m9 12 2 2 4-4"/>
          </svg>
          <div>
            <b>Field-led</b>
            <span>SHEP · CHSO · SSH certified</span>
          </div>
        </div>

        <div className="hero-content">
          <div className="container">
            <div className="eyebrow hero-eyebrow" ref={eyebrowRef}>
              Construction &amp; industrial safety consulting
            </div>
            <h1 ref={headingRef}>
              Safer projects.<br />
              <span className="accent">Stronger performance.</span>
            </h1>
            <p className="hero-sub" ref={subRef}>
              Practical safety consulting, compliance support, training, and project safety services for high-performing construction and industrial teams.
            </p>
            <div className="hero-ctas" ref={ctasRef}>
              <a href="#schedule" className="btn btn-primary">
                Schedule a consultation
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 5l7 7-7 7"/>
                </svg>
              </a>
              <a href="#services" className="btn btn-secondary">Our services</a>
            </div>
            <div className="hero-stats" ref={statsRef}>
              <AnimatedStat end={10} suffix="+" label="Years on active jobsites" />
              <AnimatedStat end={1300000} suffix="" label="Man-hours, zero OSHA recordables" />
              <AnimatedStat end={5000} suffix="+" label="Workers supervised without lost-time injury" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
