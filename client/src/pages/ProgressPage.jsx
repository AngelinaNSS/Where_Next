// src/pages/ProgressPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

const initialVisitedCountries = [
  { name: "Japan", date: "Apr 2024", notes: "Cherry blossoms in Kyoto 🌸", flag: "🇯🇵" },
  { name: "Spain", date: "Mar 2024", notes: "Tapas in Barcelona! 😋", flag: "🇪🇸" },
  { name: "Canada", date: "Jan 2024", notes: "Skiing in Banff 🏔️", flag: "🇨🇦" },
  { name: "Kenya", date: "Feb 2024", notes: "Safari adventure 🐘", flag: "🇰🇪" },
];

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
  { name: "South Korea", row: 5, col: 14, flag: "🇰🇷" },
  { name: "Australia", row: 9, col: 15, flag: "🇦🇺" },
  { name: "New Zealand", row: 9, col: 16, flag: "🇳🇿" },
  { name: "Thailand", row: 6, col: 12, flag: "🇹🇭" },
  { name: "Kenya", row: 7, col: 6, flag: "🇰🇪" },
  { name: "Norway", row: 1, col: 9, flag: "🇳🇴" },
  { name: "Sweden", row: 0, col: 9, flag: "🇸🇪" },
  { name: "Finland", row: 0, col: 10, flag: "🇫🇮" },
  { name: "Denmark", row: 1, col: 8, flag: "🇩🇰" },
  { name: "Poland", row: 2, col: 9, flag: "🇵🇱" },
  { name: "Netherlands", row: 2, col: 6, flag: "🇳🇱" },
  { name: "Belgium", row: 2, col: 5, flag: "🇧🇪" },
  { name: "Switzerland", row: 3, col: 8, flag: "🇨🇭" },
  { name: "Austria", row: 3, col: 9, flag: "🇦🇹" },
  { name: "Portugal", row: 3, col: 6, flag: "🇵🇹" },
  { name: "Ireland", row: 1, col: 6, flag: "🇮🇪" },
  { name: "Greece", row: 4, col: 9, flag: "🇬🇷" },
  { name: "Turkey", row: 4, col: 10, flag: "🇹🇷" },
  { name: "Israel", row: 4, col: 7, flag: "🇮🇱" },
  { name: "Saudi Arabia", row: 5, col: 7, flag: "🇸🇦" },
  { name: "UAE", row: 5, col: 8, flag: "🇦🇪" },
  { name: "Pakistan", row: 5, col: 10, flag: "🇵🇰" },
  { name: "Bangladesh", row: 6, col: 11, flag: "🇧🇩" },
  { name: "Sri Lanka", row: 6, col: 13, flag: "🇱🇰" },
  { name: "Vietnam", row: 6, col: 13, flag: "🇻🇳" },
  { name: "Malaysia", row: 7, col: 12, flag: "🇲🇾" },
  { name: "Singapore", row: 7, col: 13, flag: "🇸🇬" },
  { name: "Indonesia", row: 8, col: 13, flag: "🇮🇩" },
  { name: "Philippines", row: 7, col: 14, flag: "🇵🇭" },
  { name: "Nepal", row: 5, col: 12, flag: "🇳🇵" },
  { name: "Bhutan", row: 5, col: 13, flag: "🇧🇹" },
  { name: "Kazakhstan", row: 3, col: 12, flag: "🇰🇿" },
  { name: "Ukraine", row: 2, col: 11, flag: "🇺🇦" },
  { name: "Belarus", row: 2, col: 10, flag: "🇧🇾" },
  { name: "Czech Republic", row: 3, col: 10, flag: "🇨🇿" },
  { name: "Slovakia", row: 3, col: 11, flag: "🇸🇰" },
  { name: "Hungary", row: 3, col: 12, flag: "🇭🇺" },
  { name: "Romania", row: 4, col: 11, flag: "🇷🇴" },
  { name: "Bulgaria", row: 4, col: 12, flag: "🇧🇬" },
  { name: "Morocco", row: 6, col: 5, flag: "🇲🇦" },
  { name: "Algeria", row: 5, col: 6, flag: "🇩🇿" },
  { name: "Tunisia", row: 5, col: 5, flag: "🇹🇳" },
  { name: "Chile", row: 8, col: 5, flag: "🇨🇱" },
  { name: "Colombia", row: 4, col: 5, flag: "🇨🇴" },
  { name: "Peru", row: 6, col: 5, flag: "🇵🇪" },
  { name: "Venezuela", row: 4, col: 4, flag: "🇻🇪" },
  { name: "Iceland", row: 0, col: 11, flag: "🇮🇸" },
  { name: "Cuba", row: 3, col: 3, flag: "🇨🇺" },
  { name: "Jamaica", row: 4, col: 3, flag: "🇯🇲" },
  { name: "Dominican Republic", row: 4, col: 4, flag: "🇩🇴" },
  { name: "Costa Rica", row: 5, col: 3, flag: "🇨🇷" },
  { name: "Panama", row: 5, col: 4, flag: "🇵🇦" },
  { name: "Honduras", row: 5, col: 2, flag: "🇭🇳" },
  { name: "Guatemala", row: 4, col: 2, flag: "🇬🇹" },
  { name: "Ecuador", row: 6, col: 4, flag: "🇪🇨" },
  { name: "Paraguay", row: 7, col: 5, flag: "🇵🇾" },
  { name: "Uruguay", row: 7, col: 6, flag: "🇺🇾" },
  { name: "Laos", row: 7, col: 11, flag: "🇱🇦" },
  { name: "Cambodia", row: 7, col: 12, flag: "🇰🇭" },
  { name: "Taiwan", row: 6, col: 14, flag: "🇹🇼" },
  { name: "Mongolia", row: 3, col: 13, flag: "🇲🇳" },
  { name: "Syria", row: 4, col: 8, flag: "🇸🇾" },
  { name: "Iraq", row: 4, col: 9, flag: "🇮🇶" },
];

