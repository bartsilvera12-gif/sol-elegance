import { Navbar } from "@/components/Navbar";
import { ImmersiveHome } from "@/components/ImmersiveHome";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

export default function Page() {
  return (
    <main>
      <Navbar />
      <ImmersiveHome />
      <FloatingWhatsApp />
    </main>
  );
}
