import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiTreasureMap } from "react-icons/gi";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: "#f9f7f3",
        color: "#2c2c2c",
        fontFamily: "'Poppins', sans-serif",
        padding: "2rem",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", color: "#007f5f" }}>Where Next</h1>
        <button
          onClick={() => navigate("/auth")}
          style={{
            backgroundColor: "#a7c7b7",
            color: "#2c2c2c",
            border: "none",
            borderRadius: "10px",
            padding: "0.7rem 1.4rem",
            cursor: "pointer",
            fontWeight: "600",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#007f5f")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#a7c7b7")}
        >
          Back
        </button>
      </div>

      {/* Personal Profile */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "3rem",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "1.5rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        {/* Profile Picture */}
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            marginRight: "1.5rem",
          }}
        />
        {/* Name, Bio, Stats */}
        <div>
          <h2 style={{ margin: 0, fontSize: "1.8rem", color: "#007f5f" }}>
            Wendy_1289
          </h2>
          <p style={{ margin: "0.5rem 0", color: "#444" }}>
            Hi, I'm Wendy, I am an adventurer, explorer, and storyteller sharing my global travel experiences. Enjoy my page describing all of my travel experiences for the past few years. I have the best tips on how to travel sustainably.  
             </p>

             <div style={{ marginBottom: "0.5rem" }}>
      <strong>Hobbies:</strong> Hiking, Photography, Local Cuisine
    </div>
    <div style={{ marginBottom: "0.5rem" }}>
      <strong>Favorite place visited:</strong> Kyoto, Japan
    </div>
    <div style={{ marginBottom: "0.5rem" }}>
      <strong>Next destination:</strong> Iceland
    </div>

    <div style={{ display: "flex", gap: "1.5rem", fontWeight: "500" }}>
      <span>Followers: 1280</span>
      <span>Following: 245</span>

      <div style={{ marginTop: "1rem" }}>
  <button
    onClick={() => navigate("/travel-map")}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.5rem 1rem",
      borderRadius: "10px",
      border: "none",
      backgroundColor: "#FFB400", // bright fun color
      color: "#fff",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "0.9rem",
      transition: "0.3s",
    }}
    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#E59400")}
    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#FFB400")}
  >
    <GiTreasureMap size={20} />
    My Travel Map
  </button>
</div>


          </div>
        </div>
      </div>

      {/* Search Bar */}
      {/* Search Bar */}
<div style={{ textAlign: "center", marginBottom: "3rem" }}>
  <input
    type="text"
    placeholder="Search for a city or country..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter" && query.trim() !== "") {
        navigate(`/search/${query}`);
      }
    }}
    style={{
      width: "60%",
      padding: "1rem",
      borderRadius: "12px",
      border: "1px solid #d4a373",
      fontSize: "1.1rem",
      outline: "none",
      backgroundColor: "#fff",
    }}
  />
</div>


      {/* Recommended Videos */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ color: "#007f5f", marginBottom: "1.2rem", fontSize: "1.8rem" }}>
          Recommended Videos
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.8rem",
          }}
        >
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              onClick={() => navigate("/blog")}
              style={{
                cursor: "pointer",
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <h3 style={{ color: "#d4a373" }}>Blog Title {i}</h3>
              <p style={{ color: "#444" }}>
             A short preview of the blog post content goes here...
              </p>
              </div>


          ))}
        </div>
      </section>
      

      {/* Trending Blogs */}
      <section>
        <h2 style={{ color: "#007f5f", marginBottom: "1.2rem", fontSize: "1.8rem" }}>
          Trending Blogs
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.8rem",
          }}
        >
          {[1, 2, 3, 4].map((i) => (
            <div
  key={i}
  onClick={() => navigate("/blog")}
  style={{
    cursor: "pointer",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "1.4rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease",
  }}
  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
>

              <h3 style={{ color: "#d4a373" }}>Blog Title {i}</h3>
              <p style={{ color: "#444" }}>
                A short preview of the blog post content goes here...
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
