"use client";
import { useState } from "react";
import { CatKey } from "@/lib/data";
import { Categories } from "./Categories";
import { CatalogRail } from "./CatalogRail";

export function CatalogSection() {
  // Filter state is kept for compatibility with the pickCategory scroll flow.
  const [, setFilter] = useState<CatKey>("todos");

  const pickCategory = (v: CatKey) => {
    setFilter(v);
    // Navigate to the full catalog page with the picked category as query param
    if (typeof window !== "undefined") {
      window.location.href = `/catalogo?cat=${encodeURIComponent(v)}`;
    }
  };

  return (
    <>
      <Categories onPick={pickCategory} />
      <CatalogRail />
    </>
  );
}
