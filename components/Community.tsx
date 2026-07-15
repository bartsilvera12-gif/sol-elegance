import { Reveal } from "./Reveal";
import { WA_MAIN, INSTAGRAM_URL } from "@/lib/data";

// Sección "comunidad" (equivalente al newsletter de Baco). Sol Elegance no
// usa email marketing, así que la conversión es hacia Instagram y WhatsApp.

export function Community() {
  return (
    <section style={{ background: "#ffffff", padding: "clamp(56px,7vw,100px) clamp(20px,5vw,64px)" }}>
      <div className="container-x">
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 24,
            background:
              "radial-gradient(circle at 50% 0%, rgba(231,196,120,.20), transparent 60%), #faf7f2",
            border: "1px solid rgba(154,115,40,.25)",
            padding: "clamp(40px,6vw,72px) clamp(24px,5vw,64px)",
            textAlign: "center",
          }}
        >
          <Reveal>
            <div style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#9a7328" }}>
              Comunidad Sol Elegance
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500,
                fontSize: "clamp(34px,5vw,58px)",
                color: "#1a1308",
                margin: "14px 0 12px",
                lineHeight: 1.05,
              }}
            >
              Sumate a la <em style={{ fontStyle: "italic", color: "#9a7328" }}>comunidad</em>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p style={{ maxWidth: 540, margin: "0 auto", color: "#6b6253", fontSize: 15, lineHeight: 1.75, fontWeight: 500 }}>
              Seguinos para enterarte de nuevas colecciones, ofertas y consejos de estilo antes que nadie.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center", marginTop: 30 }}>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className="pill-gold pill-gold-lg">
                Seguinos en Instagram <span>→</span>
              </a>
              <a
                href={WA_MAIN}
                target="_blank"
                rel="noopener"
                className="pill-outline"
                style={{ color: "#7a5a2e", borderColor: "rgba(154,115,40,.5)" }}
              >
                Escribinos por WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
