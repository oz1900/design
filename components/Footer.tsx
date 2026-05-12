"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(footRef.current!.querySelectorAll(".foot-col, .foot-brand"), {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: footRef.current, start: "top 90%" },
      });
    }, footRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        footer {
          background: #06091a;
          color: #8a93ad;
          padding: 64px 0 28px;
        }
        .foot-grid {
          display: grid;
          grid-template-columns: 2.2fr 1fr 1fr 1fr;
          gap: 40px;
          padding-bottom: 40px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .foot-logo { height: 28px; filter: invert(1); margin-bottom: 16px; }
        .foot-lede { font-size: 13px; line-height: 1.6; max-width: 320px; color: #8a93ad; }
        .foot-col-t {
          font-size: 11px; font-weight: 600; letter-spacing: 0.14em;
          text-transform: uppercase; color: #fff; margin: 0 0 14px;
        }
        .foot-col a {
          display: block; font-size: 13px; color: #8a93ad;
          padding: 5px 0; transition: color .15s ease;
        }
        .foot-col a:hover { color: #fff; }
        .foot-bottom {
          display: flex; justify-content: space-between; align-items: center;
          padding-top: 24px; font-size: 12px; color: #6c7388;
          flex-wrap: wrap; gap: 12px;
        }
        .foot-certs { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em; }
        @media (max-width: 1000px) { .foot-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 720px) { .foot-grid { grid-template-columns: 1fr; } }
      `}</style>
      <footer ref={footRef}>
        <div className="container">
          <div className="foot-grid">
            <div className="foot-brand">
              <Image
                src="/greenberg-logo.png"
                alt="Greenberg Safety"
                width={140}
                height={28}
                style={{ height: 28, width: "auto", filter: "invert(1)", marginBottom: 16 }}
                unoptimized
              />
              <p className="foot-lede">
                Practical safety consulting, compliance support, training, and project safety services. Austin, Texas — serving construction and industrial teams nationwide.
              </p>
            </div>
            <div className="foot-col">
              <div className="foot-col-t">Services</div>
              <a href="#services">Safety consulting</a>
              <a href="#services">Site inspections</a>
              <a href="#services">OSHA training</a>
              <a href="#services">Project staffing</a>
              <a href="#services">Compliance support</a>
            </div>
            <div className="foot-col">
              <div className="foot-col-t">Company</div>
              <a href="#about">About</a>
              <a href="#trusted">Partners</a>
              <a href="#schedule">Schedule a call</a>
            </div>
            <div className="foot-col">
              <div className="foot-col-t">Contact</div>
              <a href="tel:+15125857070">(512) 585-7070</a>
              <a href="mailto:Vitaliy@GreenbergSafety.com">Vitaliy@GreenbergSafety.com</a>
              <a>Austin, TX</a>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© 2026 Greenberg Safety. All rights reserved.</span>
            <span className="foot-certs">OSHA · SHEP · CHSO · SSH · HAZWOPER</span>
          </div>
        </div>
      </footer>
    </>
  );
}
