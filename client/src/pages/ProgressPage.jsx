import React from "react";
import { useNavigate } from "react-router-dom";

const ProgressPage = () => {
  const navigate = useNavigate();

  // Temporary progress data – replace later with real data
  const visitedCountries = [
    { name: "Japan", date: "2024-01-12", flag: "🇯🇵" },
    { name: "Spain", date: "2024-03-02", flag: "🇪🇸" },
    { name: "Canada", date: "2024-06-17", flag: "🇨🇦" },
  ];

  const totalCountries = 195; // world countries
  const progressPercent = Math.round(
    (visitedCountries.length / totalCountries) * 100
  );

  // Small reusable card component
  const CountryCard = ({ name, date, flag }) => (
    <div
      style={{
        background: "#f0f4ff",
        padding: "15px",
        borderRadius: "10px",
        marginBottom: "12px",
        borderLeft: "5px solid #5170ff",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <span style={{ fontSize: "24px" }}>{flag}</span>
      <div>
        <h3 style={{ margin: 0 }}>{name}</h3>
        <p style={{ margin: "4px 0", color: "#444" }}>Visited on: {date}</p>
      </div>
    </div>
  );

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "40px",
        background: "#f7f9fc",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: "700px",
          background: "white",
          padding: "30px",
          borderRadius: "14px",
          boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
        }}
      >
        {/* Back Button */}
        <button
          onClick={() => navigate("/profile")}
          style={{
            background: "#eee",
            padding: "8px 16px",
            borderRadius: "8px",
            border: "none",
            marginBottom: "20px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          ← Back to Profile
        </button>

        <h1 style={{ textAlign: "center", marginBottom: "25px" }}>
          🌍 Your Travel Progress
        </h1>

        <p style={{ textAlign: "center", color: "#555" }}>
          Here's a quick look at the countries you've explored and when you
          visited them!
        </p>

        {/* Progress Bar */}
        <div style={{ marginTop: "20px", marginBottom: "30px" }}>
          <p style={{ textAlign: "center", marginBottom: "8px", color: "#333" }}>
            {visitedCountries.length} / {totalCountries} countries visited (
            {progressPercent}%)
          </p>
          <div
            style={{
              width: "100%",
              height: "14px",
              background: "#e0e6f5",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: "100%",
                background: "#5170ff",
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>

        {/* Country List */}
        <div>
          {visitedCountries.length === 0 ? (
            <p style={{ textAlign: "center", color: "#777" }}>
              You haven't added any visited countries yet.
            </p>
          ) : (
            visitedCountries.map((item, index) => (
              <CountryCard
                key={index}
                name={item.name}
                date={item.date}
                flag={item.flag}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;


