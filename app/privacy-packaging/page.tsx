import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy & Packaging", description: "Your order. Your business. Entirely." };

export default function PrivacyPackagingPage() {
  return (
    <>
      <div style={{ paddingTop: "calc(64px + 80px)", paddingBottom: 64,
        paddingLeft: 120, paddingRight: 120, borderBottom: "1px solid rgba(168,137,90,0.12)" }}
        className="pp-header">
        <div style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase",
          color: "var(--brass)", fontFamily: "var(--sans)", marginBottom: 28 }}>
          Privacy &amp; Packaging
        </div>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(40px,6vw,80px)", fontWeight: 400,
          color: "var(--parchment)", lineHeight: 1, letterSpacing: "-0.02em", maxWidth: 640 }}>
          Your order.<br /><em style={{ color: "var(--tan)" }}>Your business.</em>
        </h1>
      </div>

      {/* How we pack */}
      <div style={{ padding: "72px 120px", borderBottom: "1px solid rgba(168,137,90,0.08)" }}
        className="pp-section">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start" }}>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: 24, fontWeight: 400,
            color: "var(--parchment)", letterSpacing: "-0.01em", position: "sticky", top: 100 }}>
            How we pack
          </h2>
          <div>
            {[
              { n: "1", title: "Plain matte box",
                body: "Your order arrives in an unmarked charcoal matte box. No logo, no brand name, no indication of contents. The exterior carries only the shipping label." },
              { n: "2", title: "Sealed interior",
                body: "Each piece is individually wrapped in acid-free tissue, sealed with a plain wax disc. Nothing inside is branded. The packaging itself is considered without being conspicuous." },
              { n: "3", title: "Shipping label",
                body: "The label reads only your name and address. Return address: GZ Fulfillment, Bangkok. No product names. No category indicators." },
              { n: "4", title: "Statement",
                body: "Charged as GZ Private Ltd on your bank or card statement. The nature of the purchase is not identifiable from any external record." },
            ].map((step, i) => (
              <div key={step.n} style={{
                display: "grid", gridTemplateColumns: "40px 1fr", gap: 32,
                padding: "32px 0", borderBottom: i < 3 ? "1px solid rgba(168,137,90,0.06)" : "none",
              }}>
                <div style={{ fontFamily: "var(--serif)", fontSize: 28, fontWeight: 400,
                  color: "rgba(107,79,53,0.45)", lineHeight: 1, paddingTop: 4 }}>{step.n}</div>
                <div>
                  <div style={{ fontFamily: "var(--serif)", fontSize: 17, fontWeight: 400,
                    color: "var(--parchment)", marginBottom: 10 }}>{step.title}</div>
                  <p style={{ fontSize: 13, color: "var(--tan)", lineHeight: 1.9,
                    fontFamily: "var(--sans)", fontWeight: 300 }}>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Data */}
      <div style={{ padding: "72px 120px", borderBottom: "1px solid rgba(168,137,90,0.08)" }}
        className="pp-section">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80 }}>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: 24, fontWeight: 400,
            color: "var(--parchment)", letterSpacing: "-0.01em" }}>Your data</h2>
          <div>
            {["We hold only what we need. Your email, your shipping address, your order history. We do not sell data, do not use third-party advertising networks, and do not send unsolicited marketing.",
              "We do not use behavioural tracking cookies. Functional cookies only — required for the site to operate.",
              "Account deletion is available at any time from your account settings. All personal data is permanently removed within 30 days of request."].map((p, i) => (
              <p key={i} style={{ fontSize: 14, color: "var(--tan)", lineHeight: 2,
                fontFamily: "var(--sans)", fontWeight: 300, marginBottom: i < 2 ? 20 : 0 }}>{p}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Returns */}
      <div style={{ padding: "72px 120px" }} className="pp-section">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80 }}>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: 24, fontWeight: 400,
            color: "var(--parchment)", letterSpacing: "-0.01em" }}>Returns</h2>
          <div>
            {["Returns are accepted within 14 days of receipt on unworn items in original packaging. Contact us to initiate. We do not require a reason.",
              "Refunds are processed to your original payment method within 5 business days of our receiving the return. Return shipping is at your cost unless the item is faulty."].map((p, i) => (
              <p key={i} style={{ fontSize: 14, color: "var(--tan)", lineHeight: 2,
                fontFamily: "var(--sans)", fontWeight: 300, marginBottom: i < 1 ? 20 : 0 }}>{p}</p>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:1024px){
          .pp-header { padding: 60px 48px 60px !important; }
          .pp-section { padding: 48px !important; }
          .pp-section > div { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
        @media(max-width:600px){
          .pp-header, .pp-section { padding: 40px 24px !important; }
        }
      `}</style>
    </>
  );
}
