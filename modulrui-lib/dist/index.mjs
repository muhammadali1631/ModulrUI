// src/components/Button/Button.jsx
import React, { useState } from "react";
var Button = ({
  label = "Click Me",
  onClick = () => {
  },
  variant = "primary",
  size = "md",
  disabled = false,
  fullWidth = false,
  leftIcon = null,
  rightIcon = null
}) => {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [ripples, setRipples] = useState([]);
  const palette = {
    primary: { bg: "#6c47ff", hover: "#7c5aff", text: "#fff", shadow: "#6c47ff55" },
    secondary: { bg: "#1e1e2e", hover: "#2a2a3e", text: "#c4c4e0", shadow: "#00000044" },
    danger: { bg: "#e03e3e", hover: "#f04f4f", text: "#fff", shadow: "#e03e3e55" },
    ghost: { bg: "transparent", hover: "#ffffff0f", text: "#c4c4e0", shadow: "transparent" },
    success: { bg: "#22c55e", hover: "#16a34a", text: "#fff", shadow: "#22c55e55" }
  };
  const sizes = {
    sm: { fontSize: "12px", padding: "8px 16px", borderRadius: "8px", iconSize: "14px", gap: "6px" },
    md: { fontSize: "14px", padding: "11px 22px", borderRadius: "10px", iconSize: "16px", gap: "8px" },
    lg: { fontSize: "16px", padding: "14px 28px", borderRadius: "12px", iconSize: "18px", gap: "10px" }
  };
  const color = palette[variant] || palette.primary;
  const dim = sizes[size] || sizes.md;
  const addRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
  };
  const bgColor = disabled ? "#2a2a3a" : hovered ? color.hover : color.bg;
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
      boxShadow: disabled || variant === "ghost" ? "none" : hovered ? `0 6px 20px ${color.shadow}` : `0 2px 8px ${color.shadow}`,
      transition: "background 0.18s ease, box-shadow 0.18s ease, transform 0.1s ease, color 0.18s ease"
    },
    ripple: (r) => ({
      position: "absolute",
      left: r.x - 60,
      top: r.y - 60,
      width: 120,
      height: 120,
      borderRadius: "50%",
      background: "rgba(255,255,255,0.18)",
      animation: "ripple-expand 0.6s ease-out forwards",
      pointerEvents: "none"
    }),
    icon: {
      display: "flex",
      alignItems: "center",
      fontSize: dim.iconSize,
      lineHeight: 1
    }
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("style", null, `
        @keyframes ripple-expand {
          from { transform: scale(0); opacity: 1; }
          to   { transform: scale(2.5); opacity: 0; }
        }
      `), /* @__PURE__ */ React.createElement(
    "button",
    {
      style: styles.button,
      disabled,
      onClick: (e) => {
        if (!disabled) {
          addRipple(e);
          onClick(e);
        }
      },
      onMouseEnter: () => !disabled && setHovered(true),
      onMouseLeave: () => {
        setHovered(false);
        setPressed(false);
      },
      onMouseDown: () => !disabled && setPressed(true),
      onMouseUp: () => setPressed(false)
    },
    ripples.map((r) => /* @__PURE__ */ React.createElement("span", { key: r.id, style: styles.ripple(r) })),
    leftIcon && /* @__PURE__ */ React.createElement("span", { style: styles.icon }, leftIcon),
    label,
    rightIcon && /* @__PURE__ */ React.createElement("span", { style: styles.icon }, rightIcon)
  ));
};

