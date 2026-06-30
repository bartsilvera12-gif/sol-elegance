# Handoff: Sol Elegance — Tienda de ropa (boutique de moda femenina)

## Overview
Sitio web de una sola página (landing) para **Sol Elegance**, una boutique de moda femenina. El objetivo es presentar la marca de forma premium y elegante, mostrar un catálogo de prendas navegable por categorías, contar la historia de la marca y convertir visitas en conversaciones por WhatsApp. **No hay precios ni carrito** — la compra/consulta se realiza por WhatsApp. La estética es oscura, lujosa, con acentos dorados tomados del logo (un sol dorado).

## About the Design Files
Los archivos de este paquete son **referencias de diseño creadas en HTML** — prototipos que muestran el aspecto e interacción deseados, **no código de producción para copiar tal cual**. La tarea es **recrear estos diseños HTML dentro del entorno del codebase destino** (React, Vue, Next.js, Astro, etc.) usando sus patrones y librerías establecidos. Si todavía no existe un entorno, elige el framework más adecuado (recomendado: **Next.js + React** o **Astro** por ser una landing mayormente estática) e impleméntalo ahí.

El prototipo está construido como un "Design Component" propietario (`.dc.html`) con un pequeño runtime; **ignora ese runtime**. Lo relevante es el marcado, los estilos inline y la lógica (filtro de catálogo, reveal on scroll, nav con cambio al hacer scroll). Reescríbelo como componentes idiomáticos del framework destino.

## Fidelity
**Alta fidelidad (hifi).** Colores, tipografías, espaciados, radios, sombras e interacciones son finales. Recrear pixel-perfect con las librerías/patrones del codebase. Las **imágenes son placeholders** (espacios "drag & drop") porque no se pudieron extraer de Instagram; el desarrollador debe sustituirlos por las fotos reales de las prendas (ver sección Assets).

## Screens / Views
Es una **landing de una sola página** con secciones ancladas. Ancho de contenido máximo ~1280–1320px, centrado. Padding lateral responsivo `clamp(20px, 5vw, 64px)`.

### 1. Barra de anuncios (marquee superior)
- **Propósito**: reforzar mensajes de marca/envíos.
- **Layout**: barra full-width, fondo `#0e0b07`, borde inferior `1px solid rgba(198,167,107,.18)`. Texto en bucle horizontal infinito.
- **Contenido**: "✦ Moda Femenina ✦ Envíos a todo el país ✦ Nueva colección ✦ Atención personalizada por WhatsApp ✦" (repetido).
- **Tipografía**: 11.5px, `letter-spacing:3.5px`, uppercase, color `#c6a76b`.
- **Animación**: traslación X de 0 a -50% en 28s, lineal, infinita (duplicar el contenido para bucle perfecto).

### 2. Navbar (fijo)
- **Propósito**: navegación + CTA WhatsApp.
- **Layout**: `position:fixed; top:0`, flex space-between, `z-index:50`, padding `16px clamp(20px,5vw,64px)`.
- **Estado inicial (top)**: fondo transparente, sin borde, sin blur.
- **Estado scrolled (>30px)**: fondo `rgba(16,12,8,.9)`, `backdrop-filter:blur(14px)`, borde inferior `rgba(198,167,107,.18)`. Transición `.4s ease`.
- **Logo**: imagen circular 42×42, `border-radius:50%`, borde `1px solid rgba(198,167,107,.5)`. Junto: "Sol Elegance" (Cormorant Garamond 21px/600, `#f4ece0`) y sub "MODA FEMENINA" (8.5px, `letter-spacing:4px`, uppercase, `#c6a76b`).
- **Links**: Inicio, Categorías, Catálogo, Nosotras, Contacto. 13px, `letter-spacing:1.8px`, uppercase, `#d8cbb4`, hover `#c6a76b`.
- **CTA WhatsApp**: pill, fondo `linear-gradient(135deg,#caa86a,#e7d2a3)`, texto `#1a1308` 12px/600 uppercase `letter-spacing:1.6px`, padding `11px 20px`, `border-radius:40px`, `box-shadow:0 8px 24px -10px rgba(198,167,107,.7)`. Hover: `translateY(-2px)` + sombra más fuerte.

