import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const QuizPage = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth < 900);
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  const colors = {
    bg: "#f9f7f3",
    text: "#2c2c2c",
    white: "#ffffff",
    green: "#007f5f",
    yellow: "#FFB400",
    yellowHover: "#E59400",
    blue: "#3b82f6",
    blueHover: "#2563eb",
    cardShadow: "0 4px 12px rgba(0,0,0,0.1)",
  };

  const [phase, setPhase] = useState("continent"); // "continent" -> "quiz" -> "result"
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const continents = ["Europe", "Asia", "Africa", "North America", "South America", "Oceania"];

  // Continent-specific questions
  const questionsByContinent = {
    Europe: [
      { q: "Do you enjoy historical towns or modern cities?", options: ["Historical", "Modern"] },
      { q: "Do you like wine and cheese tours?", options: ["Yes", "No"] },
      { q: "Do you enjoy art museums?", options: ["Yes", "No"] },
      { q: "Do you prefer cold or warm weather?", options: ["Cold", "Warm"] },
      { q: "Do you like outdoor adventures or relaxing vacations?", options: ["Adventure", "Relaxing"] },
      { q: "Do you enjoy wine tasting?", options: ["Yes", "No"] },
      { q: "Do you prefer coastal towns or mountains?", options: ["Coast", "Mountains"] },
      { q: "Do you like shopping in cities?", options: ["Yes", "No"] },
      { q: "Do you enjoy cultural festivals?", options: ["Yes", "No"] },
      { q: "Do you prefer quiet towns or busy cities?", options: ["Quiet", "Busy"] },
      { q: "Do you like luxury hotels?", options: ["Yes", "No"] },
      { q: "Do you enjoy hiking?", options: ["Yes", "No"] },
      { q: "Do you like trying new foods?", options: ["Yes", "No"] },
      { q: "Do you enjoy historical architecture?", options: ["Yes", "No"] },
      { q: "Do you prefer traveling by train or plane?", options: ["Train", "Plane"] },

    ],
    Asia: [
      { q: "Do you like tropical beaches or snowy mountains?", options: ["Beaches", "Mountains"] },
      { q: "Do you enjoy street food?", options: ["Yes", "No"] },
      { q: "Do you like bustling cities or calm towns?", options: ["Cities", "Towns"] },
      { q: "Do you enjoy cultural festivals?", options: ["Yes", "No"] },
      { q: "Do you prefer luxury or budget travel?", options: ["Luxury", "Budget"] },
       { q: "Do you like historical temples?", options: ["Yes", "No"] },
    { q: "Do you enjoy spicy cuisine?", options: ["Yes", "No"] },
    { q: "Do you prefer tropical climates?", options: ["Yes", "No"] },
    { q: "Do you enjoy shopping markets?", options: ["Yes", "No"] },
    { q: "Do you like nightlife?", options: ["Yes", "No"] },
    { q: "Do you enjoy hiking?", options: ["Yes", "No"] },
    { q: "Do you like islands or mainland?", options: ["Islands", "Mainland"] },
    { q: "Do you enjoy cultural shows?", options: ["Yes", "No"] },
    { q: "Do you prefer traveling by train or plane?", options: ["Train", "Plane"] },
    { q: "Do you enjoy relaxing on beaches?", options: ["Yes", "No"] },
    ],

    NorthAmerica: [
      { q: "Do you prefer national parks or big cities?", options: ["Parks", "Cities"] },
      { q: "Do you like cold winters or warm summers?", options: ["Cold", "Warm"] },
      { q: "Do you enjoy outdoor sports?", options: ["Yes", "No"] },
      { q: "Do you like road trips?", options: ["Yes", "No"] },
      { q: "Do you enjoy nightlife?", options: ["Yes", "No"] },
      { q: "Do you prefer beaches or mountains?", options: ["Beaches", "Mountains"] },
    { q: "Do you like luxury resorts?", options: ["Yes", "No"] },
    { q: "Do you enjoy camping?", options: ["Yes", "No"] },
    { q: "Do you like urban sightseeing?", options: ["Yes", "No"] },
    { q: "Do you enjoy hiking trails?", options: ["Yes", "No"] },
    { q: "Do you like theme parks?", options: ["Yes", "No"] },
    { q: "Do you prefer solo or group travel?", options: ["Solo", "Group"] },
    { q: "Do you enjoy wildlife?", options: ["Yes", "No"] },
    { q: "Do you like historical landmarks?", options: ["Yes", "No"] },
    { q: "Do you prefer traveling by car or plane?", options: ["Car", "Plane"] },
    ],
    
    SouthAmerica: [
      { q: "Do you like beaches or mountains?", options: ["Beaches", "Mountains"] },
      { q: "Do you enjoy music festivals?", options: ["Yes", "No"] },
      { q: "Do you like warm climates?", options: ["Yes", "No"] },
      { q: "Do you prefer solo or group travel?", options: ["Solo", "Group"] },
      { q: "Do you enjoy wildlife safaris?", options: ["Yes", "No"] },
      { q: "Do you like tropical rainforests?", options: ["Yes", "No"] },
    { q: "Do you enjoy local markets?", options: ["Yes", "No"] },
    { q: "Do you prefer cities or small towns?", options: ["Cities", "Towns"] },
    { q: "Do you enjoy dancing or music?", options: ["Yes", "No"] },
    { q: "Do you like adventure sports?", options: ["Yes", "No"] },
    { q: "Do you enjoy beaches with nightlife?", options: ["Yes", "No"] },
    { q: "Do you prefer hiking or surfing?", options: ["Hiking", "Surfing"] },
    { q: "Do you enjoy cultural experiences?", options: ["Yes", "No"] },
    { q: "Do you prefer group travel?", options: ["Yes", "No"] },
    { q: "Do you like tropical islands?", options: ["Yes", "No"] },

    ],
    
    Africa: [
      { q: "Do you like deserts or jungles?", options: ["Deserts", "Jungles"] },
      { q: "Do you enjoy wildlife safaris?", options: ["Yes", "No"] },
      { q: "Do you like warm climates?", options: ["Yes", "No"] },
      { q: "Do you enjoy cultural experiences?", options: ["Yes", "No"] },
      { q: "Do you prefer luxury or budget travel?", options: ["Luxury", "Budget"] },
       { q: "Do you enjoy beaches?", options: ["Yes", "No"] },
    { q: "Do you like mountains or plains?", options: ["Mountains", "Plains"] },
    { q: "Do you prefer historical sites?", options: ["Yes", "No"] },
    { q: "Do you enjoy adventure sports?", options: ["Yes", "No"] },
    { q: "Do you like city sightseeing?", options: ["Yes", "No"] },
    { q: "Do you enjoy local markets?", options: ["Yes", "No"] },
    { q: "Do you prefer group travel?", options: ["Yes", "No"] },
    { q: "Do you like scenic drives?", options: ["Yes", "No"] },
    { q: "Do you enjoy cultural festivals?", options: ["Yes", "No"] },
    { q: "Do you like safari tours?", options: ["Yes", "No"] },
    ],
    
    Oceania: [
      { q: "Do you prefer beaches or mountains?", options: ["Beaches", "Mountains"] },
      { q: "Do you enjoy adventure sports?", options: ["Yes", "No"] },
      { q: "Do you like calm towns or busy cities?", options: ["Towns", "Cities"] },
      { q: "Do you enjoy wildlife experiences?", options: ["Yes", "No"] },
      { q: "Do you prefer solo or group travel?", options: ["Solo", "Group"] },
      
    ],
  };

  const countries = [
    { name: "Italy 🍝", continent: "Europe", explanation: "Great for history, art, food, and shopping." },
    { name: "France 🍷", continent: "Europe", explanation: "Famous for culture, wine tours, and beautiful cities." },
    { name: "Switzerland 🏔️", continent: "Europe", explanation: "Perfect for mountains, cold climates, and scenic landscapes." },
    { name: "Thailand 🌴", continent: "Asia", explanation: "Warm weather, beaches, and spicy food." },
    { name: "Japan 🗼", continent: "Asia", explanation: "Modern cities, rich culture, and unique cuisine." },
    { name: "Morocco 🏜️", continent: "Africa", explanation: "Warm climate, deserts, and cultural experiences." },
    { name: "Brazil 🌞", continent: "South America", explanation: "Tropical beaches, nightlife, and festivals." },
    { name: "New Zealand 🏞️", continent: "Oceania", explanation: "Nature, adventure sports, and stunning landscapes." },
    { name: "Australia 🐨", continent: "Oceania", explanation: "Beaches, wildlife, and outdoor adventures." },
    { name: "Canada 🍁", continent: "North America", explanation: "Cold climates, mountains, and nature experiences." },
  ];

  const handleContinentSelect = (continent) => {
    setSelectedContinent(continent);
    setQuizQuestions(questionsByContinent[continent]);
    setPhase("quiz");
  };

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentIndex + 1 < quizQuestions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Only score countries in the selected continent
      const possibleCountries = countries.filter(c => c.continent === selectedContinent);
      const score = {};
      possibleCountries.forEach(c => (score[c.name] = 0));

      newAnswers.forEach((ans, i) => {
        possibleCountries.forEach(c => {
          // Example: simplistic scoring rules per continent
          if (selectedContinent === "Europe") {
            if (i === 0 && ans === "Historical" && ["Italy 🍝", "France 🍷"].includes(c.name)) score[c.name]++;
            if (i === 0 && ans === "Modern" && ["Switzerland 🏔️"].includes(c.name)) score[c.name]++;
            if (i === 1 && ans === "Yes") score[c.name]++;
            if (i === 2 && ans === "Yes") score[c.name]++;
          }
          if (selectedContinent === "Asia") {
            if (i === 0 && ans === "Beaches" && ["Thailand 🌴"].includes(c.name)) score[c.name]++;
            if (i === 0 && ans === "Mountains" && ["Japan 🗼"].includes(c.name)) score[c.name]++;
            if (i === 1 && ans === "Yes") score[c.name]++;
            if (i === 3 && ans === "Yes") score[c.name]++;
          }
          if (selectedContinent === "North America") {
            if (i === 0 && ans === "Parks" && ["Canada 🍁"].includes(c.name)) score[c.name]++;
            if (i === 0 && ans === "Cities" && ["Canada 🍁"].includes(c.name)) score[c.name]++;
          }
          if (selectedContinent === "South America") {
            if (i === 0 && ans === "Beaches" && ["Brazil 🌞"].includes(c.name)) score[c.name]++;
            if (i === 1 && ans === "Yes") score[c.name]++;
          }
          if (selectedContinent === "Africa") {
            if (i === 0 && ans === "Deserts" && ["Morocco 🏜️"].includes(c.name)) score[c.name]++;
            if (i === 1 && ans === "Yes") score[c.name]++;
          }
          if (selectedContinent === "Oceania") {
            if (i === 0 && ans === "Beaches" && ["Australia 🐨"].includes(c.name)) score[c.name]++;
            if (i === 1 && ans === "Yes") score[c.name]++;
          }
        });
      });

      const topCountry = Object.keys(score).reduce((a, b) =>
        score[a] >= score[b] ? a : b
      );

      const explanation = countries.find(c => c.name === topCountry)?.explanation || "";
      setResult(`${topCountry} — ${explanation}`);
      setPhase("result");
    }
  };

  const progressPercent = Math.round(((currentIndex + 1) / quizQuestions.length) * 100);

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
          Travel Quiz
        </h1>
        <button
          onClick={() => navigate("/profile")}
          style={{
            padding: "0.7rem 1.2rem",
            borderRadius: "10px",
            border: "none",
            backgroundColor: colors.blue,
            color: colors.white,
            cursor: "pointer",
            fontWeight: "600",
            transition: "0.3s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = colors.blueHover)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = colors.blue)
          }
        >
          ← Back
        </button>
      </div>

      {/* Main Content */}
      <div
        style={{
          maxWidth: "700px",
          margin: "2rem auto",
          backgroundColor: colors.white,
          borderRadius: "16px",
          padding: "2rem",
          boxShadow: colors.cardShadow,
          textAlign: "center",
        }}
      >
        {phase === "continent" && (
          <>
            <h2 style={{ color: colors.green, marginBottom: "1rem" }}>
              Pick a continent to start your quiz
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
              {continents.map((cont) => (
                <button
                  key={cont}
                  onClick={() => handleContinentSelect(cont)}
                  style={{
                    padding: "1rem 2rem",
                    borderRadius: "10px",
                    border: "none",
                    backgroundColor: colors.yellow,
                    color: colors.white,
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "0.3s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = colors.yellowHover)
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = colors.yellow)
                  }
                >
                  {cont}
                </button>
              ))}
            </div>
          </>
        )}

        {phase === "quiz" && !result && (
          <>
            <h2 style={{ color: colors.green, marginBottom: "1rem" }}>
              Question {currentIndex + 1} of {quizQuestions.length}
            </h2>
            <p style={{ marginBottom: "1.5rem", fontSize: "1.2rem" }}>
              {quizQuestions[currentIndex].q}
            </p>

            <div
              style={{
                height: "14px",
                width: "100%",
                backgroundColor: "#eee",
                borderRadius: "8px",
                overflow: "hidden",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  width: `${progressPercent}%`,
                  height: "100%",
                  backgroundColor: colors.yellow,
                  transition: "width 0.3s ease",
                }}
              />
            </div>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              {quizQuestions[currentIndex].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  style={{
                    padding: "0.8rem 1.5rem",
                    borderRadius: "10px",
                    border: "none",
                    backgroundColor: colors.yellow,
                    color: colors.white,
                    cursor: "pointer",
                    fontWeight: "600",
                    transition: "0.3s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = colors.yellowHover)
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = colors.yellow)
                  }
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        )}

        {phase === "result" && result && (
          <>
            <h2 style={{ color: colors.green, marginBottom: "1rem" }}>
              🎉 Your Recommended Destination
            </h2>
            <p style={{ fontSize: "1.5rem", fontWeight: "600" }}>{result}</p>

            <div
              style={{
                marginTop: "1.5rem",
                textAlign: "left",
                background: "#f7fafc",
                borderRadius: "12px",
                padding: "1rem",
              }}
            >
              <p style={{ margin: "0 0 0.5rem 0", fontWeight: 600, color: "#444" }}>
                Your answers:
              </p>
              {quizQuestions.map((q, i) => (
                <div key={i} style={{ marginBottom: "0.5rem", color: "#555" }}>
                  <span style={{ fontWeight: 600 }}>{i + 1}.</span> {q.q} —{" "}
                  <span>{answers[i]}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setPhase("continent");
                setSelectedContinent(null);
                setQuizQuestions([]);
                setCurrentIndex(0);
                setAnswers([]);
                setResult(null);
              }}
              style={{
                marginTop: "2rem",
                padding: "0.8rem 1.5rem",
                borderRadius: "10px",
                border: "none",
                backgroundColor: colors.blue,
                color: colors.white,
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Restart Quiz
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizPage;























