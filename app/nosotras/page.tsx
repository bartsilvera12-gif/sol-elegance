import { PageShell } from "@/components/PageShell";
import { About } from "@/components/About";

export const metadata = {
  title: "Nosotras — Sol Elegance",
  description: "La historia detrás de Sol Elegance: moda con alma femenina y atención cercana.",
};

export default function NosotrasPage() {
  return (
    <PageShell showHeader={false}>
      <About />
    </PageShell>
  );
}
