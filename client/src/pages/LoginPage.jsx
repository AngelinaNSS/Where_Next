import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // later we’ll connect this to backend authentication
    navigate("/profile"); // temporary: go to Profile page after login
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f3f3",
      }}
    >
      <h1 style={{ marginBottom: "2rem" }}>Login</h1>
      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "300px",
        }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "0.8rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "0.8rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.8rem",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#00cfff",
            color: "#000",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Log In
        </button>
      </form>

      {/* Back Button */}
      <button
        onClick={() => navigate("/auth")}
        style={{
          marginTop: "2rem",
          padding: "0.8rem 1.5rem",
          fontSize: "1rem",
          borderRadius: "10px",
          border: "none",
          backgroundColor: "#888",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Back
      </button>
    </div>
  );
};

export default LoginPage;
