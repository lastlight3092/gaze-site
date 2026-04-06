"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import type { Collection, Product } from "@/types";

interface Props {
  collection: Collection;
  initialProducts: Product[];
}

const SILHOUETTES = ["", "brief", "trunk", "boxer", "jock", "swim"];
const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price ↑" },
  { value: "price-desc", label: "Price ↓" },
];

export default function CollectionClient({ collection, initialProducts }: Props) {
  const [silhouette, setSilhouette] = useState("");
  const [sort, setSort] = useState("featured");

  const products = useMemo(() => {
    let list = [...initialProducts];
    if (silhouette) list = list.filter(p => p.specs.Silhouette.toLowerCase().includes(silhouette));
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    return list;
  }, [initialProducts, silhouette, sort]);

  return (
    <>
      <style>{`
        .prod-item {
          border-bottom: 1px solid rgba(168,137,90,0.1);
          transition: background 0.35s var(--ease-expo);
        }
        .prod-item:hover { background: rgba(61,46,30,0.3); }
        .prod-item:hover .prod-reveal { opacity: 1; transform: translateX(0); }
        .prod-reveal {
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.35s, transform 0.4s var(--ease-expo);
        }
        .filter-pill {
          background: none;
          border: 1px solid rgba(168,137,90,0.2);
          color: var(--tan);
          padding: 7px 16px;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-family: var(--sans);
          transition: all 0.25s;
          border-radius: 0;
        }
        .filter-pill:hover, .filter-pill.active {
          background: rgba(168,137,90,0.12);
          border-color: var(--brass);
          color: var(--parchment);
        }
      `}</style>

      {/* Collection masthead */}
      <div style={{
        paddingTop: "calc(64px + 80px)",
        paddingBottom: 60,
        paddingLeft: 80, paddingRight: 80,
        borderBottom: "1px solid rgba(168,137,90,0.12)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 80,
        alignItems: "end",
      }} className="coll-masthead">
        <div>
          <div style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase",
            color: "var(--brass)", fontFamily: "var(--sans)", marginBottom: 20 }}>
            {collection.number}
          </div>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(48px,7vw,100px)",
            fontWeight: 400, color: "var(--parchment)", lineHeight: 0.95, letterSpacing: "-0.02em" }}>
            {collection.name}
          </h1>
        </div>
        <div>
          <p style={{ fontSize: 15, color: "var(--tan)", lineHeight: 1.85,
            fontFamily: "var(--sans)", fontWeight: 300, maxWidth: 400 }}>
            {collection.description}
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div style={{
        padding: "20px 80px",
        borderBottom: "1px solid rgba(168,137,90,0.1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 16,
      }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {SILHOUETTES.map(s => (
            <button key={s} className={`filter-pill ${silhouette === s ? "active" : ""}`}
              onClick={() => setSilhouette(s)}>
              {s || "All"}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 11, color: "var(--tobacco)", letterSpacing: "0.1em", fontFamily: "var(--sans)" }}>
            {products.length} pieces
          </span>
          <select value={sort} onChange={e => setSort(e.target.value)}
            style={{ background: "transparent", border: "1px solid rgba(168,137,90,0.2)",
              color: "var(--tan)", padding: "7px 28px 7px 12px", fontSize: 10,
              letterSpacing: "0.12em", textTransform: "uppercase",
              fontFamily: "var(--sans)", appearance: "none",
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='8' height='5' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l3 3 3-3' stroke='%236b4f35' stroke-width='1'/%3E%3C/svg%3E\")",
              backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center",
            }}>
            {SORTS.map(o => <option key={o.value} value={o.value} style={{ background: "var(--espresso)" }}>{o.label}</option>)}
          </select>
        </div>
      </div>

      {/* Product list — editorial rows, large */}
      {products.length === 0 ? (
        <div style={{ padding: "80px", textAlign: "center", color: "var(--tobacco)", fontFamily: "var(--serif)", fontSize: 22, fontWeight: 400 }}>
          No pieces match.
        </div>
      ) : (
        products.map((product) => (
          <Link key={product.id} href={`/product/${product.slug}`}
            style={{ textDecoration: "none", display: "block" }}>
            <div className="prod-item" style={{
              padding: "36px 80px",
              display: "grid",
              gridTemplateColumns: "120px 1fr auto auto",
              alignItems: "center",
              gap: 48,
            }}>
              {/* Thumb placeholder */}
              <div style={{
                width: 120, height: 150,
                background: `linear-gradient(145deg, var(--walnut), var(--espresso))`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 28, color: "var(--tobacco)", flexShrink: 0,
                position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", inset: 0,
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E\")",
                  backgroundSize: "200px", mixBlendMode: "overlay",
                }} />
              </div>

              <div>
                <div className="prod-reveal" style={{
                  fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "var(--brass)", fontFamily: "var(--sans)", marginBottom: 10,
                }}>
                  {product.specs.Silhouette}
                </div>
                <h3 style={{
                  fontFamily: "var(--serif)", fontSize: "clamp(20px,2.5vw,32px)",
                  fontWeight: 400, color: "var(--parchment)", marginBottom: 10,
                  letterSpacing: "-0.01em",
                }}>{product.name}</h3>
                <p style={{
                  fontSize: 13, color: "var(--tan)", lineHeight: 1.7,
                  fontFamily: "var(--sans)", fontWeight: 300, maxWidth: 400,
                }}>{product.short}</p>
              </div>

              <div style={{ textAlign: "right", flexShrink: 0 }}>
                {product.badge && (
                  <div style={{
                    fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
                    color: "var(--brass)", fontFamily: "var(--sans)", marginBottom: 8,
                  }}>{product.badge}</div>
                )}
                <div style={{
                  fontSize: 18, color: "var(--linen)", letterSpacing: "0.04em",
                  fontFamily: "var(--serif)",
                }}>
                  SGD {product.price}
                </div>
              </div>

              <div style={{ fontSize: 18, color: "var(--brass)", flexShrink: 0, opacity: 0.5 }}>→</div>
            </div>
          </Link>
        ))
      )}

      <style>{`
        @media(max-width:900px){
          .coll-masthead { grid-template-columns: 1fr !important; padding: 40px 32px 40px !important; }
          .prod-item { grid-template-columns: 80px 1fr auto !important; padding: 24px 32px !important; gap: 20px !important; }
          .prod-item > div:last-child { display: none !important; }
        }
      `}</style>
    </>
  );
}
