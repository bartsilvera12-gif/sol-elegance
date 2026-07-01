"use client";
import { useSearchParams } from "next/navigation";
import { Catalog } from "./Catalog";
import { CatKey } from "@/lib/data";

const VALID: CatKey[] = ["todos", "Vestidos", "Blusas", "Conjuntos", "Pantalones", "Faldas"];

export function CatalogWithQuery() {
  const params = useSearchParams();
  const raw = params.get("cat") as CatKey | null;
  const initial: CatKey = raw && VALID.includes(raw) ? raw : "todos";
  return <Catalog initialFilter={initial} />;
}
