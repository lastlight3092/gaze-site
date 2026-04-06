"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

/* ─── Cinematic colour-field panels simulating photographic stills ─── */
const PANELS = [
  {
    id: "opener",
    bg: "linear-gradient(168deg, #1a1208 0%, #2c1e0e 35%, #3d2a14 60%, #1e1509 100%)",
    accent: "linear-gradient(90deg, rgba(168,137,90,0.15) 0%, transparent 60%)",
    headline: null,
    sub: null,
    tag: "Bangkok · Est. 2024",
    cta: null,
    align: "center",
    textY: "center",
  },
  {
    id: "statement",
    bg: "linear-gradient(145deg, #0e0c08 0%, #241a0e 50%, #2e2010 100%)",
    accent: "radial-gradient(ellipse at 30% 60%, rgba(107,79,53,0.3) 0%, transparent 65%)",
    headline: "Worn close.\nFelt privately.",
    sub: null,
    tag: null,
    cta: null,
    align: "left",
    textY: "bottom",
  },
  {
    id: "core",
    bg: "linear-gradient(200deg, #2a1e12 0%, #1a1209 40%, #3d2e1e 100%)",
    accent: "radial-gradient(ellipse at 75% 40%, rgba(168,137,90,0.2) 0%, transparent 55%)",
    headline: "Core",
    sub: "The foundation. Supima Modal, cut precisely for the tropical day.",
    tag: "Collection 01",
    cta: { label: "Enter Core", href: "/collections/core" },
    align: "right",
    textY: "center",
  },
  {
    id: "after-dark",
    bg: "linear-gradient(160deg, #0a0806 0%, #1c120a 45%, #241808 100%)",
    accent: "radial-gradient(ellipse at 20% 30%, rgba(90,68,42,0.35) 0%, transparent 60%)",
    headline: "After Dark",
    sub: "Japanese micro-voile. For evenings that begin with intention.",
    tag: "Collection 02",
    cta: { label: "Enter After Dark", href: "/collections/after-dark" },
    align: "left",
    textY: "center",
  },
  {
    id: "resort",
    bg: "linear-gradient(135deg, #1e1a10 0%, #2e2618 50%, #3a2e1a 100%)",
    accent: "radial-gradient(ellipse at 60% 70%, rgba(154,125,95,0.25) 0%, transparent 60%)",
    headline: "Resort",
    sub: "ECONYL® recycled nylon. Made for the ocean. Returned to it.",
    tag: "Collection 03",
    cta: { label: "Enter Resort", href: "/collections/resort" },
    align: "right",
    textY: "bottom",
  },
  {
    id: "vault",
    bg: "linear-gradient(170deg, #12100c 0%, #1e1810 60%, #2a2014 100%)",
    accent: "radial-gradient(ellipse at 50% 50%, rgba(168,137,90,0.12) 0%, transparent 70%)",
    headline: "Vault",
    sub: "Numbered editions. Rare compositions. Not restocked.",
    tag: "Collection 04",
    cta: { label: "Enter Vault", href: "/collections/vault" },
    align: "center",
    textY: "center",
  },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  /* Intersection Observer — fade panels in as they enter viewport */
  useEffect(() => {
    const panels = document.querySelectorAll(".editorial-panel");
    const texts  = document.querySelectorAll(".panel-text-block");

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add("panel-visible");
        }
      });
    }, { threshold: 0.15 });

    panels.forEach(p => obs.observe(p));
    texts.forEach(t => obs.observe(t));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .editorial-panel {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 600px;
          overflow: hidden;
          display: flex;
          align-items: center;
        }
        .panel-inner {
          position: absolute; inset: 0;
          display: flex;
          flex-direction: column;
        }
        /* Grain */
        .editorial-panel::after {
          content: '';
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
          background-size: 300px;
          pointer-events: none;
          z-index: 3;
          opacity: 0.55;
          mix-blend-mode: overlay;
        }
        /* Reveal animations */
        .panel-text-block {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 1.2s var(--ease-expo), transform 1.2s var(--ease-expo);
        }
        .panel-text-block.panel-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .panel-tag {
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.9s 0.2s var(--ease-expo), transform 0.9s 0.2s var(--ease-expo);
        }
        .panel-tag.panel-visible {
          opacity: 1;
          transform: translateY(0);
        }
        /* Horizontal rule — animates in from left */
        .panel-rule {
          width: 0;
          height: 1px;
          background: rgba(168,137,90,0.5);
          transition: width 1.4s 0.3s var(--ease-expo);
          display: block;
          margin-bottom: 24px;
        }
        .panel-text-block.panel-visible .panel-rule {
          width: 48px;
        }
        /* CTA link */
        .panel-cta {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--linen);
          text-decoration: none;
          font-family: var(--sans);
          font-weight: 300;
          margin-top: 36px;
          opacity: 0;
          transform: translateX(-8px);
          transition: opacity 0.8s 0.6s var(--ease-expo), transform 0.8s 0.6s var(--ease-expo), color 0.3s;
        }
        .panel-text-block.panel-visible .panel-cta {
          opacity: 1;
          transform: translateX(0);
        }
        .panel-cta::after {
          content: '';
          width: 32px; height: 1px;
          background: var(--brass);
          transition: width 0.4s var(--ease-expo);
          display: block;
        }
        .panel-cta:hover { color: var(--parchment); }
        .panel-cta:hover::after { width: 56px; }

        /* Opener special */
        .opener-logo {
          font-family: var(--serif);
          font-size: clamp(72px, 12vw, 160px);
          font-weight: 400;
          letter-spacing: 0.12em;
          color: transparent;
          -webkit-text-stroke: 1px rgba(226,213,195,0.25);
          text-transform: uppercase;
          line-height: 1;
          user-select: none;
          opacity: 0;
          transform: scale(0.97);
          transition: opacity 2s var(--ease-expo), transform 2.5s var(--ease-expo), -webkit-text-stroke-color 0.5s;
        }
        .opener-logo.panel-visible {
          opacity: 1;
          transform: scale(1);
        }
        .opener-tag {
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--brass);
          font-family: var(--sans);
          font-weight: 300;
          opacity: 0;
          margin-top: 24px;
          transition: opacity 1.5s 0.5s var(--ease-expo);
        }
        .opener-tag.panel-visible { opacity: 1; }
        .scroll-hint {
          font-size: 9px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(168,137,90,0.5);
          font-family: var(--sans);
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          z-index: 4;
          opacity: 0;
          animation: fadeUpHint 1s 2s forwards;
        }
        .scroll-hint::after {
          content: '';
          width: 1px;
          height: 48px;
          background: linear-gradient(to bottom, rgba(168,137,90,0.6), transparent);
          animation: scrollPulse 2s 2.5s infinite;
        }
        @keyframes fadeUpHint {
          from { opacity: 0; transform: translateX(-50%) translateY(10px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 1; }
        }

        /* Panel text positioning */
        .pos-left   { align-items: flex-start; padding: 0 10% 0 8%; }
        .pos-right  { align-items: flex-end;   padding: 0 8% 0 10%; }
        .pos-center { align-items: center; text-align: center; }

        .valign-center { justify-content: center; }
        .valign-bottom { justify-content: flex-end; padding-bottom: 12vh; }

        @media(max-width: 768px) {
          .pos-left, .pos-right { align-items: flex-start !important; padding: 0 32px !important; }
        }
      `}</style>

      <div ref={containerRef}>
        {PANELS.map((panel, i) => {
          const isOpener = panel.id === "opener";

          const posClass = panel.align === "left" ? "pos-left"
            : panel.align === "right" ? "pos-right"
            : "pos-center";

          const valignClass = panel.textY === "bottom" ? "valign-bottom" : "valign-center";

          return (
            <section
              key={panel.id}
              className="editorial-panel"
              style={{ background: panel.bg }}
            >
              {/* Accent light */}
              <div aria-hidden style={{
                position: "absolute", inset: 0,
                background: panel.accent,
                zIndex: 1,
              }} />

              {/* Vignette */}
              <div aria-hidden style={{
                position: "absolute", inset: 0,
                background: "radial-gradient(ellipse at center, transparent 30%, rgba(14,10,6,0.7) 100%)",
                zIndex: 2,
              }} />

              {/* Text layer */}
              <div className={`panel-inner ${posClass} ${valignClass}`} style={{ zIndex: 4 }}>
                {isOpener ? (
                  // ─── OPENER ───
                  <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div className={`opener-logo panel-text-block`}>Gaze</div>
                    <div className={`opener-tag panel-tag`}>Bangkok — Private Luxury — Est. 2024</div>
                  </div>
                ) : (
                  // ─── CONTENT PANELS ───
                  <div className="panel-text-block" style={{
                    maxWidth: 520,
                    textAlign: panel.align === "center" ? "center" : "left",
                  }}>
                    {panel.tag && (
                      <div className="panel-tag" style={{
                        fontSize: 10,
                        letterSpacing: "0.24em",
                        textTransform: "uppercase",
                        color: "var(--brass)",
                        fontFamily: "var(--sans)",
                        fontWeight: 300,
                        marginBottom: 20,
                      }}>{panel.tag}</div>
                    )}

                    <span className="panel-rule" />

                    {panel.headline && (
                      <h2 style={{
                        fontFamily: "var(--serif)",
                        fontSize: "clamp(40px, 6vw, 88px)",
                        fontWeight: 400,
                        lineHeight: 1.05,
                        letterSpacing: "-0.01em",
                        color: "var(--parchment)",
                        whiteSpace: "pre-line",
                        marginBottom: panel.sub ? 20 : 0,
                      }}>{panel.headline}</h2>
                    )}

                    {panel.sub && (
                      <p style={{
                        fontSize: 14,
                        color: "var(--tan)",
                        lineHeight: 1.8,
                        letterSpacing: "0.03em",
                        fontWeight: 300,
                        maxWidth: 380,
                      }}>{panel.sub}</p>
                    )}

                    {panel.cta && (
                      <Link href={panel.cta.href} className="panel-cta">{panel.cta.label}</Link>
                    )}
                  </div>
                )}
              </div>

              {/* Scroll hint on opener */}
              {isOpener && (
                <div className="scroll-hint" aria-hidden>Scroll</div>
              )}

              {/* Panel number */}
              {i > 0 && (
                <div aria-hidden style={{
                  position: "absolute",
                  bottom: 32, right: 48,
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  color: "rgba(107,79,53,0.5)",
                  fontFamily: "var(--sans)",
                  zIndex: 4,
                  writingMode: "vertical-rl",
                }}>
                  0{i}
                </div>
              )}
            </section>
          );
        })}

        {/* ─── Final gateway ─── */}
        <section style={{
          background: "var(--espresso)",
          borderTop: "1px solid rgba(168,137,90,0.15)",
          padding: "120px 80px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 0,
        }}>
          <div style={{
            fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase",
            color: "var(--brass)", fontFamily: "var(--sans)", marginBottom: 32,
          }}>
            All Collections
          </div>
          <h2 style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(32px, 5vw, 64px)",
            fontWeight: 400,
            color: "var(--parchment)",
            lineHeight: 1.1,
            marginBottom: 48,
            letterSpacing: "-0.01em",
          }}>
            Four lines.<br />
            <em style={{ color: "var(--tan)" }}>One standard.</em>
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 1,
            background: "rgba(168,137,90,0.1)",
            width: "100%",
            maxWidth: 1000,
            marginBottom: 80,
          }} className="gateway-grid">
            {[
              { slug: "core",       label: "Core",       num: "01", note: "Supima Modal" },
              { slug: "after-dark", label: "After Dark",  num: "02", note: "Japanese Mesh" },
              { slug: "resort",     label: "Resort",      num: "03", note: "ECONYL® Nylon" },
              { slug: "vault",      label: "Vault",       num: "04", note: "Limited Edition" },
            ].map(c => (
              <Link key={c.slug} href={`/collections/${c.slug}`}
                style={{ textDecoration: "none", display: "block" }}>
                <div className="gateway-card" style={{
                  background: "var(--espresso)",
                  padding: "48px 28px 36px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 0,
                  cursor: "none",
                  transition: "background 0.4s var(--ease-expo)",
                  minHeight: 200,
                }}>
                  <div style={{
                    fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase",
                    color: "var(--tobacco)", fontFamily: "var(--sans)", marginBottom: "auto",
                  }}>{c.num}</div>
                  <div>
                    <div style={{
                      fontFamily: "var(--serif)", fontSize: 22, fontWeight: 400,
                      color: "var(--parchment)", marginBottom: 6, letterSpacing: "0.01em",
                    }}>{c.label}</div>
                    <div style={{
                      fontSize: 11, color: "var(--tobacco)", letterSpacing: "0.08em",
                      fontFamily: "var(--sans)", fontWeight: 300,
                    }}>{c.note}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Footer strip */}
          <div style={{
            borderTop: "1px solid rgba(168,137,90,0.12)",
            width: "100%",
            paddingTop: 40,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 20,
            maxWidth: 1000,
          }}>
            {[
              ["Plain packaging","No logos. A sealed matte box."],
              ["Discreet billing","GZ Private Ltd on your statement."],
              ["Regional delivery","BKK · SGP · KL · JKT · MNL"],
              ["Free returns","Within 14 days. No reason required."],
            ].map(([title, note]) => (
              <div key={title} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--brass)", marginBottom: 6, fontFamily: "var(--sans)" }}>{title}</div>
                <div style={{ fontSize: 12, color: "var(--tobacco)", fontFamily: "var(--sans)", fontWeight: 300 }}>{note}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Site footer */}
        <footer style={{
          background: "var(--ink)",
          borderTop: "1px solid rgba(168,137,90,0.08)",
          padding: "32px 80px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}>
          <span style={{ fontFamily: "var(--serif)", fontSize: 16, letterSpacing: "0.2em", color: "var(--tobacco)" }}>Gaze</span>
          <span style={{ fontSize: 11, color: "rgba(107,79,53,0.6)", letterSpacing: "0.1em", fontFamily: "var(--sans)" }}>© 2024 GAZE Private Ltd · Bangkok</span>
          <div style={{ display: "flex", gap: 28 }}>
            {[["Privacy & Packaging", "/privacy-packaging"],["Fit Guide","/fit-guide"],["Materials","/materials"]].map(([l,h]) => (
              <Link key={h} href={h} style={{
                fontSize: 11, letterSpacing: "0.14em", color: "rgba(107,79,53,0.6)",
                textDecoration: "none", fontFamily: "var(--sans)", textTransform: "uppercase",
              }}>{l}</Link>
            ))}
          </div>
        </footer>
      </div>

      <style>{`
        .gateway-card:hover { background: var(--walnut) !important; }
        @media(max-width: 900px) {
          .gateway-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media(max-width: 600px) {
          .gateway-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
