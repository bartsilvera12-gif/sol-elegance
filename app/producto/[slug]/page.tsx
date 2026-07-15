import { PageShell } from "@/components/PageShell";
import { ProductDetail } from "@/components/ProductDetail";
import { PRODUCTS, productBySlug, slugify } from "@/lib/data";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: slugify(p.name) }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = productBySlug(params.slug);
  return {
    title: p ? `${p.name} — Sol Elegance` : "Producto — Sol Elegance",
    description: p?.desc,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = productBySlug(params.slug);
  if (!product) notFound();
  return (
    <PageShell showHeader={false}>
      <ProductDetail product={product} />
    </PageShell>
  );
}
