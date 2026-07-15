"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { WA_MAIN } from "@/lib/data";

type Slide = {
  image?: string;
  bg?: string;
  kicker: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  external?: boolean;
};

// Campaign slides — replace `bg`/`image` with real /public/campanas photos anytime.
const SLIDES: Slide[] = [
  {
    image: "/hero-portada.png",
    kicker: "Nueva temporada",
    title: "La colección",
    subtitle: "Siluetas femeninas, tejidos suaves y detalles atemporales.",
    ctaLabel: "Descubrir",
    ctaHref: "#catalogo",
  },
  {
    image: "/campanas/vestidos.jpg",
    kicker: "Destacado",
    title: "Vestidos",
    subtitle: "Elegancia para cada día, del brunch a la noche.",
    ctaLabel: "Comprar",
    ctaHref: "/catalogo?cat=Vestidos",
  },
  {
    image: "/campanas/conjuntos.jpg",
    kicker: "Edición",
    title: "Conjuntos",
    subtitle: "El look completo, sin esfuerzo.",
    ctaLabel: "Comprar la colección",
    ctaHref: "/catalogo?cat=Conjuntos",
  },
  {
    image: "/campanas/atelier.jpg",
    kicker: "Atelier",
    title: "Hecho para vos",
    subtitle: "Atención personalizada por WhatsApp, todos los días.",
    ctaLabel: "Escríbenos",
    ctaHref: WA_MAIN,
    external: true,
  },
];

const pad = (n: number) => String(n).padStart(2, "0");
const SEG = 90; // vh of scroll distance per slide transition

export function HeroCarousel() {
  const n = SLIDES.length;
  const sectionRef = useRef<HTMLElement | null>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);

  // Scroll-driven "cover" transition: each next slide rises from below (100% → 0)
  // and covers the previous one, which stays put. Mirrors Miu Miu's creative effect.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const update = () => {
      const vh = window.innerHeight;
      const total = section.offsetHeight - vh;
      const top = section.getBoundingClientRect().top;
      const scrolled = Math.min(Math.max(-top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      const sf = p * (n - 1); // fractional slide position

      slideRefs.current.forEach((el, i) => {
        if (!el) return;
        const offset = Math.min(Math.max(i - sf, 0), 1) * 100; // 100% below → 0
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
    const total = section.offsetHeight - window.innerHeight;
    const y = window.scrollY + section.getBoundingClientRect().top + (idx / (n - 1)) * total;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="hc-immersive"
      style={{ height: `calc(100vh + ${(n - 1) * SEG}vh)` }}
      aria-roledescription="carrusel"
    >
      <div className="hc hc-sticky">
        {SLIDES.map((s, i) => (
          <div
            key={i}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className="hc-slide"
            style={{ transform: `translate3d(0, ${i === 0 ? 0 : 100}%, 0)`, zIndex: i }}
          >
            {s.image ? (
              <Image
                src={s.image}
                alt={s.title}
                fill
                priority={i === 0}
                sizes="100vw"
                style={{ objectFit: "cover", objectPosition: "center 22%" }}
              />
            ) : (
              <div style={{ position: "absolute", inset: 0, background: s.bg }} />
            )}
            <div className="hc-slide__scrim" />

            <div className="hc-caption">
              <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", opacity: 0.9, marginBottom: 16 }}>
                {s.kicker}
              </div>
              <h1 className="serif" style={{ fontSize: "clamp(38px,7vw,92px)", fontWeight: 500, lineHeight: 1, letterSpacing: 1, margin: "0 0 18px" }}>
                {s.title}
              </h1>
              <p style={{ maxWidth: 480, margin: "0 auto 26px", fontSize: 14.5, lineHeight: 1.7, opacity: 0.92 }}>
                {s.subtitle}
              </p>
              <a
                href={s.ctaHref}
                {...(s.external ? { target: "_blank", rel: "noopener" } : {})}
                className="btn-dark"
                style={{ background: "#fff", color: "var(--black)", borderColor: "#fff" }}
              >
                {s.ctaLabel}
              </a>
            </div>
          </div>
        ))}

        {/* Prev / Next arrows (scroll to the segment) */}
        <button className="hc-arrow hc-arrow--prev" onClick={() => goTo(active - 1)} aria-label="Anterior">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden><path d="M18 15l-6-6-6 6" /></svg>
        </button>
        <button className="hc-arrow hc-arrow--next" onClick={() => goTo(active + 1)} aria-label="Siguiente">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden><path d="M6 9l6 6 6-6" /></svg>
        </button>

        {/* Bottom bar: counter · scroll hint · dots */}
        <div className="hc-bar">
          <div style={{ fontSize: 12, letterSpacing: 2, fontVariantNumeric: "tabular-nums", minWidth: 70 }}>
            <span style={{ fontWeight: 500 }}>{pad(active + 1)}</span>
            <span style={{ opacity: 0.55 }}> / {pad(n)}</span>
          </div>

          <div className="hc-hint" aria-hidden>
            <span>Desplazarse para explorar</span>
            <span className="hc-hint__line" />
          </div>

          <div style={{ display: "flex", gap: 10, minWidth: 70, justifyContent: "flex-end" }}>
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Ir al slide ${i + 1}`}
                style={{
                  width: i === active ? 26 : 8,
                  height: 8,
                  borderRadius: 40,
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  background: i === active ? "#fff" : "rgba(255,255,255,.45)",
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
