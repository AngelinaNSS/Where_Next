import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiTreasureMap } from "react-icons/gi";
import { MdInsights } from "react-icons/md"; 
import { destinationsData } from "../data/destinations";



const ProfilePage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
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
    brown: "#d4a373",
    cardShadow: "0 4px 12px rgba(0,0,0,0.1)",
  };

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

        <div style={{ display: "flex", gap: "0.8rem", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search city or country..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && query.trim() !== "") {
                navigate(`/search/${query}`);
              }
            }}
            style={{
              width: isMobile ? "55vw" : "28vw",
              maxWidth: "520px",
              padding: "0.8rem 1rem",
              borderRadius: "12px",
              border: `1px solid ${colors.brown}`,
              fontSize: "1rem",
              outline: "none",
              backgroundColor: colors.white,
            }}
          />

          <button
            onClick={() => navigate("/auth")}
            style={{
              backgroundColor: "#a7c7b7",
              color: colors.text,
              border: "none",
              borderRadius: "10px",
              padding: "0.7rem 1.2rem",
              cursor: "pointer",
              fontWeight: "600",
              transition: "0.3s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = colors.green)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#a7c7b7")
            }
          >
            Back
          </button>
        </div>
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
        {/* Sidebar */}
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
          {/* Profile Picture & Name */}
<div
  style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
>
  <img
    src="/profile.jpg"
    alt="Black woman portrait" 
    style={{
      width: "90px",
      height: "90px",
      borderRadius: "50%",
      marginRight: "1rem",
      objectFit: "cover",
    }}
  />
  <div>
    <h2 style={{ margin: 0, fontSize: "1.4rem", color: colors.green }}>
      Wendy_1289
    </h2>
    <span style={{ fontSize: "0.95rem", color: "#666" }}>Adventurer</span>
  </div>
</div>


          {/* Bio */}
          <p style={{ margin: "0.8rem 0", color: "#444", lineHeight: 1.5 }}>
            Hi, I'm Wendy — explorer and storyteller sharing global travel
            experiences. Expect sustainable travel tips, itineraries, and honest
            reflections from the road.
          </p>

          {/* Quick facts */}
          <div style={{ display: "grid", gap: "0.5rem", marginTop: "1rem" }}>
            <div>
              <strong>Hobbies:</strong> Hiking, Photography, Local Cuisine
            </div>
            <div>
              <strong>Favorite place:</strong> Kyoto, Japan
            </div>
            <div>
              <strong>Next destination:</strong> Iceland
            </div>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginTop: "1rem",
              fontWeight: "600",
              color: "#333",
            }}
          >
            <span>Followers: 1280</span>
            <span>Following: 245</span>
          </div>

          {/* Map Button */}
          <div style={{ marginTop: "1rem" }}>
            <button
              onClick={() => navigate("/travel-map")}
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
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = colors.yellowHover)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = colors.yellow)
              }
            >
              
              Take the Quiz
            </button>
          </div>

          {/* NEW PROGRESS BUTTON */}
          <div style={{ marginTop: "1rem" }}>
            <button
              onClick={() => navigate("/progress")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.6rem 1rem",
                borderRadius: "10px",
                border: "none",
                backgroundColor: "#3b82f6",
                color: "#fff",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "0.95rem",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#3b82f6")}
            >
              <MdInsights size={20} />
              My Progress
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <main style={{ flex: 1, minWidth: 0 }}>
          
          
          
          
          {/* Destinations For You */}
<section
  style={{
    marginBottom: "2rem",
    backgroundColor: colors.white,
    borderRadius: "16px",
    boxShadow: colors.cardShadow,
    padding: "1.5rem",
  }}
>
  <h2
    style={{ color: colors.green, marginBottom: "1rem", fontSize: "1.6rem" }}
  >
    Destinations For You
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "1.2rem",
    }}
  >
    {[
      {
        id: 1,
        name: "Kyoto, Japan",
        image: "/kyoto.jpg",
        tagline: "Kyoto is a city full of temples, gardens, and timeless tradition. Perfect for travelers who love history and culture.",
      },
      {
        id: 2,
        name: "Cape Town, South Africa",
        image: "/capetown.jpg",
        tagline: "Cape Town offers stunning beaches, mountains, and vibrant culture. Great for adventurers and nature lovers.",
      },
      {
        id: 3,
        name: "Reykjavik, Iceland",
        image: "/iceland.jpg",
        tagline: "Reykjavik is the gateway to Iceland's glaciers, hot springs, and northern lights. Ideal for nature enthusiasts.",
      },
      {
        id: 4,
        name: "Bali, Indonesia",
        image:
          "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60",
        tagline: "Bali has beautiful beaches, rice fields, and spiritual retreats. Perfect for relaxation and cultural exploration.",
  },

    ].map((dest) => (
      
      <div
        key={dest.id}
        onClick={() => navigate(`/destination/${dest.id}`)}
        style={{
          cursor: "pointer",
          backgroundColor: colors.white,
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid #eee",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow =
            "0 8px 16px rgba(0,0,0,0.12)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "none";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* Destination Image */}
        <div
          style={{
            height: "160px",
            backgroundImage: `url(${dest.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Destination Info */}
        <div style={{ padding: "0.9rem" }}>
          <h3 style={{ color: colors.brown, margin: 0 }}>{dest.name}</h3>
          <p style={{ color: "#444", margin: "0.4rem 0 0" }}>
            {dest.tagline}
          </p>
        </div>
      </div>
    ))}
  </div>
</section>


          {/* Trending Blogs */}
          <section
            style={{
              backgroundColor: colors.white,
              borderRadius: "16px",
              boxShadow: colors.cardShadow,
              padding: "1.5rem",
            }}
          >
            <h2
              style={{ color: colors.green, marginBottom: "1rem", fontSize: "1.6rem" }}
            >
              Trending Blogs
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "1.2rem",
              }}
            >
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  onClick={() => navigate(`/blog/${i}`)}
                  style={{
                    cursor: "pointer",
                    backgroundColor: colors.white,
                    borderRadius: "12px",
                    padding: "1rem",
                    border: "1px solid #eee",
                    transition:
                      "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 16px rgba(0,0,0,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <h3 style={{ color: colors.brown, margin: 0 }}>
                    Blog Title {i}
                  </h3>
                  <p style={{ color: "#444", margin: "0.4rem 0 0" }}>
                    Backpacking Bangkok — My First Day!
                  </p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;


