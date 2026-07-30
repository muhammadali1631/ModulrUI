import React, { useState } from "react";

export const Accordion = ({
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
  onToggle = () => {}
}) => {
  const [openIndices, setOpenIndices] = useState([0]);

  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };

  const toggleItem = (index) => {
    let newIndices;
    if (allowMultiple) {
      newIndices = openIndices.includes(index)
        ? openIndices.filter(i => i !== index)
        : [...openIndices, index];
    } else {
      newIndices = openIndices.includes(index) ? [] : [index];
    }
    setOpenIndices(newIndices);
    onToggle(newIndices);
  };

  return (
    <div style={{
      width: "100%",
      maxWidth: "600px",
      background: bg,
      borderRadius: "16px",
      border: "1px solid " + alpha("#ffffff", 0.08),
      overflow: "hidden",
      fontFamily: "system-ui, -apple-system, sans-serif",
      boxShadow: "0 20px 50px " + alpha("#000000", 0.3)
    }}>
      {items.map((item, index) => {
        const isOpen = openIndices.includes(index);
        return (
          <div key={index} style={{
            borderBottom: index !== items.length - 1 ? "1px solid " + alpha("#ffffff", 0.05) : "none"
          }}>
            <button
              onClick={() => toggleItem(index)}
              style={{
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
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = alpha("#ffffff", 0.02)}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              <span style={{
                fontSize: "15px",
                fontWeight: "600",
                color: isOpen ? accent : textColor,
                transition: "color 0.2s"
              }}>
                {item.title}
              </span>
              <div style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                background: isOpen ? alpha(accent, 0.1) : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s",
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)"
              }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path 
                    d="M2 4L6 8L10 4" 
                    stroke={isOpen ? accent : alpha(textColor, 0.4)} 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />
                </svg>
              </div>
            </button>
            <div style={{
              maxHeight: isOpen ? "500px" : "0px",
              overflow: "hidden",
              transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s",
              opacity: isOpen ? 1 : 0
            }}>
              <div style={{
                padding: "0 24px 24px 24px",
                fontSize: "14px",
                lineHeight: "1.6",
                color: alpha(textColor, 0.6),
                fontWeight: "400"
              }}>
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};