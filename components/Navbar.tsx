"use client";
import { useState } from "react";

export default function Navbar({ onPublish }: { onPublish: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      style={{
        background: "#0E1F1A",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 2px 20px rgba(0,0,0,0.3)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 72,
        }}
      >
        {/* Logo */}

        {/* Desktop Nav Links */}
        <div
          className="desktop-nav"
          style={{ display: "flex", gap: 32, alignItems: "center" }}
        >
          {["الرئيسية", "من نحن", "أبرز العروض", "خدماتنا", "تواصل معنا"].map(
            (item) => (
              <a
                key={item}
                href={`#${item === "الرئيسية" ? "hero" : item === "من نحن" ? "about" : item === "أبرز العروض" ? "listings" : item === "خدماتنا" ? "services" : "contact"}`}
                style={{
                  color: "#FAF8F5",
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#C5A265")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#FAF8F5")}
              >
                {item}
              </a>
            ),
          )}
        </div>

        {/* CTA */}
        <button
          onClick={onPublish}
          style={{
            background: "#C5A265",
            color: "#0E1F1A",
            border: "none",
            borderRadius: 8,
            padding: "10px 22px",
            fontFamily: "Cairo, sans-serif",
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          نشر إعلان
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
