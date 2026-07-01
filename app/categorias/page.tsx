import { PageShell } from "@/components/PageShell";
import { Categories } from "@/components/Categories";

export const metadata = {
  title: "Categorías — Sol Elegance",
  description: "Explorá todas las categorías de prendas de Sol Elegance.",
};

export default function CategoriasPage() {
  return (
    <PageShell showHeader={false}>
      <Categories />
    </PageShell>
  );
}
