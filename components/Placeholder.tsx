export function Placeholder({
  label,
  ratio = "3 / 4",
  rounded = 0,
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
        background: "linear-gradient(145deg, #f4f2ef 0%, #eceae5 55%, #f2f0ec 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--ink-4)",
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: "italic",
        fontSize: 15,
        textAlign: "center",
        padding: 16,
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      <span style={{ position: "relative", letterSpacing: 1 }}>{label ?? "Imagen próximamente"}</span>
    </div>
  );
}
