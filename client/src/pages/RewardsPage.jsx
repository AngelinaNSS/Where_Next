import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

const countryQuestsData = {
  France: [
    "What famous landmark did you see?",
    "What French food did you try?",
    "Try authentic French croissants",
    "What surprised you most about France?",
    "What moment felt most memorable?"
  ],
  Japan: [
    "What place amazed you the most?",
    "What local food did you try?",
     "Did you experience Japanese culture?",
    "Try sushi from a local market",
    "Climb Mount Fuji (or see it from a distance)"
  ],
  USA: [
    "Which city or landmark did you visit?",
    "What place impressed you the most?",
    "What activity did you enjoy?",
    "What did you enjoy most?",
    "Walk through Central Park"
  ],
  Italy: [
    "Visit the Colosseum in Rome",
    "Explore Venice canals",
    "See the Leaning Tower of Pisa",
    "Taste authentic Italian gelato",
    "Walk through Florence's Duomo"
  ],
  Egypt: [
    "See the Pyramids of Giza",
    "Visit the Sphinx",
    "Explore the Egyptian Museum in Cairo",
    "Take a Nile River cruise",
    "Discover Valley of the Kings"
  ],
  Senegal: [
    "Visit Gorée Island slave trade site",
    "Explore Dakar markets",
    "See African Renaissance Monument",
    "Relax at Lac Rose",
    "Discover historic Saint-Louis"
  ],
  Mali: [
    "Learn about Mansa Musa’s empire",
    "Explore Timbuktu ancient libraries",
    "Visit Djenné Mosque",
    "See Niger River",
    "Discover traditional Malian villages"
  ],
  default: [
    "Discover a famous landmark",
    "Try local cuisine",
    "Visit a hidden gem",
    "Explore a museum or park",
    "Take a scenic walk"
  ]
};

