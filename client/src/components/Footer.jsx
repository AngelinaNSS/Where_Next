import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer
  style={{
    width: "100%",
    backgroundColor: "#66c2daff",
    color: "#fff",
    padding: "0.5rem 0",
    position: "fixed",
    bottom: 0,
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "2rem",
    fontFamily: "'Poppins', sans-serif",
    zIndex: 200,
    fontSize: "0.9rem",
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
