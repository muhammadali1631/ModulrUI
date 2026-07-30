import React from "react";

export const Loader = ({
  variant = "spinner",
  size = 36,
  accentColor = "#6c47ff",
  label = null,
  thickness = 3,
}) => {
  const styles = {
    wrapper: {
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
      fontFamily: "'DM Sans', system-ui, sans-serif",
    },
    label: {
      fontSize: "12px",
      fontWeight: "600",
      letterSpacing: "0.04em",
      color: "#6a6a8a",
    },
    spinner: {
      width: size,
      height: size,
      borderRadius: "50%",
      border: `${thickness}px solid ${accentColor}22`,
      borderTopColor: accentColor,
      animation: "loader-spin 0.8s linear infinite",
    },
    dotsRow: {
      display: "flex",
      alignItems: "center",
      gap: `${size * 0.22}px`,
    },
    dot: (i) => ({
      width: size * 0.22,
      height: size * 0.22,
      borderRadius: "50%",
      background: accentColor,
      animation: `loader-bounce 0.9s ${i * 0.15}s ease-in-out infinite`,
    }),
    barTrack: {
      width: size * 3,
      height: thickness * 2,
      borderRadius: thickness,
      background: `${accentColor}18`,
      border: `1px solid ${accentColor}30`,
      overflow: "hidden",
      position: "relative",
    },
    barFill: {
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "40%",
      borderRadius: thickness,
      background: accentColor,
      animation: "loader-slide 1.1s ease-in-out infinite",
    },
  };

  return (
    <div style={styles.wrapper}>
      <style>{`
        @keyframes loader-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes loader-bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes loader-slide {
          0% { left: -40%; }
          50% { left: 60%; }
          100% { left: 100%; }
        }
      `}</style>

      {variant === "spinner" && <div style={styles.spinner} />}

      {variant === "dots" && (
        <div style={styles.dotsRow}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={styles.dot(i)} />
          ))}
        </div>
      )}

      {variant === "bar" && (
        <div style={styles.barTrack}>
          <div style={styles.barFill} />
        </div>
      )}

      {label && <span style={styles.label}>{label}</span>}
    </div>
  );
};