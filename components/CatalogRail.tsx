"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PRODUCTS, waForProduct } from "@/lib/data";
import { Reveal } from "./Reveal";
import { Placeholder } from "./Placeholder";

type Product = (typeof PRODUCTS)[number];
type Phase = "in" | "out";
type Slot = { product: Product; key: number; phase: Phase };

const CYCLE_MS = 2600;   // time between swaps
const EXIT_MS = 620;     // how long the "picking up" animation lasts

export function CatalogRail() {
  // Desktop shows 5 hangers, tablet 4, phone 3. We render 5 in DOM and hide extras.
  const initialCount = Math.min(5, PRODUCTS.length);
  const [slots, setSlots] = useState<Slot[]>(() =>
    PRODUCTS.slice(0, initialCount).map((p, i) => ({
      product: p,
      key: i,
      phase: "in",
    }))
  );
  const [paused, setPaused] = useState(false);
  const keySeq = useRef(1000);

  useEffect(() => {
    if (paused) return;
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const interval = setInterval(() => {
      setSlots((prev) => {
        // pick a slot that is currently 'in' (avoid double-swap)
        const eligible = prev.map((s, i) => (s.phase === "in" ? i : -1)).filter((i) => i >= 0);
        if (!eligible.length) return prev;
        const idx = eligible[Math.floor(Math.random() * eligible.length)];

        // pick a product not currently on the rack
        const inUse = new Set(prev.map((s) => s.product.name));
        const options = PRODUCTS.filter((p) => !inUse.has(p.name));
        if (!options.length) return prev;
        const next = options[Math.floor(Math.random() * options.length)];

        // Mark exiting
        const cloned = prev.slice();
        cloned[idx] = { ...cloned[idx], phase: "out" };

        // Schedule replacement after exit animation
        setTimeout(() => {
          setSlots((cur) => {
            const c = cur.slice();
            c[idx] = { product: next, key: ++keySeq.current, phase: "in" };
            return c;
          });
        }, EXIT_MS);

        return cloned;
      });
    }, CYCLE_MS);

    return () => clearInterval(interval);
  }, [paused]);

  return (
    <section
      id="catalogo"
      style={{
        background: "linear-gradient(180deg, #14100b, #100c08 50%, #14100b)",
        padding: "clamp(70px,9vw,130px) clamp(20px,5vw,64px)",
        overflow: "hidden",
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
            <p className="catalog-head-p" style={{ maxWidth: 380, color: "#bcae94", fontSize: 14.5, lineHeight: 1.7 }}>
              Miralas rotar en el perchero. Tocá cualquiera para consultarla por WhatsApp.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div
            className="rail-outer"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            style={{ position: "relative", padding: "0 clamp(6px, 3vw, 42px)" }}
          >
            {/* Wall brackets */}
            <div style={bracketWall("left")}><div style={bracketArm} /></div>
            <div style={bracketWall("right")}><div style={{ ...bracketArm, transform: "rotate(180deg)" }} /></div>

            {/* Gold rod */}
            <div
              style={{
                position: "absolute",
                top: 22,
                left: 42,
                right: 42,
                height: 4,
                borderRadius: 4,
                background: "linear-gradient(180deg, #f0dcab 0%, #c6a76b 45%, #7a5a2e 100%)",
                boxShadow:
                  "0 2px 6px rgba(0,0,0,.55), 0 0 0 1px rgba(0,0,0,.25) inset, 0 1px 0 rgba(255,236,192,.6) inset",
                zIndex: 1,
              }}
            />

            {/* Slots */}
            <div className="rail-slots">
              {slots.map((slot, i) => (
                <div key={i} className={`rail-slot slot-${i}`}>
                  <HangerItem key={slot.key} slot={slot} />
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 42 }}>
            <Link href="/catalogo" className="pill-gold pill-gold-lg">
              Ver catálogo completo <span>→</span>
            </Link>
          </div>
        </Reveal>
      </div>

      <style>{`
        .rail-slots {
          padding-top: 46px;
          padding-bottom: 20px;
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: clamp(14px, 2vw, 28px);
          align-items: start;
        }
        .rail-slot { position: relative; }
        @media (max-width: 1024px) {
          .rail-slots { grid-template-columns: repeat(4, minmax(0, 1fr)); }
          .rail-slot.slot-4 { display: none; }
        }
        @media (max-width: 720px) {
          .rail-slots { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
          .rail-slot.slot-3, .rail-slot.slot-4 { display: none; }
        }
        @media (max-width: 460px) {
          .rail-slots { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
          .rail-slot.slot-2, .rail-slot.slot-3, .rail-slot.slot-4 { display: none; }
        }

        .hanger-item {
          position: relative;
          transform-origin: 50% -18px;
          animation: hSway 8s cubic-bezier(.45,.05,.55,.95) infinite;
          will-change: transform, opacity;
        }
        .hanger-item.entering { animation: hIn ${EXIT_MS}ms cubic-bezier(.2,.7,.2,1) both, hSway 8s cubic-bezier(.45,.05,.55,.95) ${EXIT_MS}ms infinite; }
        .hanger-item.exiting  { animation: hOut ${EXIT_MS}ms cubic-bezier(.5,.05,.7,.2) forwards; }
        .rail-outer:hover .hanger-item { animation-play-state: paused; }

        @keyframes hSway {
          0%, 100% { transform: rotate(-0.35deg); }
          50%      { transform: rotate(0.35deg); }
        }
        @keyframes hOut {
          0%   { transform: translateY(0)    rotate(0deg);   opacity: 1; }
          40%  { transform: translateY(-24px) rotate(-6deg);  opacity: 1; }
          100% { transform: translateY(-110px) rotate(-14deg); opacity: 0; }
        }
        @keyframes hIn {
          0%   { transform: translateY(-110px) rotate(12deg); opacity: 0; }
          55%  { transform: translateY(8px)   rotate(2deg);   opacity: 1; }
          80%  { transform: translateY(-3px)  rotate(-1deg);  opacity: 1; }
          100% { transform: translateY(0)     rotate(0deg);   opacity: 1; }
        }

        .rail-card {
          all: unset;
          cursor: pointer;
          display: block;
          width: 100%;
          aspect-ratio: 3 / 4;
          border-radius: 8px 8px 14px 14px;
          overflow: hidden;
          background: #1c1710;
          border: 1px solid rgba(198,167,107,.22);
          border-top: 2px solid rgba(198,167,107,.55);
          position: relative;
          margin-top: 32px;
          transition: transform .55s cubic-bezier(.2,.7,.2,1), box-shadow .55s ease, border-color .35s ease;
        }
        .rail-card:hover {
          transform: rotate(-1.2deg);
          box-shadow: 0 34px 60px -30px rgba(0,0,0,.9);
          border-color: rgba(198,167,107,.6);
        }
        .rail-card:hover .rail-img { transform: scale(1.05); }
        .rail-img { position: absolute; inset: 0; transition: transform .9s cubic-bezier(.2,.7,.2,1); pointer-events: none; }

        @media (prefers-reduced-motion: reduce) {
          .hanger-item, .hanger-item.entering, .hanger-item.exiting { animation: none !important; }
        }
      `}</style>
    </section>
  );
}

function HangerItem({ slot }: { slot: Slot }) {
  return (
    <div className={`hanger-item ${slot.phase === "in" ? "entering" : "exiting"}`}>
      <HangerSVG />
      <a
        href={waForProduct(slot.product.name)}
        target="_blank"
        rel="noopener"
        aria-label={`Consultar ${slot.product.name} por WhatsApp`}
        className="rail-card"
      >
        <div className="rail-img">
          <Placeholder ratio="3 / 4" rounded={0} label={slot.product.name} />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, transparent 40%, rgba(14,11,7,.9) 100%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "rgba(14,11,7,.82)",
            backdropFilter: "blur(8px)",
            padding: "5px 9px",
            borderRadius: 4,
            border: "1px solid rgba(198,167,107,.35)",
            fontSize: 9,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#c6a76b",
          }}
        >
          {slot.product.cat}
        </div>
        <div
          style={{
            position: "absolute",
            left: 14,
            right: 14,
            bottom: 14,
          }}
        >
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 21,
              color: "#f4ece0",
              lineHeight: 1.1,
            }}
          >
            {slot.product.name}
          </div>
          <div
            style={{
              fontSize: 10,
              letterSpacing: 1.6,
              textTransform: "uppercase",
              color: "#c6a76b",
              marginTop: 4,
              opacity: 0.85,
            }}
          >
            Consultar →
          </div>
        </div>
      </a>
    </div>
  );
}

function bracketWall(side: "left" | "right"): React.CSSProperties {
  return {
    position: "absolute",
    top: 22,
    [side]: 6,
    width: 40,
    height: 12,
    transform: "translateY(-50%)",
    zIndex: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
  } as React.CSSProperties;
}
const bracketArm: React.CSSProperties = {
  width: 30,
  height: 12,
  background: "linear-gradient(180deg, #e7d2a3, #c6a76b 55%, #7a5a2e)",
  borderRadius: 2,
  boxShadow: "0 3px 6px rgba(0,0,0,.55)",
};

function HangerSVG() {
  return (
    <svg
      width="80"
      height="52"
      viewBox="0 0 90 56"
      fill="none"
      style={{
        position: "absolute",
        top: -6,
        left: "50%",
        transform: "translateX(-50%)",
        pointerEvents: "none",
        zIndex: 2,
      }}
      aria-hidden
    >
      <defs>
        <linearGradient id="hg-rail" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0dcab" />
          <stop offset="55%" stopColor="#c6a76b" />
          <stop offset="100%" stopColor="#7a5a2e" />
        </linearGradient>
      </defs>
      <path d="M45 3 C 45 3, 42 6, 45 10 C 48 14, 45 18, 45 22" stroke="url(#hg-rail)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M45 22 L10 52 L80 52 Z" stroke="url(#hg-rail)" strokeWidth="2.2" strokeLinejoin="round" fill="none" />
    </svg>
  );
}
