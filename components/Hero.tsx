"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

interface StatProps {
  end: number;
  suffix: string;
  label: string;
}

function AnimatedStat({ end, suffix, label }: StatProps) {
  const numRef = useRef<HTMLDivElement>(null);
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;
    let tween: { kill: () => void } | undefined;
    const obj = { val: 0 };
    import("gsap").then(({ default: gsap }) => {
      tween = gsap.to(obj, {
        val: end,
        duration: 2,
        ease: "power2.out",
        delay: 0.8,
        onUpdate: () => setDisplayed(Math.round(obj.val)),
      });
    });
    return () => { tween?.kill(); };
  }, [end]);

  return (
    <div>
      <div className="hero-stat-num" ref={numRef}>
        {displayed.toLocaleString()}{suffix}
      </div>
      <div className="hero-stat-lab">{label}</div>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    import("gsap").then(({ default: gsap }) => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(eyebrowRef.current, { opacity: 0, x: -24, duration: 0.5 }, 0.1)
          .from(ctasRef.current, { opacity: 0, y: 14, duration: 0.4 }, 0.2)
          .from(statsRef.current, { opacity: 0, y: 12, duration: 0.4 }, 0.3);

        // Slide only — no opacity hide so the image counts as LCP immediately
        gsap.from(mediaRef.current, { x: 32, duration: 0.8, ease: "power3.out", delay: 0.15 });
        gsap.from(tagRef.current, { opacity: 0, y: 20, duration: 0.6, ease: "power2.out", delay: 1.2 });
      }, sectionRef);
    });
    return () => ctx?.revert();
  }, []);

  return (
    <>
      <style>{`
        .hero {
          padding: 56px 0 88px;
          position: relative;
          overflow: hidden;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: minmax(0,1.05fr) minmax(0,1fr);
          gap: 64px;
          align-items: center;
        }
        .hero-text { position: relative; z-index: 2; }
        .hero-eyebrow { margin-bottom: 28px; }
        .hero h1 {
          font-size: clamp(44px, 5.4vw, 76px);
          line-height: 1.02;
          letter-spacing: -2.5px;
          margin: 0 0 22px;
          text-wrap: balance;
        }
        .hero h1 .accent { color: var(--brand-blue); }
        .hero-sub {
          font-size: 19px;
          line-height: 1.5;
          color: var(--text);
          max-width: 52ch;
          margin: 0 0 36px;
        }
        .hero-ctas {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 48px;
        }
        .hero-stats {
          display: grid;
          grid-template-columns: repeat(3, auto);
          gap: 36px;
          padding-top: 32px;
          border-top: 1px solid var(--hairline);
          max-width: 560px;
        }
        .hero-stat-num {
          font-family: var(--font-display);
          font-size: 32px;
          font-weight: 600;
          color: var(--ink);
          letter-spacing: -1px;
          line-height: 1;
          min-width: 5ch;
        }
        .hero-stat-lab {
          font-size: 12px;
          color: var(--muted);
          margin-top: 6px;
          line-height: 1.35;
          max-width: 16ch;
        }
        .hero-media {
          position: relative;
          aspect-ratio: 4/5;
          max-height: 640px;
        }
        .hero-media img {
          width: 100%; height: 100%;
          object-fit: cover;
          border-radius: 2px;
          filter: saturate(0.92) contrast(1.02);
        }
        .hero-deco-top {
          position: absolute;
          top: -16px; right: -16px;
          width: 60%; height: 60%;
          background: var(--brand-blue-soft);
          z-index: -1;
          pointer-events: none;
        }
        .hero-deco-bottom {
          position: absolute;
          bottom: -16px; left: -16px;
          width: 40%; height: 30%;
          background: var(--brand-blue);
          z-index: -1;
          pointer-events: none;
        }
        .hero-tag {
          position: absolute;
          bottom: 28px; left: 28px;
          background: rgba(10,16,36,0.86);
          backdrop-filter: blur(8px);
          color: #fff;
          padding: 14px 18px;
          font-size: 13px;
          line-height: 1.4;
          display: flex;
          gap: 14px;
          align-items: center;
          border-left: 3px solid var(--brand-blue);
        }
        .hero-tag b { font-weight: 600; color: #fff; font-size: 14px; display: block; }
        .hero-tag span { color: #b8c0d6; }
        @media (max-width: 1000px) {
          .hero-grid { grid-template-columns: 1fr; gap: 40px; }
          .hero-media { aspect-ratio: 16/10; max-height: none; }
        }
        @media (max-width: 720px) {
          .hero-stats { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
      <section className="hero" id="home" ref={sectionRef}>
        <div className="container">
          <div className="hero-grid">
            <div className="hero-text">
              <div className="eyebrow hero-eyebrow" ref={eyebrowRef}>
                Construction &amp; industrial safety consulting
              </div>
              <h1>
                Safer projects.<br />
                <span className="accent">Stronger performance.</span>
              </h1>
              <p className="hero-sub">
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

            <div className="hero-media" ref={mediaRef}>
              <div className="hero-deco-top" />
              <div className="hero-deco-bottom" />
              <Image
                src="/hero.jpg"
                alt="Active construction site with steel framework and workers in PPE"
                width={600}
                height={750}
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 2, filter: "saturate(0.92) contrast(1.02)" }}
                priority
                sizes="(max-width: 1000px) 100vw, 50vw"
              />
              <div className="hero-tag" ref={tagRef}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
                <div>
                  <b>Field-led</b>
                  <span>SHEP · CHSO · SSH certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
