"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import type { Product, ProductColor } from "@/types";

export default function ProductClient({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);
  const [activeDetail, setActiveDetail] = useState<string | null>(null);

  function handleAddToCart() {
    if (!selectedSize) { setSizeError(true); setTimeout(() => setSizeError(false), 2000); return; }
    addItem({ productId: product.id, slug: product.slug, name: product.name,
      collection: product.collectionName, price: product.price,
      color: selectedColor.name, size: selectedSize, qty: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  const details = [
    { id: "composition", label: "Composition", body: product.specs.Composition },
    { id: "fit", label: "Fit & Cut", body: `${product.specs.Fit} rise. ${product.specs.Silhouette}. ${product.specs.Support}.` },
    { id: "care", label: "Care", body: "Machine wash 30°C. Do not tumble dry. Do not bleach. Iron cool." },
    { id: "delivery", label: "Delivery & Returns",
      body: "Dispatched within 24 hours. Plain matte packaging, billed as GZ Private Ltd. Bangkok 1–2 days · Singapore, KL, Jakarta, Manila 3–5 days. Free returns within 14 days." },
  ];

  return (
    <>
      <style>{`
        .detail-trigger {
          width: 100%;
          background: none;
          border: none;
          border-top: 1px solid var(--border-light);
          padding: 18px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--text-secondary);
          font-family: var(--sans);
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-align: left;
          font-weight: 300;
          transition: color 0.25s;
          cursor: pointer;
        }
        .detail-trigger:hover { color: var(--text-primary); }
        .detail-icon { color: var(--accent); font-size: 16px; transition: transform 0.3s var(--ease-expo); }
        .detail-icon.open { transform: rotate(45deg); }
        .detail-body {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.9;
          padding: 0 0 20px;
          font-family: var(--sans);
          font-weight: 300;
          letter-spacing: 0.02em;
        }
        .size-btn {
          border: 1px solid var(--border);
          background: none;
          color: var(--text-secondary);
          padding: 12px 6px;
          font-size: 12px;
          letter-spacing: 0.1em;
          transition: all 0.25s;
          font-family: var(--sans);
          border-radius: 0;
          text-align: center;
          cursor: pointer;
        }
        .size-btn:hover { border-color: var(--text-secondary); color: var(--text-primary); background: var(--surface); }
        .size-btn.active { border-color: var(--text-primary); background: var(--text-primary); color: var(--bg); }
        .swatch {
          width: 24px; height: 24px;
          border-radius: 50%;
          border: 2px solid transparent;
          outline: 1px solid var(--border);
          outline-offset: 3px;
          transition: outline-color 0.25s, border-color 0.25s;
          cursor: pointer;
        }
        .swatch.active, .swatch:hover { outline-color: var(--accent); }
        .atc-btn {
          width: 100%;
          padding: 18px;
          background: var(--text-primary);
          color: var(--bg);
          border: none;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-family: var(--sans);
          font-weight: 400;
          transition: all 0.3s var(--ease-expo);
          cursor: pointer;
        }
        .atc-btn:hover {
          background: linear-gradient(135deg, var(--action-gold) 0%, var(--action-gold-deep) 100%);
          color: var(--action-ink);
          box-shadow: 0 16px 36px var(--action-glow);
        }
        .atc-btn.added {
          background: linear-gradient(135deg, var(--action-gold) 0%, var(--action-gold-deep) 100%);
          color: var(--action-ink);
          box-shadow: 0 16px 36px var(--action-glow);
        }
      `}</style>

      <div style={{
        display: "grid",
        gridTemplateColumns: "55% 1fr",
        minHeight: "100vh",
      }} className="product-layout">

        {/* ── Gallery ── */}
        <div style={{
          position: "sticky", top: 0, height: "100vh",
          background: `linear-gradient(145deg, var(--walnut) 0%, var(--espresso) 100%)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden",
        }} className="product-gallery">
          {/* Grain */}
          <div aria-hidden style={{
            position: "absolute", inset: 0, zIndex: 2, opacity: 0.3, mixBlendMode: "multiply",
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")",
            backgroundSize: "300px",
          }} />
          {/* Subtle vignette */}
          <div aria-hidden style={{
            position: "absolute", inset: 0, zIndex: 1,
            background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 24%, transparent 78%, rgba(30,28,26,0.05) 100%)",
          }} />
          {/* Large letter placeholder */}
          <div style={{ zIndex: 3, textAlign: "center", userSelect: "none" }}>
            <div style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(80px, 14vw, 200px)",
              fontWeight: 400,
              color: "transparent",
              WebkitTextStroke: "1px rgba(200,180,154,0.15)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}>
              {product.name.split(" ").pop()?.charAt(0)}
            </div>
            <div style={{
              fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase",
              color: "rgba(154,125,95,0.65)", fontFamily: "var(--sans)", marginTop: 20,
            }}>
              {product.collectionName} · {product.specs.Composition.split(",")[0]}
            </div>
          </div>

          {/* Thumbnail strip */}
          <div style={{
            position: "absolute", left: 24, top: "50%", transform: "translateY(-50%)",
            display: "flex", flexDirection: "column", gap: 8, zIndex: 4,
          }}>
            {[0,1,2].map(i => (
              <div key={i} style={{
                width: 48, height: 60,
                background: i === 0 ? "rgba(168,137,90,0.18)" : "rgba(30,28,26,0.08)",
                border: `1px solid ${i === 0 ? "var(--accent)" : "var(--border-light)"}`,
              }} />
            ))}
          </div>
        </div>

        {/* ── Detail panel ── */}
        <div style={{
          padding: "100px 56px 80px 56px",
          overflowY: "auto",
          background: "var(--surface)",
          borderLeft: "1px solid var(--border-light)",
        }} className="product-detail">

          {/* Breadcrumb */}
          <div style={{
            display: "flex", gap: 8, alignItems: "center",
            fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase",
            color: "var(--text-muted)", fontFamily: "var(--sans)", marginBottom: 36,
          }}>
            <Link href={`/collections/${product.collection}`}
              style={{ color: "var(--text-muted)", textDecoration: "none" }}>
              {product.collectionName}
            </Link>
            <span style={{ opacity: 0.4 }}>·</span>
            <span style={{ color: "var(--text-secondary)" }}>{product.name}</span>
          </div>

          {/* Name */}
          <h1 style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(32px, 4vw, 54px)",
            fontWeight: 400, lineHeight: 1.05,
            letterSpacing: "-0.01em",
            color: "var(--text-primary)",
            marginBottom: 16,
          }}>{product.name}</h1>

          <p style={{
            fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8,
            fontFamily: "var(--sans)", fontWeight: 300,
            marginBottom: 32, maxWidth: 380,
          }}>{product.short}</p>

          <div style={{
            fontSize: 24, color: "var(--text-primary)", letterSpacing: "0.04em",
            fontFamily: "var(--serif)", marginBottom: 48,
          }}>
            <span style={{ fontSize: 14, color: "var(--text-muted)", marginRight: 4 }}>SGD</span>
            {product.price}
          </div>

          {/* Colour */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
              color: "var(--text-muted)", fontFamily: "var(--sans)", marginBottom: 12 }}>
              Colour — {selectedColor.name}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {product.colors.map(c => (
                <button key={c.name} className={`swatch ${selectedColor.name === c.name ? "active" : ""}`}
                  style={{ background: c.hex }}
                  onClick={() => setSelectedColor(c)}
                  title={c.name} aria-label={`Colour: ${c.name}`} />
              ))}
            </div>
          </div>

          {/* Size */}
          <div style={{ marginBottom: 36 }}>
            <div style={{
              fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
              color: sizeError ? "var(--accent)" : "var(--text-muted)",
              fontFamily: "var(--sans)", marginBottom: 12,
              display: "flex", justifyContent: "space-between",
              transition: "color 0.3s",
            }}>
              <span>{sizeError ? "Select a size to continue" : `Size${selectedSize ? ` — ${selectedSize}` : ""}`}</span>
              <Link href="/fit-guide" style={{ color: "var(--accent)", textDecoration: "none",
                fontSize: 10, letterSpacing: "0.12em" }}>Guide →</Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${product.sizes.length}, 1fr)`, gap: 6 }}>
              {product.sizes.map(s => (
                <button key={s} className={`size-btn ${selectedSize === s ? "active" : ""}`}
                  onClick={() => setSelectedSize(s)}>{s}</button>
              ))}
            </div>
          </div>

          {/* ATC */}
          <button className={`atc-btn ${added ? "added" : ""}`}
            onClick={handleAddToCart} style={{ marginBottom: 16 }}>
            {added ? "Added to bag" : "Add to bag"}
          </button>

          <p style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.1em",
            textAlign: "center", fontFamily: "var(--sans)", marginBottom: 48, fontWeight: 300 }}>
            Plain packaging · Discreet billing · Free returns
          </p>

          {/* Details accordion */}
          <div style={{ borderBottom: "1px solid var(--border-light)" }}>
            {details.map(d => (
              <div key={d.id}>
                <button className="detail-trigger"
                  onClick={() => setActiveDetail(activeDetail === d.id ? null : d.id)}>
                  <span>{d.label}</span>
                  <span className={`detail-icon ${activeDetail === d.id ? "open" : ""}`}>+</span>
                </button>
                {activeDetail === d.id && (
                  <div className="detail-body">{d.body}</div>
                )}
              </div>
            ))}
          </div>

          {/* Specs grid */}
          <div style={{ marginTop: 40 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
              color: "var(--text-muted)", fontFamily: "var(--sans)", marginBottom: 20 }}>
              Technical
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px",
              background: "var(--border-light)" }}>
              {Object.entries(product.specs).slice(0, 8).map(([k, v]) => (
                <div key={k} style={{ background: "var(--surface)", padding: "14px 16px" }}>
                  <div style={{ fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.1em",
                    textTransform: "uppercase", fontFamily: "var(--sans)", marginBottom: 4 }}>{k}</div>
                  <div style={{ fontSize: 12, color: "var(--text-primary)", fontFamily: "var(--sans)",
                    fontWeight: 300 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){
          .product-layout { grid-template-columns: 1fr !important; display: block !important; }
          .product-gallery { position: relative !important; height: 55vw !important; min-height: 300px; }
          .product-detail { padding: 40px 24px 60px !important; overflow-y: visible !important; }
        }
      `}</style>
    </>
  );
}
