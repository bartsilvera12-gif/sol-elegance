import { PageShell } from "@/components/PageShell";
import { Contact } from "@/components/Contact";

export const metadata = {
  title: "Contacto — Sol Elegance",
  description: "Escribinos por WhatsApp o Instagram. Atención personalizada todos los días.",
};

export default function ContactoPage() {
  return (
    <PageShell showHeader={false}>
      <Contact />
    </PageShell>
  );
}
