"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { itemCount, openCart } = useCart();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(14,13,12,0.97)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 40px",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--serif)",
            fontSize: 26,
            fontWeight: 300,
            letterSpacing: "0.22em",
            color: "var(--text-primary)",
            textDecoration: "none",
          }}
        >
          GAZE
        </Link>

        {/* Desktop Nav */}
        <nav
          style={{
            display: "flex",
            gap: 32,
            alignItems: "center",
          }}
          className="gaze-desktop-nav"
        >
          {[
            { href: "/collections", label: "Collections" },
            { href: "/materials", label: "Materials" },
            { href: "/fit-guide", label: "Fit Guide" },
            { href: "/about", label: "About" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--text-secondary)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "var(--text-primary)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color =
                  "var(--text-secondary)")
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <Link
            href="/account"
            style={{
              background: "none",
              border: "none",
              color: "var(--text-secondary)",
              fontSize: 18,
              cursor: "pointer",
              padding: 4,
              textDecoration: "none",
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
            }}
            title="Account"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <circle cx="9" cy="6" r="3.5" />
              <path d="M2 16c0-3.866 3.134-7 7-7s7 3.134 7 7" />
            </svg>
          </Link>

          <button
            onClick={openCart}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-secondary)",
              cursor: "pointer",
              padding: 4,
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
            title="Cart"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path d="M1 1h2.5l2 10h9l2-8H5" />
              <circle cx="8" cy="15.5" r="1" fill="currentColor" />
              <circle cx="14" cy="15.5" r="1" fill="currentColor" />
            </svg>
            {itemCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -4,
                  right: -6,
                  background: "var(--brass)",
                  color: "var(--obsidian)",
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  fontSize: 9,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--sans)",
                  fontWeight: 500,
                }}
              >
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .gaze-desktop-nav { display: none !important; }
        }
      `}</style>
    </header>
  );
}
