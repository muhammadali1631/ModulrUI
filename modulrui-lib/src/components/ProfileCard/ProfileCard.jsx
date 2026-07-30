import React, { useState } from "react";

export const ProfileCard = ({
  name = "Alexandra Moore",
  role = "Senior Product Designer",
  bio = "Crafting digital experiences that sit at the intersection of beauty and function. 6 years in SaaS.",
  avatar = null,
  avatarInitials = null,
  location = "San Francisco, CA",
  stats = [
    { label: "Projects", value: "84" },
    { label: "Followers", value: "12.4k" },
    { label: "Following", value: "310" },
  ],
  tags = ["UI Design", "Figma", "Motion", "React"],
  accentColor = "#6c47ff",
  socialLinks = [],
  onFollow = null,
  onMessage = null,
}) => {
  const [following, setFollowing] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hoveredTag, setHoveredTag] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(null);

  const initials = avatarInitials || name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

  const s = {
    wrapper: {
      width: "340px",
      background: "#0f0f1c",
      border: `1px solid ${hovered ? accentColor + "66" : "#1e1e30"}`,
      borderRadius: "20px",
      overflow: "hidden",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      boxShadow: hovered
        ? `0 24px 60px rgba(0,0,0,0.55), 0 0 0 1px ${accentColor}18`
        : "0 8px 32px rgba(0,0,0,0.4)",
      transition: "all 0.25s cubic-bezier(0.23,1,0.32,1)",
      userSelect: "none",
    },
    banner: {
      height: "90px",
      background: `linear-gradient(135deg, ${accentColor}55 0%, ${accentColor}11 60%, #0f0f1c 100%)`,
      position: "relative",
    },
    bannerPattern: {
      position: "absolute",
      inset: 0,
      backgroundImage: `radial-gradient(circle at 1px 1px, ${accentColor}22 1px, transparent 0)`,
      backgroundSize: "24px 24px",
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
      boxShadow: `0 0 0 2px ${accentColor}44`,
    },
    statusDot: {
      position: "absolute",
      bottom: "4px",
      right: "4px",
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      background: "#22c55e",
      border: "2px solid #0f0f1c",
    },
    body: {
      padding: "48px 24px 20px",
    },
    name: {
      fontSize: "19px",
      fontWeight: "800",
      color: "#eeeef8",
      margin: "0 0 2px",
      letterSpacing: "-0.02em",
    },
    role: {
      fontSize: "12.5px",
      color: accentColor,
      fontWeight: "600",
      margin: "0 0 10px",
      letterSpacing: "0.01em",
    },
    location: {
      fontSize: "12px",
      color: "#4a4a6a",
      marginBottom: "14px",
      display: "flex",
      alignItems: "center",
      gap: "4px",
    },
    bio: {
      fontSize: "13px",
      color: "#7a7a9a",
      lineHeight: 1.65,
      margin: "0 0 20px",
    },
    tags: {
      display: "flex",
      flexWrap: "wrap",
      gap: "7px",
      marginBottom: "22px",
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
      transition: "all 0.15s ease",
    }),
    stats: {
      display: "flex",
      borderTop: "1px solid #1e1e30",
      borderBottom: "1px solid #1e1e30",
      marginBottom: "20px",
    },
    stat: {
      flex: 1,
      padding: "14px 0",
      textAlign: "center",
      borderRight: "1px solid #1e1e30",
    },
    statLast: {
      flex: 1,
      padding: "14px 0",
      textAlign: "center",
    },
    statValue: {
      fontSize: "16px",
      fontWeight: "800",
      color: "#eeeef8",
      display: "block",
      letterSpacing: "-0.02em",
    },
    statLabel: {
      fontSize: "10px",
      color: "#4a4a6a",
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      fontWeight: "600",
    },
    buttons: {
      display: "flex",
      gap: "10px",
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
      background: following
        ? hoveredBtn === "follow" ? "#2a2a3e" : "#1e1e30"
        : hoveredBtn === "follow" ? accentColor + "dd" : accentColor,
      color: following ? "#6a6a8a" : "#fff",
      transition: "all 0.18s ease",
      letterSpacing: "0.01em",
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
      letterSpacing: "0.01em",
    },
    socialRow: {
      display: "flex",
      gap: "10px",
      marginTop: "14px",
      justifyContent: "center",
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
      color: "#4a4a6a",
    }),
  };

  return (
    <div
      style={s.wrapper}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Banner */}
      <div style={s.banner}>
        <div style={s.bannerPattern} />
        <div style={s.avatarWrap}>
          {avatar
            ? <img src={avatar} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : initials
          }
          <div style={s.statusDot} />
        </div>
      </div>

      {/* Body */}
      <div style={s.body}>
        <h2 style={s.name}>{name}</h2>
        <p style={s.role}>{role}</p>
        <div style={s.location}>
          <span>📍</span> {location}
        </div>
        <p style={s.bio}>{bio}</p>

        {/* Tags */}
        <div style={s.tags}>
          {tags.map((t, i) => (
            <span
              key={i}
              style={s.tag(i)}
              onMouseEnter={() => setHoveredTag(i)}
              onMouseLeave={() => setHoveredTag(null)}
            >{t}</span>
          ))}
        </div>

        {/* Stats */}
        <div style={s.stats}>
          {stats.map((st, i) => (
            <div key={i} style={i === stats.length - 1 ? s.statLast : s.stat}>
              <span style={s.statValue}>{st.value}</span>
              <span style={s.statLabel}>{st.label}</span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div style={s.buttons}>
          <button
            style={s.btnFollow}
            onMouseEnter={() => setHoveredBtn("follow")}
            onMouseLeave={() => setHoveredBtn(null)}
            onClick={() => { setFollowing(f => !f); onFollow?.(); }}
          >
            {following ? "Following ✓" : "+ Follow"}
          </button>
          <button
            style={s.btnMsg}
            onMouseEnter={() => setHoveredBtn("msg")}
            onMouseLeave={() => setHoveredBtn(null)}
            onClick={() => onMessage?.()}
          >
            Message
          </button>
        </div>

        {/* Social Links */}
        {socialLinks.length > 0 && (
          <div style={s.socialRow}>
            {socialLinks.map((link, i) => (
              <a key={i} href={link.href} style={s.socialLink(i)} title={link.label}>
                {link.icon}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