### 3. Hero (#inicio)
- **Propósito**: impacto de marca + CTAs principales.
- **Layout**: `min-height:100vh`, grid 2 columnas `1.05fr .95fr`, gap `clamp(28px,5vw,70px)`, items centrados. Padding superior 120px (para el navbar). Fondo: radiales cálidos sobre `#14100b`.
- **Columna izquierda (texto)**:
  - Eyebrow con línea: "Boutique de moda femenina" (11px, `letter-spacing:5px`, uppercase, `#c6a76b`).
  - **H1** Cormorant Garamond 500, `clamp(46px,7vw,92px)`, `line-height:.98`, color `#f6efe2`: "Viste la luz de tu *elegancia*". La palabra "elegancia" es itálica con gradiente dorado animado (text shimmer): `linear-gradient(100deg,#c6a76b,#f0dcab,#c6a76b)`, `background-size:200% auto`, animación de `background-position` 0→200% en 5s.
  - Firma "Sol Elegance" en **Pinyon Script** `clamp(30px,4.4vw,52px)`, color `#c6a76b`.
  - Párrafo descriptivo (max 430px, 16px/1.75, `#c4b69d`).
  - **CTAs**: primario "Ver catálogo →" (mismo estilo que pill dorado del navbar pero padding `16px 32px`); secundario "Explorar categorías" (outline `1px solid rgba(198,167,107,.4)`, texto `#e8dcc6`, hover fondo `rgba(198,167,107,.1)`).
  - **Stats**: 3 columnas separadas por divisores verticales: "+200 Clientas felices", "100% Moda femenina", "24/7 Atención online". Número en Cormorant 32px/600 `#f4ece0`; label 10.5px `letter-spacing:2.5px` uppercase `#9c8d74`.
  - Todos los elementos entran con animación `fadeUp` escalonada (0.05s → 0.36s).
- **Columna derecha (imagen)**:
  - Marco con `border-radius:200px 200px 22px 22px` (forma de arco/tótem). Imagen interior `aspect-ratio:3/4`, `object-fit:cover`, `box-shadow:0 40px 90px -30px rgba(0,0,0,.8)`. Borde decorativo offset `inset:-14px`.
  - **Badge flotante** abajo-izquierda: tarjeta `rgba(20,16,11,.85)` + blur, logo 40×40 + "Nueva temporada / RECIÉN LLEGADO". Animación `float` (sube/baja 14px, 6s).
- **Sol 3D** (decorativo, esquina superior derecha, detrás del contenido `z-index:1`): ver sección "Componente especial: Sol 3D".
- **Indicador scroll** abajo-centro: "Desliza" + línea vertical con gradiente, animación float.

### 4. Tira de palabras (rotating word strip)
- Fondo `#0e0b07`, bordes superior/inferior `rgba(198,167,107,.16)`. Marquee horizontal 30s con: Vestidos ✦ Blusas ✦ Conjuntos ✦ Pantalones ✦ Faldas ✦ Accesorios. Cormorant **itálica** 30px, color `rgba(198,167,107,.34)`, separadores ✦ en `#c6a76b`.

### 5. Categorías (#categorias)
- **Propósito**: navegación visual por tipo de prenda; cada tarjeta filtra el catálogo.
- **Layout**: encabezado centrado (eyebrow "Encuentra tu estilo" + H2 "Categorías" Cormorant `clamp(38px,5.5vw,68px)` + párrafo). Grid `repeat(auto-fit,minmax(260px,1fr))`, gap `clamp(16px,2vw,26px)`.
- **Tarjeta** (6): `aspect-ratio:4/5`, `border-radius:18px`, overflow hidden, fondo `#1c1710`, borde `rgba(198,167,107,.2)`. Imagen llena con overlay gradiente inferior. Al fondo: tag (10px uppercase `#c6a76b`) + nombre (Cormorant 28px) + flecha en círculo outline.
  - **Hover**: tarjeta `translateY(-8px)` + sombra `0 30px 60px -28px rgba(0,0,0,.85)` + borde `rgba(198,167,107,.55)`; imagen interior `scale(1.09)` (transición `.9s cubic-bezier(.2,.7,.2,1)`).
  - **Click**: setea filtro del catálogo a esa categoría y ancla a #catalogo.
- **Categorías**: Vestidos, Blusas, Conjuntos, Pantalones, Faldas, Accesorios.

