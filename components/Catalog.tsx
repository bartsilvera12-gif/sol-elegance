"use client";
import { useMemo, useState } from "react";
import {
  FILTERS,
  PRODUCTS,
  CatKey,
  SortKey,
  SORT_OPTIONS,
  formatPrice,
  slugify,
} from "@/lib/data";
import Image from "next/image";
import { Placeholder } from "./Placeholder";
import { Reveal } from "./Reveal";

/** Fills its parent with a cover image at a 3:4 ratio (matches the placeholder). */
function ProductPhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "3 / 4" }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 900px) 50vw, 33vw"
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}

const PAGE = 9;

export function Catalog({
  initialFilter = "todos",
  filter: controlledFilter,
  onFilterChange,
}: {
  initialFilter?: CatKey;
  /** If provided, becomes a controlled component */
  filter?: CatKey;
  onFilterChange?: (v: CatKey) => void;
}) {
  const [internal, setInternal] = useState<CatKey>(initialFilter);
  const filter = controlledFilter ?? internal;

  const [sort, setSort] = useState<SortKey>("sugerido");
  const [sortOpen, setSortOpen] = useState(false);
  const [visible, setVisible] = useState(PAGE);

  const setFilter = (v: CatKey) => {
    if (onFilterChange) onFilterChange(v);
    else setInternal(v);
    setVisible(PAGE);
  };

  const list = useMemo(() => {
    const base = PRODUCTS.filter((p) => filter === "todos" || p.cat === filter);
    const sorted = [...base];
    if (sort === "nuevo") sorted.reverse();
    else if (sort === "precio-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "precio-asc") sorted.sort((a, b) => a.price - b.price);
    return sorted;
  }, [filter, sort]);

  const shown = list.slice(0, visible);
  const sortLabel = SORT_OPTIONS.find((o) => o.value === sort)?.label ?? "Sugerido";

  return (
    <section id="catalogo" style={{ background: "#fff", paddingTop: "clamp(28px,4vw,52px)" }}>
      {/* Breadcrumb */}
      <div
        style={{
          padding: "0 clamp(16px,4vw,56px)",
          fontSize: 11,
          letterSpacing: 1,
          color: "var(--ink-3)",
          textTransform: "uppercase",
        }}
      >
        <a href="/" style={{ color: "inherit", textDecoration: "none" }}>Inicio</a>
        <span style={{ margin: "0 8px" }}>/</span>
        <span style={{ color: "var(--ink)" }}>Catálogo</span>
      </div>

      {/* Title + count */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 14,
          padding: "clamp(18px,2.6vw,34px) clamp(16px,4vw,56px) clamp(20px,2.6vw,30px)",
        }}
      >
        <h1
          className="serif"
          style={{
            fontSize: "clamp(30px,4.4vw,54px)",
            fontWeight: 500,
            letterSpacing: 1,
            textTransform: "uppercase",
            margin: 0,
            color: "var(--ink)",
          }}
        >
          Ropa
        </h1>
        <span style={{ fontSize: 13, color: "var(--ink-3)" }}>{list.length}</span>
      </div>

      {/* Subcategory chips */}
      <div className="subcats no-scrollbar">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            className="subcat"
            data-active={filter === f.value}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Toolbar: Filtros / Ordenar por */}
      <div
        className="toolbar"
        style={{ position: "sticky", top: "var(--hdr-h, 65px)", background: "#fff", zIndex: 20, transition: "top .35s linear" }}
      >
        <button className="toolbar__btn" aria-label="Filtros">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
            <path d="M3 5h18M6 12h12M10 19h4" />
          </svg>
          Filtros
        </button>

        <div style={{ position: "relative" }}>
          <button
            className="toolbar__btn"
            onClick={() => setSortOpen((o) => !o)}
            aria-expanded={sortOpen}
          >
            <span style={{ color: "var(--ink-3)" }}>Ordenar por</span>
            <span>{sortLabel}</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden
              style={{ transform: sortOpen ? "rotate(180deg)" : "none", transition: "transform .25s ease" }}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {sortOpen && (
            <>
              <div
                onClick={() => setSortOpen(false)}
                style={{ position: "fixed", inset: 0, zIndex: 30 }}
                aria-hidden
              />
              <ul
                style={{
                  position: "absolute",
                  right: 0,
                  top: "calc(100% + 10px)",
                  zIndex: 40,
                  listStyle: "none",
                  margin: 0,
                  padding: "8px 0",
                  minWidth: 220,
                  background: "#fff",
                  border: "1px solid var(--line)",
                  boxShadow: "0 20px 50px -24px rgba(0,0,0,.35)",
                }}
              >
                {SORT_OPTIONS.map((o) => (
                  <li key={o.value}>
                    <button
                      onClick={() => {
                        setSort(o.value);
                        setSortOpen(false);
                      }}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        padding: "11px 20px",
                        fontSize: 12.5,
                        letterSpacing: ".4px",
                        color: sort === o.value ? "var(--ink)" : "var(--ink-2)",
                        fontWeight: sort === o.value ? 500 : 300,
                      }}
                    >
                      {o.label}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      {/* Product grid */}
      <div className="pdp-grid">
        {shown.map((p, i) => (
          <Reveal
            key={p.name}
            delay={(i % 3) * 90}
            style={{ display: "flex" }}
          >
            <a className="prod" href={`/producto/${slugify(p.name)}`} style={{ width: "100%" }}>
              <div className="prod__media">
                {/* Base image (real photo if available, else placeholder) */}
                <div className="prod__ph">
                  {p.img ? (
                    <ProductPhoto src={p.img} alt={p.name} />
                  ) : (
                    <Placeholder ratio="3 / 4" rounded={0} label={p.name} />
                  )}
                </div>
                {/* Second view — crossfades in on hover */}
                <div className="prod__hover">
                  {p.img2 ? (
                    <ProductPhoto src={p.img2} alt={`${p.name} — vista 2`} />
                  ) : p.img ? (
                    <ProductPhoto src={p.img} alt={p.name} />
                  ) : (
                    <Placeholder
                      ratio="3 / 4"
                      rounded={0}
                      label="Ver prenda"
                      style={{ background: "linear-gradient(315deg,#efece7 0%,#e4e0d9 55%,#eeeae4 100%)" }}
                    />
                  )}
                </div>
                <button
                  className="prod__wish"
                  aria-label="Agregar a deseos"
                  onClick={(e) => e.preventDefault()}
                >
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden>
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
              </div>
              <div className="prod__info">
                <span className="prod__cat">{p.cat}</span>
                <span className="prod__name">{p.name}</span>
                <span className="prod__price">{formatPrice(p.price)}</span>
                <span className="prod__cta">Ver prenda</span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      {/* Mostrar más */}
      {visible < list.length && (
        <div style={{ display: "flex", justifyContent: "center", padding: "clamp(34px,5vw,64px) 16px" }}>
          <button className="btn-outline" onClick={() => setVisible((v) => v + PAGE)}>
            Mostrar más
          </button>
        </div>
      )}

      {/* Editorial description */}
      <div
        className="container-narrow"
        style={{
          textAlign: "center",
          padding: "clamp(40px,6vw,90px) clamp(20px,5vw,40px) clamp(56px,7vw,110px)",
        }}
      >
        <p style={{ color: "var(--ink-2)", fontSize: 14.5, lineHeight: 1.9, letterSpacing: ".2px", margin: 0 }}>
          Una selección pensada para la mujer que se siente segura en su propia piel.
          Siluetas femeninas, tejidos suaves y detalles atemporales que acompañan cada
          momento del día. Tocá una prenda para consultar disponibilidad, talles y colores
          por WhatsApp.
        </p>
      </div>
    </section>
  );
}
