import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AIDestinationAdvisor = () => {
  const navigate = useNavigate();

  
  const colors = {
    bg: "linear-gradient(180deg, #fff7fb 0%, #f7fff9 100%)",
    text: "#2c2c2c",
    card: "#ffffff",
    accent: "#FF9DB7",
    accent2: "#9DE6E6",
    green: "#2b6048",
    softShadow: "0 8px 24px rgba(50,50,93,0.08)",
  };

  const WEATHER_KEY = "cd728caae961ef1ea9cc6168cfd0c1d5";

  const [query, setQuery] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);

  // countdown 
  const [tripDate, setTripDate] = useState("");
  const [countdown, setCountdown] = useState("");

  // main results
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // packing checklist
  const [newItem, setNewItem] = useState("");
  const [checklist, setChecklist] = useState([]);

  // the fake avatars
  const cuteAvatars = [
    "/avatar1.png",
    "/avatar2.png",
    "/avatar3.png",
    "/avatar4.png",
    "/avatar5.png",
  ];

  const fakePackingTips = [
    "Bring cash — small shops may not accept cards.",
    "Carry a portable fan; it gets warm quickly!",
    "Imodium + nausea tablets (life-saving).",
    "Pack electrolytes for long walking days.",
    "Comfortable sandals are essential.",
    "Double sunscreen — you’ll need it.",
    "Hydrate frequently, especially midday.",
  ];

  // -------------------------
  // Trip countdown
  // -------------------------
  useEffect(() => {
    if (!tripDate) return;

    const interval = setInterval(() => {
      const now = new Date();
      const travel = new Date(tripDate);
      const diff = travel - now;

      if (diff <= 0) {
        setCountdown("Your trip is today! 🎉");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);

      setCountdown(`${days} days, ${hours} hours, ${mins} minutes`);
    }, 1000);

    return () => clearInterval(interval);
  }, [tripDate]);

  // -----------------------------------
  // WEATHER 
  // -----------------------------------
  const getCoordinates = async (place) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=1&appid=${WEATHER_KEY}`
      );
      const data = await res.json();
      if (!data[0]) return null;
      return { lat: data[0].lat, lon: data[0].lon };
    } catch {
      return null;
    }
  };

  const getWeather = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${WEATHER_KEY}`
      );
      const data = await res.json();
      return data.daily.slice(0, 7).map((d) => ({
        temp: Math.round(d.temp.day),
        desc: d.weather[0].description,
        icon: d.weather[0].icon,
      }));
    } catch {
      return [];
    }
  };

  // -----------------------------------
  // MOCK AI DATA (replace later)
  // -----------------------------------
  const getAIData = (place) => {
    return {
      itinerary: [
        "Explore the historic district & morning cafés",
        "Lunch at a local gem",
        "Visit top viewpoints",
        "Discover hidden areas",
        "Evening markets & nightlife",
      ],
      bestAreas: ["Old Town", "City Center", "Harbor District"],
      food: ["Street dumplings", "Seafood bowls", "Local desserts"],
      budget: {
        low: "€40–€70/day",
        mid: "€90–€150/day",
        high: "€200–€400/day",
      },
    };
  };

  // -----------------------------------
  // MAIN SEARCH
  // -----------------------------------
  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearchTriggered(true);

    const coords = await getCoordinates(query);
    if (!coords) {
      setResult({ error: "Destination not found" });
      setLoading(false);
      return;
    }

    const weather = await getWeather(coords.lat, coords.lon);
    const ai = getAIData(query);

    //checklist for storage for this specific country
    const savedList =
      JSON.parse(localStorage.getItem(`packing_${query.trim()}`)) || [];

    setChecklist(savedList);

    setResult({ ...ai, weather, name: query.trim() });
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  // -----------------------------------
  // CHECKLIST FUNCTIONS
  // -----------------------------------
  const addChecklistItem = () => {
    if (!newItem.trim()) return;
    const updated = [...checklist, { text: newItem, done: false }];
    setChecklist(updated);
    setNewItem("");
    localStorage.setItem(`packing_${query.trim()}`, JSON.stringify(updated));
  };

  const toggleChecklistItem = (i) => {
    const updated = [...checklist];
    updated[i].done = !updated[i].done;
    setChecklist(updated);
    localStorage.setItem(`packing_${query.trim()}`, JSON.stringify(updated));
  };

  const removeChecklistItem = (i) => {
    const updated = checklist.filter((_, idx) => idx !== i);
    setChecklist(updated);
    localStorage.setItem(`packing_${query.trim()}`, JSON.stringify(updated));
  };

  // -----------------------------------
  // UI
  // -----------------------------------
  return (
    <>
      <style>{`
        .root {
          background: ${colors.bg};
          min-height: 100vh;
          padding: 2rem;
          width: 100%;
        }
        .card {
          background: ${colors.card};
          border-radius: 2px;
          padding: 2.4rem;
          box-shadow: ${colors.softShadow};
          border: 1px solid rgba(0,0,0,0.05);
        }
        .sectionTitle {
          margin-top: 0;
          margin-bottom: 0.7rem;
          color: ${colors.green};
        }
      `}</style>

      <div className="root">
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem" }}>
          <div>
            <h1 style={{ margin: 0, color: colors.green }}> Destination Advisor</h1>
            <p style={{ margin: 0, color: "#666" }}>Plan smarter. Travel brighter.</p>
          </div>
          <button className="btn" onClick={() => navigate(-1)}>Back</button>
        </div>

        {/* COUNTDOWN */}
        <div className="card" style={{ marginBottom: "1.5rem" }}>
          <h3 className="sectionTitle">Your Trip Countdown</h3>

          <div style={{ display: "flex", gap: "1rem" }}>
            <input
              type="date"
              value={tripDate}
              onChange={(e) => setTripDate(e.target.value)}
              style={{
                padding: "0.8rem",
                borderRadius: "12px",
                border: "1px solid #ddd",
                flex: 1,
              }}
            />

            <div
              style={{
                padding: "0.8rem 1rem",
                background: colors.accent,
                color: "white",
                borderRadius: "12px",
                minWidth: "180px",
                textAlign: "center",
              }}
            >
              {countdown || "Pick a date"}
            </div>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
          <input
            className="input"
            placeholder="Search any city or country..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              flex: 1,
              padding: "0.9rem",
              borderRadius: "12px",
              border: "1px solid #ddd",
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              padding: "0.9rem 1.2rem",
              borderRadius: "12px",
              background: `linear-gradient(90deg, ${colors.accent2}, ${colors.accent})`,
              color: "white",
              border: "none",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </div>

        {loading && <p>Loading travel insights...</p>}

        {/* RESULTS */}
        {result && !result.error && !loading && (
          <>
            {/* ***** GRID LAYOUT ***** */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
                gap: "1.5rem",
                alignItems: "start",
              }}
            >
              {/* LEFT SIDE — main info*/}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {/* WEATHER */}
                <div className="card">
                  <h3 className="sectionTitle">Weather in {result.name}</h3>
                  {result.weather.map((w, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        gap: "1rem",
                        alignItems: "center",
                        marginTop: "0.5rem",
                      }}
                    >
                      <img
                        src={`https://openweathermap.org/img/wn/${w.icon}.png`}
                        width="40"
                        alt=""
                      />
                      <div>
                        <strong>{w.temp}°C</strong> — {w.desc}
                      </div>
                    </div>
                  ))}
                </div>

                {/* ITINERARY */}
                <div className="card">
                  <h3 className="sectionTitle">Suggested Itinerary</h3>
                  <ul>
                    {result.itinerary.map((it, idx) => (
                      <li key={idx}>{it}</li>
                    ))}
                  </ul>
                </div>

                {/* BEST AREAS */}
                <div className="card">
                  <h3 className="sectionTitle">Best Areas to Stay</h3>
                  <ul>
                    {result.bestAreas.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                </div>

                {/* FOOD */}
                <div className="card">
                  <h3 className="sectionTitle">Local Foods You Must Try</h3>
                  <ul>
                    {result.food.map((f, idx) => (
                      <li key={idx}>{f}</li>
                    ))}
                  </ul>
                </div>

                {/* BUDGET */}
                <div className="card">
                  <h3 className="sectionTitle">Budget Estimates</h3>
                  <p><strong>Low:</strong> {result.budget.low}</p>
                  <p><strong>Mid-range:</strong> {result.budget.mid}</p>
                  <p><strong>Luxury:</strong> {result.budget.high}</p>
                </div>
              </div>

              {/* RIGHT SIDE — fake accounts + packing checklist */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

                {/* FAKE ACCOUNTS */}
                <div className="card">
                  <h3 className="sectionTitle">Traveler Tips</h3>

                  {[...Array(3)].map((_, idx) => {
                    const randomAvatar =
                      cuteAvatars[Math.floor(Math.random() * cuteAvatars.length)];
                    const tip =
                      fakePackingTips[
                        Math.floor(Math.random() * fakePackingTips.length)
                      ];

                    return (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          gap: "1rem",
                          marginBottom: "1rem",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={randomAvatar}
                          width="50"
                          height="50"
                          style={{
                            borderRadius: "50%",
                            background: "#fdd",
                            padding: "4px",
                            objectFit: "cover",
                          }}
                        />
                        <div>
                          <strong>Traveler #{idx + 1}</strong>
                          <p style={{ margin: 0 }}>{tip}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* PACKING CHECKLIST */}
                <div className="card">
                  <h3 className="sectionTitle">Your Packing Checklist</h3>

                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <input
                      value={newItem}
                      onChange={(e) => setNewItem(e.target.value)}
                      placeholder="Add item..."
                      style={{
                        flex: 1,
                        padding: "0.8rem",
                        borderRadius: "12px",
                        border: "1px solid #ddd",
                      }}
                    />
                    <button
                      onClick={addChecklistItem}
                      style={{
                        padding: "0.8rem 1rem",
                        borderRadius: "12px",
                        background: colors.accent,
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      +
                    </button>
                  </div>

                  <ul style={{ paddingLeft: "1.1rem", marginTop: "1rem" }}>
                    {checklist.map((item, idx) => (
                      <li
                        key={idx}
                        style={{
                          marginBottom: "0.7rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={item.done}
                          onChange={() => toggleChecklistItem(idx)}
                        />
                        <span
                          style={{
                            textDecoration: item.done ? "line-through" : "none",
                          }}
                        >
                          {item.text}
                        </span>
                        <button
                          onClick={() => removeChecklistItem(idx)}
                          style={{
                            marginLeft: "auto",
                            background: "transparent",
                            border: "none",
                            color: "#d44",
                            cursor: "pointer",
                            fontSize: "1rem",
                          }}
                        >
                          ✕
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ERROR */}
        {result?.error && (
          <p style={{ color: "red", marginTop: "2rem" }}>{result.error}</p>
        )}
      </div>
    </>
  );
};

export default AIDestinationAdvisor;





