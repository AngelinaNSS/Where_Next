import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "Poppins, sans-serif",
        backgroundColor: "#f8f8f8",
      }}
    >
      <h1 style={{ fontSize: "2.3rem", color: "#2a2a2a" }}>
        Welcome to Where Next?
      </h1>

      <p style={{ marginTop: "10px", fontSize: "1.1rem", color: "#555" }}>
        Explore destinations, track your travels, and discover something new.
      </p>

      <button
        onClick={() => navigate("/profile")}
        style={{
          marginTop: "30px",
          padding: "15px 25px",
          backgroundColor: "#2ecc71",
          border: "none",
          borderRadius: "12px",
          color: "white",
          fontSize: "1.1rem",
          cursor: "pointer",
        }}
      >
        Go to Profile
      </button>
    </div>
  );
};

export default HomePage;

