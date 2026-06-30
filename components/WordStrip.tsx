import { CATALOG_WORDS } from "@/lib/data";

export function WordStrip() {
  const items = CATALOG_WORDS.join("  ✦  ");
  const line = `${items}  ✦  ${items}  ✦  `;
  return (
    <div
      style={{
        background: "#0e0b07",
        borderTop: "1px solid rgba(198,167,107,.16)",
        borderBottom: "1px solid rgba(198,167,107,.16)",
        overflow: "hidden",
        padding: "14px 0",
      }}
    >
      <div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          animation: "se-marquee 30s linear infinite",
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontSize: 30,
          color: "rgba(198,167,107,.34)",
        }}
      >
        <span style={{ paddingRight: 40 }}>{line}</span>
        <span style={{ paddingRight: 40 }} aria-hidden>
          {line}
        </span>
      </div>
    </div>
  );
}
