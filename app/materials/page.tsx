import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Materials", description: "What we use. Why we use it." };

const materials = [
  { name: "Supima Modal", origin: "USA × Austria", collection: "Core",
    desc: "Our primary fabrication. Supima cotton blended with Austrian modal for exceptional softness, temperature regulation, and colour retention. Breathes in humid climates. Holds shape across years of use. The hand is cool, soft, and precise — nothing like jersey." },
  { name: "Micro-Voile Mesh", origin: "Niigata, Japan", collection: "After Dark",
    desc: "An ultra-fine nylon mesh from a specialist mill. Near-invisible weight. Precise stretch. The fabric catches light without announcing itself. Sourced from the same supplier as several major European luxury houses, though we decline to name them." },
  { name: "Ribbed Cotton", origin: "Portugal", collection: "Core",
    desc: "A heavier-gauge rib from a Portuguese hosiery house. Substantial hand. Structured support. A waistband that remembers its shape across years of wear. Classic. Considered. Uncommon in this category." },
  { name: "ECONYL® Nylon", origin: "Italy", collection: "Resort",
    desc: "Regenerated nylon from Aquafil. Salt-resistant. Chlorine-resistant. Retains opacity and elasticity across seasons. A material commitment that does not sacrifice performance for principle. Both, or neither." },
  { name: "Charmeuse Satin", origin: "Lyon, France", collection: "Vault",
    desc: "A silk-weight weave with exceptional drape and cool temperature feel. Used exclusively in the Private Satin collection. A surface that rewards stillness. For those who understand the difference between fabric and material." },
  { name: "Coolmax® Blend", origin: "Taiwan", collection: "After Dark",
    desc: "A four-channel moisture transport fibre. Accelerates evaporation without synthetic hand feel. Built for Bangkok in July. The Eclipse and Heatwave pieces use this exclusively — the only performance fabric we allow near the After Dark line." },
];

export default function MaterialsPage() {
  return (
    <>
      {/* Masthead */}
      <div style={{ paddingTop: "calc(64px + 80px)", paddingBottom: 64,
        paddingLeft: 120, paddingRight: 120, borderBottom: "1px solid rgba(168,137,90,0.12)" }}
        className="mat-header">
        <div style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase",
          color: "var(--brass)", fontFamily: "var(--sans)", marginBottom: 28 }}>Materials</div>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(44px,6vw,88px)", fontWeight: 400,
          color: "var(--parchment)", lineHeight: 1, letterSpacing: "-0.02em", maxWidth: 600 }}>
          What we use.<br /><em style={{ color: "var(--tan)" }}>Why.</em>
        </h1>
      </div>

      {/* Materials list */}
      {materials.map((mat, i) => (
        <div key={mat.name} style={{
          display: "grid", gridTemplateColumns: "1fr 80px 2fr",
          gap: 80, padding: "64px 120px",
          borderBottom: "1px solid rgba(168,137,90,0.08)",
          transition: "background 0.3s",
        }} className="mat-row">
          <div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(20px,2.5vw,30px)",
              fontWeight: 400, color: "var(--parchment)", marginBottom: 10,
              letterSpacing: "-0.01em", lineHeight: 1.1 }}>{mat.name}</h2>
            <div style={{ fontSize: 11, color: "var(--brass)", letterSpacing: "0.16em",
              textTransform: "uppercase", fontFamily: "var(--sans)", marginBottom: 6 }}>
              {mat.origin}
            </div>
            <div style={{ fontSize: 11, color: "var(--tobacco)", letterSpacing: "0.12em",
              textTransform: "uppercase", fontFamily: "var(--sans)" }}>
              {mat.collection}
            </div>
          </div>
          <div style={{ fontFamily: "var(--serif)", fontSize: 40, fontWeight: 400,
            color: "rgba(107,79,53,0.15)", lineHeight: 1, alignSelf: "center",
            textAlign: "center" }}>
            0{i + 1}
          </div>
          <div>
            <p style={{ fontSize: 14, color: "var(--tan)", lineHeight: 2,
              fontFamily: "var(--sans)", fontWeight: 300 }}>{mat.desc}</p>
          </div>
        </div>
      ))}

      {/* Sourcing note */}
      <div style={{ padding: "80px 120px", borderTop: "1px solid rgba(168,137,90,0.08)" }}
        className="mat-note">
        <div style={{ maxWidth: 560, marginLeft: "auto" }}>
          <div style={{ width: 32, height: 1, background: "var(--brass)", marginBottom: 24 }} />
          <p style={{ fontSize: 14, color: "var(--tobacco)", lineHeight: 2,
            fontFamily: "var(--sans)", fontWeight: 300, fontStyle: "italic" }}>
            Every material we use is sourced from mills with a minimum ten-year relationship with one of our production partners. We do not use new suppliers for volume or cost. We use existing relationships for quality and accountability.
          </p>
        </div>
      </div>

      <style>{`
        .mat-row:hover { background: rgba(44,32,24,0.3); }
        @media(max-width:1024px){
          .mat-header { padding: 60px 48px 60px !important; }
          .mat-row { grid-template-columns: 1fr !important; padding: 48px !important; gap: 16px !important; }
          .mat-row > div:nth-child(2) { display: none; }
          .mat-note { padding: 60px 48px !important; }
        }
        @media(max-width:600px){
          .mat-header, .mat-row, .mat-note { padding: 40px 24px !important; }
        }
      `}</style>
    </>
  );
}
