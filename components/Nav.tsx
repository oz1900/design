"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Slide nav down on first paint
    gsap.from(nav, {
      yPercent: -100,
      duration: 0.7,
      ease: "power3.out",
      delay: 0.1,
    });

    // Add hairline border on scroll
    const onScroll = () => {
      if (window.scrollY > 8) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        .gs-nav {
          position: sticky;
          top: 0;
          z-index: 60;
          background: rgba(255,255,255,0.94);
          backdrop-filter: saturate(180%) blur(12px);
          -webkit-backdrop-filter: saturate(180%) blur(12px);
          border-bottom: 1px solid transparent;
          transition: border-color .2s ease, box-shadow .2s ease;
        }
        .gs-nav.scrolled {
          border-bottom-color: var(--hairline);
          box-shadow: 0 1px 0 0 var(--hairline);
        }
        .gs-nav-inner {
          height: 78px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
        }
        .gs-nav-links {
          display: flex;
          gap: 32px;
          align-items: center;
        }
        .gs-nav-links a {
          font-size: 14px;
          font-weight: 500;
          color: var(--text);
          position: relative;
          padding: 4px 0;
          transition: color .15s ease;
        }
        .gs-nav-links a:hover { color: var(--ink); }
        .gs-nav-links a::after {
          content: '';
          position: absolute;
          left: 0; right: 0; bottom: -2px;
          height: 2px;
          background: var(--brand-blue);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform .22s ease;
        }
        .gs-nav-links a:hover::after { transform: scaleX(1); }
        .nav-cta-mobile { display: none; }
        @media (max-width: 720px) {
          .gs-nav-links { display: none; }
          .nav-cta-mobile { display: inline-flex; }
          .nav-cta-desktop { display: none; }
        }
      `}</style>
      <nav className="gs-nav" ref={navRef} id="nav">
        <div className="container gs-nav-inner">
          <a href="#home" aria-label="Greenberg Safety home">
            <Image
              src="/greenberg-logo.png"
              alt="Greenberg Safety"
              width={140}
              height={30}
              style={{ height: 30, width: "auto" }}
              priority
            />
          </a>
          <div className="gs-nav-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#trusted">Partners</a>
            <a href="#schedule">Schedule</a>
          </div>
          <a href="#schedule" className="btn btn-primary btn-sm nav-cta-desktop">
            Schedule a consultation
          </a>
          <a href="#schedule" className="btn btn-primary btn-sm nav-cta-mobile" aria-label="Schedule">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <path d="M16 2v4M8 2v4M3 10h18"/>
            </svg>
          </a>
        </div>
      </nav>
    </>
  );
}
