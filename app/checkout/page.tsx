"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

type Step = "delivery" | "payment" | "review";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [step, setStep] = useState<Step>("delivery");
  const [shipping, setShipping] = useState("standard");

  const shipCost = shipping === "express" ? 22 : shipping === "free" ? 0 : 8;

  function next() {
    if (step === "delivery") setStep("payment");
    else if (step === "payment") setStep("review");
    else { clearCart(); router.push("/checkout/success"); }
  }

  const steps: Step[] = ["delivery","payment","review"];
  const stepIdx = steps.indexOf(step);

  return (
    <>
      <style>{`
        .co-input { border-bottom: 1px solid var(--border); background: transparent; }
        .co-input:focus { border-bottom-color: var(--accent); }
        .ship-opt { border: 1px solid var(--border); padding: 18px 20px;
          transition: border-color 0.25s; margin-bottom: 8px;
          display: flex; justify-content: space-between; align-items: center; cursor: pointer; }
        .ship-opt.active { border-color: var(--accent); }
        .next-btn { width: 100%; padding: 18px; background: var(--text-primary); color: var(--bg);
          border: none; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
          font-family: var(--sans); font-weight: 400; transition: background 0.25s;
          margin-top: 32px; cursor: pointer; }
        .next-btn:hover { background: var(--accent); color: var(--bg); }
      `}</style>

      <div style={{ paddingTop: "64px", display: "grid", gridTemplateColumns: "1fr 400px",
        minHeight: "100vh" }} className="co-layout">

        {/* Form */}
        <div style={{ padding: "64px 80px 80px", borderRight: "1px solid rgba(168,137,90,0.08)" }}
          className="co-form">

          <Link href="/" style={{ fontFamily: "var(--serif)", fontSize: 18, letterSpacing: "0.25em",
            color: "var(--parchment)", textDecoration: "none", display: "block", marginBottom: 56,
            textTransform: "uppercase" }}>Gaze</Link>

          {/* Steps */}
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 56 }}>
            {steps.map((s, i) => (
              <span key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {i > 0 && <span style={{ width: 24, height: 1, background: "rgba(168,137,90,0.2)", display: "block" }} />}
                <span style={{
                  fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
                  color: i < stepIdx ? "var(--brass)" : i === stepIdx ? "var(--parchment)" : "var(--tobacco)",
                  fontFamily: "var(--sans)", display: "flex", alignItems: "center", gap: 6,
                }}>
                  <span style={{ width: 18, height: 18, borderRadius: "50%",
                    border: `1px solid currentColor`, display: "inline-flex",
                    alignItems: "center", justifyContent: "center", fontSize: 9 }}>
                    {i < stepIdx ? "✓" : i + 1}
                  </span>
                  {s}
                </span>
              </span>
            ))}
          </div>

          {step === "delivery" && (
            <div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 28, fontWeight: 400,
                color: "var(--parchment)", marginBottom: 32 }}>Delivery</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                <Field label="First name"><input className="co-input" placeholder="Marcus" /></Field>
                <Field label="Last name"><input className="co-input" placeholder="Wong" /></Field>
              </div>
              <Field label="Address"><input className="co-input" placeholder="Street · Unit" style={{ marginBottom: 20 }} /></Field>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32 }}>
                <Field label="City"><input className="co-input" placeholder="Singapore" /></Field>
                <Field label="Postal code"><input className="co-input" placeholder="238823" /></Field>
              </div>
              <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
                color: "var(--tobacco)", fontFamily: "var(--sans)", marginBottom: 16 }}>
                Shipping method
              </div>
              {[
                { id:"standard",name:"Standard",time:"3–5 days",price:"SGD 8" },
                { id:"express",name:"Express",time:"1–2 days",price:"SGD 22" },
                { id:"free",name:"Complimentary",time:"Orders over SGD 350",price:"Free" },
              ].map(o => (
                <div key={o.id} className={`ship-opt ${shipping===o.id?"active":""}`}
                  onClick={() => setShipping(o.id)}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 14, height: 14, borderRadius: "50%",
                      border: `1px solid ${shipping===o.id?"var(--brass)":"rgba(168,137,90,0.3)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {shipping===o.id && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--brass)" }} />}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, color: "var(--parchment)", fontFamily: "var(--sans)",
                        fontWeight: 300 }}>{o.name}</div>
                      <div style={{ fontSize: 11, color: "var(--tobacco)", fontFamily: "var(--sans)" }}>{o.time}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 13, color: "var(--parchment)", fontFamily: "var(--serif)" }}>{o.price}</div>
                </div>
              ))}
              <button className="next-btn" onClick={next}>Continue to Payment</button>
            </div>
          )}

          {step === "payment" && (
            <div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 28, fontWeight: 400,
                color: "var(--parchment)", marginBottom: 32 }}>Payment</div>
              <div style={{ border: "1px solid var(--border)", padding: "40px",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
                background: "var(--surface-alt)", marginBottom: 32 }}>
                <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "var(--text-muted)", fontFamily: "var(--sans)" }}>Secure payment</div>
                <div style={{ display: "flex", gap: 10 }}>
                  {["Visa","MC","Amex","PayNow"].map(m => (
                    <div key={m} style={{ border: "1px solid var(--border)",
                      padding: "5px 10px", fontSize: 10, color: "var(--text-secondary)",
                      fontFamily: "var(--sans)", letterSpacing: "0.06em" }}>{m}</div>
                  ))}
                </div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.08em" }}>
                  Stripe integration point
                </div>
              </div>
              <Field label="Name on card"><input className="co-input" placeholder="As on card" style={{ marginBottom: 20 }} /></Field>
              <Field label="Card number"><input className="co-input" placeholder="· · · ·   · · · ·   · · · ·   · · · ·" style={{ marginBottom: 20 }} /></Field>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <Field label="Expiry"><input className="co-input" placeholder="MM / YY" /></Field>
                <Field label="CVV"><input className="co-input" placeholder="· · ·" /></Field>
              </div>
              <button className="next-btn" onClick={next}>Review Order</button>
            </div>
          )}

          {step === "review" && (
            <div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 28, fontWeight: 400,
                color: "var(--parchment)", marginBottom: 32 }}>Review</div>
              {[
                { label: "Delivering to", body: "Marcus Wong\n12 Orchard Road, #08-01\nSingapore 238823" },
                { label: "Payment", body: "Visa ending 4821" },
                { label: "Shipping", body: shipping === "express" ? "Express · 1–2 days · SGD 22" : "Standard · 3–5 days · SGD 8" },
              ].map(b => (
                <div key={b.label} style={{ borderBottom: "1px solid rgba(168,137,90,0.1)",
                  padding: "20px 0", marginBottom: 0 }}>
                  <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
                    color: "var(--tobacco)", fontFamily: "var(--sans)", marginBottom: 8 }}>{b.label}</div>
                  <div style={{ fontSize: 14, color: "var(--parchment)", fontFamily: "var(--sans)",
                    fontWeight: 300, lineHeight: 1.8, whiteSpace: "pre-line" }}>{b.body}</div>
                </div>
              ))}
              <button className="next-btn" onClick={next}
                style={{ marginTop: 40 }}>Place Order</button>
              <p style={{ fontSize: 11, color: "var(--text-muted)", textAlign: "center",
                marginTop: 16, fontFamily: "var(--sans)", letterSpacing: "0.08em" }}>
                Plain packaging · Discreet billing
              </p>
            </div>
          )}
        </div>

        {/* Summary sidebar */}
        <div style={{ padding: "64px 48px", background: "var(--espresso)",
          borderLeft: "1px solid rgba(168,137,90,0.08)" }} className="co-summary">
          <div style={{ fontFamily: "var(--serif)", fontSize: 18, fontWeight: 400,
            color: "var(--parchment)", marginBottom: 32 }}>Order</div>
          {items.map(item => (
            <div key={item.key} style={{ display: "flex", gap: 16, marginBottom: 24,
              paddingBottom: 24, borderBottom: "1px solid rgba(168,137,90,0.08)" }}>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <div style={{ width: 56, height: 70, background: "var(--walnut)" }} />
                <div style={{ position: "absolute", top: -8, right: -8, width: 18, height: 18,
                  borderRadius: "50%", background: "var(--espresso)",
                  border: "1px solid rgba(168,137,90,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, color: "var(--tan)", fontFamily: "var(--sans)" }}>{item.qty}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "var(--serif)", fontSize: 15, fontWeight: 400,
                  color: "var(--parchment)", marginBottom: 4 }}>{item.name}</div>
                <div style={{ fontSize: 11, color: "var(--tobacco)", fontFamily: "var(--sans)",
                  fontWeight: 300 }}>{item.color} · {item.size}</div>
              </div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 15, color: "var(--linen)",
                whiteSpace: "nowrap" }}>SGD {item.price * item.qty}</div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid rgba(168,137,90,0.12)", paddingTop: 20, marginTop: 8 }}>
            {[["Subtotal", `SGD ${subtotal}`], ["Shipping", shipCost === 0 ? "Free" : `SGD ${shipCost}`]].map(([l,v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between",
                fontSize: 12, color: "var(--tobacco)", marginBottom: 10,
                fontFamily: "var(--sans)", fontWeight: 300 }}>
                <span>{l}</span><span>{v}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between",
              paddingTop: 14, borderTop: "1px solid rgba(168,137,90,0.1)", marginTop: 6 }}>
              <span style={{ fontFamily: "var(--serif)", fontSize: 16, color: "var(--parchment)" }}>Total</span>
              <span style={{ fontFamily: "var(--serif)", fontSize: 18, color: "var(--linen)" }}>
                SGD {subtotal + shipCost}
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){
          .co-layout { grid-template-columns: 1fr !important; }
          .co-summary { display: none !important; }
          .co-form { padding: 40px 24px 60px !important; }
        }
      `}</style>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
        color: "var(--tobacco)", fontFamily: "var(--sans)" }}>{label}</label>
      {children}
    </div>
  );
}
