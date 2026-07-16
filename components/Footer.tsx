"use client";
import { useState } from "react";
import { WA_MAIN, INSTAGRAM_URL, TECH_PROVIDER } from "@/lib/data";

type Item = { label: string; href?: string; ext?: boolean };
const SECTIONS: { title: string; items: Item[] }[] = [
  {
    title: "Contactos",
    items: [
      { label: "WhatsApp · +595 982 314033", href: WA_MAIN, ext: true },
      { label: "Instagram · @soleleganceboutique", href: INSTAGRAM_URL, ext: true },
    ],
  },
  {
    title: "Asistencia",
    items: [
      { label: "Envíos a todo el país" },
      { label: "Cambios y consultas", href: "/contacto" },
      { label: "Ver catálogo", href: "/catalogo" },
    ],
  },
  {
    title: "Empresa",
    items: [
      { label: "Nosotras", href: "/nosotras" },
      { label: "Categorías", href: "/categorias" },
    ],
  },
  {
    title: "Legal",
    items: [{ label: "Política de Privacidad", href: "/privacidad" }],
  },
];

const IconInstagram = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const IconWhatsApp = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.8.7.7-2.7-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.7.9-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.6-1.2a.4.4 0 0 0 0-.4c0-.1-.5-1.3-.7-1.7s-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11 11 0 0 0 4.3 3.8c1.6.6 1.9.5 2.3.5a2.4 2.4 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c0-.1-.2-.2-.5-.3z" />
  </svg>
);

export function Footer() {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const toggle = (i: number) => setOpen((o) => ({ ...o, [i]: !o[i] }));

  return (
    <footer style={{ background: "#fff", borderTop: "1px solid var(--line)" }}>
      <div className="ft-main container-x">
        {/* Accordion columns */}
        <div className="ft-cols">
          {SECTIONS.map((s, i) => {
            const isOpen = !!open[i];
            return (
              <div className="ft-acc" key={s.title}>
                <button className="ft-acc__head" aria-expanded={isOpen} onClick={() => toggle(i)}>
                  <span>{s.title}</span>
                  <svg
                    className="ft-acc__chev"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    aria-hidden
                    style={{ transform: isOpen ? "rotate(180deg)" : "none" }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div className="ft-acc__body" data-open={isOpen}>
                  <ul>
                    {s.items.map((it) =>
                      it.href ? (
                        <li key={it.label}>
                          <a href={it.href} {...(it.ext ? { target: "_blank", rel: "noopener" } : {})}>
                            {it.label}
                          </a>
                        </li>
                      ) : (
                        <li key={it.label}>
                          <span className="ft-muted">{it.label}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Newsletter + social */}
        <div className="ft-news">
          <div className="eyebrow" style={{ marginBottom: 16 }}>Suscríbase a nuestro boletín</div>
          <form onSubmit={(e) => e.preventDefault()} className="ft-form">
            <input
              type="email"
              placeholder="Dirección de correo electrónico *"
              aria-label="Correo electrónico"
            />
            <button type="submit" className="btn-dark" style={{ padding: "12px 24px" }}>
              Suscríbase
            </button>
          </form>
          <p className="ft-legal-note">
            Al suscribirse confirma que ha leído nuestra{" "}
            <a href="/privacidad">Política de Privacidad</a> y desea recibir novedades de Sol Elegance.
          </p>

          <div className="eyebrow" style={{ margin: "26px 0 14px" }}>Síganos</div>
          <div className="ft-social">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener" aria-label="Instagram">{IconInstagram}</a>
            <a href={WA_MAIN} target="_blank" rel="noopener" aria-label="WhatsApp">{IconWhatsApp}</a>
          </div>
        </div>
      </div>

      {/* Giant wordmark */}
      <div className="ft-wordmark" aria-hidden>
        <span className="wordmark">Sol Elegance</span>
      </div>

      {/* Bottom bar */}
      <div className="ft-bottom container-x">
        <span>© 2026 Sol Elegance — Moda Femenina</span>
        <span>
          Desarrollado por{" "}
          <a href={TECH_PROVIDER.website} target="_blank" rel="noopener">Neura</a>
        </span>
      </div>
    </footer>
  );
}
