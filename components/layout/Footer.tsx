import Link from "next/link";

const footerLinks = {
  Collections: [
    { href: "/collections/core", label: "Core" },
    { href: "/collections/after-dark", label: "After Dark" },
    { href: "/collections/resort", label: "Resort" },
    { href: "/collections/vault", label: "Vault" },
  ],
  Information: [
    { href: "/about", label: "About GAZE" },
    { href: "/materials", label: "Materials" },
    { href: "/fit-guide", label: "Fit Guide" },
    { href: "/privacy-packaging", label: "Privacy & Packaging" },
  ],
  Service: [
    { href: "/account", label: "My Account" },
    { href: "#", label: "Delivery" },
    { href: "#", label: "Returns" },
    { href: "#", label: "Contact" },
  ],
};

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        padding: "60px 40px 32px",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 48,
            marginBottom: 48,
          }}
          className="footer-grid"
        >
          <div>
            <Link
              href="/"
              style={{
                fontFamily: "var(--serif)",
                fontSize: 22,
                fontWeight: 300,
                letterSpacing: "0.2em",
                color: "var(--text-primary)",
                textDecoration: "none",
                display: "block",
                marginBottom: 20,
              }}
            >
              GAZE
            </Link>
            <p
              style={{
                fontSize: 12,
                color: "var(--text-muted)",
                lineHeight: 1.9,
                maxWidth: 260,
              }}
            >
              A private luxury underwear house. Bangkok-made essentials and intimate pieces for men of discerning taste.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4
                style={{
                  fontSize: 10,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--brass)",
                  marginBottom: 20,
                  fontFamily: "var(--sans)",
                  fontWeight: 400,
                }}
              >
                {title}
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      style={{
                        fontSize: 12,
                        color: "var(--text-muted)",
                        textDecoration: "none",
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.06em" }}>
            © 2024 GAZE Private Ltd · Bangkok
          </span>
          <span style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.06em" }}>
            Privacy · Terms · Cookies
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
