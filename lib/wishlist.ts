"use client";
import { useSyncExternalStore } from "react";

/**
 * Lista de deseos guardada en el navegador (localStorage).
 * El sitio no tiene backend, así que los favoritos son por dispositivo.
 * Se guardan los `slug` de los productos.
 */
const KEY = "sol-elegance:wishlist";

type Listener = () => void;
const listeners = new Set<Listener>();

// Referencia estable: useSyncExternalStore exige que getSnapshot devuelva
// el mismo objeto mientras no haya cambios, o entra en bucle de renders.
const EMPTY: string[] = [];
let cache: string[] | null = null;

function read(): string[] {
  if (cache) return cache;
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    cache = raw ? (JSON.parse(raw) as string[]) : EMPTY;
  } catch {
    cache = EMPTY;
  }
  return cache as string[];
}

function write(next: string[]) {
  cache = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // modo privado o sin espacio: seguimos solo en memoria
  }
  listeners.forEach((l) => l());
}

function subscribe(l: Listener) {
  listeners.add(l);
  // Mantiene sincronizadas varias pestañas abiertas
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      l();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(l);
    window.removeEventListener("storage", onStorage);
  };
}

export function toggleWishlist(slug: string) {
  const cur = read();
  write(cur.includes(slug) ? cur.filter((s) => s !== slug) : [...cur, slug]);
}

export function removeFromWishlist(slug: string) {
  const cur = read();
  if (cur.includes(slug)) write(cur.filter((s) => s !== slug));
}

/**
 * `ready` es false en el servidor y en el primer render del cliente, así el
 * HTML coincide y no hay error de hidratación; pasa a true tras hidratar.
 */
function useHydrated(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function useWishlist(): { slugs: string[]; ready: boolean } {
  const slugs = useSyncExternalStore(subscribe, read, () => EMPTY);
  const ready = useHydrated();
  return { slugs: ready ? slugs : EMPTY, ready };
}
