"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DOW = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
const AVAILABLE = new Set([5,6,7,8,11,12,13,14,18,19,20,21,26,27,28]);
const TODAY = 11;
const SLOTS = ["8:00 AM","9:30 AM","11:00 AM","1:00 PM","2:30 PM","4:00 PM"];

type Status = "idle" | "loading" | "success" | "error";

export default function Schedule() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [month, setMonth] = useState(4);
  const [year, setYear] = useState(2026);
  const [selected, setSelected] = useState(14);
  const [selectedSlot, setSelectedSlot] = useState("11:00 AM");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 52,
        scale: 0.98,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: cardRef.current, start: "top 82%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const prevMonth = useCallback(() => {
    setMonth((m) => { if (m === 0) { setYear((y) => y - 1); return 11; } return m - 1; });
    setSelected(0);
  }, []);

  const nextMonth = useCallback(() => {
    setMonth((m) => { if (m === 11) { setYear((y) => y + 1); return 0; } return m + 1; });
    setSelected(0);
  }, []);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const isMayDemo = month === 4 && year === 2026;

  const dayClass = (d: number) => {
    const classes = ["cal-day"];
    if (isMayDemo) {
      if (d < TODAY) classes.push("dim");
      if (AVAILABLE.has(d)) classes.push("avail");
      if (d === TODAY) classes.push("today");
    } else {
      const dow = new Date(year, month, d).getDay();
      if (dow !== 0 && dow !== 6) classes.push("avail");
    }
    if (d === selected) classes.push("cal-selected");
    return classes.join(" ");
  };

  const selectedDow = selected
    ? DOW[new Date(year, month, selected).getDay()]
    : null;
  const slotsLabel = selected
    ? `Available times · ${selectedDow![0] + selectedDow!.slice(1).toLowerCase()}, ${MONTH_NAMES[month]} ${selected}`
    : "Available times — select a date above";

  const dateString = selected
    ? `${selectedDow![0] + selectedDow!.slice(1).toLowerCase()}, ${MONTH_NAMES[month]} ${selected}`
    : "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selected) { setErrorMsg("Please select a date."); return; }
    if (!name.trim() || !email.trim()) { setErrorMsg("Name and email are required."); return; }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          date: dateString,
          time: selectedSlot,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <>
      <style>{`
        .schedule { padding: 120px 0; background: var(--canvas); }
        .schedule-head { text-align: center; margin: 0 auto 56px; max-width: 640px; }
        .schedule-head .eyebrow { display: inline-flex; }
        .schedule-head .lede { margin: 16px auto 0; text-align: center; color: var(--muted); max-width: 56ch; }
        .schedule-card {
          background: #fff;
          border: 1px solid var(--hairline);
          border-radius: 6px;
          box-shadow: 0 24px 48px -16px rgba(10,16,36,0.08), 0 2px 4px rgba(10,16,36,0.04);
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          overflow: hidden;
          max-width: 1080px;
          margin: 0 auto;
        }
        .sched-left {
          padding: 40px;
          border-right: 1px solid var(--hairline);
          background: var(--canvas-soft);
        }
        .sched-host {
          display: flex; gap: 14px; align-items: center;
          padding-bottom: 20px; margin-bottom: 20px;
          border-bottom: 1px solid var(--hairline);
        }
        .sched-host-av {
          width: 48px; height: 48px; border-radius: 50%;
          background: var(--brand-blue); color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-weight: 600; font-family: var(--font-display); font-size: 18px;
          flex-shrink: 0;
        }
        .sched-host-name { font-weight: 600; color: var(--ink); font-size: 14px; }
        .sched-host-role { font-size: 12px; color: var(--muted); margin-top: 2px; }
        .sched-meta { display: flex; flex-direction: column; gap: 14px; }
        .sched-meta-row { display: flex; gap: 12px; align-items: center; font-size: 14px; color: var(--text); }
        .sched-meta-row svg { width: 18px; height: 18px; color: var(--muted); flex-shrink: 0; }
        .sched-meta-title {
          font-family: var(--font-display);
          font-size: 22px; color: var(--ink);
          font-weight: 600; letter-spacing: -0.5px; margin: 0 0 18px;
        }
        .sched-meta-desc { font-size: 13px; color: var(--muted); margin-top: 18px; line-height: 1.55; }

        /* Contact fields */
        .sched-fields { display: flex; flex-direction: column; gap: 12px; margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--hairline); }
        .sched-fields label { font-size: 11px; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 5px; }
        .sched-fields input {
          width: 100%; padding: 10px 12px;
          border: 1px solid var(--hairline); border-radius: 4px;
          font-family: var(--font-sans); font-size: 14px; color: var(--ink);
          background: #fff; outline: none;
          transition: border-color .15s ease;
        }
        .sched-fields input:focus { border-color: var(--brand-blue); box-shadow: 0 0 0 3px rgba(15,75,243,0.08); }
        .sched-fields input::placeholder { color: #b0b8c4; }

        /* Calendar */
        .sched-right { padding: 40px; display: flex; flex-direction: column; }
        .cal-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
        .cal-month { font-weight: 600; color: var(--ink); font-size: 15px; }
        .cal-nav { display: flex; gap: 4px; }
        .cal-nav button {
          width: 30px; height: 30px; border-radius: 4px;
          border: 1px solid var(--hairline); background: #fff; color: var(--text);
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: background .15s, color .15s;
        }
        .cal-nav button:hover { background: var(--brand-blue-soft); color: var(--brand-blue); border-color: var(--brand-blue-soft); }
        .cal-grid { display: grid; grid-template-columns: repeat(7,1fr); gap: 4px; }
        .cal-dow { font-size: 11px; color: var(--muted); text-align: center; padding: 8px 0; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; }
        .cal-day {
          aspect-ratio: 1; border: none; background: transparent;
          border-radius: 4px; font-family: var(--font-sans);
          font-size: 13px; font-weight: 500; color: var(--ink);
          cursor: default; transition: background .12s, color .12s;
          display: flex; align-items: center; justify-content: center;
        }
        .cal-day.dim { color: #d4d8e0; }
        .cal-day.avail { background: var(--brand-blue-soft); color: var(--brand-blue-deep); font-weight: 600; cursor: pointer; }
        .cal-day.avail:hover { background: var(--brand-blue); color: #fff; }
        .cal-day.today { box-shadow: inset 0 0 0 1.5px var(--brand-blue); color: var(--brand-blue); }
        .cal-day.cal-selected { background: var(--brand-blue) !important; color: #fff !important; }
        .slots { margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--hairline); }
        .slots-label { font-size: 12px; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px; }
        .slot-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; }
        .slot-btn {
          padding: 11px 10px; border: 1px solid var(--hairline);
          border-radius: 4px; background: #fff;
          font-size: 13px; font-weight: 600; color: var(--ink);
          cursor: pointer; transition: all .15s; font-family: inherit;
        }
        .slot-btn:hover { border-color: var(--brand-blue); color: var(--brand-blue); }
        .slot-btn.slot-selected { background: var(--brand-blue); color: #fff; border-color: var(--brand-blue); }
        .sched-confirm {
          margin-top: auto; padding-top: 24px;
          display: flex; flex-direction: column; gap: 12px;
        }
        .sched-confirm-row { display: flex; justify-content: space-between; align-items: center; }
        .sched-confirm-info { font-size: 13px; color: var(--muted); }
        .sched-confirm-info b { color: var(--ink); font-weight: 600; display: block; }
        .sched-submit {
          width: 100%; padding: 14px;
          background: var(--brand-blue); color: #fff;
          border: none; border-radius: 4px;
          font-family: var(--font-sans); font-size: 15px; font-weight: 600;
          cursor: pointer; transition: background .18s ease;
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }
        .sched-submit:hover:not(:disabled) { background: var(--brand-blue-deep); }
        .sched-submit:disabled { opacity: 0.65; cursor: not-allowed; }
        .sched-error { font-size: 13px; color: #dc2626; padding: 10px 12px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 4px; }

        /* Success state */
        .sched-success {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center; padding: 48px 32px; gap: 16px;
        }
        .sched-success-icon {
          width: 56px; height: 56px; border-radius: 50%;
          background: #d1fae5; display: flex; align-items: center; justify-content: center;
        }
        .sched-success-icon svg { color: #047857; }
        .sched-success h3 { font-size: 20px; font-weight: 600; color: var(--ink); margin: 0; }
        .sched-success p { font-size: 14px; color: var(--muted); margin: 0; max-width: 36ch; line-height: 1.6; }

        @media (max-width: 1000px) {
          .schedule-card { grid-template-columns: 1fr; }
          .sched-left { border-right: none; border-bottom: 1px solid var(--hairline); }
        }
        @media (max-width: 720px) { .slot-grid { grid-template-columns: repeat(2,1fr); } }
      `}</style>

      <section className="schedule" id="schedule" ref={sectionRef}>
        <div className="container">
          <div className="schedule-head">
            <div className="eyebrow">Book a time</div>
            <h2 className="section-h" style={{ marginTop: 16 }}>Schedule a consultation.</h2>
            <p className="lede">
              Choose a time that works for you. We'll meet to discuss your project, safety needs, inspection request, training requirement, or staffing support.
            </p>
          </div>

          <div className="schedule-card" ref={cardRef}>
            {/* Left panel — host info + contact fields */}
            <form onSubmit={handleSubmit} style={{ display: "contents" }}>
              <div className="sched-left">
                <div className="sched-host">
                  <div className="sched-host-av">VG</div>
                  <div>
                    <div className="sched-host-name">Vitaliy Greenberg</div>
                    <div className="sched-host-role">Founder · SHEP, CHSO, SSH</div>
                  </div>
                </div>
                <h3 className="sched-meta-title">Project consultation</h3>
                <div className="sched-meta">
                  <div className="sched-meta-row">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    30 minutes
                  </div>
                  <div className="sched-meta-row">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    Phone, video, or in-person
                  </div>
                  <div className="sched-meta-row">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    Austin, Texas · serving nationwide
                  </div>
                  <div className="sched-meta-row">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    No-cost initial scoping call
                  </div>
                </div>

                {/* Contact fields */}
                <div className="sched-fields">
                  <div>
                    <label htmlFor="sched-name">Your name *</label>
                    <input
                      id="sched-name"
                      type="text"
                      placeholder="Jane Smith"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="sched-email">Email address *</label>
                    <input
                      id="sched-email"
                      type="email"
                      placeholder="jane@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="sched-phone">Phone number</label>
                    <input
                      id="sched-phone"
                      type="tel"
                      placeholder="(512) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Right — calendar + submit */}
              <div className="sched-right">
                {status === "success" ? (
                  <div className="sched-success">
                    <div className="sched-success-icon">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <h3>Request received.</h3>
                    <p>Vitaliy will follow up to confirm your {dateString} at {selectedSlot} CDT slot. Check your inbox for a confirmation.</p>
                  </div>
                ) : (
                  <>
                    <div className="cal-head">
                      <div className="cal-month">{MONTH_NAMES[month]} {year}</div>
                      <div className="cal-nav">
                        <button type="button" onClick={prevMonth} aria-label="Previous month">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
                        </button>
                        <button type="button" onClick={nextMonth} aria-label="Next month">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 6l6 6-6 6"/></svg>
                        </button>
                      </div>
                    </div>

                    <div className="cal-grid">
                      {DOW.map((d) => <div key={d} className="cal-dow">{d}</div>)}
                      {Array.from({ length: firstDay }, (_, i) => (
                        <div key={`e-${i}`} className="cal-day" />
                      ))}
                      {Array.from({ length: daysInMonth }, (_, i) => {
                        const d = i + 1;
                        const isClickable = isMayDemo
                          ? AVAILABLE.has(d) && d >= TODAY
                          : new Date(year, month, d).getDay() !== 0 && new Date(year, month, d).getDay() !== 6;
                        return (
                          <button
                            key={d}
                            type="button"
                            className={dayClass(d)}
                            disabled={!isClickable}
                            onClick={() => isClickable && setSelected(d)}
                          >
                            {d}
                          </button>
                        );
                      })}
                    </div>

                    <div className="slots">
                      <div className="slots-label">{slotsLabel}</div>
                      <div className="slot-grid">
                        {SLOTS.map((s) => (
                          <button
                            key={s}
                            type="button"
                            className={`slot-btn${selectedSlot === s ? " slot-selected" : ""}`}
                            onClick={() => setSelectedSlot(s)}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="sched-confirm">
                      {errorMsg && <div className="sched-error">{errorMsg}</div>}
                      <div className="sched-confirm-row">
                        <div className="sched-confirm-info">
                          {selected ? (
                            <>
                              <b>{dateString} · {selectedSlot} CDT</b>
                              30-minute project consultation
                            </>
                          ) : (
                            <span>Select a date to continue</span>
                          )}
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="sched-submit"
                        disabled={status === "loading" || !selected}
                      >
                        {status === "loading" ? (
                          <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: "spin 0.8s linear infinite" }}>
                              <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" strokeOpacity="0.3"/>
                              <path d="M21 12a9 9 0 0 1-9 9"/>
                            </svg>
                            Sending…
                          </>
                        ) : (
                          <>
                            Book a consultation
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                          </>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}