const RewardsPage = () => {
  const [progress, setProgress] = useState(45);
  const [level, setLevel] = useState(3);
  const [showConfetti, setShowConfetti] = useState(false);
  const [questConfetti, setQuestConfetti] = useState(false);
  const [discovered, setDiscovered] = useState([]);
  const [popup, setPopup] = useState(null);

  const badges = [
    { name: "🌍 Traveller", unlocked: true, color: "#2ecc71" },
    { name: "✈️ Explorer", unlocked: false, color: "#3498db" },
    { name: "🎒 Pack Master", unlocked: false, color: "#f39c12" },
    { name: "🏆 World Collector", unlocked: false, color: "#9b59b6" },
    { name: "🗝 Treasure Hunter", unlocked: false, color: "#e67e22" },
  ];

  const treasureLocations = [
    { name: "Hogwarts (Harry Potter)", type: "Movie", info: "Filmed at Alnwick Castle, England", secret: false },
    { name: "Normandy Landing", type: "Historical", info: "D-Day during WWII, France", secret: false },
    { name: "The Godfather House", type: "Movie", info: "Filmed in Staten Island, USA", secret: false },
    { name: "Colosseum", type: "Historical", info: "Gladiator fights, Rome, Italy", secret: false },
    { name: "Taj Mahal", type: "Historical", info: "Mausoleum built by Shah Jahan, India", secret: false },
    { name: "Forbidden City", type: "Historical", info: "Imperial palace, Beijing, China", secret: false },
    { name: "Machu Picchu", type: "Historical", info: "Ancient Incan city, Peru", secret: false },
    { name: "Stonehenge", type: "Historical", info: "Prehistoric monument, UK", secret: false },
    { name: "Gorée Island", type: "Historical", info: "Slave trade site, Senegal", secret: false },
    { name: "Mansa Musa’s Mali Empire", type: "Historical", info: "Legendary ruler of Mali", secret: false },
    { name: "Secret Pirate Cove", type: "Secret", info: "Hidden treasure spot! +50 XP", secret: true },
    { name: "Hidden Waterfall in Japan", type: "Secret", info: "Mystery cherry blossom location +50 XP", secret: true },
    { name: "Ancient Silk Road Landmark", type: "Secret", info: "Secret trading site in Central Asia +50 XP", secret: true },
    // add more treasures up to 50+
  ];

  // Daily Challenge States
  const [challengeStep, setChallengeStep] = useState(1);
  const [challengeCountry, setChallengeCountry] = useState("");
  const [challengeDuration, setChallengeDuration] = useState(1);
  const [challengeDays, setChallengeDays] = useState(5);
  const [dailyChallengeList, setDailyChallengeList] = useState([]);
  const [currentDay, setCurrentDay] = useState(0);

  // Progress bar animation
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => (prev < 45 ? prev + 1 : prev));
    }, 15);
    return () => clearInterval(timer);
  }, []);

  // Badge confetti
  useEffect(() => {
    const firstLocked = badges.find(b => !b.unlocked);
    if (!firstLocked) return;
    const timer = setTimeout(() => setShowConfetti(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Hide badge confetti after 10s
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const handleDiscover = (place) => {
    if (!discovered.includes(place.name)) {
      setDiscovered([...discovered, place.name]);
      const xpReward = place.secret ? 50 : 10;
      setProgress(prev => prev + xpReward);

      const allSecretFound = treasureLocations.filter(t => t.secret).every(t => discovered.includes(t.name) || t.name === place.name);
      if (allSecretFound) {
        badges[4].unlocked = true;
        setShowConfetti(true);
      }
    }
    setPopup(place);
  };

  const generateDailyQuests = () => {
    const countryQuests = countryQuestsData[challengeCountry] || countryQuestsData.default;
    const quests = [];
    for (let i = 0; i < challengeDays; i++) {
      const questText = countryQuests[i % countryQuests.length]; // rotate through available quests
      quests.push({ text: `Day ${i + 1}: ${questText}`, completed: false, xp: 20 });
    }
    setDailyChallengeList(quests);
    setCurrentDay(0);
  };

  const completeDailyQuest = (index) => {
    const newList = [...dailyChallengeList];
    newList[index].completed = true;
    setDailyChallengeList(newList);
    setProgress(prev => prev + newList[index].xp);
    setQuestConfetti(true);
    setTimeout(() => setQuestConfetti(false), 5000);
    if (currentDay < dailyChallengeList.length - 1) setCurrentDay(prev => prev + 1);
  };

  return (
    <div style={{ width: "100vw", minHeight: "100vh", padding: "40px", fontFamily: "Poppins, sans-serif", backgroundColor: "#f8f8f8", position: "relative" }}>
      
      {/* Back Button */}
      <button
        onClick={() => navigate("/profile")}
        style={{
          padding: "10px 16px",
          background: "#7bc4e0ff",
          color: "#fff",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ← Back to Profile
      </button>
      
      {(showConfetti || questConfetti) && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      <h1 style={{ fontSize: "2.3rem", color: "#2a2a2a" }}>Your Rewards</h1>
      <p style={{ color: "#555", marginTop: "10px", fontSize: "1.1rem" }}>
        Track your travel progress, unlock badges, complete quests, and uncover hidden treasures!
      </p>

      {/* Level and XP */}
      <div style={{ marginTop: "30px" }}>
        <h2 style={{ color: "#2a2a2a" }}>Level {level} 🎉</h2>
        <div style={{ width: "100%", height: "25px", background: "#ddd", borderRadius: "20px", overflow: "hidden" }}>
          <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #2ecc71, #3498db)", transition: "width 1s ease-in-out" }} />
        </div>
        <p style={{ color: "#555", marginTop: "5px" }}>{progress} XP to next level</p>
      </div>

      {/* Badges */}
      <h2 style={{ marginTop: "40px", color: "#2a2a2a" }}>Badges</h2>
      <div style={{ marginTop: "20px", display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {badges.map((badge, i) => (
          <div
            key={i}
            style={{ width: "120px", height: "120px", backgroundColor: badge.unlocked ? "#fff" : "#eee", borderRadius: "16px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "600", color: badge.unlocked ? badge.color : "#aaa", cursor: badge.unlocked ? "pointer" : "not-allowed", transition: "transform 0.3s" }}
            onMouseEnter={(e) => badge.unlocked && (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            title={badge.unlocked ? "Unlocked!" : "Locked"}
          >
            {badge.name}
          </div>
        ))}
      </div>

      {/* Interactive Daily Travel Quests with Journal */}
<h2 style={{ marginTop: "40px", color: "#2a2a2a" }}>Daily Travel Challenge 🌎</h2>
<p style={{ color: "#555", marginTop: "5px" }}>
  Personalize your daily travel quests and record your experiences!
</p>

{challengeStep === 1 && (
  <div style={{ marginTop: "20px" }}>
    <label>
      Enter your country: 
      <input 
        type="text" 
        value={challengeCountry} 
        onChange={(e) => setChallengeCountry(e.target.value)} 
        style={{ marginLeft: "10px", padding: "5px", borderRadius: "6px" }}
      />
    </label>
    <button onClick={() => setChallengeStep(2)} style={{ marginLeft: "10px", padding: "5px 10px", borderRadius: "6px", cursor: "pointer" }}>Next</button>
  </div>
)}

{challengeStep === 2 && (
  <div style={{ marginTop: "20px" }}>
    <label>
      Duration of stay (days): 
      <input 
        type="number" 
        value={challengeDuration} 
        onChange={(e) => setChallengeDuration(Number(e.target.value))} 
        style={{ marginLeft: "10px", padding: "5px", borderRadius: "6px", width: "60px" }}
      />
    </label>
    <button onClick={() => setChallengeStep(3)} style={{ marginLeft: "10px", padding: "5px 10px", borderRadius: "6px", cursor: "pointer" }}>Next</button>
  </div>
)}

{challengeStep === 3 && (
  <div style={{ marginTop: "20px" }}>
    <label>
      Select challenge length: 
      <select value={challengeDays} onChange={(e) => setChallengeDays(Number(e.target.value))} style={{ marginLeft: "10px", padding: "5px", borderRadius: "6px" }}>
        <option value={5}>5 Days</option>
        <option value={10}>10 Days</option>
        <option value={15}>15 Days</option>
      </select>
    </label>
    <button 
      onClick={() => {
        generateDailyQuests();
        setChallengeStep(4);
      }} 
      style={{ marginLeft: "10px", padding: "5px 10px", borderRadius: "6px", cursor: "pointer" }}
    >
      Start Challenge
    </button>
  </div>
)}

{challengeStep === 4 && dailyChallengeList.length > 0 && (
  <div style={{ marginTop: "20px", padding: "15px", background: "#fff", borderRadius: "12px", boxShadow: "0 3px 6px rgba(0,0,0,0.1)" }}>
    <h3 style={{ marginBottom: "10px" }}>{dailyChallengeList[currentDay].text}</h3>
    <button 
      onClick={() => completeDailyQuest(currentDay)}
      style={{ padding: "8px 15px", borderRadius: "6px", cursor: "pointer", background: "#2ecc71", color: "#fff", border: "none" }}
    >
      Complete Quest (+{dailyChallengeList[currentDay].xp} XP)
    </button>

    {/* Journal Input */}
    <div style={{ marginTop: "15px" }}>
      <label style={{ display: "block", marginBottom: "5px" }}>Add a note for today:</label>
      <textarea
        value={dailyChallengeList[currentDay].note || ""}
        onChange={(e) => {
          const newList = [...dailyChallengeList];
          newList[currentDay].note = e.target.value;
          setDailyChallengeList(newList);
        }}
        placeholder="Write about places you've visited, foods you've tried, or memorable moments..."
        style={{ width: "100%", minHeight: "60px", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
      />
    </div>

    <p style={{ marginTop: "10px", color: "#555" }}>
      Day {currentDay + 1} of {dailyChallengeList.length}
    </p>

    {currentDay > 0 && (
      <button
        onClick={() => setCurrentDay(prev => prev - 1)}
        style={{ marginTop: "10px", marginRight: "10px", padding: "5px 10px", borderRadius: "6px", cursor: "pointer" }}
      >
        Previous Day
      </button>
    )}
    {currentDay < dailyChallengeList.length - 1 && (
      <button
        onClick={() => setCurrentDay(prev => prev + 1)}
        style={{ marginTop: "10px", padding: "5px 10px", borderRadius: "6px", cursor: "pointer" }}
      >
        Next Day
      </button>
    )}
  </div>
)}


      {/* Treasure Hunt */}
      <h2 style={{ marginTop: "40px", color: "#2a2a2a" }}>Treasure Hunt 🌟</h2>
      <p style={{ color: "#555", marginTop: "5px" }}>
        Explore famous historical events, movie sites, and hidden gems from around the world! <br />
        Discovered {discovered.length} of {treasureLocations.length} treasures
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "20px", marginTop: "20px", maxHeight: "600px", overflowY: "auto", paddingRight: "10px" }}>
        {treasureLocations.map((place, i) => (
          <div
            key={i}
            onClick={() => handleDiscover(place)}
            style={{ width: "180px", height: "120px", backgroundColor: discovered.includes(place.name) ? "#2ecc71" : "#fff", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", cursor: "pointer", transition: "transform 0.3s, box-shadow 0.3s", padding: "10px", fontSize: "0.95rem", fontWeight: "500" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.2)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)"; }}
          >
            {place.secret && !discovered.includes(place.name) ? "❓ Hidden Gem" : place.name}
          </div>
        ))}
      </div>
      
      

      {/* Popup */}
      {popup && (
        <div onClick={() => setPopup(null)} style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#fff", padding: "30px", borderRadius: "16px", maxWidth: "400px", textAlign: "center" }}>
            <h3>{popup.name}</h3>
            <p>{popup.info}</p>
            <button style={{ marginTop: "20px", padding: "10px 20px", borderRadius: "8px", cursor: "pointer" }} onClick={() => setPopup(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};



export default RewardsPage;