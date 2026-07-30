import React, { useState, useEffect } from "react";

export const DevHero = ({
  name = "Alex Rivera",
  role = "Full Stack Architect",
  description = "I build high-performance web applications with a focus on clean architecture and exceptional user experiences. Specializing in React ecosystem and cloud infrastructure.",
  primaryCta = "View Projects",
  secondaryCta = "Read Resume",
  accent = "#6366f1",
  bg = "#020617",
  techStack = ["React", "TypeScript", "Node.js", "GraphQL", "AWS", "PostgreSQL"]
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredTech, setHoveredTech] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16),
          g = parseInt(hex.slice(3, 5), 16),
          b = parseInt(hex.slice(5, 7), 16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };

  const containerStyle = {
    background: bg,
    color: "#fff",
    fontFamily: "system-ui, -apple-system, sans-serif",
    padding: "80px 40px",
    minHeight: "450px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
    borderRadius: "24px",
    width: "100%",
    boxSizing: "border-box"
  };

  const glowStyle = {
    position: "absolute",
    top: "-10%",
    left: "50%",
    width: "400px",
    height: "400px",
    background: "radial-gradient(circle, " + alpha(accent, 0.15) + " 0%, transparent 70%)",
    transform: "translateX(-50%)",
    pointerEvents: "none"
  };

  const badgeStyle = {
    display: "inline-block",
    padding: "6px 14px",
    borderRadius: "100px",
    background: alpha(accent, 0.1),
    border: "1px solid " + alpha(accent, 0.3),
    color: accent,
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "24px",
    textTransform: "uppercase",
    letterSpacing: "1px"
  };

  const headingStyle = {
    fontSize: "56px",
    fontWeight: "800",
    margin: "0 0 16px 0",
    lineHeight: "1.1",
    letterSpacing: "-1.5px",
    opacity: isLoaded ? 1 : 0,
    transform: isLoaded ? "translateY(0)" : "translateY(20px)",
    transition: "opacity 0.8s ease, transform 0.8s ease"
  };

  const spanStyle = {
    background: "linear-gradient(135deg, #fff 30%, " + accent + " 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  };

  const descriptionStyle = {
    fontSize: "18px",
    color: "rgba(255,255,255,0.6)",
    maxWidth: "600px",
    lineHeight: "1.6",
    margin: "0 auto 32px",
    opacity: isLoaded ? 1 : 0,
    transition: "opacity 0.8s ease 0.2s"
  };

  const buttonContainer = {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
    marginBottom: "48px",
    opacity: isLoaded ? 1 : 0,
    transition: "opacity 0.8s ease 0.4s"
  };

  const primaryButtonStyle = {
    background: accent,
    color: "#fff",
    padding: "14px 28px",
    borderRadius: "12px",
    border: "none",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 8px 24px " + alpha(accent, 0.3),
    transition: "transform 0.2s"
  };

  const secondaryButtonStyle = {
    background: "rgba(255,255,255,0.05)",
    color: "#fff",
    padding: "14px 28px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.1)",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.2s"
  };

  const techContainer = {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    justifyContent: "center",
    opacity: isLoaded ? 1 : 0,
    transition: "opacity 0.8s ease 0.6s"
  };

  return (
    <div style={containerStyle}>
      <div style={glowStyle} />
      
      <div style={badgeStyle}>
        {role}
      </div>

      <h1 style={headingStyle}>
        Hello, I am <span style={spanStyle}>{name}</span>
      </h1>

      <p style={descriptionStyle}>
        {description}
      </p>

      <div style={buttonContainer}>
        <button 
          style={primaryButtonStyle}
          onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
          onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
        >
          {primaryCta}
        </button>
        <button 
          style={secondaryButtonStyle}
          onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.1)"}
          onMouseLeave={(e) => e.target.style.background = "rgba(255,255,255,0.05)"}
        >
          {secondaryCta}
        </button>
      </div>

      <div style={techContainer}>
        {techStack.map((tech, i) => (
          <div
            key={i}
            onMouseEnter={() => setHoveredTech(i)}
            onMouseLeave={() => setHoveredTech(null)}
            style={{
              padding: "8px 16px",
              background: hoveredTech === i ? alpha(accent, 0.15) : "rgba(255,255,255,0.03)",
              border: "1px solid " + (hoveredTech === i ? alpha(accent, 0.4) : "rgba(255,255,255,0.06)"),
              borderRadius: "10px",
              fontSize: "13px",
              fontWeight: "500",
              color: hoveredTech === i ? "#fff" : "rgba(255,255,255,0.45)",
              transition: "all 0.2s ease",
              cursor: "default"
            }}
          >
            {tech}
          </div>
        ))}
      </div>

      <div style={{
        position: "absolute",
        bottom: "20px",
        width: "1px",
        height: "40px",
        background: "linear-gradient(to bottom, " + alpha(accent, 0.5) + ", transparent)",
        left: "50%",
        opacity: 0.5
      }} />
    </div>
  );
};