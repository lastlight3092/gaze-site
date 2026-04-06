"use client";
import { useState } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import ProductClient from "@/app/product/[slug]/ProductClient";

type Tab = "overview" | "orders" | "addresses" | "wishlist" | "profile";

const orders = [
  { id: "GZ-2024-04821", date: "12 Mar 2024", status: "Delivered", amount: 346 },
  { id: "GZ-2024-03204", date: "28 Jan 2024", status: "Delivered", amount: 228 },
  { id: "GZ-2023-11882", date: "5 Dec 2023",  status: "Delivered", amount: 416 },
  { id: "GZ-2023-09445", date: "18 Oct 2023", status: "Delivered", amount: 268 },
];

const tabs: { id: Tab; label: string }[] = [
  { id: "overview",   label: "Overview" },
  { id: "orders",     label: "Orders" },
  { id: "addresses",  label: "Addresses" },
  { id: "wishlist",   label: "Wishlist" },
  { id: "profile",    label: "Profile" },
];

export default function AccountPage() {
  const [tab, setTab] = useState<Tab>("overview");
  const wishlist = [PRODUCTS[10], PRODUCTS[11]];

  return (
    <div style={{ paddingTop: "calc(64px + 60px)", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ padding: "0 120px 48px", borderBottom: "1px solid rgba(168,137,90,0.1)" }}
        className="acc-header">
        <div style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase",
          color: "var(--brass)", fontFamily: "var(--sans)", marginBottom: 20 }}>Private Account</div>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(36px,5vw,64px)", fontWeight: 400,
          color: "var(--parchment)", letterSpacing: "-0.01em" }}>
          Marcus Wong.
        </h1>
      </div>

      {/* Tab nav */}
      <div style={{ padding: "0 120px", borderBottom: "1px solid rgba(168,137,90,0.08)",
        display: "flex", gap: 0 }} className="acc-nav">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            background: "none", border: "none", padding: "20px 0",
            marginRight: 40,
            fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
            color: tab === t.id ? "var(--parchment)" : "var(--tobacco)",
            fontFamily: "var(--sans)", fontWeight: 300,
            borderBottom: `1px solid ${tab === t.id ? "var(--brass)" : "transparent"}`,
            transition: "color 0.25s, border-color 0.25s",
            marginBottom: -1,
          }}>
            {t.label}
          </button>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
          <Link href="/" style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase",
            color: "rgba(107,79,53,0.5)", textDecoration: "none", fontFamily: "var(--sans)" }}>
            Sign out
          </Link>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "64px 120px 100px" }} className="acc-content">

        {tab === "overview" && (
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10,
              background: "rgba(168,137,90,0.08)", border: "1px solid rgba(168,137,90,0.2)",
              padding: "10px 20px", marginBottom: 48 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--brass)" }} />
              <span style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
                color: "var(--brass)", fontFamily: "var(--sans)" }}>Private Access — Active</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2,
              background: "rgba(168,137,90,0.08)", marginBottom: 64 }} className="acc-stats">
              {[["4","Total orders"],["11","Pieces owned"],["SGD 1,258","Total spent"]].map(([val,lbl]) => (
                <div key={lbl} style={{ background: "var(--ink)", padding: "36px 32px" }}>
                  <div style={{ fontFamily: "var(--serif)", fontSize: 36, fontWeight: 400,
                    color: "var(--parchment)", marginBottom: 8 }}>{val}</div>
                  <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase",
                    color: "var(--tobacco)", fontFamily: "var(--sans)" }}>{lbl}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
              color: "var(--tobacco)", fontFamily: "var(--sans)", marginBottom: 20 }}>
              Recent orders
            </div>
            {orders.slice(0,2).map(o => (
              <div key={o.id} style={{ display: "flex", justifyContent: "space-between",
                alignItems: "center", padding: "20px 0",
                borderBottom: "1px solid rgba(168,137,90,0.06)", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 13, color: "var(--brass)", fontFamily: "var(--sans)",
                    letterSpacing: "0.08em", marginBottom: 4 }}>{o.id}</div>
                  <div style={{ fontSize: 12, color: "var(--tobacco)", fontFamily: "var(--sans)" }}>{o.date}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                  <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
                    color: "var(--tobacco)", fontFamily: "var(--sans)", padding: "4px 12px",
                    border: "1px solid rgba(168,137,90,0.15)" }}>{o.status}</div>
                  <div style={{ fontFamily: "var(--serif)", fontSize: 16,
                    color: "var(--parchment)" }}>SGD {o.amount}</div>
                </div>
              </div>
            ))}
            <button onClick={() => setTab("orders")} style={{
              background: "none", border: "none", color: "var(--brass)",
              fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase",
              fontFamily: "var(--sans)", marginTop: 20, padding: 0,
              display: "flex", alignItems: "center", gap: 12,
            }}>
              All orders
              <span style={{ display: "block", width: 24, height: 1, background: "var(--brass)" }} />
            </button>
          </div>
        )}

        {tab === "orders" && (
          <div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 28, fontWeight: 400,
              color: "var(--parchment)", marginBottom: 40, letterSpacing: "-0.01em" }}>Orders</h2>
            {orders.map((o, i) => (
              <div key={o.id} style={{ display: "flex", justifyContent: "space-between",
                alignItems: "center", padding: "24px 0",
                borderTop: i === 0 ? "1px solid rgba(168,137,90,0.12)" : "none",
                borderBottom: "1px solid rgba(168,137,90,0.06)", flexWrap: "wrap", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 13, color: "var(--brass)", fontFamily: "var(--sans)",
                    letterSpacing: "0.08em", marginBottom: 6 }}>{o.id}</div>
                  <div style={{ fontSize: 12, color: "var(--tobacco)", fontFamily: "var(--sans)" }}>{o.date}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
                  <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
                    color: "var(--tobacco)", fontFamily: "var(--sans)", padding: "5px 14px",
                    border: "1px solid rgba(168,137,90,0.15)" }}>{o.status}</div>
                  <div style={{ fontFamily: "var(--serif)", fontSize: 18,
                    color: "var(--parchment)" }}>SGD {o.amount}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "addresses" && (
          <div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 28, fontWeight: 400,
              color: "var(--parchment)", marginBottom: 40, letterSpacing: "-0.01em" }}>Addresses</h2>
            <div style={{ border: "1px solid rgba(168,137,90,0.15)", padding: "32px",
              maxWidth: 440, marginBottom: 24 }}>
              <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase",
                color: "var(--brass)", fontFamily: "var(--sans)", marginBottom: 16 }}>Default</div>
              <div style={{ fontSize: 14, color: "var(--tan)", fontFamily: "var(--sans)",
                fontWeight: 300, lineHeight: 2 }}>
                Marcus Wong<br />
                12 Orchard Road, #08-01<br />
                Singapore 238823
              </div>
            </div>
            <button style={{ background: "none", border: "1px solid rgba(168,137,90,0.2)",
              color: "var(--tan)", padding: "10px 24px", fontSize: 10,
              letterSpacing: "0.18em", textTransform: "uppercase",
              fontFamily: "var(--sans)" }}>
              Add address
            </button>
          </div>
        )}

        {tab === "wishlist" && (
          <div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 28, fontWeight: 400,
              color: "var(--parchment)", marginBottom: 40, letterSpacing: "-0.01em" }}>Wishlist</h2>
            {wishlist.map(p => (
              <Link key={p.id} href={`/product/${p.slug}`}
                style={{ textDecoration: "none", display: "block" }}>
                <div style={{ display: "grid", gridTemplateColumns: "80px 1fr auto",
                  gap: 28, padding: "24px 0", borderBottom: "1px solid rgba(168,137,90,0.06)",
                  alignItems: "center",
                  transition: "background 0.25s",
                }} className="wishlist-row">
                  <div style={{ width: 80, height: 100,
                    background: "linear-gradient(145deg, var(--walnut), var(--espresso))" }} />
                  <div>
                    <div style={{ fontFamily: "var(--serif)", fontSize: 20, fontWeight: 400,
                      color: "var(--parchment)", marginBottom: 6 }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: "var(--tobacco)", fontFamily: "var(--sans)",
                      fontWeight: 300 }}>{p.collectionName}</div>
                  </div>
                  <div style={{ fontFamily: "var(--serif)", fontSize: 17,
                    color: "var(--linen)" }}>SGD {p.price}</div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {tab === "profile" && (
          <div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 28, fontWeight: 400,
              color: "var(--parchment)", marginBottom: 40, letterSpacing: "-0.01em" }}>Profile</h2>
            <div style={{ maxWidth: 520, display: "flex", flexDirection: "column", gap: 28 }}>
              {[
                { label: "First name", val: "Marcus", type: "text" },
                { label: "Last name",  val: "Wong",   type: "text" },
                { label: "Email",      val: "m.wong@private.com", type: "email" },
                { label: "Phone",      val: "+65 9123 4567", type: "tel" },
              ].map(f => (
                <div key={f.label}>
                  <label style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
                    color: "var(--tobacco)", fontFamily: "var(--sans)", display: "block",
                    marginBottom: 8 }}>{f.label}</label>
                  <input defaultValue={f.val} type={f.type} style={{
                    background: "transparent", border: "none",
                    borderBottom: "1px solid rgba(168,137,90,0.2)",
                    color: "var(--parchment)", fontSize: 15, padding: "10px 0",
                    fontFamily: "var(--sans)", fontWeight: 300,
                    letterSpacing: "0.02em",
                  }} />
                </div>
              ))}
              <button style={{
                background: "var(--parchment)", color: "var(--ink)", border: "none",
                padding: "14px 32px", fontSize: 11, letterSpacing: "0.22em",
                textTransform: "uppercase", fontFamily: "var(--sans)",
                fontWeight: 400, alignSelf: "flex-start", marginTop: 8,
              }}>Save changes</button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .wishlist-row:hover { background: rgba(44,32,24,0.3) !important; }
        @media(max-width:1024px){
          .acc-header, .acc-nav, .acc-content { padding-left: 48px !important; padding-right: 48px !important; }
          .acc-stats { grid-template-columns: 1fr 1fr !important; }
        }
        @media(max-width:600px){
          .acc-header, .acc-nav, .acc-content { padding-left: 24px !important; padding-right: 24px !important; }
          .acc-stats { grid-template-columns: 1fr !important; }
          .acc-nav { gap: 0 !important; overflow-x: auto; }
          .acc-nav button { margin-right: 24px !important; }
        }
      `}</style>
    </div>
  );
}
