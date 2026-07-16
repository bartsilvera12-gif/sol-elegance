import Image from "next/image";
import { Reveal } from "./Reveal";

const VALUES = [
  { icon: "✦", title: "Selección a mano", text: "Cada prenda elegida con cuidado." },
  { icon: "❀", title: "Estilo femenino", text: "Diseños que realzan tu esencia." },
  { icon: "✉", title: "Atención cercana", text: "Te asesoramos paso a paso." },
  { icon: "✓", title: "Calidad premium", text: "Telas y acabados cuidados." },
];

export function About() {
  return (
    <section id="nosotras" className="section" style={{ background: "#ffffff" }}>
      <div className="container-x">
        <div
          className="about-grid"
          style={{
            display: "grid",
            gridTemplateColumns: ".95fr 1.05fr",
            gap: "clamp(34px,5vw,80px)",
            alignItems: "center",
          }}
        >
          <Reveal>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", inset: -14, borderRadius: 22, border: "1px solid rgba(198,167,107,.32)" }} />
              <div style={{ position: "relative", aspectRatio: "4 / 5", borderRadius: 16, overflow: "hidden" }}>
                <Image
                  src="/nosotras/atelier.jpg"
                  alt="El atelier de Sol Elegance"
                  fill
                  sizes="(max-width: 860px) 100vw, 45vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  right: -22,
                  bottom: -22,
                  width: 118,
                  height: 118,
                  borderRadius: "50%",
                  background: "#0e0b07",
                  border: "1px solid rgba(198,167,107,.55)",
                  display: "grid",
                  placeItems: "center",
                  textAlign: "center",
                  color: "#c6a76b",
                  animation: "se-float 7s ease-in-out infinite",
                }}
              >
                <div>
                  <div style={{ fontFamily: "'Pinyon Script', cursive", fontSize: 30, color: "#c6a76b" }}>Sol</div>
                  <div style={{ fontSize: 9.5, letterSpacing: 3, textTransform: "uppercase", color: "#c6a76b" }}>
                    Elegance
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <div style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#9a7328" }}>
                Nuestra historia
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 500,
                  fontSize: "clamp(36px,5vw,62px)",
                  color: "#1a1308",
                  margin: "14px 0 22px",
                  lineHeight: 1.05,
                }}
              >
                Moda con <em style={{ fontStyle: "italic", color: "#9a7328" }}>alma femenina</em>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p style={{ color: "#4a4235", fontSize: 15, lineHeight: 1.8, fontWeight: 600 }}>
                Somos una boutique pensada para acompañarte: curamos cada prenda con criterio para que
                encuentres piezas versátiles, femeninas y con esa chispa que hace única una entrada.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p style={{ color: "#6b6253", fontSize: 14.5, lineHeight: 1.8, marginTop: 14, fontWeight: 600 }}>
                Creemos en la atención cercana y en vestir mujeres reales — la elegancia es para todas, todos los días.
              </p>
            </Reveal>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: 22,
                marginTop: 32,
              }}
            >
              {VALUES.map((v, i) => (
                <Reveal key={v.title} delay={240 + i * 60}>
                  <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div
                      style={{
                        flex: "0 0 auto",
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                        color: "#9a7328",
                        background: "rgba(154,115,40,.08)",
                        border: "1px solid rgba(154,115,40,.35)",
                      }}
                    >
                      {v.icon}
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, color: "#1a1308" }}>
                        {v.title}
                      </div>
                      <div style={{ color: "#6b6253", fontSize: 13, lineHeight: 1.6, marginTop: 4, fontWeight: 600 }}>{v.text}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
