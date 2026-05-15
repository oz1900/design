"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
export default function Nav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    import("gsap").then(({ default: gsap }) => {
      gsap.from(nav, { yPercent: -100, duration: 0.7, ease: "power3.out", delay: 0.1 });
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
          <Link href="/" aria-label="Greenberg Safety home">
            <Image
              src="/greenberg-logo.png"
              alt="Greenberg Safety"
              width={160}
              height={36}
              style={{ height: 36, width: "auto" }}
              sizes="160px"
              priority
            />
          </Link>
          <div className="gs-nav-links">
            <Link href="/#services">Services</Link>
            <Link href="/#about">Team</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/#trusted">Partners</Link>
          </div>
          <Link href="/#schedule" className="btn btn-primary btn-sm nav-cta-desktop">
            Schedule a consultation
          </Link>
          <Link href="/#schedule" className="btn btn-primary btn-sm nav-cta-mobile" aria-label="Schedule">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <path d="M16 2v4M8 2v4M3 10h18"/>
            </svg>
          </Link>
        </div>
      </nav>
    </>
  );
}
