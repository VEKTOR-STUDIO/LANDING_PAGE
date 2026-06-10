import React, { useState, useEffect } from "react";

// Replace with your actual WhatsApp number (country code + number, no + or spaces)
const WHATSAPP_NUMBER = "584167057045";
const WHATSAPP_MESSAGE = "Hola, quiero conocer más sobre Vektor y cómo pueden ayudarme a construir mi empresa.";

export const WhatsAppButton: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="button-whatsapp-float"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed",
        bottom: "32px",
        right: "32px",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: "10px",
        background: "linear-gradient(135deg, #22c55e, #16a34a)",
        borderRadius: "50px",
        padding: hovered ? "14px 22px 14px 18px" : "14px",
        boxShadow: hovered
          ? "0 8px 40px rgba(34,197,94,0.5), 0 0 0 1px rgba(34,197,94,0.2)"
          : "0 4px 24px rgba(34,197,94,0.35)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.9)",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        cursor: "pointer",
        textDecoration: "none",
        overflow: "hidden",
      }}
    >
      {/* Pulse ring */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50px",
          background: "rgba(34,197,94,0.3)",
          animation: "waPulse 2.5s ease-out infinite",
          pointerEvents: "none",
        }}
      />
      <svg
        style={{ width: "24px", height: "24px", flexShrink: 0, position: "relative", zIndex: 1 }}
        fill="white"
        viewBox="0 0 24 24"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>

      <span
        style={{
          color: "white",
          fontWeight: 600,
          fontSize: "14px",
          whiteSpace: "nowrap",
          maxWidth: hovered ? "140px" : "0px",
          overflow: "hidden",
          opacity: hovered ? 1 : 0,
          transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
          zIndex: 1,
          letterSpacing: "0.01em",
        }}
      >
        Escríbenos
      </span>

      <style>{`
        @keyframes waPulse {
          0% { transform: scale(1); opacity: 0.5; }
          70% { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </a>
  );
};
