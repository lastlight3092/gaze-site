import Link from "next/link";

interface Crumb { label: string; href?: string; }

export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" style={{
      display: "flex", gap: 8, alignItems: "center",
      fontSize: 10, letterSpacing: "0.16em",
      color: "var(--tobacco)", fontFamily: "var(--sans)",
      marginBottom: 24, flexWrap: "wrap",
    }}>
      {crumbs.map((crumb, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {i > 0 && <span style={{ color: "rgba(107,79,53,0.35)", fontSize: 9 }}>·</span>}
          {crumb.href ? (
            <Link href={crumb.href} style={{ color: "var(--tobacco)", textDecoration: "none",
              textTransform: "uppercase" }}>
              {crumb.label}
            </Link>
          ) : (
            <span style={{ color: "var(--tan)", textTransform: "uppercase" }}>{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
