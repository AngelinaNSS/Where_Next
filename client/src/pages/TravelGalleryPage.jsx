import React from "react";
import { useNavigate } from "react-router-dom";

const TravelGalleryPage = () => {
  const navigate = useNavigate();


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


  const getRotation = () => Math.random() * 10 - 5; 

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        padding: "2rem",
        background: "linear-gradient(135deg, #baf3f0ff, #94dfe7ff, #4dd0e1, #00acc1)", 
        fontFamily: "'Poppins', sans-serif",
        boxSizing: "border-box",
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "1.5rem",
          padding: "8px 14px",
          backgroundColor: "#fff",
          color: "#333",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "600",
          boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
          transition: "0.2s",
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
          color: "#004d66",
          textShadow: "1px 1px 4px rgba(0,0,0,0.2)",
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
              key={index}
              style={{
                breakInside: "avoid",
                marginBottom: "12px",
                borderRadius: "16px",
                overflow: "hidden",
                transform: `rotate(${rotation}deg)`,
                transition: "transform 0.3s",
                cursor: "pointer",
                boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                border: "4px solid rgba(173, 216, 230, 0.5)", 
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

