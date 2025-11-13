import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SplashPage = () => {
  const [showText, setShowText] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

  // Stars
  const [stars] = useState(
    Array.from({ length: 80 }).map(() => ({
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: 5 + Math.random() * 10,
    }))
  );

  useEffect(() => {
    const textTimer = setTimeout(() => setShowText(true), 1000);
    const buttonTimer = setTimeout(() => setShowButton(true), 2000);
    return () => {
      clearTimeout(textTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Stars */}
      {stars.map((star, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: star.size + "px",
            height: star.size + "px",
            backgroundColor: "#fff",
            borderRadius: "50%",
            top: star.top + "vh",
            left: star.left + "vw",
            opacity: star.opacity,
            animation: `twinkle ${star.duration}s infinite alternate`,
          }}
        />
      ))}

      {/* Earth */}
      <img
        src="/assets/images/earth2.png"
        alt="Earth"
        style={{
          width: "80vmin",
          height: "80vmin",
          objectFit: "cover",
          borderRadius: "50%",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Where Next Text */}
      {showText && (
        <h1
          style={{
            color: "#cbe9ee",
            fontSize: "9vmin",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          Where Next!
        </h1>
      )}

      {/* Plane */}
      <img
        src="/assets/images/plane2.png"
        alt="Plane"
        style={{
          position: "absolute",
          width: "130px",
          height: "130px",
          top: "70%",
          left: "-150px",
          animation: "flyPlane 18s ease-in-out forwards",
        }}
      />

      {/* Let's Go Button */}
      {showButton && (
        <button
          style={{
            position: "absolute",
            bottom: "5%",
            right: "5%",
            padding: "0.8rem 1.5rem",
            fontSize: "1.4rem",
            borderRadius: "10px",
            border: "none",
            backgroundColor: "#00cfff",
            cursor: "pointer",
          }}
          onClick={() => navigate("/auth")}
        >
          Let's Go
        </button>
      )}

      <style>
        {`
          @keyframes twinkle {
            from { opacity: 0.2; }
            to { opacity: 1; }
          }
          @keyframes flyPlane {
            0% { left: -150px; top: 70%; transform: rotate(10deg); }
            40% { left: 40%; top: 40%; transform: rotate(20deg); }
            70% { left: 70%; top: 30%; transform: rotate(15deg); }
            100% { left: 88%; top: 75%; transform: rotate(0deg); }
          }
        `}
      </style>
    </div>
  );
};

export default SplashPage;



