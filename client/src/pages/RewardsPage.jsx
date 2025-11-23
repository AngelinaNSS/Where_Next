import React from "react";

const RewardsPage = () => {
  const progress = 45; // example % — you can replace this with real data later

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
      <h1 style={{ fontSize: "2.3rem", color: "#2a2a2a" }}>Your Rewards</h1>

      <p style={{ color: "#555", marginTop: "10px", fontSize: "1.1rem" }}>
        Track your travel progress and unlock achievements.
      </p>

      {/* Progress Bar */}
      <div
        style={{
          marginTop: "30px",
          width: "100%",
          height: "20px",
          background: "#ddd",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "#2ecc71",
          }}
        />
      </div>

      <h2 style={{ marginTop: "40px", color: "#2a2a2a" }}>Badges</h2>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "20px",
        }}
      >
        <div
          style={{
            width: "120px",
            height: "120px",
            backgroundColor: "#fff",
            borderRadius: "16px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "600",
            color: "#2ecc71",
          }}
        >
          🌍 Traveller
        </div>

        <div
          style={{
            width: "120px",
            height: "120px",
            backgroundColor: "#fff",
            borderRadius: "16px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "600",
            color: "#3498db",
          }}
        >
          ✈️ Explorer
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;
