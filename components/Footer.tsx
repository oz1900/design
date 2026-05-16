"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";


export default function Footer() {
  const footRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);
        ctx = gsap.context(() => {
          gsap.from(footRef.current!.querySelectorAll(".foot-col, .foot-brand"), {
            opacity: 0, y: 20, duration: 0.6, stagger: 0.1, ease: "power2.out",
            scrollTrigger: { trigger: footRef.current, start: "top 90%" },
          });
        }, footRef);
      }
    );
    return () => ctx?.revert();
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
          padding-top: 24px; font-size: 12px; color: #9ca3af;
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
              <Link href="/" aria-label="Greenberg Safety home" style={{ display: 'inline-block' }}>
                <Image
                  src="/greenberg-logo-white.webp"
                  alt="Greenberg Safety"
                  width={160}
                  height={36}
                  style={{ height: 36, width: "auto", marginBottom: 16 }}
                  unoptimized
                />
              </Link>
              <p className="foot-lede">
                Practical safety consulting, compliance support, training, and project safety services. Austin, Texas — serving construction and industrial teams nationwide.
              </p>
            </div>
            <div className="foot-col">
              <div className="foot-col-t">Services</div>
              <Link href="/#services">Safety consulting</Link>
              <Link href="/#services">Site inspections</Link>
              <Link href="/#services">OSHA training</Link>
              <Link href="/#services">Project staffing</Link>
              <Link href="/#services">Compliance support</Link>
            </div>
            <div className="foot-col">
              <div className="foot-col-t">Company</div>
              <Link href="/#team">Team</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/#trusted">Partners</Link>
              <Link href="/#schedule">Schedule a call</Link>
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
