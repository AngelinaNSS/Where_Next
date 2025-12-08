import React from "react";
import { useNavigate } from "react-router-dom";

const TravelGalleryPage = () => {
  const navigate = useNavigate();

  const colors = {
    bg: "linear-gradient(180deg, #fff7fb 0%, #f7fff9 100%)",
    text: "#2c2c2c",
    card: "#ffffff",
    accent: "#FF9DB7",
    accent2: "#9DE6E6",
    accent3: "#FFD7A6",
    green: "#2b6048",
    softShadow: "0 10px 30px rgba(50,50,93,0.08)",
  };

  const photos = [
    "/maldives.jpg",
    "/flower.jpg",
    "/drinks.jpg",
    "/paris.jpg",
    "/iceland2.jpg",
    "/aurora.jpg",
    "/iceland3.jpg",
    "/iceland4.jpg",
    "/egypt.jpg",
    "/egypt2.jpg",
  ];

  const getRotation = () => Math.random() * 6 - 3; // slight rotation

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        padding: "2.4rem 1rem",
        background: colors.bg,
        fontFamily: "'Poppins', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
        boxSizing: "border-box",
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "1.5rem",
          padding: "0.6rem 1rem",
          background: `linear-gradient(90deg, ${colors.accent2}, ${colors.accent})`,
          color: "#fff",
          border: "none",
          borderRadius: "999px",
          cursor: "pointer",
          fontWeight: 600,
          boxShadow: "0 8px 20px rgba(157,230,230,0.14)",
          transition: "transform 0.2s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        ← Back
      </button>

      {/* Title */}
      <h1
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          fontSize: "2.2rem",
          color: colors.green,
          textShadow: "1px 1px 4px rgba(0,0,0,0.1)",
        }}
      >
        My Travel Gallery
      </h1>

      {/* Masonry-style collage */}
      <div
        style={{
          columnCount: 4,
          columnGap: "12px",
        }}
      >
        {photos.map((photo, index) => {
          const rotation = getRotation();
          return (
            <div
              key={photo}
              style={{
                breakInside: "avoid",
                marginBottom: "12px",
                borderRadius: "18px",
                overflow: "hidden",
                transform: `rotate(${rotation}deg)`,
                transition: "transform 0.3s",
                cursor: "pointer",
                boxShadow: colors.softShadow,
                border: `2px solid rgba(157,230,230,0.3)`,
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = `rotate(${rotation}deg)`)
              }
            >
              <img
                src={photo}
                alt={`Travel ${index + 1}`}
                style={{
                  width: "100%",
                  display: "block",
                  objectFit: "cover",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Responsive columns */}
      <style>
        {`
          @media (max-width: 1200px) { div[style*="column-count: 4"] { column-count: 3; } }
          @media (max-width: 900px) { div[style*="column-count: 4"] { column-count: 2; } }
          @media (max-width: 600px) { div[style*="column-count: 4"] { column-count: 1; } }
        `}
      </style>
    </div>
  );
};

export default TravelGalleryPage;


