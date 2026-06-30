import Image from "next/image";
import { Reveal } from "./Reveal";
import { WA_MAIN, INSTAGRAM_URL } from "@/lib/data";

const CARDS = [
  { icon: "✆", label: "WhatsApp", value: "+595 982 314033", href: WA_MAIN },
  { icon: "❤", label: "Instagram", value: "@soleleganceboutique", href: INSTAGRAM_URL },
  { icon: "✦", label: "Envíos", value: "A todo el país", href: null },
];

export function Contact() {
  return (
    <section
      id="contacto"
      style={{
        position: "relative",
        padding: "clamp(80px,10vw,140px) clamp(20px,5vw,64px)",
        background: "#100c08",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-conic-gradient(from 0deg, rgba(231,196,120,.07) 0deg 2deg, transparent 2deg 12deg)",
          WebkitMask: "radial-gradient(circle at 50% 50%, #000 0%, transparent 70%)",
          mask: "radial-gradient(circle at 50% 50%, #000 0%, transparent 70%)",
          animation: "se-spinR 120s linear infinite",
          opacity: 0.8,
        }}
      />

      <div className="container-x" style={{ position: "relative", maxWidth: 920 }}>
        <Reveal>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                width: 84,
                height: 84,
                borderRadius: "50%",
                border: "1px solid rgba(198,167,107,.5)",
                overflow: "hidden",
                background: "#0e0b07",
                display: "grid",
                placeItems: "center",
              }}
            >
              <Image src="/logo.png" alt="" width={84} height={84} />
            </div>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div style={{ textAlign: "center", marginTop: 22 }}>
            <div style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#c6a76b" }}>
              Hablemos
            </div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500,
                fontSize: "clamp(36px,5vw,62px)",
                color: "#f4ece0",
                margin: "14px 0",
                lineHeight: 1.05,
              }}
            >
              ¿Lista para <em className="shimmer-gold" style={{ fontStyle: "italic" }}>brillar</em>?
            </h2>
            <p style={{ color: "#bcae94", fontSize: 15, lineHeight: 1.75, maxWidth: 560, margin: "0 auto" }}>
              Escribinos y te ayudamos a encontrar la prenda perfecta. Atención online todos los días.
            </p>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14, marginTop: 32 }}>
            <a href={WA_MAIN} target="_blank" rel="noopener" className="pill-gold pill-gold-lg">
              Escribir por WhatsApp <span>→</span>
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className="pill-outline">
              Síguenos en Instagram
            </a>
          </div>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 18,
            marginTop: 56,
          }}
        >
          {CARDS.map((c, i) => (
            <Reveal key={c.label} delay={200 + i * 60}>
              <a
                href={c.href ?? "#"}
                target={c.href ? "_blank" : undefined}
                rel={c.href ? "noopener" : undefined}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  background: "rgba(28,23,16,.6)",
                  border: "1px solid rgba(198,167,107,.22)",
                  padding: 20,
                  borderRadius: 16,
                  textDecoration: "none",
                  color: "inherit",
                  transition: "border-color .3s ease, transform .3s ease",
                  pointerEvents: c.href ? "auto" : "none",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "rgba(198,167,107,.1)",
                    border: "1px solid rgba(198,167,107,.35)",
                    display: "grid",
                    placeItems: "center",
                    color: "#c6a76b",
                    fontSize: 18,
                  }}
                >
                  {c.icon}
                </div>
                <div>
                  <div style={{ fontSize: 10.5, letterSpacing: 2.5, textTransform: "uppercase", color: "#9c8d74" }}>
                    {c.label}
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, color: "#f4ece0", marginTop: 4 }}>
                    {c.value}
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
