"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQty, removeItem, subtotal } = useCart();

  return (
    <>
      <div onClick={closeCart} style={{
        position: "fixed", inset: 0, background: "rgba(14,10,6,0.75)",
        zIndex: 490, opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? "all" : "none",
        transition: "opacity 0.4s var(--ease-expo)", backdropFilter: isOpen ? "blur(4px)" : "none",
      }} />

      <div style={{
        position: "fixed", top: 0, right: 0, width: 400, maxWidth: "100vw",
        height: "100vh", background: "var(--espresso)", zIndex: 500,
        transform: isOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.45s var(--ease-expo)",
        display: "flex", flexDirection: "column",
        borderLeft: "1px solid var(--border)",
      }}>
        {/* Header */}
        <div style={{
          padding: "32px 36px 24px",
          borderBottom: "1px solid rgba(168,137,90,0.1)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexShrink: 0,
        }}>
          <span style={{ fontFamily: "var(--serif)", fontSize: 20, fontWeight: 400,
            letterSpacing: "0.05em", color: "var(--parchment)" }}>Bag</span>
          <button onClick={closeCart} style={{
            background: "none", border: "none", color: "var(--tobacco)",
            fontSize: 18, padding: 4, lineHeight: 1,
            transition: "color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--parchment)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--tobacco)")}>✕</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {items.length === 0 ? (
            <div style={{ padding: "80px 36px", textAlign: "center" }}>
              <div style={{ fontFamily: "var(--serif)", fontSize: 24, fontWeight: 400,
                color: "var(--text-secondary)", marginBottom: 16 }}>The bag is empty.</div>
              <p style={{ fontSize: 13, color: "var(--text-muted)", fontFamily: "var(--sans)",
                fontWeight: 300, lineHeight: 1.8, marginBottom: 32 }}>
                Browse the collections to find something precisely right.
              </p>
              <button onClick={closeCart} style={{
                background: "none", border: "1px solid var(--border)",
                color: "var(--text-secondary)", padding: "12px 24px", fontSize: 10,
                letterSpacing: "0.2em", textTransform: "uppercase",
                fontFamily: "var(--sans)", transition: "all 0.25s", cursor: "pointer",
              }}>Browse</button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.key} style={{
                padding: "24px 36px",
                borderBottom: "1px solid rgba(168,137,90,0.08)",
                display: "grid", gridTemplateColumns: "64px 1fr", gap: 20,
              }}>
                <div style={{
                  width: 64, height: 80,
                  background: "linear-gradient(145deg, var(--walnut), var(--espresso))",
                  flexShrink: 0,
                }} />
                <div>
                  <div style={{ fontFamily: "var(--serif)", fontSize: 17, fontWeight: 400,
                    color: "var(--parchment)", marginBottom: 4, lineHeight: 1.2 }}>{item.name}</div>
                  <div style={{ fontSize: 11, color: "var(--tobacco)", letterSpacing: "0.08em",
                    fontFamily: "var(--sans)", marginBottom: 14, fontWeight: 300 }}>
                    {item.color} · {item.size}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <button onClick={() => updateQty(item.key, -1)} style={{
                        width: 26, height: 26, background: "none",
                        border: "1px solid var(--border)",
                        color: "var(--text-primary)", fontSize: 14,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        borderRadius: 0, transition: "all 0.2s", cursor: "pointer",
                      }}>−</button>
                      <span style={{ fontSize: 13, minWidth: 16, textAlign: "center",
                        color: "var(--text-primary)" }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.key, 1)} style={{
                        width: 26, height: 26, background: "none",
                        border: "1px solid var(--border)",
                        color: "var(--text-primary)", fontSize: 14,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        borderRadius: 0, transition: "all 0.2s", cursor: "pointer",
                      }}>+</button>
                    </div>
                    <span style={{ fontSize: 15, color: "var(--text-primary)",
                      fontFamily: "var(--serif)" }}>SGD {item.price * item.qty}</span>
                  </div>
                  <button onClick={() => removeItem(item.key)} style={{
                    background: "none", border: "none", color: "var(--text-muted)",
                    fontSize: 10, letterSpacing: "0.14em",
                    textTransform: "uppercase", padding: 0, marginTop: 10,
                    fontFamily: "var(--sans)", transition: "color 0.2s", cursor: "pointer",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: "24px 36px", borderTop: "1px solid rgba(168,137,90,0.1)", flexShrink: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between",
              marginBottom: 8, alignItems: "baseline" }}>
              <span style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase",
                color: "var(--tobacco)", fontFamily: "var(--sans)" }}>Subtotal</span>
              <span style={{ fontFamily: "var(--serif)", fontSize: 20,
                color: "var(--parchment)" }}>SGD {subtotal}</span>
            </div>
            <p style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 20,
              letterSpacing: "0.06em", fontFamily: "var(--sans)" }}>
              Shipping at checkout · Plain packaging
            </p>
            <Link href="/checkout" onClick={closeCart} style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "var(--text-primary)", color: "var(--bg)",
              padding: "16px", fontSize: 11, letterSpacing: "0.22em",
              textTransform: "uppercase", textDecoration: "none",
              fontFamily: "var(--sans)", fontWeight: 400,
              transition: "background 0.25s", marginBottom: 8,
            }}>Checkout</Link>
            <Link href="/cart" onClick={closeCart} style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "transparent", color: "var(--text-secondary)",
              border: "1px solid var(--border)",
              padding: "14px", fontSize: 11, letterSpacing: "0.18em",
              textTransform: "uppercase", textDecoration: "none",
              fontFamily: "var(--sans)", fontWeight: 300,
            }}>View Bag</Link>
          </div>
        )}
      </div>
    </>
  );
}
