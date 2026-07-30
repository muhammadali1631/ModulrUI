import React, { useState } from "react";
 
export const Card = ({
  title = "Card Title",
  description = "A short description that gives context about this card's content.",
  tag = "General",
  image = null,
  footer = null,
  variant = "default",
  accentColor = "#6c47ff",
  width = 320,
  onClick = null,
  actions = [],
}) => {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
 
  const variants = {
    default: { bg: "#13131f", border: "#2a2a3e", tagBg: `${accentColor}18`, tagBorder: `${accentColor}40` },
    flat:    { bg: "#0f0f1a", border: "#1e1e2e", tagBg: "#1e1e2e",           tagBorder: "#2a2a3e"         },
    glass:   { bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.1)", tagBg: "rgba(255,255,255,0.07)", tagBorder: "rgba(255,255,255,0.12)" },
  };
 
  const v = variants[variant] || variants.default;
  const clickable = !!onClick;
 
  const styles = {
    card: {
      width,
      background: v.bg,
      border: `1px solid ${hovered ? accentColor + "88" : v.border}`,
      borderRadius: "14px",
      overflow: "hidden",
      cursor: clickable ? "pointer" : "default",
      transform: pressed && clickable ? "scale(0.98)" : hovered && clickable ? "translateY(-4px)" : "none",
      boxShadow: hovered && clickable
        ? `0 20px 48px rgba(0,0,0,0.5), 0 0 0 1px ${accentColor}22`
        : "0 4px 20px rgba(0,0,0,0.3)",
      transition: "all 0.22s cubic-bezier(0.23, 1, 0.32, 1)",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      position: "relative",
      userSelect: "none",
      backdropFilter: variant === "glass" ? "blur(12px)" : "none",
    },
    accentBar: {
      height: "3px",
      background: `linear-gradient(90deg, ${accentColor}, ${accentColor}00)`,
      opacity: hovered ? 1 : 0.6,
      transition: "opacity 0.3s ease",
    },
    image: {
      width: "100%",
      height: "160px",
      objectFit: "cover",
      display: "block",
    },
    imagePlaceholder: {
      width: "100%",
      height: "140px",
      background: `linear-gradient(135deg, ${accentColor}22, ${accentColor}08)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "36px",
      borderBottom: `1px solid ${v.border}`,
    },
    body: {
      padding: "20px 20px 16px",
    },
    tag: {
      display: "inline-flex",
      alignItems: "center",
      fontSize: "10px",
      fontWeight: "700",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: accentColor,
      background: v.tagBg,
      border: `1px solid ${v.tagBorder}`,
      padding: "3px 9px",
      borderRadius: "5px",
      marginBottom: "12px",
    },
    title: {
      fontSize: "17px",
      fontWeight: "700",
      color: "#eeeef8",
      margin: "0 0 8px",
      lineHeight: 1.35,
      letterSpacing: "-0.01em",
    },
    description: {
      fontSize: "13px",
      color: "#6a6a8a",
      lineHeight: 1.65,
      margin: 0,
    },
    footer: {
      padding: "14px 20px",
      borderTop: `1px solid ${v.border}`,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "10px",
    },
    footerSlot: {
      fontSize: "12px",
      color: "#4a4a6a",
    },
    actions: {
      display: "flex",
      gap: "8px",
    },
  };
 
  return (
    <div
      style={styles.card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => clickable && setPressed(true)}
      onMouseUp={() => { setPressed(false); onClick?.(); }}
    >
      <div style={styles.accentBar} />
 
      {image
        ? <img src={image} alt={title} style={styles.image} />
        : <div style={styles.imagePlaceholder}>🎨</div>
      }
 
      <div style={styles.body}>
        <div style={styles.tag}>{tag}</div>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.description}>{description}</p>
      </div>
 
      {(footer || actions.length > 0) && (
        <div style={styles.footer}>
          <span style={styles.footerSlot}>{footer}</span>
          {actions.length > 0 && (
            <div style={styles.actions}>
              {actions.map((action, i) => (
                <ActionBtn key={i} {...action} accentColor={accentColor} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
 
const ActionBtn = ({ label, onClick = () => {}, accentColor = "#6c47ff", primary = false }) => {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontSize: "12px",
        fontWeight: "600",
        fontFamily: "'DM Sans', system-ui, sans-serif",
        padding: "6px 14px",
        borderRadius: "7px",
        border: `1px solid ${primary ? "transparent" : accentColor + "55"}`,
        background: primary ? accentColor : hov ? accentColor + "22" : "transparent",
        color: primary ? "#fff" : accentColor,
        cursor: "pointer",
        transition: "all 0.15s ease",
      }}
    >
      {label}
    </button>
  );
};