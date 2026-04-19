import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";

const emberStyle = {
  position: "absolute",
  borderRadius: "999px",
  mixBlendMode: "screen",
};

export const SunsetHeroMotion = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const veilOpacity = interpolate(frame, [0, 70, 180, 239], [0.12, 0.2, 0.16, 0.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const noteFloat = spring({
    fps,
    frame,
    config: {
      damping: 200,
      stiffness: 28,
      mass: 1.2,
    },
    durationInFrames: 160,
  });

  const driftA = interpolate(frame, [0, 239], [0, -24]);
  const driftB = interpolate(frame, [0, 239], [0, 34]);
  const glowShift = interpolate(frame, [0, 120, 239], [0, 18, -10]);

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        background:
          "linear-gradient(180deg, #f8efe4 0%, #eed3b2 42%, #c4876d 72%, #925448 100%)",
        fontFamily: '"Newsreader", Georgia, serif',
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 20% 19%, rgba(255, 229, 176, 0.9), transparent 14%), radial-gradient(circle at 78% 17%, rgba(170, 97, 77, 0.22), transparent 16%), linear-gradient(180deg, rgba(255,255,255,0.28), rgba(78,45,35,0.02) 46%, rgba(78,45,35,0.2) 100%)",
        }}
      />

      <div
        style={{
          ...emberStyle,
          width: 720,
          height: 720,
          left: -120 + glowShift,
          bottom: -180,
          background:
            "radial-gradient(circle, rgba(255,229,168,0.96) 0%, rgba(244,167,112,0.72) 36%, rgba(188,97,72,0.08) 71%, rgba(188,97,72,0) 80%)",
          filter: "blur(10px)",
        }}
      />

      <div
        style={{
          ...emberStyle,
          width: 280,
          height: 280,
          right: 136 + driftA,
          top: 156,
          background:
            "radial-gradient(circle, rgba(255,244,226,0.48) 0%, rgba(255,241,216,0.06) 62%, rgba(255,241,216,0) 74%)",
          filter: "blur(12px)",
          opacity: 0.72,
        }}
      />

      <div
        style={{
          ...emberStyle,
          width: 200,
          height: 200,
          left: 340 + driftB,
          top: 530,
          background:
            "radial-gradient(circle, rgba(255,245,226,0.34) 0%, rgba(255,245,226,0.06) 62%, rgba(255,245,226,0) 78%)",
          filter: "blur(18px)",
          opacity: 0.64,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 222,
          height: 1,
          background: "rgba(255, 245, 229, 0.38)",
          transform: `translateY(${interpolate(frame, [0, 239], [0, 8])}px)`,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, rgba(64, 32, 24, ${veilOpacity}) 0%, rgba(64, 32, 24, 0.05) 36%, rgba(64, 32, 24, 0.3) 100%)`,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 78,
          right: 78,
          bottom: 86 - noteFloat * 18,
          padding: "32px 34px",
          opacity: 0.34 + noteFloat * 0.3,
          transform: `translateY(${(1 - noteFloat) * 28}px)`,
        }}
      >
        <div
          style={{
            marginBottom: 14,
            fontFamily: '"Commissioner", Arial, sans-serif',
            fontSize: 18,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(70, 42, 32, 0.64)",
          }}
        >
          Grounded support
        </div>
        <div
          style={{
            fontSize: 54,
            lineHeight: 1.02,
            color: "#3a2924",
            maxWidth: 760,
          }}
        >
          A quiet place for grief, transition, and the version of you still
          learning how to begin again.
        </div>
      </div>
    </AbsoluteFill>
  );
};
