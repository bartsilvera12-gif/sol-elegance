import Image from "next/image";
import { Reveal } from "./Reveal";

const TILES = [
  { label: "Vestidos", href: "/catalogo?cat=Vestidos", img: "/categorias/vestidos.jpg" },
  { label: "Conjuntos", href: "/catalogo?cat=Conjuntos", img: "/categorias/conjuntos.jpg" },
  { label: "Faldas", href: "/catalogo?cat=Faldas", img: "/categorias/faldas.jpg" },
];

export function CategoryTiles() {
  return (
    <section className="section" style={{ background: "#fff" }}>
      <div className="container-x">
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "clamp(28px,4vw,48px)" }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>La selección</div>
            <h2
              className="serif"
              style={{ fontSize: "clamp(26px,3.4vw,44px)", fontWeight: 500, letterSpacing: 0.5, margin: 0, color: "var(--ink)" }}
            >
              Imprescindibles de la temporada
            </h2>
          </div>
        </Reveal>

        <div className="cat-tiles">
          {TILES.map((t, i) => (
            <Reveal key={t.label} delay={i * 90} style={{ display: "flex" }}>
              <a className="cat-tile" href={t.href}>
                <div className="cat-tile__media">
                  <Image
                    src={t.img}
                    alt={t.label}
                    fill
                    sizes="(max-width: 760px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                  <span className="cat-tile__scrim" />
                  <span className="cat-tile__label">{t.label}</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
