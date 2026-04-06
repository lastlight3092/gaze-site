import type { Metadata } from "next";

export const metadata: Metadata = { title: "About", description: "A private luxury underwear house." };

export default function AboutPage() {
  const sections = [
    { num: "01", title: "The House",
      body: ["GAZE was founded in Bangkok in 2024 with a singular intention: to make the finest men's underwear in Southeast Asia. Not the loudest. Not the most marketed. The finest.",
             "We work with a small number of specialist suppliers — in Bangkok, in Japan, and in Portugal — who understand precision tailoring, premium fabrication, and the kind of detail that only reveals itself across years of wear."]
    },
    { num: "02", title: "The Clientele",
      body: ["Our clients are men who have stopped seeking approval. They have accumulated enough — experience, income, perspective — to know exactly what they want. They dress for themselves.",
             "GAZE is made for them. Not for trend. Not for visibility. For the private pleasure of wearing something precisely right."]
    },
    { num: "03", title: "The Standard",
      body: ["Every piece is tested for stretch recovery, opacity under tropical humidity, waistband integrity over time, and comfort across long days and longer nights.",
             "No piece leaves Bangkok unless it meets the standard. The standard is not written down. It is known."]
    },
  ];

  return (
    <>
      {/* Hero */}
      <div style={{ paddingTop: "calc(64px + 80px)", paddingBottom: 80,
        paddingLeft: 120, paddingRight: 120, borderBottom: "1px solid rgba(168,137,90,0.12)" }}
        className="about-hero">
        <div style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase",
          color: "var(--brass)", fontFamily: "var(--sans)", marginBottom: 28 }}>About</div>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(48px,7vw,100px)", fontWeight: 400,
          color: "var(--parchment)", lineHeight: 1, letterSpacing: "-0.02em", maxWidth: 700 }}>
          Quiet<br /><em style={{ color: "var(--tan)" }}>precision.</em>
        </h1>
      </div>

      {/* Sections */}
      {sections.map((s, i) => (
        <div key={s.num} style={{
          display: "grid", gridTemplateColumns: "120px 1fr 1fr",
          gap: 80, padding: "80px 120px",
          borderBottom: "1px solid rgba(168,137,90,0.08)",
        }} className="about-section">
          <div style={{ fontFamily: "var(--serif)", fontSize: 40, fontWeight: 400,
            color: "rgba(107,79,53,0.25)", lineHeight: 1, paddingTop: 6 }}>{s.num}</div>
          <div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 28, fontWeight: 400,
              color: "var(--parchment)", marginBottom: 0, letterSpacing: "-0.01em" }}>{s.title}</h2>
          </div>
          <div>
            {s.body.map((p, j) => (
              <p key={j} style={{ fontSize: 14, color: "var(--tan)", lineHeight: 2,
                fontFamily: "var(--sans)", fontWeight: 300, marginBottom: j < s.body.length-1 ? 20 : 0 }}>{p}</p>
            ))}
          </div>
        </div>
      ))}

      <style>{`
        @media(max-width:1024px){
          .about-hero { padding: 60px 48px 60px !important; }
          .about-section { grid-template-columns: 1fr !important; padding: 48px !important; gap: 20px !important; }
        }
        @media(max-width:600px){
          .about-hero, .about-section { padding: 40px 24px !important; }
        }
      `}</style>
    </>
  );
}
