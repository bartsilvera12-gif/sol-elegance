"use client";
import { useState } from "react";
import { CATEGORIES, FILTERS, PRODUCTS, CatKey, waForProduct } from "@/lib/data";
import { Reveal } from "./Reveal";
import { Placeholder } from "./Placeholder";

export function CatalogSection() {
  const [filter, setFilter] = useState<CatKey>("todos");

  const pickCategory = (v: CatKey) => {
    setFilter(v);
    requestAnimationFrame(() => {
      const el = document.getElementById("catalogo");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <>
      {/* CATEGORIES */}
      <section id="categorias" className="section">
        <div className="container-x">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#c6a76b" }}>
                Encuentra tu estilo
              </div>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 500,
                  fontSize: "clamp(38px,5.5vw,68px)",
                  color: "#f4ece0",
                  lineHeight: 1.02,
                  margin: "14px 0 10px",
                }}
              >
                Categorías
              </h2>
              <p style={{ maxWidth: 560, margin: "0 auto", color: "#bcae94", fontSize: 15, lineHeight: 1.7 }}>
                Navegá por tipo de prenda y descubrí lo que mejor encaja con tu momento.
              </p>
            </div>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "clamp(16px,2vw,26px)",
            }}
          >
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.name} delay={i * 60}>
                <button
                  onClick={() => pickCategory(c.value)}
                  className="cat-card"
                  style={{
                    all: "unset",
                    cursor: "pointer",
                    display: "block",
                    width: "100%",
                    aspectRatio: "4 / 5",
                    borderRadius: 18,
                    overflow: "hidden",
                    background: "#1c1710",
                    border: "1px solid rgba(198,167,107,.2)",
                    position: "relative",
                    transition: "transform .55s cubic-bezier(.2,.7,.2,1), box-shadow .55s ease, border-color .35s ease",
                  }}
                >
                  <div className="cat-img" style={{ position: "absolute", inset: 0, transition: "transform .9s cubic-bezier(.2,.7,.2,1)" }}>
                    <Placeholder ratio="4 / 5" rounded={0} label={c.name} />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, transparent 50%, rgba(14,11,7,.78) 100%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: 22,
                      right: 22,
                      bottom: 22,
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                      gap: 14,
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", color: "#c6a76b" }}>
                        {c.tag}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: 28,
                          color: "#f4ece0",
                          marginTop: 6,
                          lineHeight: 1.1,
                        }}
                      >
                        {c.name}
                      </div>
                    </div>
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: "50%",
                        border: "1px solid rgba(198,167,107,.55)",
                        display: "grid",
                        placeItems: "center",
                        color: "#c6a76b",
                        fontSize: 14,
                      }}
                    >
                      →
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>

        <style>{`
          .cat-card:hover { transform: translateY(-8px); box-shadow: 0 30px 60px -28px rgba(0,0,0,.85); border-color: rgba(198,167,107,.55) !important; }
          .cat-card:hover .cat-img { transform: scale(1.09); }
        `}</style>
      </section>

      {/* CATALOG */}
      <section
        id="catalogo"
        style={{
          background: "linear-gradient(180deg, #14100b, #100c08 50%, #14100b)",
          padding: "clamp(70px,9vw,130px) clamp(20px,5vw,64px)",
        }}
      >
        <div className="container-x">
          <Reveal>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: 20,
                marginBottom: 32,
              }}
            >
              <div>
                <div style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#c6a76b" }}>
                  Selección actual
                </div>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 500,
                    fontSize: "clamp(38px,5.5vw,68px)",
                    color: "#f4ece0",
                    margin: "10px 0 0",
                  }}
                >
                  El catálogo
                </h2>
              </div>
              <p style={{ maxWidth: 360, color: "#bcae94", fontSize: 14.5, lineHeight: 1.7 }}>
                Tocá una prenda para consultar disponibilidad, talles y colores por WhatsApp.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 38 }}>
              {FILTERS.map((f) => {
                const active = filter === f.value;
                return (
                  <button
                    key={f.value}
                    onClick={() => setFilter(f.value)}
                    style={{
                      cursor: "pointer",
                      borderRadius: 40,
                      padding: "11px 22px",
                      fontSize: 12,
                      letterSpacing: 1.8,
                      textTransform: "uppercase",
                      fontWeight: 600,
                      transition: "all .3s ease",
                      ...(active
                        ? {
                            background: "linear-gradient(135deg,#caa86a,#e7d2a3)",
                            color: "#1a1308",
                            border: "1px solid transparent",
                          }
                        : {
                            background: "transparent",
                            color: "#c6a76b",
                            border: "1px solid rgba(198,167,107,.35)",
                          }),
                    }}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(248px, 1fr))",
              gap: "clamp(16px,2vw,28px)",
            }}
          >
            {PRODUCTS.map((p, i) => {
              const show = filter === "todos" || p.cat === filter;
              return (
                <Reveal key={p.name} delay={(i % 4) * 60}>
                  <article
                    className="prod-card"
                    style={{
                      display: show ? "flex" : "none",
                      flexDirection: "column",
                      borderRadius: 16,
                      overflow: "hidden",
                      background: "#1c1710",
                      border: "1px solid rgba(198,167,107,.18)",
                      transition: "transform .5s cubic-bezier(.2,.7,.2,1), box-shadow .5s ease, border-color .35s ease",
                    }}
                  >
                    <div style={{ position: "relative" }}>
                      <div className="prod-img" style={{ transition: "transform .9s cubic-bezier(.2,.7,.2,1)" }}>
                        <Placeholder ratio="3 / 4" rounded={0} label={p.name} />
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          left: 14,
                          top: 14,
                          background: "rgba(14,11,7,.78)",
                          backdropFilter: "blur(8px)",
                          padding: "6px 12px",
                          borderRadius: 30,
                          border: "1px solid rgba(198,167,107,.3)",
                          fontSize: 9.5,
                          letterSpacing: 2,
                          textTransform: "uppercase",
                          color: "#c6a76b",
                        }}
                      >
                        {p.cat}
                      </div>
                    </div>
                    <div style={{ padding: 22, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                      <h3
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: 23,
                          color: "#f4ece0",
                          margin: 0,
                          fontWeight: 500,
                        }}
                      >
                        {p.name}
                      </h3>
                      <p style={{ fontSize: 12.5, color: "#9c8d74", lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
                      <a
                        href={waForProduct(p.name)}
                        target="_blank"
                        rel="noopener"
                        className="prod-cta"
                        style={{
                          marginTop: "auto",
                          textAlign: "center",
                          textDecoration: "none",
                          border: "1px solid rgba(198,167,107,.5)",
                          color: "#c6a76b",
                          padding: "11px 18px",
                          borderRadius: 40,
                          fontSize: 11,
                          letterSpacing: 1.6,
                          textTransform: "uppercase",
                          fontWeight: 600,
                          transition: "all .3s ease",
                        }}
                      >
                        Consultar por WhatsApp
                      </a>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>

        <style>{`
          .prod-card:hover { transform: translateY(-8px); box-shadow: 0 32px 64px -30px rgba(0,0,0,.9); border-color: rgba(198,167,107,.5) !important; }
          .prod-card:hover .prod-img { transform: scale(1.07); }
          .prod-cta:hover { background: linear-gradient(135deg,#caa86a,#e7d2a3); color: #1a1308 !important; border-color: transparent !important; }
        `}</style>
      </section>
    </>
  );
}
