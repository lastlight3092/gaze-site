import ProductCard from "./ProductCard";
import type { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
}

export default function ProductGrid({
  products,
  columns = 4,
}: ProductGridProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 2,
        background: "var(--border)",
      }}
      className={`product-grid product-grid-${columns}`}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      <style>{`
        @media (max-width: 900px) {
          .product-grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
          .product-grid-3 { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .product-grid-4, .product-grid-3, .product-grid-2 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
