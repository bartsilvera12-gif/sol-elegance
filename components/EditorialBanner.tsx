import { Reveal } from "./Reveal";

export function EditorialBanner() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: 520,
        background:
          "linear-gradient(90deg, rgba(14,11,7,.92) 30%, rgba(14,11,7,.6) 60%, rgba(14,11,7,.2) 100%), radial-gradient(circle at 80% 50%, rgba(231,196,120,.18), transparent 55%), #1a140e",
        display: "flex",
        alignItems: "center",
        padding: "clamp(60px,8vw,110px) clamp(20px,5vw,64px)",
      }}
    >
      <div className="container-x" style={{ width: "100%" }}>
        <div style={{ maxWidth: 540 }}>
          <Reveal>
            <div style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#c6a76b" }}>
              Colección destacada
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500,
                fontSize: "clamp(36px,5vw,60px)",
                color: "#f4ece0",
                margin: "16px 0",
                lineHeight: 1.05,
              }}
            >
              Detalles que <em className="shimmer-gold" style={{ fontStyle: "italic" }}>enamoran</em>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p style={{ color: "#c4b69d", fontSize: 15.5, lineHeight: 1.75 }}>
              Texturas cuidadas, cortes que abrazan y paletas pensadas para realzar tu esencia. Cada
              prenda llega con la promesa de hacerte sentir tu mejor versión.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <a href="#catalogo" className="pill-gold pill-gold-lg" style={{ marginTop: 26 }}>
              Descubre la colección <span>→</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
