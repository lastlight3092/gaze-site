import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import SiteHeader from "@/components/layout/SiteHeader";
import CartDrawer from "@/components/cart/CartDrawer";

export const metadata: Metadata = {
  title: { default: "GAZE", template: "%s — GAZE" },
  description: "Private luxury. Bangkok-made.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <CartProvider>
          <SiteHeader />
          <main>{children}</main>
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
