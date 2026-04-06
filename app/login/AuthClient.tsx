"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthClient({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push("/account"), 700);
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 480px", minHeight: "100vh",
      paddingTop: 64 }} className="auth-layout">
      {/* Visual panel */}
      <div style={{
        background: "linear-gradient(160deg, var(--walnut) 0%, var(--espresso) 50%, var(--ink) 100%)",
        position: "relative", overflow: "hidden",
        display: "flex", alignItems: "flex-end", padding: "80px",
      }} className="auth-visual">
        <div aria-hidden style={{ position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: "repeating-linear-gradient(45deg, var(--linen) 0, var(--linen) 1px, transparent 0, transparent 50%)",
          backgroundSize: "28px 28px" }} />
        <div aria-hidden style={{ position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 30% 60%, rgba(107,79,53,0.25) 0%, transparent 65%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <blockquote style={{ fontFamily: "var(--serif)", fontSize: "clamp(24px,3vw,44px)",
            fontWeight: 400, lineHeight: 1.2, color: "var(--parchment)", fontStyle: "italic",
            marginBottom: 24, maxWidth: 420 }}>
            &ldquo;{mode === "login"
              ? "The well-dressed man is one whose clothing is entirely unobtrusive."
              : "Luxury is not about possession. It is about precision."}&rdquo;
          </blockquote>
          <div style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase",
            color: "var(--brass)", fontFamily: "var(--sans)" }}>— The GAZE Standard</div>
        </div>
      </div>

      {/* Form */}
      <div style={{ background: "var(--ink)", display: "flex", alignItems: "center",
        justifyContent: "center", padding: "48px 56px" }}>
        <div style={{ width: "100%", maxWidth: 340 }}>
          <Link href="/" style={{ fontFamily: "var(--serif)", fontSize: 20, letterSpacing: "0.25em",
            color: "var(--parchment)", textDecoration: "none", display: "block",
            marginBottom: 52, textTransform: "uppercase" }}>Gaze</Link>

          <h1 style={{ fontFamily: "var(--serif)", fontSize: 30, fontWeight: 400,
            marginBottom: 8, color: "var(--parchment)" }}>
            {mode === "login" ? "Sign in." : "Join."}
          </h1>
          <p style={{ fontSize: 13, color: "var(--tobacco)", marginBottom: 40,
            fontFamily: "var(--sans)", fontWeight: 300, lineHeight: 1.6 }}>
            {mode === "login" ? "Access your private account." : "Join a private circle of considered men."}
          </p>

          <form onSubmit={handleSubmit}>
            {mode === "signup" && (
              <div style={{ marginBottom: 24 }}>
                <label style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
                  color: "var(--tobacco)", fontFamily: "var(--sans)", display: "block", marginBottom: 8 }}>
                  Name
                </label>
                <input type="text" placeholder="First name" />
              </div>
            )}
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
                color: "var(--tobacco)", fontFamily: "var(--sans)", display: "block", marginBottom: 8 }}>
                Email
              </label>
              <input type="email" placeholder="your@email.com" required />
            </div>
            <div style={{ marginBottom: mode === "login" ? 12 : 24 }}>
              <label style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
                color: "var(--tobacco)", fontFamily: "var(--sans)", display: "block", marginBottom: 8 }}>
                Password
              </label>
              <input type="password" placeholder="··········" required />
            </div>
            {mode === "login" && (
              <div style={{ textAlign: "right", marginBottom: 28 }}>
                <span style={{ fontSize: 11, color: "rgba(107,79,53,0.6)",
                  letterSpacing: "0.08em", fontFamily: "var(--sans)" }}>Forgot password?</span>
              </div>
            )}
            {mode === "signup" && (
              <p style={{ fontSize: 11, color: "rgba(107,79,53,0.5)", marginBottom: 24,
                lineHeight: 1.8, fontFamily: "var(--sans)", letterSpacing: "0.04em" }}>
                Your data is held privately. We do not share or sell your information.
              </p>
            )}
            <button type="submit" disabled={loading} style={{
              width: "100%", padding: "16px", background: "var(--parchment)",
              color: "var(--ink)", border: "none", fontSize: 11, letterSpacing: "0.22em",
              textTransform: "uppercase", fontFamily: "var(--sans)",
              fontWeight: 400, transition: "background 0.25s", opacity: loading ? 0.6 : 1,
              marginBottom: 24,
            }}>
              {loading ? "···" : mode === "login" ? "Sign in" : "Create account"}
            </button>
          </form>
          <p style={{ fontSize: 12, color: "var(--tobacco)", textAlign: "center",
            fontFamily: "var(--sans)", fontWeight: 300 }}>
            {mode === "login" ? (
              <><span>No account? </span><Link href="/signup" style={{ color: "var(--brass)", textDecoration: "none" }}>Join →</Link></>
            ) : (
              <><span>Have an account? </span><Link href="/login" style={{ color: "var(--brass)", textDecoration: "none" }}>Sign in →</Link></>
            )}
          </p>
        </div>
      </div>
      <style>{`
        @media(max-width:768px){ .auth-layout { grid-template-columns: 1fr !important; } .auth-visual { display: none !important; } }
      `}</style>
    </div>
  );
}
