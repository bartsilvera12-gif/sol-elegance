"use client";
import { useState } from "react";
import Image from "next/image";
import { Product, SIZES, formatPrice, waForProductDetail } from "@/lib/data";
import { Placeholder } from "./Placeholder";

export function ProductDetail({ product }: { product: Product }) {
  const gallery = [product.img, product.img2].filter(Boolean) as string[];
  const [imgIdx, setImgIdx] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [wish, setWish] = useState(false);

  const wa = waForProductDetail(product.name, size ?? undefined, product.color);

  return (
    <section className="pdp">
      {/* Gallery */}
      <div className="pdp__gallery">
        {gallery.length > 1 && (
          <div className="pdp__dots">
            {gallery.map((_, i) => (
              <button key={i} onClick={() => setImgIdx(i)} data-active={i === imgIdx} aria-label={`Foto ${i + 1}`} />
            ))}
          </div>
        )}
        <div className="pdp__media">
          {gallery.length ? (
            <Image
              src={gallery[imgIdx]}
              alt={product.name}
              fill
              priority
              sizes="(max-width:900px) 100vw, 55vw"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <Placeholder ratio="4 / 5" label={product.name} />
          )}
          <button className="pdp__wish" data-active={wish} onClick={() => setWish((w) => !w)} aria-label="Agregar a deseos">
            <svg width="22" height="22" viewBox="0 0 24 24" fill={wish ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.4" aria-hidden>
              <path d="M12 20s-7-4.4-9.2-8.6C1.2 8.1 2.6 5 5.7 5c1.9 0 3.1 1.1 3.9 2.2C10.3 6.1 11.5 5 13.4 5c3.1 0 4.5 3.1 2.9 6.4C19.1 15.6 12 20 12 20z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="pdp__info">
        <nav className="pdp__crumb">
          <a href="/">Inicio</a>
          <span className="pdp__crumb-sep">/</span>
          <a href="/catalogo">Catálogo</a>
          <span className="pdp__crumb-sep">/</span>
          <span style={{ color: "var(--ink)" }}>{product.name}</span>
        </nav>

        <h1 className="serif pdp__name">{product.name}</h1>
        <div className="pdp__price">{formatPrice(product.price)}</div>
        <p className="pdp__desc">{product.desc}</p>

        {product.color && (
          <>
            <hr className="pdp__rule" />
            <div className="pdp__block">
              <div className="pdp__label">
                Color: <strong>{product.color}</strong>
              </div>
              <span className="pdp__swatch" style={{ background: product.swatch }} />
            </div>
          </>
        )}

        <hr className="pdp__rule" />
        <div className="pdp__block">
          <div className="pdp__label">Seleccioná tu talla</div>
          <div className="pdp__sizes">
            {SIZES.map((s) => (
              <button key={s} data-active={size === s} onClick={() => setSize((cur) => (cur === s ? null : s))}>
                {s}
              </button>
            ))}
          </div>
          <a href="/contacto" className="pdp__guide">¿Dudas con la talla? Escribinos</a>
        </div>

        <a href={wa} target="_blank" rel="noopener" className="btn-dark pdp__cta">
          Consultar por WhatsApp
        </a>
        <p className="pdp__note">Coordinamos disponibilidad, talles, envío y pago por WhatsApp.</p>
      </div>
    </section>
  );
}
