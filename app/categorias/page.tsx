import { PageShell } from "@/components/PageShell";
import { CatalogWithQuery } from "@/components/CatalogWithQuery";
import { Suspense } from "react";

export const metadata = {
  title: "Categorías — Sol Elegance",
  description: "Explorá todas las categorías de prendas de Sol Elegance.",
};

export default function CategoriasPage() {
  return (
    <PageShell showHeader={false}>
      <Suspense fallback={null}>
        <CatalogWithQuery />
      </Suspense>
    </PageShell>
  );
}
