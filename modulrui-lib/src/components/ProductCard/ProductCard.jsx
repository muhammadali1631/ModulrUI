import React, { useState } from "react";

export const ProductCard = ({
  image = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
  name = "Velocity Elite X1",
  brand = "UltraStride",
  price = 129.99,
  oldPrice = 159.99,
  rating = 4.8,
  reviews = 128,
  badge = "New Arrival",
  accent = "#6366f1",
  bg = "#0f172a",
  onAddToCart = () => {},
  onWishlist = () => {}
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: "300px",
        background: bg,
        borderRadius: "20px",
        border: "1px solid " + (isHovered ? alpha(accent, 0.3) : "rgba(255,255,255,0.08)"),
        fontFamily: "system-ui, -apple-system, sans-serif",
        overflow: "hidden",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        transform: isHovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: isHovered ? "0 20px 40px rgba(0,0,0,0.5)" : "0 10px 20px rgba(0,0,0,0.2)",
        position: "relative"
      }}
    >
      {/* Image Container */}
      <div style={{ position: "relative", width: "100%", height: "220px", background: "#1e293b", overflow: "hidden" }}>
        <img
          src={image}
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease",
            transform: isHovered ? "scale(1.1)" : "scale(1)"
          }}
        />
        
        {/* Overlay Badges */}
        {badge && (
          <div style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            background: accent,
            color: "#fff",
            padding: "4px 10px",
            borderRadius: "6px",
            fontSize: "11px",
            fontWeight: "800",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            boxShadow: "0 4px 12px " + alpha(accent, 0.4)
          }}>
            {badge}
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
            onWishlist();
          }}
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: isWishlisted ? "#e11d48" : "rgba(0,0,0,0.4)",
            backdropFilter: "blur(4px)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease"
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={isWishlisted ? "#fff" : "none"} stroke={isWishlisted ? "#fff" : "rgba(255,255,255,0.8)"} strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* Content Body */}
      <div style={{ padding: "20px" }}>
        <div style={{ fontSize: "12px", color: alpha("#fff", 0.4), textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px", fontWeight: "600" }}>
          {brand}
        </div>
        <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#fff", margin: "0 0 10px 0", lineHeight: "1.2" }}>
          {name}
        </h3>

        {/* Ratings */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "16px" }}>
          <div style={{ display: "flex", gap: "2px" }}>
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < Math.floor(rating) ? "#fbbf24" : "rgba(255,255,255,0.1)"} stroke="none">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
          <span style={{ fontSize: "12px", color: alpha("#fff", 0.5), fontWeight: "500" }}>({reviews})</span>
        </div>

        {/* Price and CTA */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "22px", fontWeight: "800", color: "#fff" }}>
                ${price}
              </span>
              {oldPrice && (
                <span style={{ fontSize: "14px", color: alpha("#fff", 0.3), textDecoration: "line-through" }}>
                  ${oldPrice}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onAddToCart}
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, " + accent + ", " + alpha(accent, 0.7) + ")",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 15px " + alpha(accent, 0.4),
              transition: "transform 0.2s"
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.92)")}
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};