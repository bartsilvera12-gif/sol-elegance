import { MARQUEE_WORDS } from "@/lib/data";

export function Marquee() {
  const line = MARQUEE_WORDS.join("  ✦  ");
  const items = `✦  ${line}  ✦  ${line}  ✦  `;
  return (
    <div
      style={{
        background: "#0e0b07",
        borderBottom: "1px solid rgba(198,167,107,.18)",
        overflow: "hidden",
        position: "relative",
        zIndex: 60,
      }}
    >
      <div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          animation: "se-marquee 28s linear infinite",
          padding: "10px 0",
          color: "#c6a76b",
          fontSize: 11.5,
          letterSpacing: 3.5,
          textTransform: "uppercase",
          fontWeight: 500,
        }}
      >
        <span style={{ paddingRight: 40 }}>{items}</span>
        <span style={{ paddingRight: 40 }} aria-hidden>
          {items}
        </span>
      </div>
    </div>
  );
}
