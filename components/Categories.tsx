"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES, CatKey } from "@/lib/data";
import { Reveal } from "./Reveal";
import { Placeholder } from "./Placeholder";
import { VanityLights } from "./VanityLights";

const ITEM_W = 260;
const ITEM_GAP = 32;

export function Categories({
  onPick,
}: {
  onPick?: (v: CatKey) => void;
}) {
  const router = useRouter();
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const drag = useRef({
    isDown: false,
    startX: 0,
    startScroll: 0,
    lastX: 0,
    lastT: 0,
    velocity: 0,
    moved: false,
    captured: false,
  });
  const target = useRef<number | null>(null);
  const raf = useRef<number | null>(null);

  const stopRaf = () => {
    if (raf.current !== null) {
      cancelAnimationFrame(raf.current);
      raf.current = null;
    }
  };

  const updateEdges = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 4);
  };

  useLayoutEffect(() => {
    updateEdges();
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => updateEdges();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // Recalculate once more after any late layout changes (fonts, images)
    const t = setTimeout(updateEdges, 300);
    // Observe rail size (children width can change on breakpoints / hydration)
    const rail = el.querySelector(".rack-rail") as HTMLElement | null;
    let ro: ResizeObserver | null = null;
    if (rail && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => updateEdges());
      ro.observe(rail);
    }
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(t);
      ro?.disconnect();
    };
  }, []);

  const tick = () => {
    const el = scrollerRef.current;
    if (!el) return;

    if (!drag.current.isDown && Math.abs(drag.current.velocity) > 0.05) {
      const next = el.scrollLeft + drag.current.velocity;
      const max = el.scrollWidth - el.clientWidth;
      if (next <= 0 || next >= max) drag.current.velocity = 0;
      el.scrollLeft = Math.max(0, Math.min(max, next));
      drag.current.velocity *= 0.94;
      raf.current = requestAnimationFrame(tick);
      return;
    }
    drag.current.velocity = 0;

    if (target.current !== null) {
      const diff = target.current - el.scrollLeft;
      if (Math.abs(diff) < 0.5) {
        el.scrollLeft = target.current;
        target.current = null;
        raf.current = null;
        updateEdges();
        return;
      }
      el.scrollLeft += diff * 0.14;
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
    // Cancel any in-flight rAF/inertia so we don't fight it
    stopRaf();
    target.current = null;
    drag.current.velocity = 0;
    // Use native smooth scroll — most reliable across browsers
    const amount = dir * (ITEM_W + ITEM_GAP) * 2;
    if (typeof el.scrollBy === "function") {
      el.scrollBy({ left: amount, behavior: "smooth" });
    } else {
      el.scrollLeft += amount;
    }
    // Refresh edge flags shortly after the scroll settles
    setTimeout(updateEdges, 350);
  };

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    if ((e.target as HTMLElement).closest("[data-noscroll]")) return;
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
      captured: false,
    };
    el.style.cursor = "grabbing";
  };
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el || !drag.current.isDown) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) {
      drag.current.moved = true;
      // Capture the pointer only once a real drag starts, so a plain tap still
      // delivers its click to the category button. Capturing on pointerdown
      // would retarget the click to the scroller and swallow it.
      if (!drag.current.captured) {
        try { el.setPointerCapture(e.pointerId); } catch {}
        drag.current.captured = true;
      }
    }
    el.scrollLeft = drag.current.startScroll - dx;
    const now = performance.now();
    const dt = Math.max(1, now - drag.current.lastT);
    drag.current.velocity = ((drag.current.lastX - e.clientX) / dt) * 16;
    drag.current.lastX = e.clientX;
    drag.current.lastT = now;
  };
  const onUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    drag.current.isDown = false;
    try { el.releasePointerCapture(e.pointerId); } catch {}
    el.style.cursor = "grab";
    if (Math.abs(drag.current.velocity) > 0.2) {
      stopRaf();
      raf.current = requestAnimationFrame(tick);
    }
    setTimeout(() => (drag.current.moved = false), 0);
  };

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
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
    <section id="categorias" className="section" style={{ background: "#ffffff" }}>
      <div className="container-x">
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#9a7328" }}>
              Encuentra tu estilo
            </div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500,
                fontSize: "clamp(38px,5.5vw,68px)",
                color: "#1a1308",
                lineHeight: 1.02,
                margin: "14px 0 10px",
              }}
            >
              Categorías
            </h2>
            <p style={{ maxWidth: 580, margin: "0 auto", color: "#6b6253", fontSize: 15, lineHeight: 1.7 }}>
              Deslizá el perchero para descubrir cada categoría.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <VanityLights />
        </Reveal>

        <Reveal>
          <div style={{ position: "relative" }} data-perchero>
            {/* Wall brackets (soportes anclados a la pared) */}
            <div style={bracketWall("left")} data-noscroll>
              <div style={bracketArm} />
            </div>
            <div style={bracketWall("right")} data-noscroll>
              <div style={{ ...bracketArm, transform: "rotate(180deg)" }} />
            </div>

            {/* Nav arrows */}
            <ArrowBtn dir="left" onClick={() => slide(-1)} disabled={atStart} />
            <ArrowBtn dir="right" onClick={() => slide(1)} disabled={atEnd} />

            {/* Horizontal scroller — rail INSIDE so it moves with the hangers */}
            <div
              ref={scrollerRef}
              className="rack-scroller"
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
              onWheel={onWheel}
              style={{
                overflowX: "auto",
                overflowY: "hidden",
                cursor: "grab",
                padding: "0",
                WebkitOverflowScrolling: "touch",
                userSelect: "none",
                touchAction: "pan-x",
              }}
            >
              {/* Rail track — carries the rod + hangers */}
              <div
                className="rack-rail"
                style={{
                  position: "relative",
                  width: "max-content",
                  paddingTop: 46,
                  paddingLeft: 42,
                  paddingRight: 42,
                  paddingBottom: 24,
                }}
              >
                {/* Rod (barra dorada que se mueve con las perchas) */}
                <div
                  style={{
                    position: "absolute",
                    top: 22,
                    left: 0,
                    right: 0,
                    height: 4,
                    borderRadius: 4,
                    background:
                      "linear-gradient(180deg, #f0dcab 0%, #c6a76b 45%, #7a5a2e 100%)",
                    boxShadow:
                      "0 2px 6px rgba(0,0,0,.55), 0 0 0 1px rgba(0,0,0,.25) inset, 0 1px 0 rgba(255,236,192,.6) inset",
                    pointerEvents: "none",
                  }}
                />

                {/* Hangers row */}
                <div style={{ display: "flex", gap: ITEM_GAP }}>
                  {CATEGORIES.map((c, i) => (
                    <div
                      key={c.name}
                      className="hanger-wrap rack-item"
                      style={{
                        position: "relative",
                        flex: `0 0 ${ITEM_W}px`,
                        animation: `hangerSway ${8 + (i % 3) * 1.2}s cubic-bezier(.45,.05,.55,.95) ${i * 0.35}s infinite`,
                        transformOrigin: "50% -18px",
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
                          marginTop: 32,
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
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        .rack-scroller { scrollbar-width: none; -ms-overflow-style: none; }
        .rack-scroller::-webkit-scrollbar { display: none; }

        .hanger-wrap { transition: transform .8s cubic-bezier(.2,.7,.2,1); }
        .hanger-wrap:hover { animation-play-state: paused; }
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

function ArrowBtn({ dir, onClick, disabled }: { dir: "left" | "right"; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      aria-label={dir === "left" ? "Anterior" : "Siguiente"}
      onClick={onClick}
      disabled={disabled}
      className="rack-arrow"
      data-noscroll
      style={{
        position: "absolute",
        top: "50%",
        [dir]: -6,
        transform: "translateY(-50%)",
        zIndex: 4,
        width: 46,
        height: 46,
        borderRadius: "50%",
        background: "rgba(14,11,7,.9)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(198,167,107,.5)",
        color: "#c6a76b",
        fontSize: 20,
        cursor: disabled ? "default" : "pointer",
        display: "grid",
        placeItems: "center",
        transition: "opacity .3s ease, background .3s ease, transform .3s ease",
        opacity: disabled ? 0 : 1,
        pointerEvents: disabled ? "none" : "auto",
      } as React.CSSProperties}
      onMouseEnter={(e) => {
        if (disabled) return;
        e.currentTarget.style.background = "linear-gradient(135deg,#caa86a,#e7d2a3)";
        e.currentTarget.style.color = "#1a1308";
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        e.currentTarget.style.background = "rgba(14,11,7,.9)";
        e.currentTarget.style.color = "#c6a76b";
      }}
    >
      {dir === "left" ? "←" : "→"}
    </button>
  );
}

function bracketWall(side: "left" | "right"): React.CSSProperties {
  return {
    position: "absolute",
    top: 22,
    [side]: 0,
    width: 40,
    height: 12,
    transform: "translateY(-50%)",
    zIndex: 3,
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
      className="hanger-svg"
      width="90"
      height="56"
      viewBox="0 0 90 56"
      fill="none"
      style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", pointerEvents: "none", zIndex: 2 }}
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