### 6. Catálogo (#catalogo)
- **Propósito**: rejilla de prendas filtrable; cada una enlaza a WhatsApp.
- **Layout**: fondo `linear-gradient(180deg,#14100b,#100c08 50%,#14100b)`. Encabezado flex (H2 "El catálogo" + texto ayuda). 
- **Filtros (chips)**: Todos, Vestidos, Blusas, Conjuntos, Pantalones, Faldas. Chip activo: fondo gradiente dorado, texto `#1a1308`. Chip inactivo: transparente, texto `#c6a76b`, borde `rgba(198,167,107,.35)`. 12px `letter-spacing:1.8px` uppercase, `border-radius:40px`, padding `11px 22px`.
- **Grid**: `repeat(auto-fill,minmax(248px,1fr))`, gap `clamp(16px,2vw,28px)`. Las tarjetas que no coinciden con el filtro se ocultan (`display:none`).
- **Card de prenda** (12): `border-radius:16px`, fondo `#1c1710`, borde `rgba(198,167,107,.18)`. Imagen `aspect-ratio:3/4` con badge de categoría arriba-izquierda (`rgba(14,11,7,.78)`+blur, 9.5px uppercase `#c6a76b`). Cuerpo: nombre (Cormorant 23px `#f4ece0`), descripción (12.5px `#9c8d74`), botón "Consultar por WhatsApp" (outline dorado, hover se rellena con gradiente dorado).
  - **Hover card**: `translateY(-8px)` + sombra fuerte + borde dorado; imagen `scale(1.07)`.
- **Datos de prendas** (nombre / categoría / descripción):
  - Vestido Aurora / Vestidos / "Vestido midi de caída fluida"
  - Vestido Solsticio / Vestidos / "Estampado suave, corte favorecedor"
  - Vestido Noche / Vestidos / "Elegancia para ocasiones especiales"
  - Blusa Marfil / Blusas / "Tejido ligero y versátil"
  - Blusa Seda / Blusas / "Brillo sutil, tacto suave"
  - Blusa Lazo / Blusas / "Detalle de lazo femenino"
  - Conjunto Dorado / Conjuntos / "Top y pantalón a juego"
  - Conjunto Verano / Conjuntos / "Frescura con estilo"
  - Set Elegance / Conjuntos / "Look completo de pies a cabeza"
  - Pantalón Lino / Pantalones / "Comodidad premium en lino"
  - Falda Brisa / Faldas / "Vuelo y movimiento"
  - Falda Midi / Faldas / "Silueta estilizada"
  - *(Nombres y descripciones son placeholder; reemplazar por catálogo real.)*

### 7. Banner editorial
- Imagen full-bleed `min-height:520px` con overlay `linear-gradient(90deg,rgba(14,11,7,.92) 30%, ... ,rgba(14,11,7,.2))`. Texto a la izquierda: eyebrow "Colección destacada", H2 "Detalles que *enamoran*" (enamoran en itálica `#c6a76b`), párrafo, CTA dorado "Descubre la colección →".

### 8. Nosotras (#nosotras)
- **Layout**: grid 2 columnas `.95fr 1.05fr`, gap `clamp(34px,5vw,80px)`.
- **Izquierda**: imagen `aspect-ratio:4/5`, `border-radius:16px`, marco decorativo offset. Badge circular flotante abajo-derecha (118×118, `#0e0b07`, borde dorado): "Sol" en Pinyon Script 30px + "ELEGANCE". Animación float 7s.
- **Derecha**: eyebrow "Nuestra historia", H2 "Moda con alma femenina", 2 párrafos, y grid 2×2 de valores (icono dorado + título Cormorant 19px + texto):
  - ✦ Selección a mano — "Cada prenda elegida con cuidado."
  - ❀ Estilo femenino — "Diseños que realzan tu esencia."
  - ✉ Atención cercana — "Te asesoramos paso a paso."
  - ✓ Calidad premium — "Telas y acabados cuidados."

### 9. Contacto (#contacto)
- Centrado, max 760px. Fondo decorativo de rayos cónicos girando lento (`se-spinR` 120s). Logo 84×84 circular. Eyebrow "Hablemos", H2 "¿Lista para brillar?", párrafo. 
- **CTAs**: "Escribir por WhatsApp" (pill dorado) + "Síguenos en Instagram" (outline). 
- **Tarjetas de contacto** (3): ✆ WhatsApp +595 982 314033 · ❤ Instagram @soleleganceboutique · ✦ Envíos a todo el país.

### 10. Footer
- Fondo `#0e0b07`, borde superior dorado tenue. 3 columnas: marca + descripción; Navegación (mismos links); Síguenos (Instagram, WhatsApp, teléfono). Línea inferior: "© 2026 Sol Elegance · Moda Femenina" y "Hecho con ♥ para realzar tu elegancia".

