// src/pages/BlogPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// IMPORTANT: path assumes this file is in src/pages and blogs.js is in src/data
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

  // Debug logs to help you find issues in the browser console
  useEffect(() => {
    console.log("BlogPage loaded — blogId (from URL):", blogId);
    console.log("blogs object (keys):", Object.keys(blogs || {}));
    // show the actual resolved blog (or undefined)
    console.log("resolved blog:", blogs ? blogs[blogId] : undefined);
  }, [blogId]);

  const traveler = blogs ? blogs[blogId] : undefined;

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

  // If no blog found — show friendly UI and avoid blank screen
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
          <p style={{ color: "#444" }}>
            We couldn't find a blog with id <strong>{blogId}</strong>.
            <br />
            Possible reasons:
          </p>
          <ul style={{ textAlign: "left", margin: "1rem auto", color: "#555" }}>
            <li>The route is missing the id (URL should be <code>/blog/1</code>).</li>
            <li>The `blogs.js` file isn't in <code>src/data/blogs.js</code> or not exported properly.</li>
            <li>The blog id does not exist in the data object yet.</li>
          </ul>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 12 }}>
            <button
              onClick={() => navigate(-1)}
              style={{
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
            <button
              onClick={() => navigate("/profile")}
              style={{
                padding: "0.6rem 1rem",
                borderRadius: 8,
                border: `1px solid ${colors.brown}`,
                background: "white",
                color: colors.text,
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Open Profile
            </button>
          </div>
          <p style={{ marginTop: 14, color: "#888", fontSize: 13 }}>
            Tip: open your browser DevTools (Console) to see logs about the problem.
          </p>
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
        <div>
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
      </div>

      {/* Content */}
      <div style={{ padding: 24, display: "flex", gap: 24, flexDirection: isMobile ? "column" : "row" }}>
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

        <main style={{ flex: 1 }}>
          {traveler.videos && traveler.videos.map((v, idx) => (
            <div key={idx} style={{ marginBottom: 18, background: colors.white, padding: 12, borderRadius: 10, boxShadow: colors.cardShadow }}>
              <h3 style={{ margin: 0, color: colors.brown }}>{v.title || `Video ${idx + 1}`}</h3>
              {/* If you used a full youtube embed url as `videoUrl`, use iframe. For the sample data we used thumbnails only. */}
              {v.videoUrl ? (
                <div style={{ marginTop: 8 }}>
                  <iframe
                    width="100%"
                    height={isMobile ? 200 : 315}
                    src={v.videoUrl}
                    title={v.title}
                    frameBorder="0"
                    allowFullScreen
                    style={{ borderRadius: 8 }}
                  />
                </div>
              ) : (
                <img src={v.thumbnail || "https://via.placeholder.com/800x450"} alt={v.title} style={{ width: "100%", borderRadius: 8, marginTop: 8 }} />
              )}
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default BlogPage;


