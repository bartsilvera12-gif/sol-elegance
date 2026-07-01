import Image from "next/image";
import { NAV_LINKS, WA_MAIN, INSTAGRAM_URL, TECH_PROVIDER } from "@/lib/data";

export function Footer() {
  return (
    <footer
      style={{
        background: "#0e0b07",
        borderTop: "1px solid rgba(198,167,107,.22)",
        padding: "60px clamp(20px,5vw,64px) 30px",
        color: "#bcae94",
      }}
    >
      <div
        className="container-x"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 40,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Image
              src="/logo.png"
              alt="Sol Elegance"
              width={44}
              height={44}
              style={{ borderRadius: "50%", border: "1px solid rgba(198,167,107,.5)" }}
            />
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, fontSize: 22, color: "#f4ece0" }}>
                Sol Elegance
              </div>
              <div style={{ fontSize: 9.5, letterSpacing: 3.5, textTransform: "uppercase", color: "#c6a76b", marginTop: 4 }}>
                Moda Femenina
              </div>
            </div>
          </div>
          <p style={{ fontSize: 13.5, lineHeight: 1.7, marginTop: 18, color: "#9c8d74" }}>
            Una boutique pensada para realzar tu elegancia con prendas femeninas, cuidadas y atemporales.
          </p>
        </div>

        <div>
          <div style={{ fontSize: 10.5, letterSpacing: 3, textTransform: "uppercase", color: "#c6a76b", marginBottom: 18 }}>
            Navegación
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  style={{
                    color: "#d8cbb4",
                    textDecoration: "none",
                    fontSize: 13.5,
                    letterSpacing: 1.4,
                  }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div style={{ fontSize: 10.5, letterSpacing: 3, textTransform: "uppercase", color: "#c6a76b", marginBottom: 18 }}>
            Síguenos
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
            <li>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener" style={linkStyle}>
                Instagram · @soleleganceboutique
              </a>
            </li>
            <li>
              <a href={WA_MAIN} target="_blank" rel="noopener" style={linkStyle}>
                WhatsApp · +595 982 314033
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="container-x"
        style={{
          marginTop: 50,
          paddingTop: 22,
          borderTop: "1px solid rgba(198,167,107,.16)",
          display: "flex",
          flexWrap: "wrap",
          gap: 14,
          justifyContent: "space-between",
          fontSize: 11.5,
          color: "#7a6e58",
          letterSpacing: 1.4,
        }}
      >
        <span>© 2026 Sol Elegance · Moda Femenina</span>
        <a
          href="/privacidad"
          style={{
            color: "#c6a76b",
            textDecoration: "none",
            letterSpacing: 1.4,
            borderBottom: "1px solid rgba(198,167,107,.35)",
            paddingBottom: 2,
          }}
        >
          Política de Privacidad
        </a>
        <span>
          Desarrollado por{" "}
          <a
            href={TECH_PROVIDER.website}
            target="_blank"
            rel="noopener"
            style={{
              color: "#c6a76b",
              textDecoration: "none",
              fontWeight: 600,
              letterSpacing: 1.4,
            }}
          >
            Neura
          </a>
        </span>
      </div>
    </footer>
  );
}

const linkStyle: React.CSSProperties = {
  color: "#d8cbb4",
  textDecoration: "none",
  fontSize: 13.5,
};
