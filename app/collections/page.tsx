import type { Metadata } from "next";
import Link from "next/link";
import { COLLECTIONS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Collections",
  description: "Four lines. One standard.",
};

export default function CollectionsPage() {
  return (
    <>
      <style>{`
        .coll-item {
          border-bottom: 1px solid rgba(168,137,90,0.12);
          transition: background 0.4s var(--ease-expo);
        }
        .coll-item:hover { background: rgba(61,46,30,0.4); }
        .coll-item:hover .coll-arrow { transform: translateX(8px); opacity: 1; }
        .coll-arrow { transition: transform 0.4s var(--ease-expo), opacity 0.3s; opacity: 0.3; }
      `}</style>

      {/* Masthead */}
      <div style={{
        paddingTop: "calc(64px + 80px)",
        paddingBottom: 60,
        paddingLeft: 80, paddingRight: 80,
        borderBottom: "1px solid rgba(168,137,90,0.12)",
      }}>
        <div style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase",
          color: "var(--brass)", fontFamily: "var(--sans)", marginBottom: 24 }}>
          Collections
        </div>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(40px,6vw,88px)",
          fontWeight: 400, color: "var(--parchment)", lineHeight: 1, letterSpacing: "-0.01em" }}>
          Four lines.
        </h1>
      </div>

      {/* Collection list — editorial index style */}
      {COLLECTIONS.map((coll, i) => (
        <Link key={coll.slug} href={`/collections/${coll.slug}`}
          style={{ textDecoration: "none", display: "block" }}>
          <div className="coll-item" style={{
            padding: "52px 80px",
            display: "grid",
            gridTemplateColumns: "80px 1fr 1fr auto",
            alignItems: "center",
            gap: 40,
            cursor: "none",
          }}>
            <div style={{ fontFamily: "var(--serif)", fontSize: 44, fontWeight: 400,
              color: "rgba(107,79,53,0.3)", lineHeight: 1 }}>
              0{i + 1}
            </div>
            <div>
              <div style={{ fontFamily: "var(--serif)", fontSize: "clamp(24px,3vw,42px)",
                fontWeight: 400, color: "var(--parchment)", marginBottom: 8, letterSpacing: "-0.01em" }}>
                {coll.name}
              </div>
              <div style={{ fontSize: 12, color: "var(--tobacco)", letterSpacing: "0.08em",
                fontFamily: "var(--sans)", fontWeight: 300 }}>
                {coll.tagline}
              </div>
            </div>
            <div style={{ fontSize: 13, color: "var(--tan)", lineHeight: 1.8,
              fontFamily: "var(--sans)", fontWeight: 300, maxWidth: 320 }}>
              {coll.description.split(".")[0]}.
            </div>
            <div className="coll-arrow" style={{ fontSize: 20, color: "var(--brass)" }}>→</div>
          </div>
        </Link>
      ))}

      <style>{`
        @media(max-width:900px){
          .coll-item { grid-template-columns: 48px 1fr auto !important; padding: 36px 32px !important; }
          .coll-item > div:nth-child(3) { display: none !important; }
        }
      `}</style>
    </>
  );
}
