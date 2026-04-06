export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductSpecs {
  Silhouette: string;
  Composition: string;
  Fit: string;
  Rise: string;
  Support: string;
  Waistband: string;
  Opacity: string;
  Cooling: string;
  Stretch: string;
  Country: string;
}

export type CollectionSlug = "core" | "after-dark" | "resort" | "vault";

export interface Product {
  id: string;
  slug: string;
  name: string;
  collection: CollectionSlug;
  collectionName: string;
  short: string;
  long: string;
  price: number;
  sizes: string[];
  colors: ProductColor[];
  badge?: string | null;
  specs: ProductSpecs;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export interface CartItem {
  key: string;
  productId: string;
  slug: string;
  name: string;
  collection: string;
  price: number;
  color: string;
  size: string;
  qty: number;
}

export interface Collection {
  slug: CollectionSlug;
  name: string;
  number: string;
  tagline: string;
  description: string;
}

export type CheckoutStep = "contact" | "delivery" | "payment" | "review";

export interface ShippingOption {
  id: string;
  name: string;
  time: string;
  price: number | null;
  label: string;
}
