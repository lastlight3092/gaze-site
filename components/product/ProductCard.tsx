"use client";

import Link from "next/link";
import type { Product } from "@/types";

const collectionIcons: Record<string, string> = {
  core: "◻",
  "after-dark": "◈",
  resort: "◎",
  vault: "◇",
};

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product }: ProductCardProps) {
  const icon = collectionIcons[product.collection] ?? "◻";

  return (
    <Link
      href={`/product/${product.slug}`}
      style={{ textDecoration: "none", display: "block" }}
    >
      <article
        style={{
          background: "var(--charcoal)",
          cursor: "pointer",
          overflow: "hidden",
          transition: "background 0.25s",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.background = "var(--walnut)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.background =
            "var(--charcoal)")
        }
      >
        {/* Image area */}
        <div
          style={{
            width: "100%",
            aspectRatio: "3/4",
            background: "var(--walnut)",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Placeholder visual */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              opacity: 0.35,
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                border: "1px solid var(--border-light)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                color: "var(--text-muted)",
              }}
            >
              {icon}
            </div>
            <span
              style={{
                fontSize: 9,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                fontFamily: "var(--sans)",
              }}
            >
              {product.collectionName}
            </span>
          </div>

          {/* Badge */}
          {product.badge && (
            <div
              style={{
                position: "absolute",
                top: 12,
                left: 12,
                background: "var(--brass)",
                color: "var(--obsidian)",
                fontSize: 9,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "4px 8px",
                fontFamily: "var(--sans)",
                fontWeight: 500,
              }}
            >
              {product.badge}
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: "20px 20px 24px" }}>
          <div
            style={{
              fontSize: 10,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--brass)",
              marginBottom: 6,
            }}
          >
            {product.collectionName}
          </div>
          <h3
            style={{
              fontFamily: "var(--serif)",
              fontSize: 20,
              fontWeight: 300,
              color: "var(--text-primary)",
              marginBottom: 4,
              lineHeight: 1.2,
              letterSpacing: "0.02em",
            }}
          >
            {product.name}
          </h3>
          <p
            style={{
              fontSize: 12,
              color: "var(--text-muted)",
              lineHeight: 1.6,
              marginBottom: 12,
            }}
          >
            {product.short}
          </p>
          <div
            style={{
              fontSize: 14,
              color: "var(--bone)",
              letterSpacing: "0.04em",
            }}
          >
            SGD {product.price}
          </div>
        </div>
      </article>
    </Link>
  );
}
