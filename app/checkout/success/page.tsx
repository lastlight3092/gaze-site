export default function SuccessPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", flexDirection: "column", textAlign: "center",
      padding: "80px 40px" }}>
      <div style={{ width: 1, height: 80, background: "linear-gradient(to bottom, transparent, var(--brass))",
        margin: "0 auto 48px" }} />
      <div style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase",
        color: "var(--brass)", fontFamily: "var(--sans)", marginBottom: 24 }}>
        Order confirmed
      </div>
      <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(36px,5vw,64px)", fontWeight: 400,
        color: "var(--parchment)", letterSpacing: "-0.01em", marginBottom: 16, lineHeight: 1.1 }}>
        We have it<br />from here.
      </h1>
      <p style={{ fontSize: 14, color: "var(--tan)", fontFamily: "var(--sans)", fontWeight: 300,
        lineHeight: 1.9, maxWidth: 400, marginBottom: 56 }}>
        A confirmation will reach your inbox shortly. Plain packaging. Billed as GZ Private Ltd. Expected delivery in 3–5 days.
      </p>
      <div style={{ width: 48, height: 1, background: "var(--brass)", margin: "0 auto 48px" }} />
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
        <a href="/account" style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase",
          color: "var(--linen)", textDecoration: "none", fontFamily: "var(--sans)", fontWeight: 300,
          display: "flex", alignItems: "center", gap: 12 }}>
          Account <span style={{ display: "block", width: 24, height: 1, background: "var(--brass)" }} />
        </a>
        <a href="/collections" style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase",
          color: "var(--tobacco)", textDecoration: "none", fontFamily: "var(--sans)", fontWeight: 300 }}>
          Continue browsing
        </a>
      </div>
    </div>
  );
}