### 11. Botón flotante de WhatsApp
- `position:fixed; right:22px; bottom:22px; z-index:80`, 58×58 circular, fondo `linear-gradient(135deg,#25d366,#128c4b)`, icono WhatsApp blanco (SVG). Animación de pulso (anillo expansivo cada 2.6s). Hover `scale(1.08)`.

## Componente especial: Sol 3D
Decoración clave del hero (esquina superior derecha, parcialmente fuera de marco). Es un sol con apariencia **volumétrica/3D** compuesto por capas superpuestas en un contenedor circular (~`clamp(360px,42vw,580px)`):
1. **Rayos exteriores**: `repeating-conic-gradient(from 0deg, rgba(231,196,120,.18) 0deg 1.3deg, transparent 1.3deg 9deg)`, enmascarado en anillo con `mask: radial-gradient(closest-side, transparent 30%, #000 43%, #000 72%, transparent 94%)`. Gira 95s (`se-spin`).
2. **Rayos interiores** (más anchos, sentido contrario): conic similar, gira 58s en reversa (`se-spinR`).
3. **Halo**: `radial-gradient(circle, rgba(247,206,118,.55), rgba(202,154,74,.22) 52%, transparent 72%)`, animación `se-glow` (opacidad + blur, 5.5s).
4. **Esfera (núcleo 3D)**: `radial-gradient(circle at 36% 30%, #fff7e6, #f7dda2 15%, #ecc179 38%, #d49f54 62%, #9c6a31 100%)` con sombras internas para dar volumen: `inset -18px -22px 50px rgba(72,40,12,.78)` (sombra abajo-derecha) + `inset 14px 16px 38px rgba(255,244,212,.6)` (luz arriba-izquierda) + glow externo `0 0 54px 8px rgba(235,191,116,.55)`. Animación `se-breathe` (scale 1↔1.045, 7s).
5. **Brillo especular**: `radial-gradient(circle at 33% 25%, rgba(255,255,255,.9), transparent 24%)`, `mix-blend-mode:screen`.

## Interactions & Behavior
- **Navbar**: listener de `scroll`; al pasar 30px aplica fondo/blur/borde. Transición `.4s`.
- **Reveal on scroll**: todos los elementos con `data-reveal` inician `opacity:0; translateY(34px)` y se revelan al entrar en viewport vía IntersectionObserver (`threshold:0.12`, `rootMargin:'0px 0px -8% 0px'`). Transición `opacity/transform .9s cubic-bezier(.2,.7,.2,1)`. Soporta `data-reveal-delay` (ms) para escalonar. Debe poder desactivarse (prop `revealOn`).
- **Filtro de catálogo**: estado `filter` (default `'todos'`). Clic en chip o en tarjeta de categoría cambia el filtro; las prendas que no coinciden se ocultan. Anclas suaves a `#catalogo`.
- **Enlaces WhatsApp**: cada prenda y CTA abre `https://wa.me/595982314033?text=<mensaje url-encoded>`. Mensaje de prenda: `Hola Sol Elegance ✨ me interesa la prenda "<nombre>". ¿Me das más info?`. Mensaje general: `Hola Sol Elegance ✨ me gustaría conocer más sobre sus prendas.`
- **Hover**: tarjetas suben (`translateY(-8px)`) y la imagen interior hace zoom; botones outline se rellenan de dorado.
- **Animaciones continuas**: marquees, float (badges/indicador), shimmer del texto "elegancia", y las capas del sol (spin/glow/breathe).
- **Scroll suave**: `html { scroll-behavior:smooth }`.

## State Management
- `scrolled: boolean` — alterna el estilo del navbar (trigger: scroll > 30px).
- `filter: string` — categoría activa del catálogo: `'todos' | 'Vestidos' | 'Blusas' | 'Conjuntos' | 'Pantalones' | 'Faldas'` (trigger: clic en chip o tarjeta de categoría).
- Sin data fetching: catálogo es estático (array en código). En producción, mover a CMS/JSON si se desea editar sin deploy.
- Props de configuración: `floatingWhatsApp: boolean` (mostrar botón flotante), `revealOn: boolean` (activar animaciones de entrada).

