import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


// Destination knowledge base
const destinationData = {
  japan: {
    areas: ["Shinjuku", "Shibuya", "Gion (Kyoto)", "Osaka City Center"],
    foods: ["Sushi", "Ramen", "Takoyaki", "Matcha desserts"],
    budget: { low: "€45–€70/day", mid: "€90–€140/day", high: "€200+/day" },
  },
  france: {
    areas: ["Le Marais", "Latin Quarter", "Montmartre", "Nice Old Town"],
    foods: ["Croissants", "Crêpes", "Cheese plates", "Ratatouille"],
    budget: { low: "€50–€80/day", mid: "€100–€160/day", high: "€220+/day" },
  },
  italy: {
    areas: ["Trastevere (Rome)", "Florence Historic Center", "Venice Dorsoduro"],
    foods: ["Pasta", "Pizza", "Gelato", "Espresso"],
    budget: { low: "€45–€75/day", mid: "€95–€150/day", high: "€210+/day" },
  },
};

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
  const [tripDate, setTripDate] = useState("");
  const [countdown, setCountdown] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const [newItem, setNewItem] = useState("");
  const [checklist, setChecklist] = useState([]);

  const [showAllAreas, setShowAllAreas] = useState(false);
  const [showAllTips, setShowAllTips] = useState(false);

  const { state } = useLocation();

