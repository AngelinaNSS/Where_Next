import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // later we’ll connect this to backend signup
    navigate("/profile");
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
      <h1 style={{ marginBottom: "2rem" }}>Create an Account</h1>

      <form
        onSubmit={handleSignup}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "300px",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          style={{
            padding: "0.8rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={{
            padding: "0.8rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
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
          Sign Up
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

export default SignupPage;
