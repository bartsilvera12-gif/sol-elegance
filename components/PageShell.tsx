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
      {!showHeader && <div style={{ height: 90, background: "#ffffff" }} aria-hidden />}
      {showHeader && (title || eyebrow) && (
        <header
          style={{
            padding: "140px clamp(20px,5vw,64px) 40px",
            textAlign: "center",
            background:
              "radial-gradient(circle at 50% -10%, rgba(231,196,120,.14), transparent 55%), #14100b",
          }}
        >
          <div className="container-x">
            {eyebrow && (
              <div style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#c6a76b" }}>
                {eyebrow}
              </div>
            )}
            {title && (
              <h1
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 500,
                  fontSize: "clamp(42px,6vw,80px)",
                  color: "#f6efe2",
                  margin: "14px 0 12px",
                  lineHeight: 1.02,
                }}
              >
                {title}
              </h1>
            )}
            {subtitle && (
              <p style={{ maxWidth: 620, margin: "0 auto", color: "#c4b69d", fontSize: 15.5, lineHeight: 1.75 }}>
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
