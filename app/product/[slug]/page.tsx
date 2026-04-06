import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts, PRODUCTS } from "@/lib/products";
import ProductClient from "./ProductClient";
import Link from "next/link";

interface Props { params: Promise<{ slug: string }>; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) return { title: "Not Found" };
  return { title: p.name, description: p.short };
}

export async function generateStaticParams() {
  return PRODUCTS.map(p => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const related = getRelatedProducts(product, 3);

  return (
    <>
      <ProductClient product={product} />

      {related.length > 0 && (
        <section style={{
          background: "var(--espresso)",
          borderTop: "1px solid rgba(168,137,90,0.1)",
          padding: "80px",
        }}>
          <div style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase",
            color: "var(--brass)", fontFamily: "var(--sans)", marginBottom: 48 }}>
            From the same collection
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: `repeat(${related.length}, 1fr)`,
            gap: 2, background: "rgba(168,137,90,0.1)",
          }} className="related-grid">
            {related.map(p => (
              <Link key={p.id} href={`/product/${p.slug}`}
                style={{ textDecoration: "none", display: "block" }}>
                <div className="related-card" style={{
                  background: "var(--espresso)",
                  padding: "40px 32px 32px",
                  transition: "background 0.35s var(--ease-expo)",
                  cursor: "none",
                }}>
                  <div style={{ width: "100%", aspectRatio: "3/4",
                    background: "linear-gradient(145deg, var(--walnut), var(--ink))",
                    marginBottom: 20, display: "flex", alignItems: "center",
                    justifyContent: "center", overflow: "hidden", position: "relative" }}>
                    <div style={{
                      fontFamily: "var(--serif)", fontSize: 60, fontWeight: 400,
                      color: "transparent", WebkitTextStroke: "1px rgba(200,180,154,0.1)",
                    }}>{p.name.charAt(0)}</div>
                  </div>
                  <div style={{ fontFamily: "var(--serif)", fontSize: 20, fontWeight: 400,
                    color: "var(--parchment)", marginBottom: 6 }}>{p.name}</div>
                  <div style={{ fontSize: 13, color: "var(--tobacco)", fontFamily: "var(--serif)",
                    fontStyle: "italic" }}>SGD {p.price}</div>
                </div>
              </Link>
            ))}
          </div>
          <style>{`
            .related-card:hover { background: var(--walnut) !important; }
            @media(max-width:768px){ .related-grid { grid-template-columns: 1fr !important; } }
          `}</style>
        </section>
      )}
    </>
  );
}
