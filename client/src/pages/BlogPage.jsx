// src/pages/BlogPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import blogs from "../data/blogs";

const BlogPage = () => {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const traveler = blogs ? blogs[blogId] : undefined;

  const colors = {
    bg: "#f9f7f3",
    text: "#2c2c2c",
    white: "#ffffff",
    green: "#007f5f",
    yellow: "#FFB400",
    brown: "#d4a373",
    cardShadow: "0 4px 12px rgba(0,0,0,0.1)",
  };

  if (!traveler) {
    return (
      <div
        style={{
          width: "100vw",
          minHeight: "100vh",
          backgroundColor: colors.bg,
          color: colors.text,
          fontFamily: "'Poppins', sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 720 }}>
          <h1 style={{ color: colors.green }}>Blog not found</h1>
          <button
            onClick={() => navigate(-1)}
            style={{
              marginTop: 12,
              padding: "0.6rem 1rem",
              borderRadius: 8,
              border: "none",
              backgroundColor: colors.yellow,
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

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
          }}
        >
          Back
        </button>
      </div>

      <div style={{ padding: 24, display: "flex", gap: 24, flexDirection: isMobile ? "column" : "row" }}>
        {/* Sidebar */}
        <aside
          style={{
            width: isMobile ? "100%" : 320,
            backgroundColor: colors.white,
            borderRadius: 12,
            padding: 16,
            boxShadow: colors.cardShadow,
            flexShrink: 0,
          }}
        >
          <img
            src={traveler.image || "https://via.placeholder.com/300x300"}
            alt={traveler.name}
            style={{ width: "100%", borderRadius: 10, objectFit: "cover", marginBottom: 12 }}
          />
          <h2 style={{ margin: 0, color: colors.green }}>{traveler.name}</h2>
          <p style={{ color: "#444" }}>{traveler.bio}</p>

          {traveler.tips && (
            <>
              <h4 style={{ marginTop: 12, color: colors.brown }}>Travel tips</h4>
              <ul style={{ paddingLeft: 18, color: "#555" }}>
                {traveler.tips.map((t, idx) => (
                  <li key={idx}>{t}</li>
                ))}
              </ul>
            </>
          )}
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1 }}>
          {/* Hero Image */}
          {traveler.heroImage && (
            <div style={{ width: "100%", maxHeight: 500, overflow: "hidden", marginBottom: 24 }}>
              <img
                src={traveler.heroImage}
                alt={traveler.name}
                style={{ width: "100%", objectFit: "cover" }}
              />
            </div>
          )}

          {/* Story */}
          {traveler.story && (
            <div
              style={{
                padding: 24,
                backgroundColor: "#fff",
                borderRadius: 12,
                boxShadow: colors.cardShadow,
                marginBottom: 24,
                lineHeight: 1.6,
              }}
            >
              {traveler.story.split("\n\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}

          {/* Sections */}
          {traveler.sections && traveler.sections.map((section, idx) => (
            <div
              key={idx}
              style={{
                padding: 24,
                backgroundColor: "#fff",
                marginBottom: 24,
                borderRadius: 12,
                boxShadow: colors.cardShadow,
              }}
            >
              <h3>{section.title}</h3>
              {section.image && (
                <img
                  src={section.image}
                  alt={section.title}
                  style={{ width: "100%", borderRadius: 10, margin: "12px 0" }}
                />
              )}
              <p>{section.text}</p>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default BlogPage;



