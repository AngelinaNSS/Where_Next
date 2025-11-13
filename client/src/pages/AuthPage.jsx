import React from "react";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "1.5rem",
      }}
    >
      <h1>Welcome Traveler! </h1>

      {/* Signup Button */}
      <button
        style={{
          marginTop: "1.5rem",
          padding: "0.8rem 1.5rem",
          fontSize: "1.2rem",
          borderRadius: "10px",
          border: "none",
          backgroundColor: "#00cfff",
          color: "#000",
          cursor: "pointer",
        }}
        onClick={() => navigate("/signup")}
      >
        Signup
      </button>

      {/* Login Button */}
      <button
        style={{
          marginTop: "1rem",
          padding: "0.8rem 1.5rem",
          fontSize: "1.2rem",
          borderRadius: "10px",
          border: "none",
          backgroundColor: "#00cfff",
          color: "#000",
          cursor: "pointer",
        }}
        onClick={() => navigate("/login")}
      >
        Login
      </button>

      {/* Back Button */}
      <button
        style={{
          marginTop: "2rem",
          padding: "0.8rem 1.5rem",
          fontSize: "1.2rem",
          borderRadius: "10px",
          border: "none",
          backgroundColor: "#888",
          color: "#fff",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        Back
      </button>
    </div>
  );
};

export default AuthPage;

