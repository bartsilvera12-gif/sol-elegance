// Focos de vestidor: fila de bombillas cálidas tipo tocador/probador.
// Se coloca sobre el perchero para dar el ambiente de boutique.

export function VanityLights({ count = 11 }: { count?: number }) {
  return (
    <div className="vanity-lights" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="vanity-bulb"
          style={{ animationDelay: `${(i % 5) * 0.3}s` }}
        />
      ))}
    </div>
  );
}