// src/components/Card/Card.jsx
import React2, { useState as useState2 } from "react";
var Card = ({
  title = "Card Title",
  description = "A short description that gives context about this card's content.",
  tag = "General",
  image = null,
  footer = null,
  variant = "default",
  accentColor = "#6c47ff",
  width = 320,
  onClick = null,
  actions = []
}) => {
  const [hovered, setHovered] = useState2(false);
  const [pressed, setPressed] = useState2(false);
  const variants = {
    default: { bg: "#13131f", border: "#2a2a3e", tagBg: `${accentColor}18`, tagBorder: `${accentColor}40` },
    flat: { bg: "#0f0f1a", border: "#1e1e2e", tagBg: "#1e1e2e", tagBorder: "#2a2a3e" },
    glass: { bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.1)", tagBg: "rgba(255,255,255,0.07)", tagBorder: "rgba(255,255,255,0.12)" }
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
      boxShadow: hovered && clickable ? `0 20px 48px rgba(0,0,0,0.5), 0 0 0 1px ${accentColor}22` : "0 4px 20px rgba(0,0,0,0.3)",
      transition: "all 0.22s cubic-bezier(0.23, 1, 0.32, 1)",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      position: "relative",
      userSelect: "none",
      backdropFilter: variant === "glass" ? "blur(12px)" : "none"
    },
    accentBar: {
      height: "3px",
      background: `linear-gradient(90deg, ${accentColor}, ${accentColor}00)`,
      opacity: hovered ? 1 : 0.6,
      transition: "opacity 0.3s ease"
    },
    image: {
      width: "100%",
      height: "160px",
      objectFit: "cover",
      display: "block"
    },
    imagePlaceholder: {
      width: "100%",
      height: "140px",
      background: `linear-gradient(135deg, ${accentColor}22, ${accentColor}08)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "36px",
      borderBottom: `1px solid ${v.border}`
    },
    body: {
      padding: "20px 20px 16px"
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
      marginBottom: "12px"
    },
    title: {
      fontSize: "17px",
      fontWeight: "700",
      color: "#eeeef8",
      margin: "0 0 8px",
      lineHeight: 1.35,
      letterSpacing: "-0.01em"
    },
    description: {
      fontSize: "13px",
      color: "#6a6a8a",
      lineHeight: 1.65,
      margin: 0
    },
    footer: {
      padding: "14px 20px",
      borderTop: `1px solid ${v.border}`,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "10px"
    },
    footerSlot: {
      fontSize: "12px",
      color: "#4a4a6a"
    },
    actions: {
      display: "flex",
      gap: "8px"
    }
  };
  return /* @__PURE__ */ React2.createElement(
    "div",
    {
      style: styles.card,
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => {
        setHovered(false);
        setPressed(false);
      },
      onMouseDown: () => clickable && setPressed(true),
      onMouseUp: () => {
        setPressed(false);
        onClick == null ? void 0 : onClick();
      }
    },
    /* @__PURE__ */ React2.createElement("div", { style: styles.accentBar }),
    image ? /* @__PURE__ */ React2.createElement("img", { src: image, alt: title, style: styles.image }) : /* @__PURE__ */ React2.createElement("div", { style: styles.imagePlaceholder }, "\u{1F3A8}"),
    /* @__PURE__ */ React2.createElement("div", { style: styles.body }, /* @__PURE__ */ React2.createElement("div", { style: styles.tag }, tag), /* @__PURE__ */ React2.createElement("h3", { style: styles.title }, title), /* @__PURE__ */ React2.createElement("p", { style: styles.description }, description)),
    (footer || actions.length > 0) && /* @__PURE__ */ React2.createElement("div", { style: styles.footer }, /* @__PURE__ */ React2.createElement("span", { style: styles.footerSlot }, footer), actions.length > 0 && /* @__PURE__ */ React2.createElement("div", { style: styles.actions }, actions.map((action, i) => /* @__PURE__ */ React2.createElement(ActionBtn, { key: i, ...action, accentColor }))))
  );
};
var ActionBtn = ({ label, onClick = () => {
}, accentColor = "#6c47ff", primary = false }) => {
  const [hov, setHov] = useState2(false);
  return /* @__PURE__ */ React2.createElement(
    "button",
    {
      onClick: (e) => {
        e.stopPropagation();
        onClick();
      },
      onMouseEnter: () => setHov(true),
      onMouseLeave: () => setHov(false),
      style: {
        fontSize: "12px",
        fontWeight: "600",
        fontFamily: "'DM Sans', system-ui, sans-serif",
        padding: "6px 14px",
        borderRadius: "7px",
        border: `1px solid ${primary ? "transparent" : accentColor + "55"}`,
        background: primary ? accentColor : hov ? accentColor + "22" : "transparent",
        color: primary ? "#fff" : accentColor,
        cursor: "pointer",
        transition: "all 0.15s ease"
      }
    },
    label
  );
};

// src/components/ProfileCard/ProfileCard.jsx
import React3, { useState as useState3 } from "react";
var ProfileCard = ({
  name = "Alexandra Moore",
  role = "Senior Product Designer",
  bio = "Crafting digital experiences that sit at the intersection of beauty and function. 6 years in SaaS.",
  avatar = null,
  avatarInitials = null,
  location = "San Francisco, CA",
  stats = [
    { label: "Projects", value: "84" },
    { label: "Followers", value: "12.4k" },
    { label: "Following", value: "310" }
  ],
  tags = ["UI Design", "Figma", "Motion", "React"],
  accentColor = "#6c47ff",
  socialLinks = [],
  onFollow = null,
  onMessage = null
}) => {
  const [following, setFollowing] = useState3(false);
  const [hovered, setHovered] = useState3(false);
  const [hoveredTag, setHoveredTag] = useState3(null);
  const [hoveredBtn, setHoveredBtn] = useState3(null);
  const initials = avatarInitials || name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const s = {
    wrapper: {
      width: "340px",
      background: "#0f0f1c",
      border: `1px solid ${hovered ? accentColor + "66" : "#1e1e30"}`,
      borderRadius: "20px",
      overflow: "hidden",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      boxShadow: hovered ? `0 24px 60px rgba(0,0,0,0.55), 0 0 0 1px ${accentColor}18` : "0 8px 32px rgba(0,0,0,0.4)",
      transition: "all 0.25s cubic-bezier(0.23,1,0.32,1)",
      userSelect: "none"
    },
    banner: {
      height: "90px",
      background: `linear-gradient(135deg, ${accentColor}55 0%, ${accentColor}11 60%, #0f0f1c 100%)`,
      position: "relative"
    },
    bannerPattern: {
      position: "absolute",
      inset: 0,
      backgroundImage: `radial-gradient(circle at 1px 1px, ${accentColor}22 1px, transparent 0)`,
      backgroundSize: "24px 24px"
    },
    avatarWrap: {
      position: "absolute",
      bottom: "-36px",
      left: "24px",
      width: "72px",
      height: "72px",
      borderRadius: "50%",
      border: `3px solid #0f0f1c`,
      overflow: "hidden",
      background: `linear-gradient(135deg, ${accentColor}, ${accentColor}99)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "22px",
      fontWeight: "800",
      color: "#fff",
      letterSpacing: "-0.02em",
      boxShadow: `0 0 0 2px ${accentColor}44`
    },
    statusDot: {
      position: "absolute",
      bottom: "4px",
      right: "4px",
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      background: "#22c55e",
      border: "2px solid #0f0f1c"
    },
    body: {
      padding: "48px 24px 20px"
    },
    name: {
      fontSize: "19px",
      fontWeight: "800",
      color: "#eeeef8",
      margin: "0 0 2px",
      letterSpacing: "-0.02em"
    },
    role: {
      fontSize: "12.5px",
      color: accentColor,
      fontWeight: "600",
      margin: "0 0 10px",
      letterSpacing: "0.01em"
    },
    location: {
      fontSize: "12px",
      color: "#4a4a6a",
      marginBottom: "14px",
      display: "flex",
      alignItems: "center",
      gap: "4px"
    },
    bio: {
      fontSize: "13px",
      color: "#7a7a9a",
      lineHeight: 1.65,
      margin: "0 0 20px"
    },
    tags: {
      display: "flex",
      flexWrap: "wrap",
      gap: "7px",
      marginBottom: "22px"
    },
    tag: (i) => ({
      fontSize: "11px",
      fontWeight: "600",
      letterSpacing: "0.05em",
      padding: "4px 10px",
      borderRadius: "6px",
      border: `1px solid ${hoveredTag === i ? accentColor + "88" : accentColor + "30"}`,
      background: hoveredTag === i ? accentColor + "22" : accentColor + "10",
      color: hoveredTag === i ? accentColor : accentColor + "cc",
      cursor: "default",
      transition: "all 0.15s ease"
    }),
    stats: {
      display: "flex",
      borderTop: "1px solid #1e1e30",
      borderBottom: "1px solid #1e1e30",
      marginBottom: "20px"
    },
    stat: {
      flex: 1,
      padding: "14px 0",
      textAlign: "center",
      borderRight: "1px solid #1e1e30"
    },
    statLast: {
      flex: 1,
      padding: "14px 0",
      textAlign: "center"
    },
    statValue: {
      fontSize: "16px",
      fontWeight: "800",
      color: "#eeeef8",
      display: "block",
      letterSpacing: "-0.02em"
    },
    statLabel: {
      fontSize: "10px",
      color: "#4a4a6a",
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      fontWeight: "600"
    },
    buttons: {
      display: "flex",
      gap: "10px"
    },
    btnFollow: {
      flex: 1,
      padding: "10px",
      borderRadius: "10px",
      fontSize: "13px",
      fontWeight: "700",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      border: "none",
      cursor: "pointer",
      background: following ? hoveredBtn === "follow" ? "#2a2a3e" : "#1e1e30" : hoveredBtn === "follow" ? accentColor + "dd" : accentColor,
      color: following ? "#6a6a8a" : "#fff",
      transition: "all 0.18s ease",
      letterSpacing: "0.01em"
    },
    btnMsg: {
      flex: 1,
      padding: "10px",
      borderRadius: "10px",
      fontSize: "13px",
      fontWeight: "700",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      border: `1px solid ${hoveredBtn === "msg" ? accentColor + "88" : "#2a2a3e"}`,
      cursor: "pointer",
      background: hoveredBtn === "msg" ? accentColor + "18" : "transparent",
      color: hoveredBtn === "msg" ? accentColor : "#6a6a8a",
      transition: "all 0.18s ease",
      letterSpacing: "0.01em"
    },
    socialRow: {
      display: "flex",
      gap: "10px",
      marginTop: "14px",
      justifyContent: "center"
    },
    socialLink: (i) => ({
      width: "32px",
      height: "32px",
      borderRadius: "8px",
      border: `1px solid #1e1e30`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
      cursor: "pointer",
      background: "transparent",
      transition: "all 0.15s ease",
      textDecoration: "none",
      color: "#4a4a6a"
    })
  };
  return /* @__PURE__ */ React3.createElement(
    "div",
    {
      style: s.wrapper,
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false)
    },
    /* @__PURE__ */ React3.createElement("div", { style: s.banner }, /* @__PURE__ */ React3.createElement("div", { style: s.bannerPattern }), /* @__PURE__ */ React3.createElement("div", { style: s.avatarWrap }, avatar ? /* @__PURE__ */ React3.createElement("img", { src: avatar, alt: name, style: { width: "100%", height: "100%", objectFit: "cover" } }) : initials, /* @__PURE__ */ React3.createElement("div", { style: s.statusDot }))),
    /* @__PURE__ */ React3.createElement("div", { style: s.body }, /* @__PURE__ */ React3.createElement("h2", { style: s.name }, name), /* @__PURE__ */ React3.createElement("p", { style: s.role }, role), /* @__PURE__ */ React3.createElement("div", { style: s.location }, /* @__PURE__ */ React3.createElement("span", null, "\u{1F4CD}"), " ", location), /* @__PURE__ */ React3.createElement("p", { style: s.bio }, bio), /* @__PURE__ */ React3.createElement("div", { style: s.tags }, tags.map((t, i) => /* @__PURE__ */ React3.createElement(
      "span",
      {
        key: i,
        style: s.tag(i),
        onMouseEnter: () => setHoveredTag(i),
        onMouseLeave: () => setHoveredTag(null)
      },
      t
    ))), /* @__PURE__ */ React3.createElement("div", { style: s.stats }, stats.map((st, i) => /* @__PURE__ */ React3.createElement("div", { key: i, style: i === stats.length - 1 ? s.statLast : s.stat }, /* @__PURE__ */ React3.createElement("span", { style: s.statValue }, st.value), /* @__PURE__ */ React3.createElement("span", { style: s.statLabel }, st.label)))), /* @__PURE__ */ React3.createElement("div", { style: s.buttons }, /* @__PURE__ */ React3.createElement(
      "button",
      {
        style: s.btnFollow,
        onMouseEnter: () => setHoveredBtn("follow"),
        onMouseLeave: () => setHoveredBtn(null),
        onClick: () => {
          setFollowing((f) => !f);
          onFollow == null ? void 0 : onFollow();
        }
      },
      following ? "Following \u2713" : "+ Follow"
    ), /* @__PURE__ */ React3.createElement(
      "button",
      {
        style: s.btnMsg,
        onMouseEnter: () => setHoveredBtn("msg"),
        onMouseLeave: () => setHoveredBtn(null),
        onClick: () => onMessage == null ? void 0 : onMessage()
      },
      "Message"
    )), socialLinks.length > 0 && /* @__PURE__ */ React3.createElement("div", { style: s.socialRow }, socialLinks.map((link, i) => /* @__PURE__ */ React3.createElement("a", { key: i, href: link.href, style: s.socialLink(i), title: link.label }, link.icon))))
  );
};

