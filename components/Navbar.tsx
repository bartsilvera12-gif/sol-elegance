"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { NAV_LINKS } from "@/lib/data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // The homepage hero is dark, so keep the nav transparent there until scroll.
  // Inner pages now have white backgrounds, so the nav needs its solid bar
  // from the top — otherwise the light links are invisible over white.
  const solid = scrolled || pathname !== "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "16px clamp(20px,5vw,64px)",
        background: solid ? "rgba(16,12,8,.9)" : "transparent",
        backdropFilter: solid ? "blur(14px)" : "none",
        WebkitBackdropFilter: solid ? "blur(14px)" : "none",
        borderBottom: solid ? "1px solid rgba(198,167,107,.18)" : "1px solid transparent",
        transition: "all .4s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
      }}
    >
      <a href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            border: "1px solid rgba(198,167,107,.5)",
            overflow: "hidden",
            background: "#0e0b07",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image src="/logo.png" alt="Sol Elegance" width={42} height={42} style={{ objectFit: "cover" }} />
        </div>
        <div style={{ lineHeight: 1 }}>
          <div className="nav-brand-title" style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, fontSize: 21, color: "#f4ece0" }}>
            Sol Elegance
          </div>
          <div className="nav-brand-sub" style={{ fontSize: 8.5, letterSpacing: 4, textTransform: "uppercase", color: "#c6a76b", marginTop: 4 }}>
            Moda Femenina
          </div>
        </div>
      </a>

      <ul
        className="hidden md:flex"
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          gap: 30,
          alignItems: "center",
        }}
      >
        {NAV_LINKS.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              style={{
                color: "#d8cbb4",
                textDecoration: "none",
                fontSize: 13,
                letterSpacing: 1.8,
                textTransform: "uppercase",
                transition: "color .25s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#c6a76b")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#d8cbb4")}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <a
          href="#carrito"
          aria-label="Carrito"
          className="nav-cart"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 18px",
            borderRadius: 40,
            background: "#0e0b07",
            border: "1px solid #c6a76b",
            color: "#c6a76b",
            fontSize: 12,
            letterSpacing: 1.6,
            textTransform: "uppercase",
            fontWeight: 600,
            textDecoration: "none",
            transition: "background .25s ease, color .25s ease, transform .25s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#c6a76b";
            e.currentTarget.style.color = "#0e0b07";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#0e0b07";
            e.currentTarget.style.color = "#c6a76b";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M3 3h2l2.4 12.2a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 2-1.5L22 7H6" />
            <circle cx="10" cy="21" r="1.5" />
            <circle cx="18" cy="21" r="1.5" />
          </svg>
          <span className="nav-cart-label">Carrito</span>
        </a>
        <button
          aria-label="Menú"
          onClick={() => setOpen(!open)}
          className="md:hidden"
          style={{
            background: "transparent",
            border: "1px solid rgba(198,167,107,.4)",
            borderRadius: 10,
            padding: "8px 10px",
            color: "#c6a76b",
            cursor: "pointer",
          }}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div
          className="md:hidden"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "rgba(16,12,8,.96)",
            backdropFilter: "blur(14px)",
            padding: "16px clamp(20px,5vw,64px)",
            borderTop: "1px solid rgba(198,167,107,.18)",
          }}
        >
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 14 }}>
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  style={{
                    color: "#d8cbb4",
                    textDecoration: "none",
                    fontSize: 13,
                    letterSpacing: 1.8,
                    textTransform: "uppercase",
                  }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
