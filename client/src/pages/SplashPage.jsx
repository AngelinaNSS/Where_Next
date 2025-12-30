import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SplashPage = () => {
  const navigate = useNavigate();

  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        background: "linear-gradient(135deg, #fee3f0, #c1eff2, #ffffff)",
      }}
    >
      {/* Main Content */}
      <div
        style={{
          opacity: showContent ? 1 : 0,
          transform: showContent ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s ease",
          textAlign: "center",
          padding: "1rem",
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontSize: "3.8rem",
            fontWeight: 700,
            background: "linear-gradient(90deg, #3ac7d8, #6ee7e0)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            marginBottom: "0.4rem",
          }}
        >
          Where Next?
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "1.3rem",
            color: "#6c7a7a",
            marginBottom: "2.5rem",
          }}
        >
          Discover your next adventure
        </p>


        {/* Let's Go Button */}
        <button
          onClick={() => navigate("/auth")}
          style={{
            padding: "0.9rem 2.2rem",
            fontSize: "1.3rem",
            borderRadius: "30px",
            border: "none",
            background: "linear-gradient(135deg, #8be3ff, #f9bddb)",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          Let’s Go
        </button>
      </div>

      {/* Decorative Floating Clouds */}
      <div style={cloudStyle(10, -20, 18)} />
      <div style={cloudStyle(70, -10, 22)} />
      <div style={cloudStyle(40, 80, 15)} />

      <style>
        {`
          @keyframes floatCloud {
            0% { transform: translateX(0px); }
            50% { transform: translateX(25px); }
            100% { transform: translateX(0px); }
          }
        `}
      </style>
    </div>
  );
};

/* cloud generator */
const cloudStyle = (top, left, size) => ({
  position: "absolute",
  top: `${top}%`,
  left: `${left}%`,
  width: `${size}vmin`,
  height: `${size}vmin`,
  background: "rgba(255,255,255,0.8)",
  borderRadius: "50px",
  filter: "blur(12px)",
  animation: "floatCloud 8s ease-in-out infinite",
});

export default SplashPage;




