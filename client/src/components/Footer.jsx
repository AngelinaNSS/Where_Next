import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100vw",
        backgroundColor: "#66c2daff",
        color: "#fff",
        padding: "0.6rem 0",
        display: "flex",
        justifyContent: "center",
        fontFamily: "'Poppins', sans-serif",
        zIndex: 200,
        fontSize: "0.9rem",
        overflow: "hidden",        // ⬅ prevents stretching
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "2rem",
          maxWidth: "500px",       // ⬅ CONTENT will never stretch the footer
          width: "100%",
          justifyContent: "center",
        }}
      >
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/about")}>
          About Us
        </span>
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/settings")}>
          Settings
        </span>
      </div>
    </footer>
  );
};

export default Footer;