// src/components/Accordion/Accordion.jsx
import React4, { useState as useState4 } from "react";
var Accordion = ({
  items = [
    { title: "What is the return policy?", content: "Our return policy is simple: if you are not satisfied with your purchase, you can return it within 30 days for a full refund or exchange. No questions asked." },
    { title: "How do I track my order?", content: "Once your order is shipped, you will receive an email with a tracking number and a link to the carrier's website. You can also track your order through your account dashboard." },
    { title: "Is there a warranty included?", content: "Yes, all our premium products come with a 2-year limited warranty covering manufacturing defects and hardware failure under normal use conditions." },
    { title: "Can I cancel my subscription?", content: "Absolutely. You can cancel your subscription at any time from your settings page. Your access will continue until the end of the current billing cycle." }
  ],
  allowMultiple = false,
  accent = "#6366f1",
  bg = "#0f172a",
  textColor = "#ffffff",
  onToggle = () => {
  }
}) => {
  const [openIndices, setOpenIndices] = useState4([0]);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  const toggleItem = (index) => {
    let newIndices;
    if (allowMultiple) {
      newIndices = openIndices.includes(index) ? openIndices.filter((i) => i !== index) : [...openIndices, index];
    } else {
      newIndices = openIndices.includes(index) ? [] : [index];
    }
    setOpenIndices(newIndices);
    onToggle(newIndices);
  };
  return /* @__PURE__ */ React4.createElement("div", { style: {
    width: "100%",
    maxWidth: "600px",
    background: bg,
    borderRadius: "16px",
    border: "1px solid " + alpha("#ffffff", 0.08),
    overflow: "hidden",
    fontFamily: "system-ui, -apple-system, sans-serif",
    boxShadow: "0 20px 50px " + alpha("#000000", 0.3)
  } }, items.map((item, index) => {
    const isOpen = openIndices.includes(index);
    return /* @__PURE__ */ React4.createElement("div", { key: index, style: {
      borderBottom: index !== items.length - 1 ? "1px solid " + alpha("#ffffff", 0.05) : "none"
    } }, /* @__PURE__ */ React4.createElement(
      "button",
      {
        onClick: () => toggleItem(index),
        style: {
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 24px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          transition: "background 0.2s"
        },
        onMouseEnter: (e) => e.currentTarget.style.background = alpha("#ffffff", 0.02),
        onMouseLeave: (e) => e.currentTarget.style.background = "transparent"
      },
      /* @__PURE__ */ React4.createElement("span", { style: {
        fontSize: "15px",
        fontWeight: "600",
        color: isOpen ? accent : textColor,
        transition: "color 0.2s"
      } }, item.title),
      /* @__PURE__ */ React4.createElement("div", { style: {
        width: "24px",
        height: "24px",
        borderRadius: "50%",
        background: isOpen ? alpha(accent, 0.1) : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s",
        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)"
      } }, /* @__PURE__ */ React4.createElement("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none" }, /* @__PURE__ */ React4.createElement(
        "path",
        {
          d: "M2 4L6 8L10 4",
          stroke: isOpen ? accent : alpha(textColor, 0.4),
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      )))
    ), /* @__PURE__ */ React4.createElement("div", { style: {
      maxHeight: isOpen ? "500px" : "0px",
      overflow: "hidden",
      transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s",
      opacity: isOpen ? 1 : 0
    } }, /* @__PURE__ */ React4.createElement("div", { style: {
      padding: "0 24px 24px 24px",
      fontSize: "14px",
      lineHeight: "1.6",
      color: alpha(textColor, 0.6),
      fontWeight: "400"
    } }, item.content)));
  }));
};

