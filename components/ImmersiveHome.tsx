"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { WA_MAIN, INSTAGRAM_URL, NAV_LINKS, TECH_PROVIDER } from "@/lib/data";

const pad = (n: number) => String(n).padStart(2, "0");
// El alto de la sección (y por tanto el scroll por slide) se define en CSS
// con la variable --hc-steps, para poder usar dvh con fallback a vh.

/* ---------- Slide building blocks ---------- */

function Campaign({
  image,
  kicker,
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  external,
}: {
  image: string;
  kicker: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  external?: boolean;
}) {
  return (
    <>
      <Image src={image} alt={title} fill sizes="100vw" style={{ objectFit: "cover", objectPosition: "center 22%" }} />
      <div className="hc-slide__scrim" />
      <div className="hc-caption">
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", opacity: 0.9, marginBottom: 16 }}>{kicker}</div>
        <h2 className="serif" style={{ fontSize: "clamp(38px,7vw,92px)", fontWeight: 500, lineHeight: 1, letterSpacing: 1, margin: "0 0 18px" }}>{title}</h2>
        <p style={{ maxWidth: 480, margin: "0 auto 26px", fontSize: 14.5, lineHeight: 1.7, opacity: 0.92 }}>{subtitle}</p>
        <a href={ctaHref} {...(external ? { target: "_blank", rel: "noopener" } : {})} className="btn-dark" style={{ background: "#fff", color: "var(--black)", borderColor: "#fff" }}>
          {ctaLabel}
        </a>
      </div>
    </>
  );
}

