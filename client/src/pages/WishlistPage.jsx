import React from "react";
import { useNavigate } from "react-router-dom";

const WishlistPage = () => {
  const navigate = useNavigate();

  // Temporary demo wishlist items
  const wishlist = [
    {
      id: 1,
      name: "Bali, Indonesia",
      image:"/bali.jpg",
        description: "Tropical beaches, temples, and nature escapes.",
    },
    {
      id: 2,
      name: "Reykjavik, Iceland",
      image:
        "/icecave.jpg",
      description: "Northern lights, waterfalls, and volcanic landscapes.",
    },
    {
      id: 3,
      name: "Kyoto, Japan",
      image:
        "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=2070&auto=format",
      description: "Temples, cherry blossoms, and rich traditional culture.",
    },
  {
  id: 4,
  name: "Toronto, Ontario",
  image: "/toronto.jpg", 
  description: "Toronto is a bustling, multicultural city known for its iconic skyline, diverse neighborhoods, and vibrant arts scene."
}
  ];

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "Poppins, sans-serif",
        backgroundColor: "#f8f8f8",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "30px" }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: "10px 16px",
            background: "#2ecc71",
            color: "#fff",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            marginRight: "20px",
          }}
        >
          Back
        </button>

        <h1 style={{ fontSize: "2rem", color: "#2a2a2a", margin: 0 }}>
          Your Wishlist ✨
        </h1>
      </div>

      {/* Wishlist Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
        }}
      >
        {wishlist.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/destination/${item.id}`)}
            style={{
              backgroundColor: "#fff",
              borderRadius: "14px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              cursor: "pointer",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{ width: "100%", height: "170px", objectFit: "cover" }}
            />

            <div style={{ padding: "15px" }}>
              <h3 style={{ margin: 0, color: "#b27a4c" }}>{item.name}</h3>
              <p style={{ marginTop: "8px", color: "#555", fontSize: "0.95rem" }}>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {wishlist.length === 0 && (
        <p style={{ marginTop: "40px", textAlign: "center", color: "#777" }}>
          No destinations saved yet. Start exploring!
        </p>
      )}
    </div>
  );
};

export default WishlistPage;