// src/components/ProductCard/ProductCard.jsx
import React5, { useState as useState5 } from "react";
var ProductCard = ({
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
  onAddToCart = () => {
  },
  onWishlist = () => {
  }
}) => {
  const [isHovered, setIsHovered] = useState5(false);
  const [isWishlisted, setIsWishlisted] = useState5(false);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return /* @__PURE__ */ React5.createElement(
    "div",
    {
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      style: {
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
      }
    },
    /* @__PURE__ */ React5.createElement("div", { style: { position: "relative", width: "100%", height: "220px", background: "#1e293b", overflow: "hidden" } }, /* @__PURE__ */ React5.createElement(
      "img",
      {
        src: image,
        alt: name,
        style: {
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform 0.5s ease",
          transform: isHovered ? "scale(1.1)" : "scale(1)"
        }
      }
    ), badge && /* @__PURE__ */ React5.createElement("div", { style: {
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
    } }, badge), /* @__PURE__ */ React5.createElement(
      "button",
      {
        onClick: (e) => {
          e.stopPropagation();
          setIsWishlisted(!isWishlisted);
          onWishlist();
        },
        style: {
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
        }
      },
      /* @__PURE__ */ React5.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: isWishlisted ? "#fff" : "none", stroke: isWishlisted ? "#fff" : "rgba(255,255,255,0.8)", strokeWidth: "2" }, /* @__PURE__ */ React5.createElement("path", { d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" }))
    )),
    /* @__PURE__ */ React5.createElement("div", { style: { padding: "20px" } }, /* @__PURE__ */ React5.createElement("div", { style: { fontSize: "12px", color: alpha("#fff", 0.4), textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px", fontWeight: "600" } }, brand), /* @__PURE__ */ React5.createElement("h3", { style: { fontSize: "18px", fontWeight: "700", color: "#fff", margin: "0 0 10px 0", lineHeight: "1.2" } }, name), /* @__PURE__ */ React5.createElement("div", { style: { display: "flex", alignItems: "center", gap: "6px", marginBottom: "16px" } }, /* @__PURE__ */ React5.createElement("div", { style: { display: "flex", gap: "2px" } }, [...Array(5)].map((_, i) => /* @__PURE__ */ React5.createElement("svg", { key: i, width: "14", height: "14", viewBox: "0 0 24 24", fill: i < Math.floor(rating) ? "#fbbf24" : "rgba(255,255,255,0.1)", stroke: "none" }, /* @__PURE__ */ React5.createElement("path", { d: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" })))), /* @__PURE__ */ React5.createElement("span", { style: { fontSize: "12px", color: alpha("#fff", 0.5), fontWeight: "500" } }, "(", reviews, ")")), /* @__PURE__ */ React5.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" } }, /* @__PURE__ */ React5.createElement("div", null, /* @__PURE__ */ React5.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px" } }, /* @__PURE__ */ React5.createElement("span", { style: { fontSize: "22px", fontWeight: "800", color: "#fff" } }, "$", price), oldPrice && /* @__PURE__ */ React5.createElement("span", { style: { fontSize: "14px", color: alpha("#fff", 0.3), textDecoration: "line-through" } }, "$", oldPrice))), /* @__PURE__ */ React5.createElement(
      "button",
      {
        onClick: onAddToCart,
        style: {
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
        },
        onMouseDown: (e) => e.currentTarget.style.transform = "scale(0.92)",
        onMouseUp: (e) => e.currentTarget.style.transform = "scale(1)"
      },
      /* @__PURE__ */ React5.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "#fff", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React5.createElement("line", { x1: "12", y1: "5", x2: "12", y2: "19" }), /* @__PURE__ */ React5.createElement("line", { x1: "5", y1: "12", x2: "19", y2: "12" }))
    )))
  );
};

// src/components/Navbar/Navbar.jsx
import React6, { useState as useState6, useEffect } from "react";
var Navbar = ({
  logo = "NexusAI",
  links = ["Product", "Solutions", "Developers", "Pricing", "About"],
  ctaText = "Get Started",
  accent = "#6366f1",
  bg = "#0d1117",
  onCtaClick = () => {
  },
  onLinkClick = (link) => console.log("Navigating to " + link)
}) => {
  const [scrolled, setScrolled] = useState6(false);
  const [active, setActive] = useState6("Product");
  const [mobileMenuOpen, setMobileMenuOpen] = useState6(false);
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
    zIndex: 1e3,
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
  return /* @__PURE__ */ React6.createElement("div", { style: navStyle }, /* @__PURE__ */ React6.createElement("div", { style: containerStyle }, /* @__PURE__ */ React6.createElement("div", { style: logoStyle, onClick: () => onLinkClick("Home") }, /* @__PURE__ */ React6.createElement("div", { style: logoIconStyle }, /* @__PURE__ */ React6.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "white", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React6.createElement("path", { d: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" }))), /* @__PURE__ */ React6.createElement("span", { style: { fontSize: "18px", fontWeight: "800", color: "#fff", letterSpacing: "-0.5px" } }, logo)), /* @__PURE__ */ React6.createElement("div", { style: linkContainerStyle }, links.map((link) => /* @__PURE__ */ React6.createElement(
    "button",
    {
      key: link,
      onClick: () => {
        setActive(link);
        onLinkClick(link);
      },
      style: linkStyle(active === link),
      onMouseEnter: (e) => {
        if (active !== link) e.target.style.color = "#fff";
      },
      onMouseLeave: (e) => {
        if (active !== link) e.target.style.color = "rgba(255,255,255,0.6)";
      }
    },
    link
  ))), /* @__PURE__ */ React6.createElement("div", { style: { display: "flex", alignItems: "center", gap: "16px" } }, /* @__PURE__ */ React6.createElement(
    "button",
    {
      style: { background: "none", border: "none", color: "rgba(255,255,255,0.6)", fontSize: "14px", fontWeight: "500", cursor: "pointer" },
      onMouseEnter: (e) => e.target.style.color = "#fff",
      onMouseLeave: (e) => e.target.style.color = "rgba(255,255,255,0.6)"
    },
    "Log in"
  ), /* @__PURE__ */ React6.createElement(
    "button",
    {
      onClick: onCtaClick,
      style: ctaButtonStyle,
      onMouseEnter: (e) => e.target.style.transform = "scale(1.03)",
      onMouseLeave: (e) => e.target.style.transform = "scale(1)"
    },
    ctaText
  ))), /* @__PURE__ */ React6.createElement("div", { style: { display: "none", position: "absolute", top: "100%", left: 0, width: "100%", background: bg, borderTop: "1px solid rgba(255,255,255,0.05)" } }));
};

// src/components/Loader/Loader.jsx
import React7 from "react";
var Loader = ({
  variant = "spinner",
  size = 36,
  accentColor = "#6c47ff",
  label = null,
  thickness = 3
}) => {
  const styles = {
    wrapper: {
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
      fontFamily: "'DM Sans', system-ui, sans-serif"
    },
    label: {
      fontSize: "12px",
      fontWeight: "600",
      letterSpacing: "0.04em",
      color: "#6a6a8a"
    },
    spinner: {
      width: size,
      height: size,
      borderRadius: "50%",
      border: `${thickness}px solid ${accentColor}22`,
      borderTopColor: accentColor,
      animation: "loader-spin 0.8s linear infinite"
    },
    dotsRow: {
      display: "flex",
      alignItems: "center",
      gap: `${size * 0.22}px`
    },
    dot: (i) => ({
      width: size * 0.22,
      height: size * 0.22,
      borderRadius: "50%",
      background: accentColor,
      animation: `loader-bounce 0.9s ${i * 0.15}s ease-in-out infinite`
    }),
    barTrack: {
      width: size * 3,
      height: thickness * 2,
      borderRadius: thickness,
      background: `${accentColor}18`,
      border: `1px solid ${accentColor}30`,
      overflow: "hidden",
      position: "relative"
    },
    barFill: {
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "40%",
      borderRadius: thickness,
      background: accentColor,
      animation: "loader-slide 1.1s ease-in-out infinite"
    }
  };
  return /* @__PURE__ */ React7.createElement("div", { style: styles.wrapper }, /* @__PURE__ */ React7.createElement("style", null, `
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
      `), variant === "spinner" && /* @__PURE__ */ React7.createElement("div", { style: styles.spinner }), variant === "dots" && /* @__PURE__ */ React7.createElement("div", { style: styles.dotsRow }, [0, 1, 2].map((i) => /* @__PURE__ */ React7.createElement("div", { key: i, style: styles.dot(i) }))), variant === "bar" && /* @__PURE__ */ React7.createElement("div", { style: styles.barTrack }, /* @__PURE__ */ React7.createElement("div", { style: styles.barFill })), label && /* @__PURE__ */ React7.createElement("span", { style: styles.label }, label));
};

// src/components/DevHero/DevHero.jsx
import React8, { useState as useState7, useEffect as useEffect2 } from "react";
var DevHero = ({
  name = "Alex Rivera",
  role = "Full Stack Architect",
  description = "I build high-performance web applications with a focus on clean architecture and exceptional user experiences. Specializing in React ecosystem and cloud infrastructure.",
  primaryCta = "View Projects",
  secondaryCta = "Read Resume",
  accent = "#6366f1",
  bg = "#020617",
  techStack = ["React", "TypeScript", "Node.js", "GraphQL", "AWS", "PostgreSQL"]
}) => {
  const [isLoaded, setIsLoaded] = useState7(false);
  const [hoveredTech, setHoveredTech] = useState7(null);
  useEffect2(() => {
    setIsLoaded(true);
  }, []);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
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
  return /* @__PURE__ */ React8.createElement("div", { style: containerStyle }, /* @__PURE__ */ React8.createElement("div", { style: glowStyle }), /* @__PURE__ */ React8.createElement("div", { style: badgeStyle }, role), /* @__PURE__ */ React8.createElement("h1", { style: headingStyle }, "Hello, I am ", /* @__PURE__ */ React8.createElement("span", { style: spanStyle }, name)), /* @__PURE__ */ React8.createElement("p", { style: descriptionStyle }, description), /* @__PURE__ */ React8.createElement("div", { style: buttonContainer }, /* @__PURE__ */ React8.createElement(
    "button",
    {
      style: primaryButtonStyle,
      onMouseEnter: (e) => e.target.style.transform = "scale(1.05)",
      onMouseLeave: (e) => e.target.style.transform = "scale(1)"
    },
    primaryCta
  ), /* @__PURE__ */ React8.createElement(
    "button",
    {
      style: secondaryButtonStyle,
      onMouseEnter: (e) => e.target.style.background = "rgba(255,255,255,0.1)",
      onMouseLeave: (e) => e.target.style.background = "rgba(255,255,255,0.05)"
    },
    secondaryCta
  )), /* @__PURE__ */ React8.createElement("div", { style: techContainer }, techStack.map((tech, i) => /* @__PURE__ */ React8.createElement(
    "div",
    {
      key: i,
      onMouseEnter: () => setHoveredTech(i),
      onMouseLeave: () => setHoveredTech(null),
      style: {
        padding: "8px 16px",
        background: hoveredTech === i ? alpha(accent, 0.15) : "rgba(255,255,255,0.03)",
        border: "1px solid " + (hoveredTech === i ? alpha(accent, 0.4) : "rgba(255,255,255,0.06)"),
        borderRadius: "10px",
        fontSize: "13px",
        fontWeight: "500",
        color: hoveredTech === i ? "#fff" : "rgba(255,255,255,0.45)",
        transition: "all 0.2s ease",
        cursor: "default"
      }
    },
    tech
  ))), /* @__PURE__ */ React8.createElement("div", { style: {
    position: "absolute",
    bottom: "20px",
    width: "1px",
    height: "40px",
    background: "linear-gradient(to bottom, " + alpha(accent, 0.5) + ", transparent)",
    left: "50%",
    opacity: 0.5
  } }));
};
export {
  Accordion,
  Button,
  Card,
  DevHero,
  Loader,
  Navbar,
  ProductCard,
  ProfileCard
};
