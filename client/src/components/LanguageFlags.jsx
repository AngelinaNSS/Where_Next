import React from "react";
import { useTranslation } from "react-i18next";

const flags = [
  { code: "en", emoji: "🇬🇧" },
  { code: "de", emoji: "🇩🇪" },
  { code: "fr", emoji: "🇫🇷" },
  { code: "es", emoji: "🇪🇸" },
  { code: "it", emoji: "🇮🇹" },
];

const LanguageFlags = () => {
  const { i18n } = useTranslation();

  return (
    <div style={{
      display: "flex",
      gap: "8px",
      padding: "6px 10px",
      background: "white",
      borderRadius: "12px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    }}>
      {flags.map((f) => (
        <button
          key={f.code}
          onClick={() => i18n.changeLanguage(f.code)}
          style={{
            fontSize: "22px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            opacity: i18n.language === f.code ? 1 : 0.5,
            transition: "opacity 0.2s",
          }}
        >
          {f.emoji}
        </button>
      ))}
    </div>
  );
};

export default LanguageFlags;
