"use client";
import { useEffect, useRef } from "react";

export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced-motion and environments without IntersectionObserver:
    // reveal immediately so content is never left invisible.
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      el.classList.add("in");
      return;
    }

    let revealed = false;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      el.classList.add("in");
    };

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(reveal, delay);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);

    // Safety net: if the observer never delivers a callback (some embedded
    // webviews), reveal after a short grace period so nothing stays hidden.
    const fallback = window.setTimeout(reveal, 1600 + delay);

    return () => {
      obs.disconnect();
      window.clearTimeout(fallback);
    };
  }, [delay]);

  const Comp = Tag as any;
  return (
    <Comp ref={ref} className={`reveal ${className}`} style={style}>
      {children}
    </Comp>
  );
}
