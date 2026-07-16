"use client";
import { useEffect, useState } from "react";
import { NAV_LINKS, WA_MAIN } from "@/lib/data";

/* ---- Minimal line icons (Miu Miu style) ---- */
const Icon = {
  menu: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  ),
  close: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  ),
  search: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.2-3.2" />
    </svg>
  ),
  heart: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  ),
  bag: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M6 8h12l-1 12H7L6 8z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  ),
};

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Hide the header on scroll-down, reveal on scroll-up (Miu Miu behaviour).
  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      const goingDown = y > last && y > 120;
      setHidden(goingDown);
      // Sync the sticky toolbar offset so it rises to the top when the header hides.
      document.documentElement.style.setProperty("--hdr-h", goingDown ? "0px" : "65px");
      last = y;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showHeader = !hidden || open;

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 60,
          background: "#fff",
          borderBottom: "1px solid var(--line)",
          transform: showHeader ? "translateY(0)" : "translateY(-100%)",
          transition: "transform .35s linear",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            padding: "18px clamp(16px,4vw,56px)",
          }}
        >
          {/* Left: menu + search */}
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <button className="hdr-icon" onClick={() => setOpen(true)} aria-label="Menú">
              {Icon.menu}
              <span className="nav-txt">Menú</span>
            </button>
            <button className="hdr-icon" aria-label="Buscar">
              {Icon.search}
              <span className="nav-txt">Buscar</span>
            </button>
          </div>

          {/* Center: wordmark */}
          <a
            href="/"
            style={{
              textDecoration: "none",
              textAlign: "center",
              color: "var(--ink)",
              lineHeight: 1,
            }}
          >
            <div
              className="serif"
              style={{
                fontSize: "clamp(20px,2.4vw,30px)",
                fontWeight: 500,
                letterSpacing: "clamp(2px,.5vw,5px)",
                textTransform: "uppercase",
              }}
            >
              Sol Elegance
            </div>
            <div
              className="nav-brand-sub"
              style={{ fontSize: 8.5, letterSpacing: 4, textTransform: "uppercase", color: "var(--ink-3)", marginTop: 6 }}
            >
              Moda Femenina
            </div>
          </a>

          {/* Right: account / wishlist / bag */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 18 }}>
            <a href="/contacto" className="hdr-icon nav-txt-only" aria-label="Contáctenos">
              Contáctenos
            </a>
            <button className="hdr-icon" aria-label="Lista de deseos">{Icon.heart}</button>
            <a href={WA_MAIN} target="_blank" rel="noopener" className="hdr-icon" aria-label="Bolsa">
              {Icon.bag}
            </a>
          </div>
        </div>
      </header>

      {/* Slide-in menu */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 70,
          background: "rgba(0,0,0,.35)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity .35s ease",
        }}
      >
        <nav
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: "min(420px, 88vw)",
            background: "#fff",
            padding: "26px clamp(24px,4vw,44px)",
            transform: open ? "translateX(0)" : "translateX(-100%)",
            transition: "transform .4s cubic-bezier(.2,.7,.2,1)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <button
            className="hdr-icon"
            onClick={() => setOpen(false)}
            aria-label="Cerrar"
            style={{ alignSelf: "flex-start", marginBottom: 40 }}
          >
            {Icon.close}
            <span>Cerrar</span>
          </button>

          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 4 }}>
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="serif"
                  style={{
                    display: "block",
                    padding: "14px 0",
                    borderBottom: "1px solid var(--line)",
                    color: "var(--ink)",
                    textDecoration: "none",
                    fontSize: 26,
                    fontWeight: 500,
                    letterSpacing: ".5px",
                  }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={WA_MAIN}
            target="_blank"
            rel="noopener"
            className="btn-dark"
            style={{ marginTop: "auto", width: "100%" }}
          >
            Escríbenos por WhatsApp
          </a>
        </nav>
      </div>
    </>
  );
}
