export const WA_NUMBER = "595982314033";
export const INSTAGRAM_URL = "https://www.instagram.com/soleleganceboutique";

// ===== Datos del cliente (responsable del tratamiento de datos) =====
// Estos valores se usan en la página /privacidad y en cualquier lugar legal.
// El responsable de los datos es SIEMPRE el cliente, no Neura.
export const CLIENT = {
  name: "Sol Elegance",
  legalName: "Sol Elegance — Boutique de Moda Femenina",
  ruc: "—", // TODO: completar RUC real del cliente
  email: "—", // TODO: completar email de contacto del cliente
  phoneDisplay: "+595 982 314033",
  phoneIntl: "595982314033",
  address: "Paraguay", // TODO: completar dirección física si aplica
  instagram: "@soleleganceboutique",
  instagramUrl: "https://www.instagram.com/soleleganceboutique",
};

// ===== Datos del proveedor técnico (Neura) =====
// Neura figura SOLO como desarrollador / proveedor tecnológico.
// Nunca como responsable del tratamiento de datos.
export const TECH_PROVIDER = {
  name: "Neura",
  role: "Proveedor tecnológico / Desarrollador del sitio",
  website: "https://neura.com.py",
};

export const PRIVACY_LAST_UPDATE = "30 de junio de 2026";

export const waLink = (msg: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

export const WA_MAIN = waLink("Hola Sol Elegance ✨ me gustaría conocer más sobre sus prendas.");
export const waForProduct = (name: string) =>
  waLink(`Hola Sol Elegance ✨ me interesa la prenda "${name}". ¿Me das más info?`);

export const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Nosotras", href: "/nosotras" },
  { label: "Contacto", href: "/contacto" },
];

export type CatKey = "todos" | "Vestidos" | "Blusas" | "Conjuntos" | "Pantalones" | "Faldas";

export const FILTERS: { label: string; value: CatKey }[] = [
  { label: "Todos", value: "todos" },
  { label: "Vestidos", value: "Vestidos" },
  { label: "Blusas", value: "Blusas" },
  { label: "Conjuntos", value: "Conjuntos" },
  { label: "Pantalones", value: "Pantalones" },
  { label: "Faldas", value: "Faldas" },
];

export type SortKey = "sugerido" | "nuevo" | "precio-desc" | "precio-asc";

export const SORT_OPTIONS: { label: string; value: SortKey }[] = [
  { label: "Sugerido", value: "sugerido" },
  { label: "Lo más nuevo", value: "nuevo" },
  { label: "Precio descendente", value: "precio-desc" },
  { label: "Precio ascendente", value: "precio-asc" },
];

// Demo prices in Guaraníes (₲). Editables — reemplazar por precios reales del cliente.
//
// FOTOS: colocá las imágenes en `public/productos/` y referencialas aquí con
//   img:  "/productos/vestido-aurora.jpg"   (foto principal)
//   img2: "/productos/vestido-aurora-2.jpg" (opcional: 2da vista, crossfade al hover)
// Si un producto no tiene `img`, se muestra el placeholder automáticamente.
export type Product = {
  name: string;
  cat: Exclude<CatKey, "todos">;
  desc: string;
  price: number;
  img?: string;
  img2?: string;
  color?: string; // nombre del color (demo, editable)
  swatch?: string; // hex del color
};

export const PRODUCTS: Product[] = [
  { name: "Vestido Aurora", cat: "Vestidos", desc: "Vestido midi de caída fluida", price: 320000, img: "/productos/vestido-aurora.jpg", color: "Arena", swatch: "#d8c9b0" },
  { name: "Vestido Solsticio", cat: "Vestidos", desc: "Estampado suave, corte favorecedor", price: 285000, img: "/productos/vestido-solsticio.jpg", color: "Terracota", swatch: "#b5674d" },
  { name: "Vestido Noche", cat: "Vestidos", desc: "Elegancia para ocasiones especiales", price: 410000, img: "/productos/vestido-noche.jpg", color: "Negro", swatch: "#1a1a1a" },
  { name: "Blusa Marfil", cat: "Blusas", desc: "Tejido ligero y versátil", price: 180000, img: "/productos/blusa-marfil.jpg", color: "Marfil", swatch: "#efe7d8" },
  { name: "Blusa Seda", cat: "Blusas", desc: "Brillo sutil, tacto suave", price: 235000, img: "/productos/blusa-seda.jpg", color: "Champán", swatch: "#e4d5b7" },
  { name: "Blusa Lazo", cat: "Blusas", desc: "Detalle de lazo femenino", price: 195000, img: "/productos/blusa-lazo.jpg", color: "Rosa palo", swatch: "#e7c9c9" },
  { name: "Conjunto Dorado", cat: "Conjuntos", desc: "Top y pantalón a juego", price: 375000, img: "/productos/conjunto-dorado.jpg", color: "Dorado", swatch: "#c6a76b" },
  { name: "Conjunto Verano", cat: "Conjuntos", desc: "Frescura con estilo", price: 340000, img: "/productos/conjunto-verano.jpg", color: "Verde salvia", swatch: "#9caa8a" },
  { name: "Set Elegance", cat: "Conjuntos", desc: "Look completo de pies a cabeza", price: 460000, img: "/productos/set-elegance.jpg", color: "Negro", swatch: "#1a1a1a" },
  { name: "Pantalón Lino", cat: "Pantalones", desc: "Comodidad premium en lino", price: 265000, img: "/productos/pantalon-lino.jpg", color: "Beige", swatch: "#d9cfbe" },
  { name: "Falda Brisa", cat: "Faldas", desc: "Vuelo y movimiento", price: 210000, img: "/productos/falda-brisa.jpg", color: "Celeste", swatch: "#b9c9d4" },
  { name: "Falda Midi", cat: "Faldas", desc: "Silueta estilizada", price: 230000, img: "/productos/falda-midi.jpg", color: "Camel", swatch: "#b98e5e" },
];

// Talles disponibles (demo). Editá según el stock real del cliente.
export const SIZES = ["XS", "S", "M", "L", "XL"];

export const formatPrice = (value: number) =>
  "₲ " + value.toLocaleString("es-PY");

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // quita acentos
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const productBySlug = (slug: string) =>
  PRODUCTS.find((p) => slugify(p.name) === slug);

export const waForProductDetail = (name: string, size?: string, color?: string) => {
  let msg = `Hola Sol Elegance ✨ me interesa la prenda "${name}"`;
  if (color) msg += ` en color ${color}`;
  if (size) msg += `, talla ${size}`;
  msg += ". ¿Me das más info sobre disponibilidad?";
  return waLink(msg);
};
