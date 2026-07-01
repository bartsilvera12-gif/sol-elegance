export function Sun3D() {
  return (
    <div
      className="hero-sun"
      aria-hidden
      style={{
        position: "absolute",
        right: "-8%",
        top: "-6%",
        width: "clamp(360px, 42vw, 580px)",
        aspectRatio: "1 / 1",
        zIndex: 1,
        pointerEvents: "none",
      }}
    >
      {/* Outer rays */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-conic-gradient(from 0deg, rgba(231,196,120,.18) 0deg 1.3deg, transparent 1.3deg 9deg)",
          WebkitMask:
            "radial-gradient(closest-side, transparent 30%, #000 43%, #000 72%, transparent 94%)",
          mask: "radial-gradient(closest-side, transparent 30%, #000 43%, #000 72%, transparent 94%)",
          animation: "se-spin 95s linear infinite",
          borderRadius: "50%",
        }}
      />
      {/* Inner rays reverse */}
      <div
        style={{
          position: "absolute",
          inset: "10%",
          background:
            "repeating-conic-gradient(from 12deg, rgba(231,196,120,.22) 0deg 2deg, transparent 2deg 14deg)",
          WebkitMask:
            "radial-gradient(closest-side, transparent 38%, #000 50%, #000 70%, transparent 92%)",
          mask: "radial-gradient(closest-side, transparent 38%, #000 50%, #000 70%, transparent 92%)",
          animation: "se-spinR 58s linear infinite",
          borderRadius: "50%",
        }}
      />
      {/* Halo */}
      <div
        style={{
          position: "absolute",
          inset: "18%",
          background:
            "radial-gradient(circle, rgba(247,206,118,.55), rgba(202,154,74,.22) 52%, transparent 72%)",
          borderRadius: "50%",
          animation: "se-glow 5.5s ease-in-out infinite",
        }}
      />
      {/* Core sphere */}
      <div
        style={{
          position: "absolute",
          inset: "28%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 36% 30%, #fff7e6, #f7dda2 15%, #ecc179 38%, #d49f54 62%, #9c6a31 100%)",
          boxShadow:
            "inset -18px -22px 50px rgba(72,40,12,.78), inset 14px 16px 38px rgba(255,244,212,.6), 0 0 54px 8px rgba(235,191,116,.55)",
          animation: "se-breathe 7s ease-in-out infinite",
        }}
      />
      {/* Specular */}
      <div
        style={{
          position: "absolute",
          inset: "28%",
          borderRadius: "50%",
          background: "radial-gradient(circle at 33% 25%, rgba(255,255,255,.9), transparent 24%)",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
