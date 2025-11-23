import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer
      style={{
        width: "100%",
        backgroundColor: "#007f5f",
        color: "#fff",
        padding: "1rem 0",
        position: "fixed",
        bottom: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        gap: "2rem",
        fontFamily: "'Poppins', sans-serif",
        zIndex: 1000,
      }}
    >
      <span
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/about")}
      >
        About Us
      </span>
      <span
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/settings")}
      >
        Settings
      </span>
    </footer>
  );
};

export default Footer;
