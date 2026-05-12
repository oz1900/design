"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        opacity: 0,
        x: -36,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
      gsap.from(rightRef.current, {
        opacity: 0,
        x: 36,
        scale: 0.97,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        delay: 0.1,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .final-cta {
          padding: 100px 0;
          background: var(--ink);
          color: #fff;
          position: relative;
          overflow: hidden;
        }
        .final-cta::before {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 480px; height: 480px;
          background: radial-gradient(circle, rgba(15,75,243,0.22) 0%, transparent 60%);
          transform: translate(40%,-40%);
          pointer-events: none;
        }
        .final-cta-inner {
          position: relative; z-index: 1;
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .final-cta h2 {
          color: #fff;
          font-size: clamp(36px, 4.4vw, 60px);
          line-height: 1.02;
          letter-spacing: -2px;
          margin: 0 0 24px;
          text-wrap: balance;
        }
        .final-cta p {
          color: #b8c0d6;
          font-size: 18px;
          line-height: 1.5;
          margin: 0 0 36px;
          max-width: 52ch;
        }
        .final-cta .eyebrow { color: #6da3ff; }
        .final-cta .eyebrow::before { background: #6da3ff; }
        .final-cta-btn {
          background: var(--brand-blue);
          color: #fff;
          padding: 18px 26px;
          font-size: 16px;
          transition: background .18s ease, color .18s ease;
        }
        .final-cta-btn:hover { background: #fff; color: var(--brand-blue); }
        .contact-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 6px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .contact-row { display: flex; gap: 14px; align-items: flex-start; }
        .contact-row svg { width: 18px; height: 18px; color: #6da3ff; flex-shrink: 0; margin-top: 2px; }
        .contact-lab { font-size: 11px; color: #8a93ad; text-transform: uppercase; letter-spacing: 0.14em; margin-bottom: 4px; }
        .contact-val { color: #fff; font-size: 15px; font-weight: 500; line-height: 1.3; }
        .contact-val a:hover { color: #6da3ff; }
        @media (max-width: 1000px) { .final-cta-inner { grid-template-columns: 1fr; gap: 48px; } }
      `}</style>
      <section className="final-cta" ref={sectionRef}>
        <div className="container">
          <div className="final-cta-inner">
            <div ref={leftRef}>
              <div className="eyebrow" style={{ marginBottom: 20 }}>Let's talk</div>
              <h2>Let's build a<br />safer jobsite.</h2>
              <p>Get practical safety support for your next project, inspection, training need, or staffing gap.</p>
              <a href="#schedule" className="btn final-cta-btn">
                Schedule a consultation
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 5l7 7-7 7"/>
                </svg>
              </a>
            </div>

            <div className="contact-card" ref={rightRef}>
              <div className="contact-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <div>
                  <div className="contact-lab">Phone</div>
                  <div className="contact-val"><a href="tel:+15125857070">(512) 585-7070</a></div>
                </div>
              </div>
              <div className="contact-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <div>
                  <div className="contact-lab">Email</div>
                  <div className="contact-val"><a href="mailto:Vitaliy@GreenbergSafety.com">Vitaliy@GreenbergSafety.com</a></div>
                </div>
              </div>
              <div className="contact-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                <div>
                  <div className="contact-lab">Website</div>
                  <div className="contact-val">GreenbergSafety.com</div>
                </div>
              </div>
              <div className="contact-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <div>
                  <div className="contact-lab">Location</div>
                  <div className="contact-val">Austin, Texas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
