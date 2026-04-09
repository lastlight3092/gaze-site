"use client";
import { useEffect, useRef, type CSSProperties } from "react";
import Link from "next/link";

/* ─── Cinematic colour-field panels simulating photographic stills ─── */
const PANELS = [
  {
    id: "opener",
    bg: "linear-gradient(168deg, #f0ece5 0%, #eae4db 35%, #ede8df 60%, #f2ece4 100%)",
    accent: "radial-gradient(ellipse at 40% 40%, rgba(184,137,106,0.07) 0%, transparent 60%)",
    headline: null,
    sub: null,
    tag: "Bangkok · Est. 2024",
    cta: null,
    align: "center",
    textY: "center",
    zen:
      "repeating-radial-gradient(circle at 24% 34%, rgba(175, 159, 130, 0.04) 0 1px, transparent 1px 15px), repeating-radial-gradient(circle at 73% 66%, rgba(167, 150, 121, 0.035) 0 1px, transparent 1px 19px)",
  },
  {
    id: "statement",
    bg: "linear-gradient(145deg, #edeae6 0%, #e8e4de 50%, #ece7e0 100%)",
    accent: "radial-gradient(ellipse at 30% 60%, rgba(184,137,106,0.05) 0%, transparent 65%)",
    headline: "Worn close.\nFelt privately.",
    sub: null,
    tag: null,
    cta: null,
    align: "left",
    textY: "bottom",
    zen:
      "repeating-radial-gradient(circle at 68% 26%, rgba(171, 154, 124, 0.042) 0 1px, transparent 1px 14px), repeating-radial-gradient(circle at 29% 74%, rgba(160, 143, 111, 0.036) 0 1px, transparent 1px 17px)",
  },
  {
    id: "core",
    bg: "linear-gradient(200deg, #ede7de 0%, #e8e2d8 40%, #ede6db 100%)",
    accent: "radial-gradient(ellipse at 75% 40%, rgba(184,137,106,0.08) 0%, transparent 55%)",
    headline: "Core",
    sub: "The foundation. Supima Modal, cut precisely for the tropical day.",
    tag: "Collection 01",
    cta: { label: "Enter Core", href: "/collections/core" },
    align: "right",
    textY: "center",
    zen:
      "repeating-radial-gradient(circle at 18% 62%, rgba(171, 154, 124, 0.044) 0 1px, transparent 1px 15px), repeating-radial-gradient(circle at 82% 26%, rgba(158, 141, 109, 0.036) 0 1px, transparent 1px 18px)",
  },
  {
    id: "after-dark",
    bg: "linear-gradient(160deg, #e8e6e2 0%, #e2dfd9 45%, #e6e2dd 100%)",
    accent: "radial-gradient(ellipse at 20% 30%, rgba(140,120,100,0.08) 0%, transparent 60%)",
    headline: "After Dark",
    sub: "Japanese micro-voile. For evenings that begin with intention.",
    tag: "Collection 02",
    cta: { label: "Enter After Dark", href: "/collections/after-dark" },
    align: "left",
    textY: "center",
    zen:
      "repeating-radial-gradient(circle at 77% 58%, rgba(168, 151, 120, 0.042) 0 1px, transparent 1px 13px), repeating-radial-gradient(circle at 20% 22%, rgba(158, 141, 109, 0.035) 0 1px, transparent 1px 18px)",
  },
  {
    id: "resort",
    bg: "linear-gradient(135deg, #ece9e3 0%, #e6e2db 50%, #eae5de 100%)",
    accent: "radial-gradient(ellipse at 60% 70%, rgba(154,125,95,0.07) 0%, transparent 60%)",
    headline: "Resort",
    sub: "ECONYL® recycled nylon. Made for the ocean. Returned to it.",
    tag: "Collection 03",
    cta: { label: "Enter Resort", href: "/collections/resort" },
    align: "right",
    textY: "bottom",
    zen:
      "repeating-radial-gradient(circle at 28% 30%, rgba(172, 156, 126, 0.04) 0 1px, transparent 1px 14px), repeating-radial-gradient(circle at 70% 74%, rgba(160, 143, 112, 0.035) 0 1px, transparent 1px 17px)",
  },
  {
    id: "vault",
    bg: "linear-gradient(170deg, #e8e5e0 0%, #e2dfda 60%, #e6e2dc 100%)",
    accent: "radial-gradient(ellipse at 50% 50%, rgba(184,137,106,0.05) 0%, transparent 70%)",
    headline: "Vault",
    sub: "Numbered editions. Rare compositions. Not restocked.",
    tag: "Collection 04",
    cta: { label: "Enter Vault", href: "/collections/vault" },
    align: "center",
    textY: "center",
    zen:
      "repeating-radial-gradient(circle at 34% 22%, rgba(170, 153, 123, 0.04) 0 1px, transparent 1px 16px), repeating-radial-gradient(circle at 65% 72%, rgba(160, 143, 112, 0.034) 0 1px, transparent 1px 19px)",
  },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  /* Intersection Observer — fade panels in as they enter viewport */
  useEffect(() => {
    const panels = document.querySelectorAll(".editorial-panel");
    const texts  = document.querySelectorAll(".panel-text-block");
    const ctas = document.querySelectorAll(".panel-cta");

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add("panel-visible");
        }
      });
    }, { threshold: 0.15 });

    panels.forEach(p => obs.observe(p));
    texts.forEach(t => obs.observe(t));
    ctas.forEach(c => obs.observe(c));
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
        .editorial-panel::before {
          content: '';
          position: absolute;
          inset: -8%;
          background: var(--panel-zen);
          opacity: 0.34;
          mix-blend-mode: multiply;
          pointer-events: none;
          z-index: 0;
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
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          background-size: 300px;
          pointer-events: none;
          z-index: 3;
          opacity: 0.3;
          mix-blend-mode: multiply;
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
          background: rgba(184,137,106,0.45);
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
          color: var(--text-secondary);
          text-decoration: none;
          font-family: var(--sans);
          font-weight: 400;
          margin-top: 36px;
          opacity: 0;
          transform: translateX(-14px) translateY(6px);
          transition: opacity 0.85s 0.4s var(--ease-expo), transform 0.85s 0.4s var(--ease-expo), color 0.3s;
        }
        .panel-cta.panel-visible {
          opacity: 1;
          transform: translateX(0) translateY(0);
        }
        .panel-cta::after {
          content: '';
          width: 32px; height: 1px;
          background: var(--action-gold);
          transition: width 0.4s var(--ease-expo);
          display: block;
        }
        .panel-cta:hover { color: var(--action-gold-deep); }
        .panel-cta:hover::after { width: 56px; }

        /* Opener special */
        .opener-logo {
          font-family: var(--sans);
          font-size: clamp(72px, 12vw, 160px);
          font-weight: 500;
          letter-spacing: 0.18em;
          color: var(--text-primary);
          text-transform: uppercase;
          line-height: 1;
          user-select: none;
          opacity: 0;
          transform: scale(0.97);
          transition: opacity 2s var(--ease-expo), transform 2.5s var(--ease-expo);
        }
        .opener-logo.panel-visible {
          opacity: 1;
          transform: scale(1);
        }
        .opener-tag {
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--accent);
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
          color: rgba(184,137,106,0.55);
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
          background: linear-gradient(to bottom, rgba(184,137,106,0.5), transparent);
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
              style={{ background: panel.bg, "--panel-zen": panel.zen } as CSSProperties}
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
                background: "radial-gradient(ellipse at center, transparent 50%, rgba(30,28,26,0.05) 100%)",
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
                        fontFamily: "var(--sans)",
                        fontSize: "clamp(40px, 6vw, 88px)",
                        fontWeight: 300,
                        lineHeight: 1.05,
                        letterSpacing: "0.01em",
                        color: "var(--text-primary)",
                        whiteSpace: "pre-line",
                        marginBottom: panel.sub ? 20 : 0,
                      }}>{panel.headline}</h2>
                    )}

                    {panel.sub && (
                      <p style={{
                        fontSize: 14,
                        color: "var(--text-secondary)",
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
                  color: "rgba(90,85,80,0.35)",
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
          background: "var(--bg)",
          borderTop: "1px solid var(--border)",
          padding: "120px 80px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 0,
        }}>
          <div style={{
            fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase",
            color: "var(--accent)", fontFamily: "var(--sans)", marginBottom: 32,
          }}>
            All Collections
          </div>
          <h2 style={{
            fontFamily: "var(--sans)",
            fontSize: "clamp(32px, 5vw, 64px)",
            fontWeight: 300,
            color: "var(--text-primary)",
            lineHeight: 1.1,
            marginBottom: 48,
            letterSpacing: "0.01em",
          }}>
            Four lines.<br />
            <span style={{ color: "var(--accent)" }}>One standard.</span>
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 1,
            background: "var(--border)",
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
                  background: "var(--bg)",
                  padding: "48px 28px 36px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 0,
                  transition: "background 0.4s var(--ease-expo)",
                  minHeight: 200,
                }}>
                  <div style={{
                    fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase",
                    color: "var(--text-muted)", fontFamily: "var(--sans)", marginBottom: "auto",
                  }}>{c.num}</div>
                  <div>
                    <div style={{
                      fontFamily: "var(--sans)", fontSize: 22, fontWeight: 300,
                      color: "var(--text-primary)", marginBottom: 6, letterSpacing: "0.02em",
                    }}>{c.label}</div>
                    <div style={{
                      fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.08em",
                      fontFamily: "var(--sans)", fontWeight: 300,
                    }}>{c.note}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Footer strip */}
          <div style={{
            borderTop: "1px solid var(--border)",
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
                <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 6, fontFamily: "var(--sans)" }}>{title}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "var(--sans)", fontWeight: 300 }}>{note}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Site footer */}
        <footer style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--border)",
          padding: "32px 80px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}>
          <span style={{ fontFamily: "var(--sans)", fontSize: 16, letterSpacing: "0.2em", color: "var(--text-secondary)" }}>GAZE</span>
          <span style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.1em", fontFamily: "var(--sans)" }}>© 2024 GAZE Private Ltd · Bangkok</span>
          <div style={{ display: "flex", gap: 28 }}>
            {[["Privacy & Packaging", "/privacy-packaging"],["Fit Guide","/fit-guide"],["Materials","/materials"]].map(([l,h]) => (
              <Link key={h} href={h} style={{
                fontSize: 11, letterSpacing: "0.14em", color: "var(--text-muted)",
                textDecoration: "none", fontFamily: "var(--sans)", textTransform: "uppercase",
              }}>{l}</Link>
            ))}
          </div>
        </footer>
      </div>

      <style>{`
        .gateway-card:hover { background: var(--surface-alt) !important; }
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
