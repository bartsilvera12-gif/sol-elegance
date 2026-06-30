"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { NAV_LINKS, WA_MAIN } from "@/lib/data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
        top: 38,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "16px clamp(20px,5vw,64px)",
        background: scrolled ? "rgba(16,12,8,.9)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(198,167,107,.18)" : "1px solid transparent",
        transition: "all .4s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
      }}
    >
      <a href="#inicio" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
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
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, fontSize: 21, color: "#f4ece0" }}>
            Sol Elegance
          </div>
          <div style={{ fontSize: 8.5, letterSpacing: 4, textTransform: "uppercase", color: "#c6a76b", marginTop: 4 }}>
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

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <a href={WA_MAIN} target="_blank" rel="noopener" className="pill-gold">
          WhatsApp
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
