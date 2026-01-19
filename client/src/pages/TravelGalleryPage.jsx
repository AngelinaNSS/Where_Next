import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TravelGalleryPage = () => {
  const navigate = useNavigate();
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const colors = {
    bg: "linear-gradient(180deg, #fff7fb 0%, #f7fff9 100%)",
    text: "#2c2c2c",
    card: "#ffffff",
    accent: "#FF9DB7",
    accent2: "#9DE6E6",
    green: "#2b6048",
    shadow: "0 12px 30px rgba(0,0,0,0.15)",
  };

  const photos = [
    {
      src: "/paris.jpg",
      location: "Paris, France",
      date: "April 2024",
      mood: "🥐✨",
      story:
        "Woke up early to watch the city wake up. The streets were quiet, and I had the best croissant of my life.",
    },
    {
      src: "/iceland2.jpg",
      location: "Iceland",
      date: "March 2024",
      mood: "❄️🌌",
      story:
        "Standing under the northern lights felt unreal. Cold hands, warm heart.",
    },
    {
      src: "/egypt.jpg",
      location: "Giza, Egypt",
      date: "February 2024",
      mood: "🏜️🐫",
      story:
        "Seeing the pyramids in real life was overwhelming. History feels different when you're standing inside it.",
    },
    {
      src: "/maldives.jpg",
      location: "Maldives",
      date: "January 2024",
      mood: "🌊☀️",
      story:
        "Nothing but ocean sounds, warm sand, and time slowing down.",
    },
    {
      src: "/aurora.jpg",
      location: "Northern Europe",
      date: "Winter 2024",
      mood: "✨💙",
      story:
        "One of those moments where you stop talking and just stare.",
    },
    {
      src: "/bamboo_grove.jpg",
      location: "Bamboo Grove - Japan",
      date: "May 2022",
      mood: "✨💙",
      story:
        "It was unbelievable! How can a place be so beautiful?",
    },
    {
      src: "/toronto.jpg",
      location: "Toronto City",
      date: "July 2021",
      mood: "✨💙",
      story:
        "This city is ALIVE! We never ran out of things to do. Go to the CN Tower for sure.",
    },
  ];

  const getRotation = () => Math.random() * 6 - 3;

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        padding: "2.4rem 1rem",
        background: colors.bg,
        fontFamily: "Poppins, system-ui, sans-serif",
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
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        }}
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
        }}
      >
        My Travel Journal 🌍
      </h1>

      {/* Gallery */}
      <div style={{ columnCount: 3, columnGap: "14px" }}>
        {photos.map((photo, index) => {
          const rotation = getRotation();
          return (
            <div
              key={index}
              onClick={() => setSelectedPhoto(photo)}
              style={{
                breakInside: "avoid",
                marginBottom: "14px",
                borderRadius: "18px",
                overflow: "hidden",
                transform: `rotate(${rotation}deg)`,
                cursor: "pointer",
                boxShadow: colors.shadow,
                transition: "transform 0.3s",
              }}
            >
              <img
                src={photo.src}
                alt={photo.location}
                style={{ width: "100%", display: "block" }}
              />
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: "20px",
              maxWidth: "420px",
              width: "90%",
              padding: "1.8rem",
              boxShadow: colors.shadow,
              textAlign: "center",
            }}
          >
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.location}
              style={{
                width: "100%",
                borderRadius: "14px",
                marginBottom: "1rem",
              }}
            />

            <h2 style={{ marginBottom: "0.3rem" }}>
              {selectedPhoto.location}
            </h2>
            <p style={{ color: "#777", fontSize: "0.9rem" }}>
              {selectedPhoto.date} • {selectedPhoto.mood}
            </p>

            <p style={{ marginTop: "1rem", color: "#444", lineHeight: "1.6" }}>
              {selectedPhoto.story}
            </p>

            <button
              onClick={() => setSelectedPhoto(null)}
              style={{
                marginTop: "1.5rem",
                padding: "0.6rem 1.2rem",
                borderRadius: "999px",
                border: "none",
                background: colors.accent,
                color: "#fff",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Responsive */}
      <style>
        {`
          @media (max-width: 900px) { div[style*="column-count: 3"] { column-count: 2; } }
          @media (max-width: 600px) { div[style*="column-count: 3"] { column-count: 1; } }
        `}
      </style>
    </div>
  );
};

export default TravelGalleryPage;




