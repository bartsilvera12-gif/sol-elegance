import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingWhatsApp } from "./FloatingWhatsApp";

export function PageShell({
  eyebrow,
  title,
  subtitle,
  children,
  showHeader = true,
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  showHeader?: boolean;
}) {
  return (
    <main>
      <Navbar />
      {showHeader && (title || eyebrow) && (
        <header
          style={{
            padding: "clamp(48px,7vw,96px) clamp(16px,4vw,56px) clamp(30px,4vw,48px)",
            textAlign: "center",
            background: "#fff",
            borderBottom: "1px solid var(--line)",
          }}
        >
          <div className="container-x">
            {eyebrow && (
              <div className="eyebrow" style={{ marginBottom: 14 }}>{eyebrow}</div>
            )}
            {title && (
              <h1
                className="serif"
                style={{
                  fontWeight: 500,
                  fontSize: "clamp(34px,5vw,64px)",
                  color: "var(--ink)",
                  margin: "0 0 14px",
                  lineHeight: 1.04,
                  letterSpacing: 1,
                }}
              >
                {title}
              </h1>
            )}
            {subtitle && (
              <p style={{ maxWidth: 620, margin: "0 auto", color: "var(--ink-2)", fontSize: 15, lineHeight: 1.75 }}>
                {subtitle}
              </p>
            )}
          </div>
        </header>
      )}
      {children}
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
