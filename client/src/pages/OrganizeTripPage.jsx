import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


// travel info for 10 countries
const countryData = {
  canada: {
    areas: ["Toronto Distillery District", "Vancouver Gastown", "Ottawa museums", "Banff National Park"],
    foods: ["Poutine", "Maple syrup desserts", "Butter tarts"],
    budget: { low: "€50–€80/day", mid: "€90–€140/day", high: "€200+/day" },
    dos: ["Try poutine!", "Visit national parks", "Explore Ottawa museums"],
    donts: ["Don’t jaywalk", "Avoid remote bear areas"],
    warnings: ["Low crime in cities", "Some remote areas have wildlife"],
    visa: "No visa <90 days for many countries",
    vaccines: ["Routine vaccines recommended"],
    community: [
      { user: "Emma J.", avatar: "/avatar1.png", comment: "Toronto's Distillery District is amazing!", likes: 12 },
      { user: "Liam R.", avatar: "/avatar5.png", comment: "Montreal food scene is amazing.", likes: 8 },
      { user: "Sofia G.", avatar: "/avatar3.png", comment: "Banff is breathtaking!", likes: 25 },
    ],
  },
  france: {
    areas: ["Le Marais", "Latin Quarter", "Montmartre", "Nice Old Town"],
    foods: ["Croissants", "Crêpes", "Cheese plates", "Ratatouille"],
    budget: { low: "€50–€80/day", mid: "€100–€160/day", high: "€220+/day" },
    dos: ["Visit museums", "Try local bakeries"],
    donts: ["Don’t speak only English", "Watch out for pickpockets in Paris"],
    warnings: ["Some pickpocketing in tourist areas"],
    visa: "No visa <90 days for many countries",
    vaccines: ["Routine vaccines recommended"],
    community: [
      { user: "Sophie L.", avatar: "/avatar2.png", comment: "Love the lavender fields in Provence.", likes: 15 },
      { user: "Julien M.", avatar: "/avatar3.png", comment: "Try a café terrace in Paris!", likes: 9 },
    ],
  },
  italy: {
    areas: ["Trastevere (Rome)", "Florence Historic Center", "Venice Dorsoduro"],
    foods: ["Pizza", "Pasta", "Gelato", "Espresso"],
    budget: { low: "€45–€75/day", mid: "€95–€150/day", high: "€210+/day" },
    dos: ["Eat gelato daily", "Visit art museums"],
    donts: ["Avoid taxis in Rome if possible"],
    warnings: ["Pickpockets in tourist areas"],
    visa: "No visa <90 days for many countries",
    vaccines: ["Routine vaccines recommended"],
    community: [
      { user: "Marco P.", avatar: "/avatar4.png", comment: "Siena is amazing for history!", likes: 20 },
    ],
  },
  japan: {
    areas: ["Shinjuku", "Shibuya", "Gion (Kyoto)", "Osaka City Center"],
    foods: ["Sushi", "Ramen", "Takoyaki", "Matcha desserts"],
    budget: { low: "€45–€70/day", mid: "€90–€140/day", high: "€200+/day" },
    dos: ["Visit temples", "Try sushi at local markets"],
    donts: ["Don’t tip in restaurants", "Avoid speaking loudly on trains"],
    warnings: ["Earthquake-prone areas"],
    visa: "No visa <90 days for many countries",
    vaccines: ["Routine vaccines recommended"],
    community: [
      { user: "Yuki25H", avatar: "/avatar1.png", comment: "Shibuya crossing is iconic!", likes: 22 },
      { user: "Dana_Lum", avatar: "/avatar1.png", comment: "Sushi Koshikawa! Hands down the best Sushi place in the entire Tokyo", likes: 43 },
    ],
  },
};

const WEATHER_KEY = "cd728caae961ef1ea9cc6168cfd0c1d5";

const OrganizeTripPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const query = state?.country || "";
  const tripDate = state?.tripDate || "";

  const [checklist, setChecklist] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [weather, setWeather] = useState(null);
  const [localTime, setLocalTime] = useState("");
  const [result, setResult] = useState(null);
  const [showAllTips, setShowAllTips] = useState(false);
  const [loading, setLoading] = useState(true);

  const cutePackingTips = [
    "Bring cash — small shops may not accept cards.",
    "Carry a portable fan; it gets warm quickly!",
    "Imodium + nausea tablets (life-saving).",
    "Pack electrolytes for long walking days.",
    "Comfortable sandals are essential.",
    "Double sunscreen — you’ll need it.",
    "Hydrate frequently, especially midday.",
  ];

  // Weather helpers
  const getCoordinates = async (place) => {
    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=1&appid=${WEATHER_KEY}`
    );
    const data = await res.json();
    return data[0] ? { lat: data[0].lat, lon: data[0].lon } : null;
  };

  const getWeather = async (lat, lon) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${WEATHER_KEY}`
    );
    const data = await res.json();
    return data.current;
  };

  useEffect(() => {
    const loadData = async () => {
      if (!query) return;

      const coords = await getCoordinates(query);
      if (coords) {
        const w = await getWeather(coords.lat, coords.lon);
        setWeather(w);
        setLocalTime(new Date().toLocaleTimeString());
      }

      const storedChecklist = JSON.parse(localStorage.getItem(`packing_${query}`)) || [];
      setChecklist(storedChecklist);
      setResult(countryData[query.toLowerCase()] || null);
      setLoading(false);
    };

    loadData();
  }, [query]);

  const addChecklistItem = () => {
    if (!newItem.trim()) return;
    const updated = [...checklist, { text: newItem, done: false }];
    setChecklist(updated);
    setNewItem("");
    localStorage.setItem(`packing_${query}`, JSON.stringify(updated));
  };

  const toggleChecklistItem = (i) => {
    const updated = [...checklist];
    updated[i].done = !updated[i].done;
    setChecklist(updated);
    localStorage.setItem(`packing_${query}`, JSON.stringify(updated));
  };

  const removeChecklistItem = (i) => {
    const updated = checklist.filter((_, idx) => idx !== i);
    setChecklist(updated);
    localStorage.setItem(`packing_${query}`, JSON.stringify(updated));
  };

  return (
    <div style={{ background: "#dbf0c0", minHeight: "200vh", overflowY: "auto", boxSizing: "border-box", padding: "2rem" }}>
      <h1 style={{ textAlign: "center", color: "#2b6048" }}>
        Travel Guide for {query}
      </h1>

      {tripDate && (
        <p style={{ textAlign: "center", color: "#2b6048" }}>
          ⏳ Your trip starts on {tripDate}. Time to get excited!
        </p>
      )}

      {loading && <p style={{ textAlign: "center" }}>Loading trip info…</p>}

      {/* BACK BUTTON */}
<div style={{ textAlign: "center", margin: "1rem 0" }}>
  <button
    onClick={() =>
      navigate("/trip-countdown", {
        state: {
          country: query,
          tripDate: tripDate,
        },
      })
    }
    style={{
      background: "#a1e0f0",
      color: "#2b6048",
      border: "none",
      padding: "0.4rem 0.9rem",
      borderRadius: "12px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "0.9rem",
      boxShadow: "0 3px 5px rgba(0,0,0,0.1)",
    }}
  >
    ← Back
  </button>
</div>

      {result && (
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem" }}>
          {/* LEFT */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {weather && (
              <div style={{ background: "#fff", padding: "1rem", borderRadius: "12px" }}>
                <h3>Weather & Local Time</h3>
                <p>🌡️ {weather.temp}°C — {weather.weather[0].description} | ⏰ {localTime}</p>
              </div>
            )}

            <div style={{ background: "#fff", padding: "1rem", borderRadius: "12px" }}>
              <h3>Areas to Visit</h3>
              <ul>{result.areas.map(a => <li key={a}>{a}</li>)}</ul>
            </div>

            <div style={{ background: "#fff", padding: "1rem", borderRadius: "12px" }}>
              <h3>Local Foods</h3>
              <ul>{result.foods.map(f => <li key={f}>{f}</li>)}</ul>
            </div>

            <div style={{ background: "#fff", padding: "1rem", borderRadius: "12px" }}>
              <h3>Travel Info</h3>
              <p><strong>Visa:</strong> {result.visa}</p>
              <p><strong>Vaccines:</strong> {result.vaccines.join(", ")}</p>
              <p><strong>Warnings:</strong> {result.warnings.join(", ")}</p>
              <p><strong>Dos:</strong> {result.dos.join(", ")}</p>
              <p><strong>Don'ts:</strong> {result.donts.join(", ")}</p>
            </div>

            <div style={{ background: "#fff", padding: "1rem", borderRadius: "12px" }}>
              <h3>Community Comments</h3>
              {result.community.map((c, i) => (
                <div key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <img src={c.avatar} width="35" height="35" style={{ borderRadius: "50%" }} />
                  <strong>{c.user}:</strong> {c.comment}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* First-Time Traveler Tips */}
            <div style={{ background: "#fff", padding: "1rem", borderRadius: "12px" }}>
              <h3>💡 First-Time Traveler Tips</h3>
              {cutePackingTips.slice(0, showAllTips ? undefined : 3).map((tip, i) => (
                <div key={i} style={{ marginBottom: "0.5rem" }}>💡 {tip}</div>
              ))}
              {cutePackingTips.length > 3 && (
                <button
                  onClick={() => setShowAllTips(!showAllTips)}
                  style={{ background: "none", border: "none", color: "#2b6048", cursor: "pointer", marginTop: "0.5rem" }}
                >
                  {showAllTips ? "Show Less ▲" : "Show More ▼"}
                </button>
              )}
            </div>

            {/* Packing Checklist */}
            <div style={{ background: "#fff", padding: "1rem", borderRadius: "12px" }}>
              <h3>🎒 Packing Checklist</h3>
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <input
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  placeholder="Add item..."
                  style={{ flex: 1, padding: "0.3rem 0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
                />
                <button onClick={addChecklistItem} style={{ borderRadius: "6px", padding: "0.3rem 0.6rem", cursor: "pointer" }}>+</button>
              </div>
              <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                {checklist.map((item, i) => (
                  <li key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.3rem" }}>
                    <input type="checkbox" checked={item.done} onChange={() => toggleChecklistItem(i)} />
                    <span style={{ textDecoration: item.done ? "line-through" : "none" }}>{item.text}</span>
                    <button onClick={() => removeChecklistItem(i)} style={{ marginLeft: "auto", cursor: "pointer" }}>✕</button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Travel Mood */}
            <div style={{ background: "#fff", padding: "1rem", borderRadius: "12px", textAlign: "center" }}>
              <h3>🌍 Travel Mood</h3>
              <p>How excited are you for this trip?</p>
              <div style={{ fontSize: "1.5rem" }}>😃 😎 🏖️ ✈️ 🗺️</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizeTripPage;