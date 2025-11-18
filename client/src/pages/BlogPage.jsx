import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BlogPage = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const colors = {
    bg: "#f9f7f3",
    text: "#2c2c2c",
    white: "#ffffff",
    green: "#007f5f",
    yellow: "#FFB400",
    yellowHover: "#E59400",
    brown: "#d4a373",
    cardShadow: "0 4px 12px rgba(0,0,0,0.1)",
  };

  const traveler = {
    name: "Sophia Martinez",
    bio: "Sophia is a passionate traveler from Barcelona who loves exploring cultures through food, music, and local traditions. She documents her journeys to inspire others to embrace adventure.",
    journeys: [
      {
        country: "Japan",
        description:
          "Sophia immersed herself in Tokyo’s vibrant city life, explored Kyoto’s temples, and enjoyed sushi-making workshops.",
        videoUrl: "https://www.youtube.com/embed/7nQ2oiVqKHw",
        tags: ["Culture", "Foodie", "City Life"],
      },
      {
        country: "Italy",
        description:
          "From the canals of Venice to the art of Florence, Sophia indulged in pasta-making classes and admired Renaissance masterpieces.",
        videoUrl: "https://www.youtube.com/embed/0fZCCAqoSwY",
        tags: ["History", "Art", "Foodie"],
      },
      {
        country: "Brazil",
        description:
          "Sophia danced through Rio’s Carnival, hiked in the Amazon rainforest, and soaked up the sun on Copacabana beach.",
        videoUrl: "https://www.youtube.com/embed/7Z3ybMTpq9E",
        tags: ["Adventure", "Nature", "Festival"],
      },
    ],
  };

  const relatedTrips = [
    { country: "Thailand", preview: "Exploring Bangkok street food and Chiang Mai temples." },
    { country: "Morocco", preview: "Wandering Marrakech markets and Sahara desert nights." },
    { country: "New Zealand", preview: "Hiking breathtaking landscapes and Maori culture." },
  ];

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: colors.bg,
        color: colors.text,
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.2rem 2rem",
          borderBottom: "1px solid #eee",
          position: "sticky",
          top: 0,
          backgroundColor: colors.bg,
          zIndex: 10,
        }}
      >
        <h1 style={{ fontSize: "2rem", color: colors.green, margin: 0 }}>
          Where Next
        </h1>
        <button
          onClick={() => navigate(-1)}
          style={{
            backgroundColor: colors.yellow,
            border: "none",
            borderRadius: "10px",
            padding: "0.7rem 1.2rem",
            cursor: "pointer",
            fontWeight: "600",
            color: colors.white,
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = colors.yellowHover)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = colors.yellow)}
        >
          Back
        </button>
      </div>

      {/* Main Layout */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: "2rem",
          padding: "2rem",
          alignItems: "flex-start",
        }}
      >
        {/* Sidebar */}
        <aside
          style={{
            width: isMobile ? "100%" : "300px",
            flexShrink: 0,
            backgroundColor: colors.white,
            borderRadius: "16px",
            padding: "1.5rem",
            boxShadow: colors.cardShadow,
          }}
        >
          <div style={{ marginBottom: "1rem" }}>
            <img
              src="https://via.placeholder.com/120"
              alt="Traveler"
              style={{ width: "100%", borderRadius: "12px", objectFit: "cover" }}
            />
          </div>
          <h2 style={{ color: colors.green, marginBottom: "0.5rem" }}>{traveler.name}</h2>
          <p style={{ color: "#444", lineHeight: 1.5 }}>{traveler.bio}</p>

          {/* Travel Essentials */}
          <div style={{ marginTop: "1.5rem" }}>
            <h3 style={{ color: colors.brown, marginBottom: "0.5rem" }}>Travel Essentials</h3>
            <ul style={{ paddingLeft: "1.2rem", color: "#555" }}>
              <li>Always pack light</li>
              <li>Check visa requirements</li>
              <li>Travel insurance recommended</li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, minWidth: 0 }}>
          {traveler.journeys.map((trip, i) => (
            <div
              key={i}
              style={{
                backgroundColor: colors.white,
                borderRadius: "16px",
                boxShadow: colors.cardShadow,
                padding: "1.5rem",
                marginBottom: "2rem",
              }}
            >
              <h2 style={{ color: colors.green }}>{trip.country}</h2>
              <p style={{ color: "#444" }}>{trip.description}</p>

              {/* Tags */}
              <div style={{ margin: "0.5rem 0" }}>
                {trip.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    style={{
                      display: "inline-block",
                      backgroundColor: "#e0f2f1",
                      color: colors.green,
                      borderRadius: "12px",
                      padding: "0.2rem 0.6rem",
                      marginRight: "0.4rem",
                      fontSize: "0.8rem",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Video */}
              <div style={{ marginTop: "1rem" }}>
                <iframe
                  width="100%"
                  height={isMobile ? "200" : "315"}
                  src={trip.videoUrl}
                  title={`${trip.country} travel video`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ borderRadius: "12px" }}
                ></iframe>
              </div>
            </div>
          ))}

          {/* Related Trips */}
          <section style={{ marginTop: "2rem" }}>
            <h2 style={{ color: colors.green, marginBottom: "1rem" }}>Related Trips</h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "1.2rem",
              }}
            >
              {relatedTrips.map((trip, idx) => (
                <div
                  key={idx}
                  onClick={() => alert(`Would navigate to ${trip.country} blog`)}
                  style={{
                    cursor: "pointer",
                    backgroundColor: colors.white,
                    borderRadius: "12px",
                    padding: "1rem",
                    border: "1px solid #eee",
                    boxShadow: colors.cardShadow,
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = colors.cardShadow;
                  }}
                >
                  <h3 style={{ margin: "0 0 0.5rem 0", color: colors.brown }}>{trip.country}</h3>
                  <p style={{ margin: 0, color: "#444", fontSize: "0.9rem" }}>
                    {trip.preview}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default BlogPage;