function Mosaic({
  eyebrow,
  title,
  tiles,
}: {
  eyebrow: string;
  title: string;
  tiles: { label: string; href: string; img: string }[];
}) {
  return (
    <div className="ih-mosaic">
      <div className="ih-mosaic__head">
        <div className="eyebrow" style={{ marginBottom: 12 }}>{eyebrow}</div>
        <h2 className="serif" style={{ fontSize: "clamp(24px,3.2vw,44px)", fontWeight: 500, margin: 0, color: "var(--ink)" }}>{title}</h2>
      </div>
      <div className="ih-mosaic__tiles">
        {tiles.map((t) => (
          <a key={t.label} className="ih-mtile" href={t.href}>
            <Image src={t.img} alt={t.label} fill sizes="(max-width:760px) 50vw, 33vw" style={{ objectFit: "cover" }} />
            <span className="ih-mtile__scrim" />
            <span className="ih-mtile__label">{t.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function FooterSlide() {
  const cols = [
    { title: "Contactos", items: [{ label: "WhatsApp · +595 982 314033", href: WA_MAIN, ext: true }, { label: "Instagram", href: INSTAGRAM_URL, ext: true }] },
    { title: "Navegación", items: NAV_LINKS.map((l) => ({ label: l.label, href: l.href })) },
    { title: "Asistencia", items: [{ label: "Envíos a todo el país" }, { label: "Cambios y consultas", href: "/contacto" }] },
    { title: "Legal", items: [{ label: "Política de Privacidad", href: "/privacidad" }] },
  ];
  return (
    <div className="ih-footer">
      <div className="ih-footer__top container-x">
        <div className="ih-footer__news">
          <div className="eyebrow" style={{ marginBottom: 14 }}>Suscríbase a nuestro boletín</div>
          <form onSubmit={(e) => e.preventDefault()} className="ft-form">
            <input type="email" placeholder="Dirección de correo electrónico *" aria-label="Correo electrónico" />
            <button type="submit" className="btn-dark" style={{ padding: "12px 24px" }}>Suscríbase</button>
          </form>
          <div className="eyebrow" style={{ margin: "22px 0 12px" }}>Síganos</div>
          <div className="ft-social">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener" aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
            </a>
            <a href={WA_MAIN} target="_blank" rel="noopener" aria-label="WhatsApp">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.8.7.7-2.7-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.7.9-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.6-1.2a.4.4 0 0 0 0-.4c0-.1-.5-1.3-.7-1.7s-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11 11 0 0 0 4.3 3.8c1.6.6 1.9.5 2.3.5a2.4 2.4 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c0-.1-.2-.2-.5-.3z" /></svg>
            </a>
          </div>
        </div>
        <div className="ih-footer__cols">
          {cols.map((c) => (
            <div key={c.title}>
              <div className="ih-footer__coltitle">{c.title}</div>
              <ul>
                {c.items.map((it) =>
                  "href" in it && it.href ? (
                    <li key={it.label}><a href={it.href} {...("ext" in it && it.ext ? { target: "_blank", rel: "noopener" } : {})}>{it.label}</a></li>
                  ) : (
                    <li key={it.label}><span className="ft-muted">{it.label}</span></li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="ih-footer__wordmark" aria-hidden><span className="serif">Sol Elegance</span></div>

      <div className="ih-footer__bottom container-x">
        <span>© 2026 Sol Elegance — Moda Femenina</span>
        <span>Desarrollado por <a href={TECH_PROVIDER.website} target="_blank" rel="noopener">Neura</a></span>
      </div>
    </div>
  );
}

/* ---------- Slides config ---------- */

type SlideDef = { theme: "dark" | "light"; node: React.ReactNode };

const SLIDES: SlideDef[] = [
  {
    theme: "dark",
    node: (
      <Campaign image="/hero-portada.png" kicker="Nueva temporada" title="La colección" subtitle="Siluetas femeninas, tejidos suaves y detalles atemporales." ctaLabel="Ver catálogo" ctaHref="/catalogo" />
    ),
  },
  {
    theme: "light",
    node: (
      <Mosaic
        eyebrow="La selección"
        title="Imprescindibles de la temporada"
        tiles={[
          { label: "Vestidos", href: "/catalogo?cat=Vestidos", img: "/categorias/vestidos.jpg" },
          { label: "Conjuntos", href: "/catalogo?cat=Conjuntos", img: "/categorias/conjuntos.jpg" },
          { label: "Faldas", href: "/catalogo?cat=Faldas", img: "/categorias/faldas.jpg" },
        ]}
      />
    ),
  },
  {
    theme: "dark",
    node: (
      <Campaign image="/campanas/vestidos.jpg" kicker="Edición" title="La estación cálida" subtitle="Piezas ligeras para brillar de día y de noche." ctaLabel="Comprar" ctaHref="/catalogo?cat=Vestidos" />
    ),
  },
  {
    theme: "light",
    node: (
      <Mosaic
        eyebrow="Recién llegado"
        title="Lo más nuevo"
        tiles={[
          { label: "Blusas", href: "/catalogo?cat=Blusas", img: "/productos/blusa-seda.jpg" },
          { label: "Pantalones", href: "/catalogo?cat=Pantalones", img: "/productos/pantalon-lino.jpg" },
          { label: "Conjuntos", href: "/catalogo?cat=Conjuntos", img: "/categorias/conjuntos-2.jpg" },
        ]}
      />
    ),
  },
  { theme: "light", node: <FooterSlide /> },
];

export function ImmersiveHome() {
  const n = SLIDES.length;
  const sectionRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const update = () => {
      // Medimos el contenedor sticky en vez de window.innerHeight: así el JS
      // coincide siempre con la altura que fija el CSS (dvh en móvil, donde la
      // barra del navegador cambia el viewport).
      const vh = stickyRef.current?.offsetHeight || window.innerHeight;
      const total = section.offsetHeight - vh;
      const top = section.getBoundingClientRect().top;
      const scrolled = Math.min(Math.max(-top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      const sf = p * (n - 1);
      slideRefs.current.forEach((el, i) => {
        if (!el) return;
        const offset = Math.min(Math.max(i - sf, 0), 1) * 100;
        el.style.transform = `translate3d(0, ${offset}%, 0)`;
        el.style.zIndex = String(i);
      });
      const act = Math.min(n - 1, Math.max(0, Math.round(sf)));
      if (act !== activeRef.current) {
        activeRef.current = act;
        setActive(act);
      }
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [n]);

  const goTo = (i: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const idx = Math.min(n - 1, Math.max(0, i));
    const vh = stickyRef.current?.offsetHeight || window.innerHeight;
    const total = section.offsetHeight - vh;
    const y = window.scrollY + section.getBoundingClientRect().top + (idx / (n - 1)) * total;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const ctrl = SLIDES[active].theme === "dark" ? "#fff" : "#1a1a1a";
  const isLast = active === n - 1;

  return (
    <section
      ref={sectionRef}
      className="hc-immersive"
      style={{ "--hc-steps": n - 1 } as React.CSSProperties}
      aria-roledescription="carrusel"
    >
      <div ref={stickyRef} className="hc hc-sticky">
        {SLIDES.map((s, i) => (
          <div
            key={i}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className="hc-slide"
            style={{ transform: `translate3d(0, ${i === 0 ? 0 : 100}%, 0)`, zIndex: i, background: s.theme === "light" ? "#fff" : "#0e0b08" }}
          >
            {s.node}
          </div>
        ))}

        {/* Arrows */}
        <button className="hc-arrow hc-arrow--prev" onClick={() => goTo(active - 1)} aria-label="Anterior" style={{ color: ctrl }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden><path d="M18 15l-6-6-6 6" /></svg>
        </button>
        {!isLast && (
          <button className="hc-arrow hc-arrow--next" onClick={() => goTo(active + 1)} aria-label="Siguiente" style={{ color: ctrl }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden><path d="M6 9l6 6 6-6" /></svg>
          </button>
        )}

        {/* Bottom bar */}
        <div className="hc-bar" style={{ color: ctrl }}>
          <div style={{ fontSize: 12, letterSpacing: 2, fontVariantNumeric: "tabular-nums", minWidth: 70 }}>
            <span style={{ fontWeight: 500 }}>{pad(active + 1)}</span>
            <span style={{ opacity: 0.55 }}> / {pad(n)}</span>
          </div>

          {!isLast ? (
            <div className="hc-hint" style={{ color: ctrl }} aria-hidden>
              <span>Desplazarse para explorar</span>
              <span className="hc-hint__line" style={{ background: ctrl === "#fff" ? "rgba(255,255,255,.7)" : "rgba(0,0,0,.5)" }} />
            </div>
          ) : (
            <span />
          )}

          <div style={{ display: "flex", gap: 10, minWidth: 70, justifyContent: "flex-end" }}>
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Ir a la sección ${i + 1}`}
                style={{
                  width: i === active ? 26 : 8,
                  height: 8,
                  borderRadius: 40,
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  background: i === active ? ctrl : ctrl === "#fff" ? "rgba(255,255,255,.45)" : "rgba(0,0,0,.28)",
                  transition: "width .4s cubic-bezier(.2,.7,.2,1), background .3s ease",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
