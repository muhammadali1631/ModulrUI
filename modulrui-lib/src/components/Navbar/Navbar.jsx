import React, { useState, useEffect } from "react";

export const Navbar = ({
  logo = "NexusAI",
  links = ["Product", "Solutions", "Developers", "Pricing", "About"],
  ctaText = "Get Started",
  accent = "#6366f1",
  bg = "#0d1117",
  onCtaClick = () => {},
  onLinkClick = (link) => console.log("Navigating to " + link)
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Product");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navStyle = {
    position: "relative",
    top: 0,
    width: "100%",
    zIndex: 1000,
    background: scrolled ? alpha(bg, 0.8) : "transparent",
    backdropFilter: scrolled ? "blur(12px)" : "none",
    borderBottom: "1px solid " + (scrolled ? "rgba(255,255,255,0.08)" : "transparent"),
    transition: "all 0.3s ease",
    fontFamily: "system-ui, -apple-system, sans-serif"
  };

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
    height: "72px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  };

  const logoStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    textDecoration: "none"
  };

  const logoIconStyle = {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    background: "linear-gradient(135deg, " + accent + ", " + alpha(accent, 0.6) + ")",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px " + alpha(accent, 0.3)
  };

  const linkContainerStyle = {
    display: "flex",
    gap: "8px",
    alignItems: "center"
  };

  const linkStyle = (isActive) => ({
    padding: "8px 16px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
    background: isActive ? alpha(accent, 0.1) : "transparent",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontFamily: "inherit"
  });

  const ctaButtonStyle = {
    background: "linear-gradient(135deg, " + accent + ", " + alpha(accent, 0.8) + ")",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "10px",
    border: "none",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 4px 15px " + alpha(accent, 0.25),
    transition: "transform 0.2s ease",
    fontFamily: "inherit"
  };

  return (
    <div style={navStyle}>
      <div style={containerStyle}>
        <div style={logoStyle} onClick={() => onLinkClick("Home")}>
          <div style={logoIconStyle}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span style={{ fontSize: "18px", fontWeight: "800", color: "#fff", letterSpacing: "-0.5px" }}>{logo}</span>
        </div>

        <div style={linkContainerStyle}>
          {links.map((link) => (
            <button
              key={link}
              onClick={() => { setActive(link); onLinkClick(link); }}
              style={linkStyle(active === link)}
              onMouseEnter={(e) => { if (active !== link) e.target.style.color = "#fff"; }}
              onMouseLeave={(e) => { if (active !== link) e.target.style.color = "rgba(255,255,255,0.6)"; }}
            >
              {link}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button 
            style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", fontSize: "14px", fontWeight: "500", cursor: "pointer" }}
            onMouseEnter={(e) => e.target.style.color = "#fff"}
            onMouseLeave={(e) => e.target.style.color = "rgba(255,255,255,0.6)"}
          >
            Log in
          </button>
          <button 
            onClick={onCtaClick} 
            style={ctaButtonStyle}
            onMouseEnter={(e) => e.target.style.transform = "scale(1.03)"}
            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
          >
            {ctaText}
          </button>
        </div>
      </div>
      {/* Mobile Indicator Mockup */}
      <div style={{ display: "none", position: "absolute", top: "100%", left: 0, width: "100%", background: bg, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        {/* Mobile menu content would go here if implementation required responsive toggle */}
      </div>
    </div>
  );
};