"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, subtotal, updateQty, removeItem } = useCart();

  return (
    <div style={{ paddingTop: "calc(64px + 60px)", minHeight: "100vh" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 48px 100px" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase",
          color: "var(--brass)", fontFamily: "var(--sans)", marginBottom: 20 }}>Your Bag</div>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(36px,5vw,64px)", fontWeight: 400,
          color: "var(--parchment)", marginBottom: 60, letterSpacing: "-0.01em" }}>
          {items.length === 0 ? "The bag is empty." : `${items.length} piece${items.length > 1 ? "s" : ""}.`}
        </h1>

        {items.length === 0 ? (
          <div>
            <p style={{ fontSize: 14, color: "var(--tan)", fontFamily: "var(--sans)", fontWeight: 300,
              lineHeight: 1.8, marginBottom: 40 }}>
              Browse the collections to find something precisely right.
            </p>
            <Link href="/collections" style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase",
              color: "var(--linen)", textDecoration: "none", fontFamily: "var(--sans)", fontWeight: 300,
            }}>
              Collections <span style={{ display: "block", width: 32, height: 1, background: "var(--brass)" }} />
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 80, alignItems: "start" }} className="cart-layout">
            <div>
              {items.map((item, i) => (
                <div key={item.key} style={{
                  borderTop: i === 0 ? "1px solid rgba(168,137,90,0.15)" : "none",
                  borderBottom: "1px solid rgba(168,137,90,0.15)",
                  padding: "32px 0",
                  display: "grid", gridTemplateColumns: "96px 1fr auto",
                  gap: 28, alignItems: "start",
                }}>
                  <div style={{
                    width: 96, height: 120,
                    background: "linear-gradient(145deg, var(--walnut), var(--espresso))",
                    flexShrink: 0,
                  }} />
                  <div>
                    <div style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 400,
                      color: "var(--parchment)", marginBottom: 6, letterSpacing: "-0.01em" }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: "var(--tobacco)", letterSpacing: "0.08em",
                      fontFamily: "var(--sans)", fontWeight: 300, marginBottom: 20 }}>
                      {item.collection} · {item.color} · {item.size}
                    </div>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      {[-1, 1].map((d, di) => (
                        <button key={di} onClick={() => updateQty(item.key, d)} style={{
                          width: 30, height: 30, background: "none",
                          border: "1px solid rgba(168,137,90,0.2)",
                          color: "var(--parchment)", cursor: "none", fontSize: 16,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          borderRadius: 0,
                        }}>{d === -1 ? "−" : "+"}</button>
                      ))}
                      <span style={{ fontSize: 14, color: "var(--parchment)", minWidth: 20, textAlign: "center" }}>
                        {item.qty}
                      </span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "var(--serif)", fontSize: 18,
                      color: "var(--linen)", marginBottom: 12 }}>SGD {item.price * item.qty}</div>
                    <button onClick={() => removeItem(item.key)} style={{
                      background: "none", border: "none", color: "rgba(107,79,53,0.5)",
                      cursor: "none", fontSize: 10, letterSpacing: "0.14em",
                      textTransform: "uppercase", fontFamily: "var(--sans)",
                    }}>Remove</button>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 32 }}>
                <Link href="/collections" style={{ fontSize: 11, letterSpacing: "0.16em",
                  textTransform: "uppercase", color: "var(--tobacco)", textDecoration: "none",
                  fontFamily: "var(--sans)" }}>← Continue</Link>
              </div>
            </div>

            <div style={{ position: "sticky", top: 100 }}>
              <div style={{ borderTop: "1px solid rgba(168,137,90,0.15)", paddingTop: 24 }}>
                <div style={{ fontFamily: "var(--serif)", fontSize: 18, fontWeight: 400,
                  color: "var(--parchment)", marginBottom: 24 }}>Summary</div>
                <div style={{ display: "flex", justifyContent: "space-between",
                  fontSize: 13, color: "var(--tobacco)", marginBottom: 12,
                  fontFamily: "var(--sans)", fontWeight: 300 }}>
                  <span>Subtotal</span><span>SGD {subtotal}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between",
                  fontSize: 13, color: "var(--tobacco)", marginBottom: 28,
                  fontFamily: "var(--sans)", fontWeight: 300 }}>
                  <span>Shipping</span><span>At checkout</span>
                </div>
                <Link href="/checkout" style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "var(--parchment)", color: "var(--ink)", padding: "16px",
                  fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase",
                  textDecoration: "none", fontFamily: "var(--sans)", marginBottom: 32,
                }}>Checkout</Link>
                <div style={{ fontSize: 11, color: "rgba(107,79,53,0.5)", fontFamily: "var(--sans)",
                  lineHeight: 1.9, letterSpacing: "0.06em" }}>
                  Plain packaging · GZ Private Ltd billing · Free returns within 14 days
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <style>{`
        @media(max-width:900px){ .cart-layout { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
