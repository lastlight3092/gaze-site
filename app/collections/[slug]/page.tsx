import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCollectionBySlug, getProductsByCollection } from "@/lib/products";
import type { CollectionSlug } from "@/types";
import CollectionClient from "./CollectionClient";

interface Props { params: Promise<{ slug: string }>; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const coll = getCollectionBySlug(slug);
  if (!coll) return { title: "Not Found" };
  return { title: coll.name, description: coll.description };
}

export async function generateStaticParams() {
  return [{ slug: "core" }, { slug: "after-dark" }, { slug: "resort" }, { slug: "vault" }];
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const coll = getCollectionBySlug(slug);
  if (!coll) notFound();
  const products = getProductsByCollection(slug as CollectionSlug);
  return <CollectionClient collection={coll} initialProducts={products} />;
}
