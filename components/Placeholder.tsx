export function Placeholder({
  label,
  ratio = "3 / 4",
  rounded = 16,
  style,
}: {
  label?: string;
  ratio?: string;
  rounded?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: ratio,
        borderRadius: rounded,
        background:
          "linear-gradient(135deg, #1c1710 0%, #221b13 60%, #1a140e 100%)",
        border: "1px dashed rgba(198,167,107,.28)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "rgba(198,167,107,.55)",
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: "italic",
        fontSize: 14,
        textAlign: "center",
        padding: 16,
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 30%, rgba(198,167,107,.07), transparent 60%)" }} />
      <span style={{ position: "relative", letterSpacing: 1.4 }}>{label ?? "Imagen próximamente"}</span>
    </div>
  );
}
