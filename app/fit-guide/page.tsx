import type { Metadata } from "next";

export const metadata: Metadata = { title: "Fit Guide", description: "Measure once. Buy with certainty." };

const sizes = [
  { size: "XS", waistCm: "70–74", waistIn: '27½–29"', hipCm: "87–92" },
  { size: "S",  waistCm: "75–79", waistIn: '29½–31"', hipCm: "93–97" },
  { size: "M",  waistCm: "80–84", waistIn: '31½–33"', hipCm: "98–102" },
  { size: "L",  waistCm: "85–89", waistIn: '33½–35"', hipCm: "103–107" },
  { size: "XL", waistCm: "90–95", waistIn: '35½–37½"', hipCm: "108–113" },
];

const silhouettes = [
  { name: "Brief",       note: "Sits at the hip. Low thigh coverage. Select your standard size." },
  { name: "Trunk",       note: "Mid-thigh coverage. If between sizes, size down for a closer hold." },
  { name: "Boxer Brief", note: "Full coverage to the lower thigh. True to size in all fabrics." },
  { name: "Jock",        note: "Measured by waistband only. Select standard size." },
  { name: "Swim",        note: "Size up for leisure wear. True to size for performance." },
];

export default function FitGuidePage() {
  return (
    <>
      {/* Masthead */}
      <div style={{ paddingTop: "calc(64px + 80px)", paddingBottom: 64,
        paddingLeft: 120, paddingRight: 120, borderBottom: "1px solid rgba(168,137,90,0.12)" }}
        className="fit-header">
        <div style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase",
          color: "var(--brass)", fontFamily: "var(--sans)", marginBottom: 28 }}>Fit Guide</div>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(44px,6vw,88px)", fontWeight: 400,
          color: "var(--parchment)", lineHeight: 1, letterSpacing: "-0.02em" }}>
          Measure once.
        </h1>
      </div>

      {/* How to */}
      <div style={{ padding: "72px 120px", borderBottom: "1px solid rgba(168,137,90,0.08)",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }} className="fit-how">
        <h2 style={{ fontFamily: "var(--serif)", fontSize: 28, fontWeight: 400,
          color: "var(--parchment)", letterSpacing: "-0.01em" }}>How to measure</h2>
        <div>
          <p style={{ fontSize: 14, color: "var(--tan)", lineHeight: 2,
            fontFamily: "var(--sans)", fontWeight: 300, marginBottom: 16 }}>
            Measure your natural waist — the narrowest point of your torso, roughly 2–3 cm above the navel. Use a fabric tape measure held firmly but not compressing.
          </p>
          <p style={{ fontSize: 14, color: "var(--tan)", lineHeight: 2,
            fontFamily: "var(--sans)", fontWeight: 300 }}>
            We recommend measuring in the morning. For swim pieces, also measure the hips at their widest point. When between sizes, consult the silhouette notes below.
          </p>
        </div>
      </div>

      {/* Size table */}
      <div style={{ padding: "72px 120px", borderBottom: "1px solid rgba(168,137,90,0.08)" }}
        className="fit-table-wrap">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(168,137,90,0.2)" }}>
                {["Size", "Waist (cm)", "Waist (in)", "Hip (cm)"].map(h => (
                  <th key={h} style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
                    color: "var(--tobacco)", textAlign: "left", padding: "0 0 16px",
                    fontWeight: 400, fontFamily: "var(--sans)", paddingRight: 60 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sizes.map(row => (
                <tr key={row.size} style={{ borderBottom: "1px solid rgba(168,137,90,0.06)" }}>
                  {[row.size, row.waistCm, row.waistIn, row.hipCm].map((val, i) => (
                    <td key={i} style={{ padding: "18px 60px 18px 0",
                      fontSize: i === 0 ? 16 : 14,
                      fontFamily: i === 0 ? "var(--serif)" : "var(--sans)",
                      color: i === 0 ? "var(--parchment)" : "var(--tan)",
                      fontWeight: i === 0 ? 400 : 300,
                      letterSpacing: i === 0 ? "0.06em" : 0 }}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Silhouette notes */}
      <div style={{ padding: "72px 120px" }} className="fit-silhouette">
        <h2 style={{ fontFamily: "var(--serif)", fontSize: 24, fontWeight: 400,
          color: "var(--parchment)", marginBottom: 40, letterSpacing: "-0.01em" }}>
          Silhouette notes
        </h2>
        {silhouettes.map((s, i) => (
          <div key={s.name} style={{
            display: "grid", gridTemplateColumns: "180px 1fr",
            gap: 48, padding: "20px 0",
            borderTop: i === 0 ? "1px solid rgba(168,137,90,0.12)" : "none",
            borderBottom: "1px solid rgba(168,137,90,0.06)",
          }}>
            <div style={{ fontFamily: "var(--serif)", fontSize: 17, fontWeight: 400,
              color: "var(--parchment)", paddingTop: 2 }}>{s.name}</div>
            <p style={{ fontSize: 13, color: "var(--tan)", lineHeight: 1.8,
              fontFamily: "var(--sans)", fontWeight: 300 }}>{s.note}</p>
          </div>
        ))}
      </div>

      <style>{`
        @media(max-width:1024px){
          .fit-header { padding: 60px 48px 60px !important; }
          .fit-how { grid-template-columns: 1fr !important; padding: 48px !important; gap: 24px !important; }
          .fit-table-wrap { padding: 48px !important; }
          .fit-silhouette { padding: 48px !important; }
          .fit-silhouette > div { grid-template-columns: 1fr !important; gap: 8px !important; }
        }
        @media(max-width:600px){
          .fit-header, .fit-how, .fit-table-wrap, .fit-silhouette { padding: 40px 24px !important; }
        }
      `}</style>
    </>
  );
}
