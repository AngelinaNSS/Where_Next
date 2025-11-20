// src/pages/ProgressPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProgressPage = () => {
  const navigate = useNavigate();

  // State for visited countries
  const [visitedCountries, setVisitedCountries] = useState([
    "Japan", "Spain", "Canada", "Kenya", "Brazil",
    "France", "Australia", "South Africa", "India", "Germany",
    "Italy", "Mexico", "Argentina", "Egypt", "Norway",
    "Thailand", "Russia", "New Zealand", "South Korea", "Nigeria"
  ]);

  const [newCountry, setNewCountry] = useState("");

  // Country map with rough positions (add missing Kenya, Norway)
  const countryMap = [
    { name: "Canada", row: 0, col: 2, flag: "🇨🇦" },
    { name: "USA", row: 1, col: 2, flag: "🇺🇸" },
    { name: "Mexico", row: 2, col: 2, flag: "🇲🇽" },
    { name: "Brazil", row: 5, col: 5, flag: "🇧🇷" },
    { name: "Argentina", row: 7, col: 5, flag: "🇦🇷" },
    { name: "UK", row: 1, col: 7, flag: "🇬🇧" },
    { name: "France", row: 2, col: 7, flag: "🇫🇷" },
    { name: "Germany", row: 2, col: 8, flag: "🇩🇪" },
    { name: "Spain", row: 3, col: 7, flag: "🇪🇸" },
    { name: "Italy", row: 3, col: 8, flag: "🇮🇹" },
    { name: "South Africa", row: 9, col: 6, flag: "🇿🇦" },
    { name: "Nigeria", row: 6, col: 6, flag: "🇳🇬" },
    { name: "Egypt", row: 4, col: 6, flag: "🇪🇬" },
    { name: "Russia", row: 1, col: 12, flag: "🇷🇺" },
    { name: "India", row: 5, col: 11, flag: "🇮🇳" },
    { name: "China", row: 5, col: 13, flag: "🇨🇳" },
    { name: "Japan", row: 4, col: 15, flag: "🇯🇵" },
    { name: "South Korea", row: 5, col: 14, flag: "🇰🇷" },
    { name: "Australia", row: 9, col: 15, flag: "🇦🇺" },
    { name: "New Zealand", row: 9, col: 16, flag: "🇳🇿" },
    { name: "Thailand", row: 6, col: 12, flag: "🇹🇭" },
    { name: "Kenya", row: 7, col: 6, flag: "🇰🇪" },
    { name: "Norway", row: 1, col: 9, flag: "🇳🇴" },
  ];

  const rows = 10;
  const cols = 20;

  // create grid and safely place markers
  const grid = Array.from({ length: rows }, () => Array(cols).fill(null));
  countryMap.forEach((c) => {
    if (Number.isInteger(c.row) && Number.isInteger(c.col) && c.row >= 0 && c.col >= 0 && c.row < rows && c.col < cols) {
      grid[c.row][c.col] = c;
    }
  });

  const progressPercent = Math.round((visitedCountries.length / 195) * 100);

  const CountryCard = ({ name, flag }) => (
    <div
      style={{
        background: "#f0f4ff",
        padding: "12px 18px",
        borderRadius: "12px",
        marginBottom: "12px",
        borderLeft: "5px solid #5170ff",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "default",
      }}
    >
      <span style={{ fontSize: "24px" }}>{flag}</span>
      <div>
        <h4 style={{ margin: 0 }}>{name}</h4>
      </div>
    </div>
  );

  const handleAddCountry = () => {
    const countryExists = countryMap.find(
      (c) => c.name.toLowerCase() === newCountry.trim().toLowerCase()
    );

    if (!countryExists) {
      alert("Country not found in the map!");
      return;
    }

    if (visitedCountries.includes(countryExists.name)) {
      alert("Country already added!");
      return;
    }

    setVisitedCountries([...visitedCountries, countryExists.name]);
    setNewCountry("");
  };

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "50px 20px",
        background: "linear-gradient(135deg, #eef2ff, #f7f9fc)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        style={{
          width: "95%",
          maxWidth: "900px",
          background: "white",
          padding: "40px 30px",
          borderRadius: "16px",
          boxShadow: "0 8px 28px rgba(0,0,0,0.12)",
        }}
      >
        <button
          onClick={() => navigate("/profile")}
          style={{
            background: "#eee",
            padding: "10px 18px",
            borderRadius: "10px",
            border: "none",
            marginBottom: "30px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          ← Back to Profile
        </button>

        <h1 style={{ textAlign: "center", marginBottom: "15px", fontSize: "2rem" }}>
          🌍 Your Travel Progress
        </h1>

        <p style={{ textAlign: "center", color: "#555", marginBottom: "30px", fontSize: "16px" }}>
          Interactive world map showing your visited countries! Add more below.
        </p>

        {/* Add country section */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "30px", justifyContent: "center" }}>
          <input
            type="text"
            placeholder="Enter country name"
            value={newCountry}
            onChange={(e) => setNewCountry(e.target.value)}
            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc", flex: 1 }}
          />
          <button
            onClick={handleAddCountry}
            style={{
              background: "#5170ff",
              color: "white",
              border: "none",
              padding: "10px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Add
          </button>
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: "40px" }}>
          <p style={{ textAlign: "center", marginBottom: "12px", fontWeight: "500", color: "#333" }}>
            {visitedCountries.length} / 195 countries visited ({progressPercent}%)
          </p>
          <div style={{ width: "100%", height: "18px", background: "#e0e6f5", borderRadius: "12px", overflow: "hidden" }}>
            <div
              style={{
                width: `${progressPercent}%`,
                height: "100%",
                background: "linear-gradient(90deg, #5170ff, #7fafff, #5170ff)",
                transition: "width 0.5s ease",
              }}
            />
          </div>
        </div>

        {/* Interactive World Grid */}
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "4px", marginBottom: "40px" }}>
          {grid.flat().map((cell, idx) => {
            if (!cell) return <div key={idx} style={{ width: "100%", paddingBottom: "100%" }} />;
            const visited = visitedCountries.includes(cell.name);
            return (
              <div
                key={idx}
                title={cell.name}
                style={{
                  width: "100%",
                  paddingBottom: "100%",
                  background: visited ? "#5170ff" : "#e0e6f5",
                  borderRadius: "4px",
                  transition: "background 0.3s, transform 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              />
            );
          })}
        </div>

        {/* Country Cards */}
        {visitedCountries.map((name) => {
          const country = countryMap.find((c) => c.name === name);
          return <CountryCard key={name} name={name} flag={country?.flag || "🏳️"} />;
        })}
      </div>
    </div>
  );
};

export default ProgressPage;

