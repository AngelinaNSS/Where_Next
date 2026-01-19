import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const TripCountdownPage = () => {
  const [country, setCountry] = useState("");
  const [tripDate, setTripDate] = useState("");
  const [countdown, setCountdown] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    if (!tripDate) {
      setCountdown("");
      return;
    }

    const interval = setInterval(() => {
      const now = new Date();
      const target = new Date(tripDate);
      const diff = target - now;

      if (diff <= 0) {
        setCountdown("🎉 It’s time!");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setCountdown(
        `${days}d ${hours}h ${minutes}m ${seconds}s`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [tripDate]);

  return (
    <div
      style={{
        height: "100vh",
         width: "100vw",
        background: "linear-gradient(180deg, #c2f7f7 0%, #a1e0f0 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center", 
        padding: "2rem",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: "24px",
          padding: "2.5rem",
          width: "100%",
          maxWidth: "500px",
          boxShadow: "0 30px 80px rgba(0, 120, 255, 0.15)",
          textAlign: "center",
        }}
      >
        {/* Back to Profile */}
<div style={{ textAlign: "left", marginBottom: "1rem" }}>
  <button
    onClick={() => navigate("/profile")}
    style={{
      background: "#e6f4ff",
      color: "#2b6cb0",
      border: "none",
      padding: "0.35rem 0.8rem",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "0.85rem",
      boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
    }}
  >
    ← Back 
  </button>
</div>




        <h1 style={{ marginBottom: "0.5rem", color: "#2b6cb0" }}>
          ✈️ Trip Countdown
        </h1>
        <p style={{ color: "#555", marginBottom: "1.5rem" }}>
          Where are you going?
        </p>

        {/* Country input */}
        <input
          type="text"
          placeholder="Enter country..."
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          style={{
            width: "100%",
            padding: "0.9rem",
            borderRadius: "12px",
            border: "1px solid #cfe5ff",
            marginBottom: "1rem",
            fontSize: "1rem",
          }}
        />

        {/* Date input */}
        <input
          type="date"
          value={tripDate}
          onChange={(e) => setTripDate(e.target.value)}
          style={{
            width: "100%",
            padding: "0.9rem",
            borderRadius: "12px",
            border: "1px solid #cfe5ff",
            marginBottom: "1.5rem",
            fontSize: "1rem",
          }}
        />

        {/* Countdown */}
        {countdown && (
          <div
            style={{
              fontSize: "2rem",
              fontWeight: "800",
              color: "#1a4fd8",
              marginTop: "1rem",
              letterSpacing: "1px",
            }}
          >
            {countdown}

            {/* Let’s Organize Button */}
{country.trim() !== "" && tripDate && (
  <button
    onClick={() =>
      navigate("/organize", {
        state: { country, tripDate,}
        
        ,})
    }
    style={{
      marginTop: "2rem",
      width: "100%",
      padding: "1rem",
      fontSize: "1.1rem",
      fontWeight: "700",
      borderRadius: "14px",
      border: "none",
      cursor: "pointer",
      background: "linear-gradient(90deg, #4facfe, #00f2fe)",
      color: "#fff",
      boxShadow: "0 15px 40px rgba(0, 140, 255, 0.35)",
    }}
  >
    Let’s plan your trip ✨
  </button>
)}


          </div>
        )}
      </div>
    </div>
  );
};

export default TripCountdownPage;