useEffect(() => {
  if (state?.country) {
    setQuery(state.country);
  }
  if (state?.tripDate) {
    setTripDate(state.tripDate);
  }
}, [state]);


  const cuteAvatars = ["/avatar1.png","/avatar2.png","/avatar3.png","/avatar4.png","/avatar5.png"];
  const fakePackingTips = [
    "Bring cash — small shops may not accept cards.",
    "Carry a portable fan; it gets warm quickly!",
    "Imodium + nausea tablets (life-saving).",
    "Pack electrolytes for long walking days.",
    "Comfortable sandals are essential.",
    "Double sunscreen — you’ll need it.",
    "Hydrate frequently, especially midday.",
  ];

  // Trip Countdown
  useEffect(() => {
    if (!tripDate) return;
    const interval = setInterval(() => {
      const now = new Date();
      const travel = new Date(tripDate);
      const diff = travel - now;
      if (diff <= 0) { setCountdown("Your trip is today! 🎉"); clearInterval(interval); return; }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      setCountdown(`${days} days, ${hours} hours, ${mins} minutes`);
    }, 1000);
    return () => clearInterval(interval);
  }, [tripDate]);

  // Weather functions
  const getCoordinates = async (place) => {
    try {
      const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=1&appid=${WEATHER_KEY}`);
      const data = await res.json();
      if (!data[0]) return null;
      return { lat: data[0].lat, lon: data[0].lon };
    } catch { return null; }
  };
  const getWeather = async (lat, lon) => {
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${WEATHER_KEY}`);
      const data = await res.json();
      return data.daily.slice(0, 7).map(d => ({
        temp: Math.round(d.temp.day), desc: d.weather[0].description, icon: d.weather[0].icon
      }));
    } catch { return []; }
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const coords = await getCoordinates(query);
    if (!coords) { setResult({ error: "Destination not found" }); setLoading(false); return; }
    const weather = await getWeather(coords.lat, coords.lon);
    const itinerary = ["Explore the historic district & morning cafés","Lunch at a local gem","Visit top viewpoints","Discover hidden areas","Evening markets & nightlife"];
    const savedList = JSON.parse(localStorage.getItem(`packing_${query.trim()}`)) || [];
    setChecklist(savedList);
    setResult({ name: query.trim(), weather, itinerary });
    setLoading(false);
  };
  const handleKeyDown = (e) => { if (e.key === "Enter") handleSearch(); };

  // Checklist 
  const addChecklistItem = () => { if (!newItem.trim()) return; const updated = [...checklist, { text: newItem, done: false }]; setChecklist(updated); setNewItem(""); localStorage.setItem(`packing_${query.trim()}`, JSON.stringify(updated)); };
  const toggleChecklistItem = (i) => { const updated = [...checklist]; updated[i].done = !updated[i].done; setChecklist(updated); localStorage.setItem(`packing_${query.trim()}`, JSON.stringify(updated)); };
  const removeChecklistItem = (i) => { const updated = checklist.filter((_, idx) => idx !== i); setChecklist(updated); localStorage.setItem(`packing_${query.trim()}`, JSON.stringify(updated)); };

  const destinationInfo = result ? destinationData[result.name.toLowerCase()] : null;

  // community data
  const communityAreas = [
    { id:1, user:"Emma Johnson", avatar:"/avatar1.png", comment:"Toronto's Distillery District is amazing!", likes:12, replies:[{user:"Lucas M.", text:"Omg I was there too!"}] },
    { id:2, user:"Michael Lee", avatar:"/avatar2.png", comment:"Montreal's Plateau neighborhood is my favorite.", likes:8, replies:[] },
    { id:3, user:"Sofia Garcia", avatar:"/avatar3.png", comment:"Vancouver's Gastown area is cozy and scenic!", likes:15, replies:[{user:"Anna P.", text:"Yes! So cute!"}] },
    { id:4, user:"Daniel Kim", avatar:"/avatar4.png", comment:"Quebec City's Old Town is like stepping back in time.", likes:20, replies:[{user:"Olivia W.", text:"Loved it too!"}] },
    { id:5, user:"Maya Thompson", avatar:"/avatar5.png", comment:"Banff and Lake Louise are a nature lovers’ paradise!", likes:25, replies:[{user:"Liam R.", text:"Absolutely, unforgettable!"}] },
  ];

  return (
    <>
      <style>{`
        .root {background: ${colors.bg}; min-height:100vh; padding:2rem; width:100%;}
        .card {background:${colors.card}; border-radius:12px; padding:2rem; box-shadow:${colors.softShadow}; border:1px solid rgba(0,0,0,0.05);}
        .sectionTitle {margin-top:0; margin-bottom:0.7rem; color:${colors.green};}
      `}</style>
      <div className="root">
        
        {/* Header */}
        <div style={{display:"flex", justifyContent:"space-between", marginBottom:"2rem"}}>
          <div>
            <h1 style={{margin:0, color:colors.green}}>Destination Advisor</h1>
            <p style={{margin:0, color:"#666"}}>Plan smarter. Travel brighter.</p>
          </div>
          <button onClick={()=>navigate(-1)}>Back</button>
        </div>

        {/* Countdown */}
        <div className="card" style={{marginBottom:"1.5rem"}}>
          <h3 className="sectionTitle">Your Trip Countdown</h3>
          <div style={{display:"flex", gap:"1rem"}}>
            <input type="date" value={tripDate} onChange={e=>setTripDate(e.target.value)} style={{padding:"0.8rem", borderRadius:"12px", border:"1px solid #ddd", flex:1}}/>
            <div style={{padding:"0.8rem 1rem", background:colors.accent, color:"white", borderRadius:"12px", minWidth:"180px", textAlign:"center"}}>{countdown || "Pick a date"}</div>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{display:"flex", gap:"1rem", marginBottom:"2rem"}}>
          <input placeholder="Search any city or country..." value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={handleKeyDown} style={{flex:1, padding:"0.9rem", borderRadius:"12px", border:"1px solid #ddd"}}/>
          <button onClick={handleSearch} style={{padding:"0.9rem 1.2rem", borderRadius:"12px", background:`linear-gradient(90deg, ${colors.accent2}, ${colors.accent})`, color:"white", border:"none", fontWeight:600, cursor:"pointer"}}>Search</button>
        </div>

        {loading && <p>Loading travel insights...</p>}

        {/* Results */}
        {result && !result.error && !loading && (
          <div style={{display:"grid", gridTemplateColumns:"2fr 1fr", gap:"1.5rem", alignItems:"start"}}>
            {/* Left Side */}
            <div style={{display:"flex", flexDirection:"column", gap:"1.5rem"}}>
              {/* Weather */}
              <div className="card">
                <h3 className="sectionTitle">Weather in {result.name}</h3>
                {result.weather.map((w,i)=>(
                  <div key={i} style={{display:"flex", gap:"1rem", alignItems:"center", marginTop:"0.5rem"}}>
                    <img src={`https://openweathermap.org/img/wn/${w.icon}.png`} width="40" alt=""/>
                    <div><strong>{w.temp}°C</strong> — {w.desc}</div>
                  </div>
                ))}
              </div>

              {/* Itinerary */}
              <div className="card">
                <h3 className="sectionTitle">Suggested Itinerary</h3>
                <ul>{result.itinerary.map((it,idx)=><li key={idx}>{it}</li>)}</ul>
              </div>

              {/* Best Areas — Community */}
              <div className="card">
                <h3 className="sectionTitle">Best Areas (Community)</h3>
                {communityAreas.slice(0, showAllAreas ? undefined : 2).map(c=>(
                  <div key={c.id} style={{marginBottom:"1rem", padding:"0.7rem", border:"1px solid #eee", borderRadius:"12px"}}>
                    <div style={{display:"flex", gap:"0.8rem", alignItems:"center"}}>
                      <img src={c.avatar} alt={c.user} width="40" height="40" style={{borderRadius:"50%", objectFit:"cover"}}/>
                      <strong>{c.user}</strong>
                    </div>
                    <p style={{margin:"0.5rem 0 0 0.8rem"}}>{c.comment}</p>
                    <div style={{marginLeft:"0.8rem", fontSize:"0.9rem", color:"#555", display:"flex", gap:"1rem", alignItems:"center"}}>👍 {c.likes}</div>
                    {c.replies.map((r,idx)=>(
                      <div key={idx} style={{marginLeft:"2rem", marginTop:"0.5rem", padding:"0.3rem 0", borderLeft:"2px solid #ddd"}}>
                        <strong style={{fontSize:"0.85rem"}}>{r.user}:</strong> <span style={{fontSize:"0.85rem"}}>{r.text}</span>
                      </div>
                    ))}
                  </div>
                ))}
                {communityAreas.length>2 && <button onClick={()=>setShowAllAreas(!showAllAreas)} style={{background:"transparent", border:"none", color:colors.green, cursor:"pointer", fontWeight:600, marginTop:"0.5rem"}}>{showAllAreas?"Show Less ▲":"Show More ▼"}</button>}
              </div>

              {/* Local Foods */}
              <div className="card">
                <h3 className="sectionTitle"> Local Foods (Community)</h3>
                {communityAreas.slice(0, showAllAreas ? undefined : 2).map(c=>(
                  <div key={c.id} style={{marginBottom:"1rem", padding:"0.7rem", border:"1px solid #eee", borderRadius:"12px"}}>
                    <div style={{display:"flex", gap:"0.8rem", alignItems:"center"}}>
                      <img src={c.avatar} alt={c.user} width="40" height="40" style={{borderRadius:"50%", objectFit:"cover"}}/>
                      <strong>{c.user}</strong>
                    </div>
                    <p style={{margin:"0.5rem 0 0 0.8rem"}}>{c.comment}</p>
                    <div style={{marginLeft:"0.8rem", fontSize:"0.9rem", color:"#555", display:"flex", gap:"1rem", alignItems:"center"}}>👍 {c.likes}</div>
                    {c.replies.map((r,idx)=>(
                      <div key={idx} style={{marginLeft:"2rem", marginTop:"0.5rem", padding:"0.3rem 0", borderLeft:"2px solid #ddd"}}>
                        <strong style={{fontSize:"0.85rem"}}>{r.user}:</strong> <span style={{fontSize:"0.85rem"}}>{r.text}</span>
                      </div>
                    ))}
                  </div>
                ))}
                {communityAreas.length>2 && <button onClick={()=>setShowAllAreas(!showAllAreas)} style={{background:"transparent", border:"none", color:colors.green, cursor:"pointer", fontWeight:600, marginTop:"0.5rem"}}>{showAllAreas?"Show Less ▲":"Show More ▼"}</button>}
              </div>

              {/* BUDGET */}
              <div className="card">
                <h3 className="sectionTitle">Budget Estimates</h3>
                {destinationInfo ? (
                  <>
                    <p><strong>Low:</strong> {destinationInfo.budget.low}</p>
                    <p><strong>Mid-range:</strong> {destinationInfo.budget.mid}</p>
                    <p><strong>Luxury:</strong> {destinationInfo.budget.high}</p>
                  </>
                ) : <p>Budget info not available for this destination.</p>}
              </div>
            </div>

            {/* Right Side */}
            <div style={{display:"flex", flexDirection:"column", gap:"1.5rem"}}>
              {/* Traveler Tips */}
              <div className="card">
                <h3 className="sectionTitle">Traveler Tips</h3>
                {fakePackingTips.slice(0, showAllTips ? undefined : 3).map((tip,idx)=>(
                  <div key={idx} style={{padding:"0.5rem 0"}}>💡 {tip}</div>
                ))}
                {fakePackingTips.length>3 && <button onClick={()=>setShowAllTips(!showAllTips)} style={{background:"transparent", border:"none", color:colors.green, cursor:"pointer", fontWeight:600, marginTop:"0.5rem"}}>{showAllTips?"Show Less ▲":"Show More ▼"}</button>}
              </div>

              {/* Packing Checklist */}
              <div className="card">
                <h3 className="sectionTitle">Your Packing Checklist</h3>
                <div style={{display:"flex", gap:"0.5rem"}}>
                  <input value={newItem} onChange={e=>setNewItem(e.target.value)} placeholder="Add item..." style={{flex:1, padding:"0.8rem", borderRadius:"12px", border:"1px solid #ddd"}}/>
                  <button onClick={addChecklistItem} style={{padding:"0.8rem 1rem", borderRadius:"12px", background:colors.accent, color:"white", border:"none", cursor:"pointer"}}>+</button>
                </div>
                <ul style={{paddingLeft:"1.1rem", marginTop:"1rem"}}>
                  {checklist.map((item,idx)=>(
                    <li key={idx} style={{marginBottom:"0.7rem", display:"flex", alignItems:"center", gap:"0.5rem"}}>
                      <input type="checkbox" checked={item.done} onChange={()=>toggleChecklistItem(idx)}/>
                      <span style={{textDecoration:item.done?"line-through":"none"}}>{item.text}</span>
                      <button onClick={()=>removeChecklistItem(idx)} style={{marginLeft:"auto", background:"transparent", border:"none", color:"#d44", cursor:"pointer", fontSize:"1rem"}}>✕</button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {result?.error && <p style={{color:"red", marginTop:"2rem"}}>{result.error}</p>}
      </div>
    </>
  );
};

export default AIDestinationAdvisor;