const rows = 10;
const cols = 20;

const badges = [
  { name: "Explorer 🌎", threshold: 5, unlocked: false },
  { name: "Globetrotter ✈️", threshold: 10, unlocked: false },
  { name: "World Collector 🏆", threshold: 15, unlocked: false },
];

const ProgressPage = () => {
  const navigate = useNavigate();
  const [visitedCountries, setVisitedCountries] = useState(initialVisitedCountries);
  const [newCountry, setNewCountry] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const progressPercent = Math.round((visitedCountries.length / 195) * 100);

  
  const handleAddCountry = () => {
    const countryData = countryMap.find(
      (c) => c.name.toLowerCase() === newCountry.trim().toLowerCase()
    );

    if (!countryData) return alert("Country not found on map!");
    if (visitedCountries.find((c) => c.name === countryData.name))
      return alert("Country already added!");

    setVisitedCountries([
      ...visitedCountries,
      { name: countryData.name, date: new Date().toLocaleDateString(), notes: "", flag: countryData.flag },
    ]);
    setNewCountry("");
  };

  
  const updateNotes = (text) => {
    <textarea
  value={selectedCountry.notes || ""}
  onChange={(e) => updateNotes(e.target.value)}
  placeholder="Write your memories here..."
  style={{
    width: "100%",
    minHeight: "80px",
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginTop: "12px",
  }}
/>

    setVisitedCountries((prev) =>
      prev.map((c) =>
        c.name === selectedCountry.name ? { ...c, notes: text } : c
      )
    );
    setSelectedCountry((prev) => ({ ...prev, notes: text }));
  };

  // badges
  useEffect(() => {
    const unlocked = badges.map((b) => ({
      ...b,
      unlocked: visitedCountries.length >= b.threshold,
    }));
    const anyNew = unlocked.some((b, i) => b.unlocked && !badges[i].unlocked);
    if (anyNew) setShowConfetti(true);
  }, [visitedCountries]);

  // map grid
  const grid = Array.from({ length: rows }, () => Array(cols).fill(null));
  countryMap.forEach((c) => {
    if (c.row < rows && c.col < cols) grid[c.row][c.col] = c;
  });

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(135deg, #eef2ff, #f7f9fc)",
        display: "flex",
        justifyContent: "center",
        padding: "40px 20px",
        boxSizing: "border-box",
      }}
    >
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          background: "#fff",
          borderRadius: "16px",
          padding: "40px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
        }}
      >
        {/* Back Button */}
        <button
          onClick={() => navigate("/profile")}
          style={{
            background: "#eee",
            padding: "10px 18px",
            borderRadius: "10px",
            border: "none",
            marginBottom: "30px",
            cursor: "pointer",
          }}
        >
          ← Back to Profile
        </button>

        {/* Title */}
        <h1 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "10px" }}>
          🌍 Travel Progress
        </h1>
        <p style={{ textAlign: "center", color: "#555", marginBottom: "30px" }}>
          Click a country to view or edit your travel journal entries!
        </p>

        {/* Add Country */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>
          <input
            type="text"
            placeholder="Enter country name"
            value={newCountry}
            onChange={(e) => setNewCountry(e.target.value)}
            style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
          />
          <button
            onClick={handleAddCountry}
            style={{ background: "#5170ff", color: "#fff", padding: "10px 16px", borderRadius: "8px", border: "none", cursor: "pointer" }}
          >
            Add
          </button>
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: "30px" }}>
          <p style={{ textAlign: "center", marginBottom: "12px" }}>
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

        {/* Interactive Map Grid */}
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "4px", marginBottom: "30px" }}>
          {grid.flat().map((cell, idx) => {
            if (!cell) return <div key={idx} style={{ width: "100%", paddingBottom: "100%" }} />;
            const visited = visitedCountries.some((c) => c.name === cell.name);
            return (
              <div
                key={idx}
                title={cell.name}
                onClick={() => visited && setSelectedCountry(visitedCountries.find((c) => c.name === cell.name))}
                style={{
                  width: "100%",
                  paddingBottom: "100%",
                  background: visited ? "#5170ff" : "#e0e6f5",
                  borderRadius: "4px",
                  cursor: visited ? "pointer" : "default",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => (visited ? (e.currentTarget.style.transform = "translateY(-2px)") : null)}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              />
            );
          })}
        </div>

        {/* Country Cards */}
        {visitedCountries.map((c) => (
          <div
            key={c.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 18px",
              background: "#f0f4ff",
              borderRadius: "12px",
              marginBottom: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            }}
          >
            <span style={{ fontSize: "24px" }}>{c.flag}</span>
            <div>
              <h4 style={{ margin: 0 }}>{c.name}</h4>
              <small style={{ color: "#555" }}>{c.date}</small>
              {c.notes && <p style={{ margin: 0, fontSize: "0.9rem" }}>📝 {c.notes}</p>}
            </div>
          </div>
        ))}

        {/* Country Journal Modal */}
        {selectedCountry && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
          >
            <div style={{ background: "#fff", padding: "30px", borderRadius: "16px", maxWidth: "400px", width: "90%" }}>
              <h3>{selectedCountry.name} {selectedCountry.flag}</h3>
              <p style={{ fontSize: "0.9rem", color: "#555" }}>Visited: {selectedCountry.date}</p>
              <textarea
                value={selectedCountry.notes}
                onChange={(e) => updateNotes(e.target.value)}
                placeholder="Write your memories here..."
                style={{ width: "100%", minHeight: "80px", padding: "8px", borderRadius: "8px", border: "1px solid #ccc", marginTop: "12px" }}
              />
              <button
                onClick={() => setSelectedCountry(null)}
                style={{ marginTop: "15px", padding: "10px 18px", borderRadius: "8px", border: "none", cursor: "pointer", background: "#5170ff", color: "#fff" }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressPage;


