"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES, CatKey } from "@/lib/data";
import { Reveal } from "./Reveal";
import { Placeholder } from "./Placeholder";

const ITEM_W = 260;

export function Categories({
  onPick,
}: {
  onPick?: (v: CatKey) => void;
}) {
  const router = useRouter();
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  // Drag + inertia state
  const drag = useRef({
    isDown: false,
    startX: 0,
    startScroll: 0,
    lastX: 0,
    lastT: 0,
    velocity: 0,
    moved: false,
  });
  // Smooth-scroll (wheel + arrow) target with rAF interpolation
  const target = useRef<number | null>(null);
  const raf = useRef<number | null>(null);

  const stopRaf = () => {
    if (raf.current !== null) {
      cancelAnimationFrame(raf.current);
      raf.current = null;
    }
  };

  // Animation loop: eases scrollLeft toward `target` OR applies drag inertia
  const tick = () => {
    const el = scrollerRef.current;
    if (!el) return;

    // Inertia (after release)
    if (!drag.current.isDown && Math.abs(drag.current.velocity) > 0.05) {
      el.scrollLeft += drag.current.velocity;
      drag.current.velocity *= 0.94; // friction
      raf.current = requestAnimationFrame(tick);
      return;
    }
    drag.current.velocity = 0;

    // Wheel/arrow eased scroll
    if (target.current !== null) {
      const diff = target.current - el.scrollLeft;
      if (Math.abs(diff) < 0.5) {
        el.scrollLeft = target.current;
        target.current = null;
        raf.current = null;
        return;
      }
      el.scrollLeft += diff * 0.14; // ease-out
      raf.current = requestAnimationFrame(tick);
      return;
    }
    raf.current = null;
  };

  const handle = (v: CatKey) => {
    if (drag.current.moved) return;
    if (onPick) onPick(v);
    else router.push(`/catalogo?cat=${encodeURIComponent(v)}`);
  };

  const slide = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    stopRaf();
    const base = target.current ?? el.scrollLeft;
    target.current = Math.max(0, Math.min(el.scrollWidth - el.clientWidth, base + dir * (ITEM_W + 32) * 2));
    raf.current = requestAnimationFrame(tick);
  };

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    stopRaf();
    target.current = null;
    drag.current = {
      isDown: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      lastX: e.clientX,
      lastT: performance.now(),
      velocity: 0,
      moved: false,
    };
    el.setPointerCapture(e.pointerId);
    el.style.cursor = "grabbing";
  };
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el || !drag.current.isDown) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - dx;
    // Track velocity in px/frame (approx)
    const now = performance.now();
    const dt = Math.max(1, now - drag.current.lastT);
    drag.current.velocity = ((drag.current.lastX - e.clientX) / dt) * 16; // ~1 frame
    drag.current.lastX = e.clientX;
    drag.current.lastT = now;
  };
  const onUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    drag.current.isDown = false;
    try {
      el.releasePointerCapture(e.pointerId);
    } catch {}
    el.style.cursor = "grab";
    // Start inertia if we have velocity
    if (Math.abs(drag.current.velocity) > 0.2) {
      stopRaf();
      raf.current = requestAnimationFrame(tick);
    }
    setTimeout(() => (drag.current.moved = false), 0);
  };

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    // Only intercept horizontal wheel gestures (trackpad two-finger swipe).
    // Vertical wheel is left alone so the page scrolls normally when you pass
    // over the rack — no more "getting stuck".
    const el = scrollerRef.current;
    if (!el) return;
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    const base = target.current ?? el.scrollLeft;
    const next = Math.max(0, Math.min(el.scrollWidth - el.clientWidth, base + e.deltaX * 0.9));
    target.current = next;
    if (raf.current === null) raf.current = requestAnimationFrame(tick);
  };

  useEffect(() => () => stopRaf(), []);

  return (
    <section id="categorias" className="section">
      <div className="container-x">
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
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
            <p style={{ maxWidth: 580, margin: "0 auto", color: "#bcae94", fontSize: 15, lineHeight: 1.7 }}>
              Desplazá el perchero — arrastrá con el mouse, deslizá con el trackpad o usá las flechas.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div style={{ position: "relative" }}>
            {/* Nav arrows */}
            <ArrowBtn dir="left" onClick={() => slide(-1)} />
            <ArrowBtn dir="right" onClick={() => slide(1)} />

            {/* Fade edges */}
            <div style={fadeEdge("left")} />
            <div style={fadeEdge("right")} />

            {/* Rack rod (fixed above the scroller so it appears continuous) */}
            <div style={{ position: "relative", height: 46 }}>
              <div style={bracketStyle("left")}><div style={bracketArm} /></div>
              <div style={bracketStyle("right")}><div style={{ ...bracketArm, transform: "rotate(180deg)" }} /></div>
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 42,
                  right: 42,
                  height: 4,
                  borderRadius: 4,
                  background: "linear-gradient(180deg, #f0dcab 0%, #c6a76b 45%, #7a5a2e 100%)",
                  boxShadow: "0 2px 6px rgba(0,0,0,.55), 0 0 0 1px rgba(0,0,0,.25) inset, 0 1px 0 rgba(255,236,192,.6) inset",
                  transform: "translateY(-50%)",
                }}
              />
            </div>

            {/* Horizontal scroller */}
            <div
              ref={scrollerRef}
              className="rack-scroller filter-row-none"
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
              onWheel={onWheel}
              style={{
                display: "flex",
                gap: 32,
                overflowX: "auto",
                overflowY: "hidden",
                cursor: "grab",
                padding: "0 42px 32px",
                scrollSnapType: "x proximity",
                scrollBehavior: "auto",
                WebkitOverflowScrolling: "touch",
                userSelect: "none",
                touchAction: "pan-x",
              }}
            >
              {CATEGORIES.map((c, i) => (
                <div
                  key={c.name}
                  className="hanger-wrap rack-item"
                  style={{
                    position: "relative",
                    paddingTop: 54,
                    flex: `0 0 ${ITEM_W}px`,
                    scrollSnapAlign: "start",
                    animation: `hangerSway ${8 + (i % 3) * 1.2}s cubic-bezier(.45,.05,.55,.95) ${i * 0.35}s infinite`,
                    transformOrigin: "50% -10px",
                    willChange: "transform",
                  }}
                >
                  <HangerSVG />
                  <button
                    onClick={() => handle(c.value)}
                    className="cat-card"
                    style={{
                      all: "unset",
                      cursor: "pointer",
                      display: "block",
                      width: "100%",
                      aspectRatio: "3 / 4",
                      borderRadius: "8px 8px 14px 14px",
                      overflow: "hidden",
                      background: "#1c1710",
                      border: "1px solid rgba(198,167,107,.22)",
                      borderTop: "2px solid rgba(198,167,107,.55)",
                      position: "relative",
                      transformOrigin: "top center",
                      transition:
                        "transform .55s cubic-bezier(.2,.7,.2,1), box-shadow .55s ease, border-color .35s ease",
                    }}
                  >
                    <div className="cat-img" style={{ position: "absolute", inset: 0, transition: "transform .9s cubic-bezier(.2,.7,.2,1)", pointerEvents: "none" }}>
                      <Placeholder ratio="3 / 4" rounded={0} label={c.name} />
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(180deg, transparent 45%, rgba(14,11,7,.85) 100%)",
                        pointerEvents: "none",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 14,
                        right: 14,
                        background: "rgba(14,11,7,.82)",
                        backdropFilter: "blur(8px)",
                        padding: "6px 10px",
                        borderRadius: 4,
                        border: "1px solid rgba(198,167,107,.35)",
                        fontSize: 9,
                        letterSpacing: 2,
                        textTransform: "uppercase",
                        color: "#c6a76b",
                      }}
                    >
                      {c.tag}
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        left: 18,
                        right: 18,
                        bottom: 18,
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "space-between",
                        gap: 12,
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: 26,
                          color: "#f4ece0",
                          lineHeight: 1.05,
                        }}
                      >
                        {c.name}
                      </div>
                      <div
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: "50%",
                          border: "1px solid rgba(198,167,107,.55)",
                          display: "grid",
                          placeItems: "center",
                          color: "#c6a76b",
                          fontSize: 13,
                          flex: "0 0 auto",
                        }}
                      >
                        →
                      </div>
                    </div>
                  </button>
                </div>
              ))}
              {/* Trailing spacer for last-item breathing room */}
              <div style={{ flex: "0 0 1px" }} />
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        .rack-scroller { scrollbar-width: thin; scrollbar-color: rgba(198,167,107,.4) transparent; }
        .rack-scroller::-webkit-scrollbar { height: 6px; }
        .rack-scroller::-webkit-scrollbar-track { background: transparent; }
        .rack-scroller::-webkit-scrollbar-thumb { background: rgba(198,167,107,.35); border-radius: 4px; }
        .rack-scroller::-webkit-scrollbar-thumb:hover { background: rgba(198,167,107,.6); }

        .hanger-wrap { transition: transform .8s cubic-bezier(.2,.7,.2,1); }
        .hanger-wrap:hover { animation-play-state: paused; transform: translateY(-4px); }
        .hanger-wrap:hover .cat-card {
          transform: rotate(-1.2deg);
          box-shadow: 0 34px 60px -30px rgba(0,0,0,.9);
          border-color: rgba(198,167,107,.6) !important;
        }
        .hanger-wrap:hover .cat-img { transform: scale(1.05); }
        .hanger-wrap:hover .hanger-svg { transform: translateX(-50%) rotate(-2deg); }
        .hanger-svg { transition: transform .8s cubic-bezier(.2,.7,.2,1); transform-origin: 50% 0; }

        @keyframes hangerSway {
          0%, 100% { transform: rotate(-0.35deg); }
          50% { transform: rotate(0.35deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hanger-wrap { animation: none !important; }
        }
      `}</style>
    </section>
  );
}

/* ==================== Sub-components ==================== */

function ArrowBtn({ dir, onClick }: { dir: "left" | "right"; onClick: () => void }) {
  return (
    <button
      aria-label={dir === "left" ? "Anterior" : "Siguiente"}
      onClick={onClick}
      className="rack-arrow"
      style={{
        position: "absolute",
        top: "60%",
        [dir]: -6,
        transform: "translateY(-50%)",
        zIndex: 3,
        width: 46,
        height: 46,
        borderRadius: "50%",
        background: "rgba(14,11,7,.75)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(198,167,107,.5)",
        color: "#c6a76b",
        fontSize: 20,
        cursor: "pointer",
        display: "grid",
        placeItems: "center",
        transition: "background .3s ease, transform .3s ease",
      } as React.CSSProperties}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "linear-gradient(135deg,#caa86a,#e7d2a3)";
        e.currentTarget.style.color = "#1a1308";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(14,11,7,.75)";
        e.currentTarget.style.color = "#c6a76b";
      }}
    >
      {dir === "left" ? "←" : "→"}
    </button>
  );
}

function fadeEdge(side: "left" | "right"): React.CSSProperties {
  return {
    position: "absolute",
    top: 46,
    bottom: 0,
    [side]: 0,
    width: 60,
    zIndex: 2,
    pointerEvents: "none",
    background:
      side === "left"
        ? "linear-gradient(90deg, #14100b 20%, transparent)"
        : "linear-gradient(270deg, #14100b 20%, transparent)",
  } as React.CSSProperties;
}

function bracketStyle(side: "left" | "right"): React.CSSProperties {
  return {
    position: "absolute",
    top: 0,
    bottom: 0,
    [side]: 6,
    width: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
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
      className="hanger-svg"
      width="90"
      height="56"
      viewBox="0 0 90 56"
      fill="none"
      style={{ position: "absolute", top: -6, left: "50%", transform: "translateX(-50%)", pointerEvents: "none" }}
      aria-hidden
    >
      <defs>
        <linearGradient id="hg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0dcab" />
          <stop offset="55%" stopColor="#c6a76b" />
          <stop offset="100%" stopColor="#7a5a2e" />
        </linearGradient>
      </defs>
      <path d="M45 3 C 45 3, 42 6, 45 10 C 48 14, 45 18, 45 22" stroke="url(#hg)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M45 22 L10 52 L80 52 Z" stroke="url(#hg)" strokeWidth="2.2" strokeLinejoin="round" fill="none" />
    </svg>
  );
}
