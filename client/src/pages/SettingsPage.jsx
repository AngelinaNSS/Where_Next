import React, { useState } from "react";

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

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
      <h1 style={{ fontSize: "2.3rem", color: "#2a2a2a" }}>Settings</h1>

      {/* Setting Item */}
      <div
        style={{
          marginTop: "30px",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "16px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
        }}
      >
        <h3 style={{ marginBottom: "20px", color: "#2a2a2a" }}>Preferences</h3>

        {/* Notifications toggle */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "15px",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "1.1rem" }}>Enable Notifications</span>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            style={{ width: "20px", height: "20px" }}
          />
        </div>

        {/* Dark Mode toggle */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "1.1rem" }}>Dark Mode</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            style={{ width: "20px", height: "20px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
