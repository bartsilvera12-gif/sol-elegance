import Image from "next/image";

export function Hero() {
  return (
    <section
      id="inicio"
      style={{
        position: "relative",
        width: "100%",
        height: "min(88vh, 900px)",
        minHeight: 480,
        overflow: "hidden",
        background: "var(--bg-soft)",
      }}
    >
      <Image
        className="hero-img"
        src="/hero-portada.png"
        alt="Nueva colección Sol Elegance"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center 22%" }}
      />

      {/* Soft gradient for legibility */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,.42) 0%, rgba(0,0,0,.08) 34%, rgba(0,0,0,0) 60%)",
        }}
      />

      {/* Caption */}
      <div
        className="hero-caption"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: "clamp(28px,5vw,68px)",
          textAlign: "center",
          color: "#fff",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: 3,
            textTransform: "uppercase",
            marginBottom: 16,
            opacity: 0.9,
          }}
        >
          Nueva temporada
        </div>
        <h1
          className="serif"
          style={{
            fontSize: "clamp(34px,6vw,74px)",
            fontWeight: 500,
            lineHeight: 1.02,
            margin: "0 0 26px",
            letterSpacing: 1,
          }}
        >
          La colección
        </h1>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="#catalogo"
            className="btn-dark"
            style={{ background: "#fff", color: "var(--black)", borderColor: "#fff" }}
          >
            Descubrir
          </a>
          <a
            href="/categorias"
            className="btn-outline"
            style={{ color: "#fff", borderColor: "rgba(255,255,255,.6)" }}
          >
            Categorías
          </a>
        </div>
      </div>
    </section>
  );
}
