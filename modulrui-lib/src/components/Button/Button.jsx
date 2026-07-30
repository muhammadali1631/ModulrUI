import React, { useState } from "react";

export const Button = ({
  label = "Click Me",
  onClick = () => {},
  variant = "primary",
  size = "md",
  disabled = false,
  fullWidth = false,
  leftIcon = null,
  rightIcon = null,
}) => {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [ripples, setRipples] = useState([]);

  const palette = {
    primary:   { bg: "#6c47ff", hover: "#7c5aff", text: "#fff", shadow: "#6c47ff55" },
    secondary: { bg: "#1e1e2e", hover: "#2a2a3e", text: "#c4c4e0", shadow: "#00000044" },
    danger:    { bg: "#e03e3e", hover: "#f04f4f", text: "#fff", shadow: "#e03e3e55" },
    ghost:     { bg: "transparent", hover: "#ffffff0f", text: "#c4c4e0", shadow: "transparent" },
    success:   { bg: "#22c55e", hover: "#16a34a", text: "#fff", shadow: "#22c55e55" },
  };

  const sizes = {
    sm: { fontSize: "12px", padding: "8px 16px", borderRadius: "8px", iconSize: "14px", gap: "6px" },
    md: { fontSize: "14px", padding: "11px 22px", borderRadius: "10px", iconSize: "16px", gap: "8px" },
    lg: { fontSize: "16px", padding: "14px 28px", borderRadius: "12px", iconSize: "18px", gap: "10px" },
  };

  const color = palette[variant] || palette.primary;
  const dim   = sizes[size]    || sizes.md;

  const addRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
  };

  const bgColor = disabled
    ? "#2a2a3a"
    : hovered
    ? color.hover
    : color.bg;

  const styles = {
    button: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: dim.gap,
      width: fullWidth ? "100%" : "auto",
      padding: dim.padding,
      fontSize: dim.fontSize,
      fontWeight: "600",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      letterSpacing: "0.01em",
      color: disabled ? "#555" : color.text,
      background: bgColor,
      border: variant === "ghost" ? "1px solid #ffffff18" : "1px solid transparent",
      borderRadius: dim.borderRadius,
      cursor: disabled ? "not-allowed" : "pointer",
      outline: "none",
      position: "relative",
      overflow: "hidden",
      userSelect: "none",
      transform: pressed && !disabled ? "scale(0.97)" : "scale(1)",
      boxShadow:
        disabled || variant === "ghost"
          ? "none"
          : hovered
          ? `0 6px 20px ${color.shadow}`
          : `0 2px 8px ${color.shadow}`,
      transition: "background 0.18s ease, box-shadow 0.18s ease, transform 0.1s ease, color 0.18s ease",
    },
    ripple: (r) => ({
      position: "absolute",
      left: r.x - 60,
      top:  r.y - 60,
      width: 120,
      height: 120,
      borderRadius: "50%",
      background: "rgba(255,255,255,0.18)",
      animation: "ripple-expand 0.6s ease-out forwards",
      pointerEvents: "none",
    }),
    icon: {
      display: "flex",
      alignItems: "center",
      fontSize: dim.iconSize,
      lineHeight: 1,
    },
  };

  return (
    <>
      <style>{`
        @keyframes ripple-expand {
          from { transform: scale(0); opacity: 1; }
          to   { transform: scale(2.5); opacity: 0; }
        }
      `}</style>

      <button
        style={styles.button}
        disabled={disabled}
        onClick={(e) => { if (!disabled) { addRipple(e); onClick(e); } }}
        onMouseEnter={() => !disabled && setHovered(true)}
        onMouseLeave={() => { setHovered(false); setPressed(false); }}
        onMouseDown={() => !disabled && setPressed(true)}
        onMouseUp={() => setPressed(false)}
      >
        {ripples.map((r) => (
          <span key={r.id} style={styles.ripple(r)} />
        ))}

        {leftIcon  && <span style={styles.icon}>{leftIcon}</span>}
        {label}
        {rightIcon && <span style={styles.icon}>{rightIcon}</span>}
      </button>
    </>
  );
};

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d0d1a",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "48px",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      padding: "40px 24px",
    }}>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: "11px", letterSpacing: "0.2em", color: "#444", textTransform: "uppercase", fontFamily: "monospace", margin: "0 0 10px" }}>
          Reusable Component
        </p>
        <h1 style={{ fontSize: "30px", fontWeight: "800", color: "#e8e8f0", margin: 0, letterSpacing: "-0.03em" }}>
          Button
        </h1>
      </div>

      {/* Variants */}
      <div style={{ display: "flex", flexDirection: "column", gap: "28px", alignItems: "center" }}>
        <Label text="Variants" />
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
          {["primary","secondary","success","danger","ghost"].map(v => (
            <Button key={v} label={v.charAt(0).toUpperCase() + v.slice(1)} variant={v} />
          ))}
        </div>

        <Label text="Sizes" />
        <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
          <Button label="Small"  size="sm" />
          <Button label="Medium" size="md" />
          <Button label="Large"  size="lg" />
        </div>

        <Label text="With Icons" />
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
          <Button label="Download" leftIcon="↓" variant="primary" />
          <Button label="Next"     rightIcon="→" variant="secondary" />
          <Button label="Delete"   leftIcon="✕" variant="danger" />
        </div>

        <Label text="Interactive Counter" />
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Button label="−" size="sm" variant="ghost" onClick={() => setCount(c => c - 1)} />
          <span style={{ fontSize: "24px", fontWeight: "700", color: "#e8e8f0", minWidth: "40px", textAlign: "center" }}>
            {count}
          </span>
          <Button label="+" size="sm" variant="primary" onClick={() => setCount(c => c + 1)} />
        </div>

        <Label text="States" />
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
          <Button label="Full Width" fullWidth variant="primary" />
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <Button label="Disabled" disabled />
          <Button label="Disabled" variant="danger" disabled />
        </div>
      </div>
    </div>
  );
}

const Label = ({ text }) => (
  <p style={{ fontSize: "11px", letterSpacing: "0.15em", color: "#444", textTransform: "uppercase", fontFamily: "monospace", margin: 0 }}>
    {text}
  </p>
);