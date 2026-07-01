"use client";
import { useState } from "react";
import { CatKey } from "@/lib/data";
import { Categories } from "./Categories";
import { Catalog } from "./Catalog";

export function CatalogSection() {
  const [filter, setFilter] = useState<CatKey>("todos");

  const pickCategory = (v: CatKey) => {
    setFilter(v);
    requestAnimationFrame(() => {
      const el = document.getElementById("catalogo");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <>
      <Categories onPick={pickCategory} />
      <Catalog filter={filter} onFilterChange={setFilter} />
    </>
  );
}
