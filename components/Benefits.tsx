import { Reveal } from "./Reveal";

// Franja de beneficios / confianza, al estilo e-commerce (inspirada en Baco).
// Fondo claro cálido para separar del Hero oscuro y de las secciones blancas.

const ITEMS = [
  {
    title: "Envíos a todo el país",
    text: "Recibí tus prendas estés donde estés.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M3 6h11v9H3z" />
        <path d="M14 9h4l3 3v3h-7z" />
        <circle cx="7" cy="18" r="1.6" />
        <circle cx="17.5" cy="18" r="1.6" />
      </svg>
    ),
  },
  {
    title: "Atención personalizada",
    text: "Te asesoramos paso a paso por WhatsApp.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M21 11.5a8.4 8.4 0 0 1-12 7.5L3 21l2-6a8.4 8.4 0 1 1 16-3.5z" />
      </svg>
    ),
  },
  {
    title: "Selección a mano",
    text: "Cada prenda elegida con criterio.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 3l2.1 5.3L20 9.2l-4 3.8 1 5.9-5-2.8-5 2.8 1-5.9-4-3.8 5.9-.9z" />
      </svg>
    ),
  },
  {
    title: "Moda femenina",
    text: "Diseños atemporales que realzan tu esencia.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 20s-7-4.5-7-9.4A3.6 3.6 0 0 1 12 8a3.6 3.6 0 0 1 7 2.6C19 15.5 12 20 12 20z" />
      </svg>
    ),
  },
];

export function Benefits() {
  return (
    <section
      style={{
        background: "#faf7f2",
        borderTop: "1px solid rgba(154,115,40,.14)",
        borderBottom: "1px solid rgba(154,115,40,.14)",
        padding: "clamp(40px,5vw,66px) clamp(20px,5vw,64px)",
      }}
    >
      <div
        className="container-x"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "clamp(24px,3vw,40px)",
        }}
      >
        {ITEMS.map((b, i) => (
          <Reveal key={b.title} delay={i * 70}>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div
                style={{
                  flex: "0 0 auto",
                  width: 46,
                  height: 46,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  color: "#9a7328",
                  background: "rgba(154,115,40,.09)",
                  border: "1px solid rgba(154,115,40,.3)",
                }}
              >
                {b.icon}
              </div>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "#1a1308", fontWeight: 600 }}>
                  {b.title}
                </div>
                <div style={{ color: "#6b6253", fontSize: 13, lineHeight: 1.6, marginTop: 4, fontWeight: 500 }}>
                  {b.text}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
