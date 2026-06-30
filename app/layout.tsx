import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sol Elegance — Boutique de moda femenina",
  description:
    "Prendas seleccionadas para la mujer que se siente segura en su propia piel. Diseños femeninos, atemporales y llenos de detalle. Envíos a todo el país.",
  icons: { icon: "/logo.png" },
  openGraph: {
    title: "Sol Elegance",
    description: "Boutique de moda femenina · Envíos a todo el país",
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Jost:wght@300;400;500;600&family=Pinyon+Script&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