## Design Tokens
**Colores**
- Fondo principal: `#14100b`
- Fondo oscuro (barras/footer): `#0e0b07` · alterno `#100c08`
- Superficie de tarjeta: `#1c1710`
- Texto claro principal: `#f4ece0` · más brillante `#f6efe2`
- Texto cálido secundario: `#c4b69d` · `#bcae94` · `#b1a288`
- Texto tenue: `#9c8d74` · `#8a7c64` · `#7a6e58`
- **Dorado acento**: `#c6a76b` (principal)
- Gradiente dorado CTA: `linear-gradient(135deg,#caa86a,#e7d2a3)`; texto sobre dorado: `#1a1308`
- Dorado claro (shimmer/halo): `#f0dcab`, `#e7d2a3`, `#f7dda2`, `#fff7e6`
- Bordes dorados: `rgba(198,167,107, .12 / .18 / .2 / .35 / .4 / .5 / .55)`
- WhatsApp verde: `linear-gradient(135deg,#25d366,#128c4b)`

**Tipografía**
- Display/títulos: **Cormorant Garamond** (400–700, incluye itálica). H1/H2 peso 500.
- Cuerpo/UI: **Jost** (300–600).
- Firma decorativa: **Pinyon Script** (cursiva).
- Escala títulos responsiva con `clamp()` (H1 hasta 92px, H2 hasta 68px).
- Labels/eyebrows: 10–11px, uppercase, `letter-spacing` 2.5–5px.

**Radios**
- Tarjetas: 16–18px · Pills/chips/botones: 40–46px · Avatares: 50% · Marco hero: `200px 200px 22px 22px`.

**Sombras**
- Hover tarjeta: `0 30px 60px -28px rgba(0,0,0,.85)` / `0 32px 64px -30px rgba(0,0,0,.9)`
- Imagen hero: `0 40px 90px -30px rgba(0,0,0,.8)`
- CTA dorado: `0 14px 34px -12px rgba(198,167,107,.8)` (hover hasta `... -12px rgba(198,167,107,1)`)

**Espaciado**
- Padding lateral de sección: `clamp(20px,5vw,64px)`
- Padding vertical de sección: `clamp(70px,8-10vw,120-140px)`
- Ancho máx contenido: 1280–1320px, centrado.

**Easing/duración**
- Curva principal: `cubic-bezier(.2,.7,.2,1)`
- Reveal/hover de tarjeta: .5–.9s · Transición navbar: .4s · Botones: .3–.35s.

## Assets
- **Logo**: `sol-elegance-logo.png` (sol dorado circular). Incluido en el paquete. Usar como favicon, logo de navbar/footer y avatar de badges.
- **Fuentes**: Google Fonts — Cormorant Garamond, Jost, Pinyon Script.
- **Imágenes de prendas/portada/editorial/nosotras**: NO incluidas. En el prototipo son placeholders ("image slots") porque no se pudieron extraer de Instagram (`@soleleganceboutique`). El desarrollador debe sustituirlas por las fotos reales de la tienda. Slots a llenar: portada hero (3:4), 6 categorías (4:5), 12 prendas (3:4), banner editorial (full-bleed ~16:9+), foto "Nosotras" (4:5). Optimizar (WebP/AVIF) y usar `object-fit:cover`.
- **Iconos**: el icono de WhatsApp es un SVG inline; el resto de "iconos" son glifos tipográficos (✦ ❀ ✉ ✓ ✆ ❤). Sustituir por un set de iconos del codebase si se prefiere consistencia.

## Files
- `Sol Elegance.dc.html` — prototipo completo (marcado + estilos inline + lógica). Referencia principal.
- `sol-elegance-logo.png` — logo de la marca.
- `image-slot.js` — runtime del placeholder de imágenes del prototipo; **NO portar** (solo soporta el drag&drop del mock).

## Notas de implementación
- El número de WhatsApp real es **+595 982 314033** (formato wa.me: `595982314033`).
- Instagram: `https://www.instagram.com/soleleganceboutique`.
- Sin precios ni e-commerce: todas las conversiones van a WhatsApp.
- Recomendado: secciones como componentes (`<Hero/>`, `<Categories/>`, `<Catalog/>`, `<About/>`, `<Contact/>`, `<Footer/>`, `<FloatingWhatsApp/>`), catálogo desde un array/JSON o CMS, y respetar `prefers-reduced-motion` desactivando animaciones continuas (sol, marquees, float) para accesibilidad.
- Responsive: en móvil, los grids de 2 columnas (hero, nosotras) pasan a 1 columna; reducir el sol y los tamaños `clamp()` ya lo cubren parcialmente — verificar breakpoints.
