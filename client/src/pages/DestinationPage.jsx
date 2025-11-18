import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GiTreasureMap } from "react-icons/gi";

const DestinationPage = () => {
  const { countryName } = useParams();
  const [countryData, setCountryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive detection
  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth < 900);
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  // Fetch country info dynamically
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const name = countryName.charAt(0).toUpperCase() + countryName.slice(1);
        const res = await fetch(
          `https://restcountries.com/v3.1/name/${name}?fullText=true`
        );
        const data = await res.json();
        setCountryData(data[0]);
      } catch (err) {
        console.error(err);
        setCountryData({ error: true });
      } finally {
        setLoading(false);
      }
    };
    if (countryName) fetchCountry();
  }, [countryName]);

  // Mock data for now
  const mockHotels = [
    { name: "Backpackers Hostel", price: "€18/night" },
    { name: "City Budget Inn", price: "€25/night" },
    { name: "Comfort Stay", price: "€35/night" },
  ];

  const mockSafety = {
    safetyIndex: 75,
    comment: "Generally safe in tourist areas, exercise caution at night.",
  };

  const mockExperiences = [
    { group: "Solo female travelers", note: "Great public transport. Avoid small alleys alone at night." },
    { group: "Black travelers", note: "Friendly locals, occasional stares in rural areas but safe overall." },
    { group: "LGBTQ+ travelers", note: "Safe in major cities, avoid PDA in conservative regions." },
  ];

  // Shared colors
  const colors = {
    bg: "#f9f7f3",
    text: "#2c2c2c",
    white: "#ffffff",
    green: "#007f5f",
    yellow: "#FFB400",
    yellowHover: "#E59400",
    brown: "#d4a373",
    cardShadow: "0 4px 12px rgba(0,0,0,0.1)",
  };

  if (loading) return <p style={{ textAlign: "center", marginTop: 50 }}>Loading country info...</p>;
  if (!countryData || countryData.error) return <p style={{ textAlign: "center", marginTop: 50 }}>Country not found.</p>;

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: colors.bg,
        color: colors.text,
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.2rem 2rem",
          borderBottom: "1px solid #eee",
          position: "sticky",
          top: 0,
          backgroundColor: colors.bg,
          zIndex: 10,
        }}
      >
        <h1 style={{ fontSize: "2rem", color: colors.green, margin: 0 }}>
          Where Next
        </h1>
      </div>

      {/* Main Layout */}
      <div
        style={{
          display: "flex",
          gap: "2rem",
          padding: "2rem",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "flex-start",
        }}
      >
        {/* Sidebar: Country Info */}
        <aside
          style={{
            width: isMobile ? "100%" : "320px",
            flexShrink: 0,
            backgroundColor: colors.white,
            borderRadius: "16px",
            padding: "1.5rem",
            boxShadow: colors.cardShadow,
          }}
        >
          {/* Country Flag & Name */}
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <img
              src={countryData.flags?.png}
              alt={`${countryData.name.common} flag`}
              style={{
                width: "100%",
                borderRadius: "12px",
                marginBottom: "1rem",
                objectFit: "cover",
              }}
            />
            <h2 style={{ fontSize: "1.6rem", color: colors.green, margin: 0 }}>
              {countryData.name.common}
            </h2>
            <span style={{ fontSize: "0.95rem", color: "#666" }}>
              {countryData.region} — {countryData.subregion}
            </span>
          </div>

          {/* Quick Facts */}
          <div style={{ marginTop: "1rem" }}>
            <p><strong>Capital:</strong> {countryData.capital?.[0] || "N/A"}</p>
            <p><strong>Population:</strong> {countryData.population.toLocaleString()}</p>
            <p>
              <strong>Languages:</strong>{" "}
              {countryData.languages ? Object.values(countryData.languages).join(", ") : "N/A"}
            </p>
            {countryData.maps?.googleMaps && (
              <a href={countryData.maps.googleMaps} target="_blank" rel="noopener noreferrer">
                View on Google Maps
              </a>
            )}
          </div>

          {/* Travel Map Button */}
          <div style={{ marginTop: "1rem", textAlign: "center" }}>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.6rem 1rem",
                borderRadius: "10px",
                border: "none",
                backgroundColor: colors.yellow,
                color: "#fff",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "0.95rem",
                transition: "0.3s",
                justifyContent: "center",
                width: "100%",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = colors.yellowHover)}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = colors.yellow)}
            >
              <GiTreasureMap size={20} />
              Explore Map
            </button>
          </div>
        </aside>

        {/* Content area */}
        <main style={{ flex: 1, minWidth: 0 }}>
          {/* Hotels */}
          <section
            style={{
              marginBottom: "2rem",
              backgroundColor: colors.white,
              borderRadius: "16px",
              boxShadow: colors.cardShadow,
              padding: "1.5rem",
            }}
          >
            <h2 style={{ color: colors.green, marginBottom: "1rem", fontSize: "1.6rem" }}>
              🏨 Budget Hotels & Hostels
            </h2>
            {mockHotels.map((h, i) => (
              <div
                key={i}
                style={{
                  padding: "12px 0",
                  borderBottom: i < mockHotels.length - 1 ? "1px solid #eee" : "none",
                }}
              >
                <strong>{h.name}</strong> — {h.price}
              </div>
            ))}
          </section>

          {/* Safety */}
          <section
            style={{
              marginBottom: "2rem",
              backgroundColor: colors.white,
              borderRadius: "16px",
              boxShadow: colors.cardShadow,
              padding: "1.5rem",
            }}
          >
            <h2 style={{ color: colors.green, marginBottom: "1rem", fontSize: "1.6rem" }}>
              🔒 Safety & Crime
            </h2>
            <p><strong>Safety Index:</strong> {mockSafety.safetyIndex}/100</p>
            <p style={{ marginTop: 8, opacity: 0.85 }}>{mockSafety.comment}</p>
          </section>

          {/* Traveler Experiences */}
          <section
            style={{
              backgroundColor: colors.white,
              borderRadius: "16px",
              boxShadow: colors.cardShadow,
              padding: "1.5rem",
            }}
          >
            <h2 style={{ color: colors.green, marginBottom: "1rem", fontSize: "1.6rem" }}>
              🌍 Traveler Experiences
            </h2>
            {mockExperiences.map((exp, i) => (
              <div
                key={i}
                style={{
                  padding: "12px 0",
                  borderBottom: i < mockExperiences.length - 1 ? "1px solid #eee" : "none",
                }}
              >
                <strong>{exp.group}:</strong> {exp.note}
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
};

export default DestinationPage;





