import { PageShell } from "@/components/PageShell";
import { CatalogWithQuery } from "@/components/CatalogWithQuery";
import { Suspense } from "react";

export const metadata = {
  title: "Catálogo — Sol Elegance",
  description: "Todas las prendas seleccionadas de Sol Elegance. Consultá disponibilidad por WhatsApp.",
};

export default function CatalogoPage() {
  return (
    <PageShell showHeader={false}>
      <Suspense fallback={null}>
        <CatalogWithQuery />
      </Suspense>
    </PageShell>
  );
}
