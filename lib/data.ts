export const WA_NUMBER = "595982314033";
export const INSTAGRAM_URL = "https://www.instagram.com/soleleganceboutique";

export const waLink = (msg: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

export const WA_MAIN = waLink("Hola Sol Elegance ✨ me gustaría conocer más sobre sus prendas.");
export const waForProduct = (name: string) =>
  waLink(`Hola Sol Elegance ✨ me interesa la prenda "${name}". ¿Me das más info?`);

export const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Categorías", href: "#categorias" },
  { label: "Catálogo", href: "#catalogo" },
  { label: "Nosotras", href: "#nosotras" },
  { label: "Contacto", href: "#contacto" },
];

export type CatKey = "todos" | "Vestidos" | "Blusas" | "Conjuntos" | "Pantalones" | "Faldas";

export const CATEGORIES: { name: string; tag: string; value: CatKey }[] = [
  { name: "Vestidos", tag: "Elegancia diaria", value: "Vestidos" },
  { name: "Blusas", tag: "Suaves y versátiles", value: "Blusas" },
  { name: "Conjuntos", tag: "Look completo", value: "Conjuntos" },
  { name: "Pantalones", tag: "Comodidad con estilo", value: "Pantalones" },
  { name: "Faldas", tag: "Movimiento y gracia", value: "Faldas" },
  { name: "Accesorios", tag: "El detalle final", value: "todos" },
];

export const FILTERS: { label: string; value: CatKey }[] = [
  { label: "Todos", value: "todos" },
  { label: "Vestidos", value: "Vestidos" },
  { label: "Blusas", value: "Blusas" },
  { label: "Conjuntos", value: "Conjuntos" },
  { label: "Pantalones", value: "Pantalones" },
  { label: "Faldas", value: "Faldas" },
];

export const PRODUCTS: { name: string; cat: Exclude<CatKey, "todos">; desc: string }[] = [
  { name: "Vestido Aurora", cat: "Vestidos", desc: "Vestido midi de caída fluida" },
  { name: "Vestido Solsticio", cat: "Vestidos", desc: "Estampado suave, corte favorecedor" },
  { name: "Vestido Noche", cat: "Vestidos", desc: "Elegancia para ocasiones especiales" },
  { name: "Blusa Marfil", cat: "Blusas", desc: "Tejido ligero y versátil" },
  { name: "Blusa Seda", cat: "Blusas", desc: "Brillo sutil, tacto suave" },
  { name: "Blusa Lazo", cat: "Blusas", desc: "Detalle de lazo femenino" },
  { name: "Conjunto Dorado", cat: "Conjuntos", desc: "Top y pantalón a juego" },
  { name: "Conjunto Verano", cat: "Conjuntos", desc: "Frescura con estilo" },
  { name: "Set Elegance", cat: "Conjuntos", desc: "Look completo de pies a cabeza" },
  { name: "Pantalón Lino", cat: "Pantalones", desc: "Comodidad premium en lino" },
  { name: "Falda Brisa", cat: "Faldas", desc: "Vuelo y movimiento" },
  { name: "Falda Midi", cat: "Faldas", desc: "Silueta estilizada" },
];

export const MARQUEE_WORDS = [
  "Moda Femenina",
  "Envíos a todo el país",
  "Nueva colección",
  "Atención personalizada por WhatsApp",
];

export const CATALOG_WORDS = ["Vestidos", "Blusas", "Conjuntos", "Pantalones", "Faldas", "Accesorios"];
