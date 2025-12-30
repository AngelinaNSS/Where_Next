import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/profile");
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #fee3f0, #c1eff2, #ffffff)",
        padding: "1rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "380px",
          background: "rgba(255, 255, 255, 0.85)",
          padding: "2.5rem",
          borderRadius: "22px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
          backdropFilter: "blur(10px)",
          textAlign: "center",
        }}
      >
        {/* Title */}
        <h1
          style={{
            marginBottom: "1.5rem",
            fontSize: "2rem",
            fontWeight: "700",
            background: "linear-gradient(90deg, #3ac7d8, #6ee7e0)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Welcome Back
        </h1>

        {/* Form */}
        <form
          onSubmit={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "0.9rem",
              borderRadius: "14px",
              border: "1px solid #d5d5d5",
              backgroundColor: "#fff",
              fontSize: "1rem",
              outline: "none",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "0.9rem",
              borderRadius: "14px",
              border: "1px solid #d5d5d5",
              backgroundColor: "#fff",
              fontSize: "1rem",
              outline: "none",
            }}
          />

          {/* Login Button */}
          <button
            type="submit"
            style={{
              padding: "0.9rem",
              borderRadius: "14px",
              border: "none",
              background: "linear-gradient(135deg, #8be3ff, #f9bddb)",
              color: "#fff",
              fontWeight: "600",
              fontSize: "1.1rem",
              cursor: "pointer",
              boxShadow: "0 5px 12px rgba(0,0,0,0.15)",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            Log In
          </button>
      

        {/* Signup */}
<button
  type="button" // <-- important!
  style={{
    padding: "0.9rem",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(135deg, #8be3ff, #f9bddb)",
    color: "#fff",
    fontWeight: "600",
    fontSize: "1.1rem",
    cursor: "pointer",
    boxShadow: "0 5px 12px rgba(0,0,0,0.15)",
    transition: "transform 0.2s ease",
  }}
  onClick={() => navigate("/signup")} // <-- navigates to signup page
  onMouseEnter={(e) => (e.target.style.transform = "scale(1.03)")}
  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
>
  Don't have an account?
</button>
</form>

        {/* Back Button */}
        <button
  onClick={() => navigate("/")}
  style={{
    marginTop: "1.8rem",
    padding: "0.7rem 1.4rem",
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

export default LoginPage;


