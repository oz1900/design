"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";


const team = [
  {
    name: "Vitaliy M. Greenberg",
    creds: "SHEP · CHSO · SSH",
    title: "Founder & Principal Safety Consultant",
    photo: "/vitaliy.webp",
    linkedin: "https://www.linkedin.com/in/vitaliygreenberg",
    bio: "Nationally recognized safety professional with over a decade of experience in high-risk construction and industrial environments. Authorized OSHA Outreach Trainer with credentials in Safety, Health, and Environmental Professional (SHEP). Notable achievements include 1.3 million man-hours without an OSHA recordable incident on a BP refinery project, and successful implementation of ISO 45001 and ISO 14001 safety management systems.",
    highlights: [
      "1.3M man-hours without OSHA recordable — BP refinery project",
      "ISO 45001 & ISO 14001 implementation",
      "Authorized OSHA Outreach Trainer",
      "Senior HSSE Manager, Samsung E&A America Construction",
    ],
  },
  {
    name: "Gary L. Douthitt",
    creds: "CSP",
    title: "Senior HSE Consultant",
    photo: "/gary.webp",
    linkedin: "https://www.linkedin.com/in/gary-douthitt-b3969314",
    bio: "More than three decades of safety leadership across public, private, and federal sectors. Certified Safety Professional and OSHA Construction Outreach Trainer. Former U.S. Air Force Wing Chief of Safety. Led HSE oversight for over 300 Department of Energy laboratory construction projects, achieving a Total Recordable Incident Rate (TRIR) of less than 0.08.",
    highlights: [
      "TRIR < 0.08 on active programs",
      "300+ DOE laboratory construction projects",
      "Former U.S. Air Force Wing Chief of Safety",
      "Certified Safety Professional (CSP)",
    ],
  },
];

export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);
        ctx = gsap.context(() => {
          gsap.from(headRef.current!.querySelectorAll(".anim-head"), {
            opacity: 0, y: 24, duration: 0.6, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: headRef.current, start: "top 82%" },
          });
          gsap.from(cardsRef.current!.querySelectorAll(".team-card"), {
            opacity: 0, y: 32, duration: 0.65, stagger: 0.12, ease: "power3.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 80%" },
          });
        }, sectionRef);
      }
    );
    return () => ctx?.revert();
  }, []);

  return (
    <>
      <style>{`
        .team-section {
          padding: 120px 0;
          background: var(--canvas-soft);
        }
        .team-head {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: end;
          margin-bottom: 64px;
        }
        .team-head .lede { margin: 0; }
        .team-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .team-card {
          background: #fff;
          border: 1px solid var(--hairline);
          padding: 40px;
        }
        .team-photo {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          object-fit: cover;
          object-position: center top;
          margin-bottom: 20px;
          display: block;
        }
        .team-name {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 700;
          color: var(--ink);
          letter-spacing: -0.3px;
          margin: 0 0 4px;
        }
        .team-creds {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--brand-blue);
          letter-spacing: 0.08em;
          margin-bottom: 6px;
        }
        .team-title {
          font-size: 13px;
          color: var(--muted);
          font-weight: 500;
          margin-bottom: 20px;
          letter-spacing: 0.01em;
        }
        .team-divider {
          height: 1px;
          background: var(--hairline);
          margin-bottom: 20px;
        }
        .team-bio {
          font-size: 15px;
          line-height: 1.7;
          color: var(--text);
          margin: 0 0 24px;
        }
        .team-highlights {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .team-highlights li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13px;
          color: var(--text);
          line-height: 1.4;
        }
        .team-highlights li::before {
          content: '';
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--brand-blue);
          flex-shrink: 0;
          margin-top: 5px;
        }
        .team-linkedin {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin-top: 24px;
          font-size: 13px;
          font-weight: 600;
          color: #0A66C2;
          text-decoration: none;
          transition: opacity .15s ease;
        }
        .team-linkedin:hover { opacity: 0.75; }
        .team-linkedin svg { flex-shrink: 0; }
        @media (max-width: 900px) {
          .team-head { grid-template-columns: 1fr; gap: 24px; }
          .team-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="team-section" id="team" ref={sectionRef}>
        <div className="container">
          <div className="team-head" ref={headRef}>
            <div>
              <div className="eyebrow anim-head" style={{ marginBottom: 22 }}>The team</div>
              <h2 className="section-h anim-head">Experienced in the field.<br />Certified at every level.</h2>
            </div>
            <p className="lede anim-head">
              Our consultants combine decades of hands-on field experience with top industry credentials — bringing practical safety leadership to construction and industrial projects nationwide.
            </p>
          </div>

          <div className="team-grid" ref={cardsRef}>
            {team.map((member) => (
              <div key={member.name} className="team-card">
                <Image
                  src={member.photo}
                  alt={member.name}
                  width={88}
                  height={88}
                  className="team-photo"
                  unoptimized
                />
                <div className="team-name">{member.name}</div>
                <div className="team-creds">{member.creds}</div>
                <div className="team-title">{member.title}</div>
                <div className="team-divider" />
                <p className="team-bio">{member.bio}</p>
                <ul className="team-highlights">
                  {member.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="team-linkedin">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                  View LinkedIn profile
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
