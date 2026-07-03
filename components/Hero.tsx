import Image from "next/image";
import { Reveal } from "./Reveal";
import { Sun3D } from "./Sun3D";

export function Hero() {
  return (
    <section
      id="inicio"
      style={{
        position: "relative",
        minHeight: "100vh",
        padding: "120px clamp(20px,5vw,64px) 80px",
        background:
          "radial-gradient(circle at 80% 10%, rgba(231,196,120,.13), transparent 55%), radial-gradient(circle at 20% 60%, rgba(198,167,107,.08), transparent 55%), #14100b",
        overflow: "hidden",
      }}
    >
      <Sun3D />

      <div
        className="container-x grid hero-grid"
        style={{
          position: "relative",
          zIndex: 2,
          display: "grid",
          gridTemplateColumns: "1.05fr .95fr",
          gap: "clamp(28px,5vw,70px)",
          alignItems: "center",
        }}
      >
        <div>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
              <span style={{ width: 36, height: 1, background: "#c6a76b" }} />
              <span style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#c6a76b" }}>
                Boutique de moda femenina
              </span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500,
                fontSize: "clamp(46px,7vw,92px)",
                lineHeight: 0.98,
                color: "#f6efe2",
                margin: 0,
              }}
            >
              Viste la luz
              <br />
              de tu <em className="shimmer-gold" style={{ fontStyle: "italic" }}>elegancia</em>
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <div
              style={{
                fontFamily: "'Pinyon Script', cursive",
                fontSize: "clamp(30px,4.4vw,52px)",
                color: "#c6a76b",
                marginTop: 8,
                lineHeight: 1,
              }}
            >
              Sol Elegance
            </div>
          </Reveal>
          <Reveal delay={200}>
            <p style={{ maxWidth: 430, fontSize: 16, lineHeight: 1.75, color: "#c4b69d", marginTop: 24 }}>
              Prendas seleccionadas para la mujer que se siente segura en su propia piel. Diseños femeninos,
              atemporales y llenos de detalle.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 28 }}>
              <a href="/catalogo" className="pill-gold pill-gold-lg">
                Ver catálogo <span>→</span>
              </a>
              <a href="/categorias" className="pill-outline">
                Explorar categorías
              </a>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <div
              className="hero-stats"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, auto)",
                gap: 30,
                marginTop: 48,
              }}
            >
              {[
                { n: "+200", l: "Clientas felices" },
                { n: "100%", l: "Moda femenina" },
                { n: "24/7", l: "Atención online" },
              ].map((s, i) => (
                <div
                  key={s.l}
                  style={{
                    paddingLeft: i === 0 ? 0 : 24,
                    borderLeft: i === 0 ? "none" : "1px solid rgba(198,167,107,.22)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 32,
                      fontWeight: 600,
                      color: "#f4ece0",
                      lineHeight: 1,
                    }}
                  >
                    {s.n}
                  </div>
                  <div
                    style={{
                      fontSize: 10.5,
                      letterSpacing: 2.5,
                      textTransform: "uppercase",
                      color: "#9c8d74",
                      marginTop: 6,
                    }}
                  >
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                inset: -14,
                borderRadius: "200px 200px 22px 22px",
                border: "1px solid rgba(198,167,107,.35)",
              }}
            />
            <div
              style={{
                position: "relative",
                aspectRatio: "3 / 4",
                borderRadius: "200px 200px 22px 22px",
                overflow: "hidden",
                boxShadow: "0 40px 90px -30px rgba(0,0,0,.8)",
              }}
            >
              <Image
                src="/hero-portada.png"
                alt="Modelo con prenda Sol Elegance"
                fill
                priority
                sizes="(max-width: 860px) 100vw, 45vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div
              className="hero-badge"
              style={{
                position: "absolute",
                left: -18,
                bottom: 28,
                background: "rgba(20,16,11,.85)",
                backdropFilter: "blur(14px)",
                padding: "12px 16px",
                borderRadius: 14,
                border: "1px solid rgba(198,167,107,.28)",
                display: "flex",
                alignItems: "center",
                gap: 12,
                animation: "se-float 6s ease-in-out infinite",
              }}
            >
              <Image
                src="/logo.png"
                alt=""
                width={40}
                height={40}
                style={{
                  borderRadius: "50%",
                  border: "1px solid rgba(198,167,107,.5)",
                }}
              />
              <div style={{ lineHeight: 1.1 }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, fontSize: 16, color: "#f4ece0" }}>
                  Nueva temporada
                </div>
                <div style={{ fontSize: 9.5, letterSpacing: 2.5, textTransform: "uppercase", color: "#c6a76b", marginTop: 4 }}>
                  Recién llegado
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 24,
          transform: "translateX(-50%)",
          textAlign: "center",
          color: "#9c8d74",
          fontSize: 10,
          letterSpacing: 3,
          textTransform: "uppercase",
          animation: "se-float 6s ease-in-out infinite",
          zIndex: 2,
        }}
      >
        <div>Desliza</div>
        <div
          style={{
            width: 1,
            height: 44,
            margin: "10px auto 0",
            background: "linear-gradient(to bottom, rgba(198,167,107,.7), transparent)",
          }}
        />
      </div>

      <style>{`
        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
