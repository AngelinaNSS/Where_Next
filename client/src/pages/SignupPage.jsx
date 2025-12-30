import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    // API call for signup
    navigate("/profile");
  };

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #eef2f5, #ffffff)",
        padding: "2rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "rgba(245, 245, 245, 0.95)",
          padding: "3rem",
          borderRadius: "24px",
          boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
          backdropFilter: "blur(12px)",
          textAlign: "center",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {/* Logo / Branding */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h2
            style={{
              fontSize: "1.8rem",
              fontWeight: "700",
              color: "#3ac7d8",
            }}
          >
            Where Next
          </h2>
        </div>

        {/* Title */}
        <h1
          style={{
            marginBottom: "2rem",
            fontSize: "2rem",
            fontWeight: "700",
            background: "linear-gradient(90deg, #3ac7d8, #6ee7e0)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Create Your Account
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSignup}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <label
            style={{
              textAlign: "left",
              fontSize: "0.95rem",
              fontWeight: 500,
              color: "#333",
            }}
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "1rem",
              borderRadius: "14px",
              border: "1px solid #ccc",
              backgroundColor: "#fff",
              fontSize: "1rem",
              outline: "none",
              boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
              transition: "border 0.2s, box-shadow 0.2s",
            }}
            onFocus={(e) => {
              e.target.style.border = "1px solid #3ac7d8";
              e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
            }}
            onBlur={(e) => {
              e.target.style.border = "1px solid #ccc";
              e.target.style.boxShadow = "0 2px 5px rgba(0,0,0,0.05)";
            }}
          />

          <label
            style={{
              textAlign: "left",
              fontSize: "0.95rem",
              fontWeight: 500,
              color: "#333",
            }}
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "1rem",
              borderRadius: "14px",
              border: "1px solid #ccc",
              backgroundColor: "#fff",
              fontSize: "1rem",
              outline: "none",
              boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
              transition: "border 0.2s, box-shadow 0.2s",
            }}
            onFocus={(e) => {
              e.target.style.border = "1px solid #3ac7d8";
              e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
            }}
            onBlur={(e) => {
              e.target.style.border = "1px solid #ccc";
              e.target.style.boxShadow = "0 2px 5px rgba(0,0,0,0.05)";
            }}
          />

          {/* Done / Signup Button */}
          <button
            type="submit"
            style={{
              padding: "1rem",
              borderRadius: "14px",
              border: "none",
              background: "linear-gradient(135deg, #3ac7d8, #6ee7e0)",
              color: "#fff",
              fontWeight: "600",
              fontSize: "1.1rem",
              cursor: "pointer",
              boxShadow: "0 5px 12px rgba(0,0,0,0.15)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.03)";
              e.target.style.boxShadow = "0 8px 18px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0 5px 12px rgba(0,0,0,0.15)";
            }}
          >
            Done
          </button>

          {/* Terms / Privacy */}
          <p style={{ fontSize: "0.8rem", color: "#666", marginTop: "0.5rem" }}>
            By creating an account, you agree to our{" "}
            <span
              style={{ color: "#3ac7d8", cursor: "pointer" }}
              onClick={() => alert("Show Terms/Privacy")}
            >
              Terms & Privacy
            </span>
            .
          </p>
        </form>

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "2rem",
            padding: "0.8rem 1.5rem",
            borderRadius: "14px",
            border: "none",
            background: "#e3e3e3",
            fontSize: "1rem",
            color: "#444",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#d6d6d6")}
          onMouseLeave={(e) => (e.target.style.background = "#e3e3e3")}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default SignupPage;











