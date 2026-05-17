"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    import("gsap").then(({ default: gsap }) => {
      gsap.from(nav, { yPercent: -100, duration: 0.7, ease: "power3.out", delay: 0.1 });
    });

    const onScroll = () => {
      if (window.scrollY > 8) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <style>{`
        .gs-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 60;
          background: transparent;
          border-bottom: 1px solid transparent;
          transition: background .3s ease, border-color .3s ease, box-shadow .3s ease;
        }
        .gs-nav.scrolled {
          background: rgba(255,255,255,0.96);
          backdrop-filter: saturate(180%) blur(12px);
          -webkit-backdrop-filter: saturate(180%) blur(12px);
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
          color: rgba(255,255,255,0.85);
          position: relative;
          padding: 4px 0;
          transition: color .15s ease;
        }
        .gs-nav-links a:hover { color: #fff; }
        .gs-nav.scrolled .gs-nav-links a { color: var(--text); }
        .gs-nav.scrolled .gs-nav-links a:hover { color: var(--ink); }
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
        .gs-nav:not(.scrolled) .nav-logo { filter: brightness(0) invert(1); }
        .gs-nav:not(.scrolled) .btn-primary {
          background: rgba(255,255,255,0.15);
          border: 1.5px solid rgba(255,255,255,0.5);
          color: #fff;
        }
        .gs-nav:not(.scrolled) .btn-primary:hover {
          background: rgba(255,255,255,0.28);
        }

        /* Hamburger button */
        .nav-hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 40px;
          height: 40px;
          padding: 8px;
          cursor: pointer;
          background: none;
          border: none;
          flex-shrink: 0;
        }
        .nav-hamburger span {
          display: block;
          height: 2px;
          background: #fff;
          border-radius: 2px;
          transition: transform .28s ease, opacity .28s ease, width .28s ease;
          transform-origin: center;
        }
        .gs-nav.scrolled .nav-hamburger span { background: var(--ink); }
        .nav-hamburger.is-open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .nav-hamburger.is-open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .nav-hamburger.is-open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* Mobile drawer */
        .nav-drawer {
          position: fixed;
          inset: 0;
          z-index: 59;
          pointer-events: none;
        }
        .nav-drawer-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(5,10,28,0.6);
          opacity: 0;
          transition: opacity .3s ease;
        }
        .nav-drawer.is-open .nav-drawer-backdrop {
          opacity: 1;
          pointer-events: all;
        }
        .nav-drawer-panel {
          position: absolute;
          top: 0; right: 0; bottom: 0;
          width: min(320px, 85vw);
          background: #fff;
          transform: translateX(100%);
          transition: transform .32s cubic-bezier(0.4,0,0.2,1);
          display: flex;
          flex-direction: column;
          pointer-events: all;
          overflow-y: auto;
        }
        .nav-drawer.is-open .nav-drawer-panel {
          transform: translateX(0);
        }
        .nav-drawer-header {
          height: 78px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          border-bottom: 1px solid var(--hairline);
          flex-shrink: 0;
        }
        .nav-drawer-close {
          width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          color: var(--ink);
          border-radius: 4px;
          transition: background .15s ease;
        }
        .nav-drawer-close:hover { background: var(--canvas-soft); }
        .nav-drawer-links {
          display: flex;
          flex-direction: column;
          padding: 16px 0;
          flex: 1;
        }
        .nav-drawer-links a {
          font-size: 17px;
          font-weight: 500;
          color: var(--ink);
          padding: 16px 24px;
          border-bottom: 1px solid var(--hairline);
          transition: background .15s ease, color .15s ease;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-drawer-links a:hover { background: var(--canvas-soft); color: var(--brand-blue); }
        .nav-drawer-links a svg { opacity: 0.3; }
        .nav-drawer-footer {
          padding: 24px;
          border-top: 1px solid var(--hairline);
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex-shrink: 0;
        }
        .nav-drawer-footer .btn { justify-content: center; width: 100%; }

        .nav-cta-desktop { display: inline-flex; }

        @media (max-width: 720px) {
          .gs-nav-links { display: none; }
          .nav-hamburger { display: flex; }
          .nav-cta-desktop { display: none; }
        }
      `}</style>

      <nav className="gs-nav" ref={navRef} id="nav">
        <div className="container gs-nav-inner">
          <Link href="/" aria-label="Greenberg Safety home" onClick={close}>
            <Image
              src="/greenberg-logo.png"
              alt="Greenberg Safety"
              width={160}
              height={36}
              className="nav-logo"
              style={{ height: 36, width: "auto", transition: "filter .3s ease" }}
              sizes="160px"
              priority
            />
          </Link>

          <div className="gs-nav-links">
            <Link href="/#services">Services</Link>
            <Link href="/#team">Team</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/#trusted">Partners</Link>
          </div>

          <Link href="/#schedule" className="btn btn-primary btn-sm nav-cta-desktop">
            Schedule a consultation
          </Link>

          <button
            className={`nav-hamburger${open ? " is-open" : ""}`}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`nav-drawer${open ? " is-open" : ""}`} aria-hidden={!open}>
        <div className="nav-drawer-backdrop" onClick={close} />
        <div className="nav-drawer-panel" role="dialog" aria-modal="true">
          <div className="nav-drawer-header">
            <Image
              src="/greenberg-logo.png"
              alt="Greenberg Safety"
              width={140}
              height={32}
              style={{ height: 32, width: "auto" }}
              unoptimized
            />
            <button className="nav-drawer-close" onClick={close} aria-label="Close menu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <nav className="nav-drawer-links">
            <Link href="/#services" onClick={close}>
              Services
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </Link>
            <Link href="/#team" onClick={close}>
              Team
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </Link>
            <Link href="/blog" onClick={close}>
              Blog
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </Link>
            <Link href="/#trusted" onClick={close}>
              Partners
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </Link>
          </nav>

          <div className="nav-drawer-footer">
            <Link href="/#schedule" className="btn btn-primary" onClick={close}>
              Schedule a consultation
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </Link>
            <a href="tel:+15125857070" className="btn btn-secondary" onClick={close}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.41 2 2 0 0 1 3.57 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.95-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z"/>
              </svg>
              (512) 585-7070
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
