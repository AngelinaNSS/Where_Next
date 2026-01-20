import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FollowButton = () => {
  const [following, setFollowing] = useState(false);
  return (
    <button
      onClick={() => setFollowing(!following)}
      style={{
        padding: "6px 12px",
        borderRadius: "12px",
        border: "none",
        backgroundColor: following ? "#ccc" : "#2ecc71",
        color: "#fff",
        cursor: "pointer",
        fontWeight: "600",
        transition: "background 0.2s",
      }}
    >
      {following ? "Following" : "Follow"}
    </button>
  );
};

const WishlistPage = () => {
  const navigate = useNavigate();

  const initialWishlist = [
    { id: 1, name: "Bali, Indonesia", image: "/bali.jpg", description: "Tropical beaches, temples, and nature escapes.", liked: false },
    { id: 2, name: "Reykjavik, Iceland", image: "/icecave.jpg", description: "Northern lights, waterfalls, and volcanic landscapes.", liked: false },
    { id: 3, name: "Kyoto, Japan", image: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=2070&auto=format", description: "Temples, cherry blossoms, and rich traditional culture.", liked: false },
    { id: 4, name: "Toronto, Ontario", image: "/toronto.jpg", description: "Toronto is a bustling, multicultural city known for its iconic skyline, diverse neighborhoods, and vibrant arts scene.", liked: false },
  ];

  const [wishlist, setWishlist] = useState(initialWishlist);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDestination, setNewDestination] = useState({ name: "", description: "", image: "" });

  const filteredWishlist = wishlist.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleLike = (id) => {
    setWishlist(prev => prev.map(item => item.id === id ? { ...item, liked: !item.liked } : item));
  };

  const removeFromWishlist = (id) => {
    setWishlist(prev => prev.filter(item => item.id !== id));
  };

  const addDestination = (e) => {
    e.preventDefault();
    if (!newDestination.name || !newDestination.image) return;
    setWishlist(prev => [...prev, { ...newDestination, id: Date.now(), liked: false }]);
    setNewDestination({ name: "", description: "", image: "" });
    setShowAddForm(false);
  };

  // Explore Feed
  const trendingDestinations = [
    { id: 101, name: "Santorini, Greece", image: "/santorini.jpg" },
    { id: 102, name: "Machu Picchu, Peru", image: "/machu_p.jpg" },
    { id: 103, name: "Banff, Canada", image: "/banff2.jpg" },
  ];

  // Similar Travelers
  const similarTravelers = [
    { id: 201, name: "Alice", avatar: "/flower.jpg", common: ["Bali", "Kyoto"] },
    { id: 202, name: "Bob", avatar: "/avatarpic.jpg", common: ["Reykjavik", "Toronto"] },
    { id: 203, name: "Charlie", avatar: "/catavatar.jpg", common: ["Bali", "Santorini"] },
  ];

  return (
    <div style={{ fontFamily: "Poppins, sans-serif", background: "#f8f8f8", minHeight: "100vh", padding: "40px" }}>
      
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "30px", flexWrap: "wrap", gap: "1rem" }}>
        <button
          onClick={() => navigate(-1)}
          style={{ padding: "10px 16px", background: "#2ecc71", color: "#fff", borderRadius: "10px", border: "none", cursor: "pointer" }}
        >
          Back
        </button>
        <h1 style={{ fontSize: "2rem", color: "#2a2a2a", margin: 0 }}>Your Wishlist ✨</h1>
      </div>

      {/* Profile Preview */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "30px", gap: "16px" }}>
        <div style={{ width: "80px", height: "80px", borderRadius: "40px", background: "#ccc" }}></div>
        <div>
          <h2 style={{ margin: 0 }}>Wendy</h2>
          <p style={{ margin: 0, color: "#777" }}>Traveler & Explorer</p>
        </div>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search destinations..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: "100%", maxWidth: "400px", padding: "10px 14px", marginBottom: "20px", borderRadius: "12px", border: "1px solid #ccc", fontSize: "1rem", outline: "none", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}
      />

      {/* Add Destination Button */}
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        style={{ padding: "10px 18px", borderRadius: "14px", border: "none", background: "#3ac7d8", color: "#fff", cursor: "pointer", fontWeight: "600", marginBottom: "20px" }}
      >
        {showAddForm ? "Close Form" : "+ Add Destination"}
      </button>

      {/* Add Destination Form */}
      {showAddForm && (
        <form onSubmit={addDestination} style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "30px", background: "#fff", padding: "15px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <input type="text" placeholder="Destination Name" value={newDestination.name} onChange={(e) => setNewDestination({ ...newDestination, name: e.target.value })} style={{ padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }} required />
          <input type="text" placeholder="Image URL" value={newDestination.image} onChange={(e) => setNewDestination({ ...newDestination, image: e.target.value })} style={{ padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }} required />
          <textarea placeholder="Description" value={newDestination.description} onChange={(e) => setNewDestination({ ...newDestination, description: e.target.value })} style={{ padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }} />
          <div style={{ display: "flex", gap: "10px" }}>
            <button type="submit" style={{ padding: "8px 12px", borderRadius: "10px", background: "#2ecc71", color: "#fff", border: "none" }}>Add</button>
            <button type="button" onClick={() => setShowAddForm(false)} style={{ padding: "8px 12px", borderRadius: "10px", background: "#e74c3c", color: "#fff", border: "none" }}>Cancel</button>
          </div>
        </form>
      )}

      {/* Wishlist Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px", marginBottom: "40px" }}>
        {filteredWishlist.map((item) => (
          <div key={item.id} style={{ position: "relative", backgroundColor: "#fff", borderRadius: "14px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", cursor: "pointer", transition: "transform 0.2s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
            
            <button onClick={(e) => { e.stopPropagation(); removeFromWishlist(item.id); }} style={{ position: "absolute", top: "10px", right: "10px", padding: "6px 8px", border: "none", borderRadius: "8px", backgroundColor: "rgba(255,0,0,0.8)", color: "#fff", cursor: "pointer", fontWeight: "bold" }}>✖</button>

            <img src={item.image} alt={item.name} style={{ width: "100%", height: "170px", objectFit: "cover" }} onClick={() => navigate(`/destination/${item.id}`)} />

            <div style={{ padding: "15px" }}>
              <h3 style={{ margin: 0, color: "#b27a4c" }}>{item.name}</h3>
              <p style={{ marginTop: "8px", color: "#555", fontSize: "0.95rem" }}>{item.description}</p>
              <button onClick={(e) => { e.stopPropagation(); toggleLike(item.id); }} style={{ marginTop: "10px", padding: "6px 12px", borderRadius: "12px", border: "none", backgroundColor: item.liked ? "#ff6b81" : "#ccc", color: "#fff", cursor: "pointer", fontWeight: "600", fontSize: "0.9rem", transition: "background 0.2s" }}>
                {item.liked ? "♥ Liked" : "♡ Like"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Explore Feed */}
      <h2 style={{ fontSize: "1.6rem", marginBottom: "20px", color: "#2a2a2a" }}>Trending Destinations 🌎</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
        {trendingDestinations.map((dest) => (
          <div key={dest.id} onClick={() => navigate(`/destination/${dest.id}`)} style={{ background: "#fff", borderRadius: "14px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", cursor: "pointer", transition: "transform 0.2s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
            <img src={dest.image} alt={dest.name} style={{ width: "100%", height: "170px", objectFit: "cover" }} />
            <div style={{ padding: "12px" }}><h3 style={{ margin: 0, color: "#b27a4c" }}>{dest.name}</h3></div>
          </div>
        ))}
      </div>

      {/* Similar Travelers */}
      <h2 style={{ fontSize: "1.6rem", margin: "40px 0 20px", color: "#2a2a2a" }}>Travelers You Have Things in Common With ✈️</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "40px" }}>
        {similarTravelers.map((user) => (
          <div key={user.id} style={{ background: "#fff", borderRadius: "14px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", padding: "15px", textAlign: "center" }}>
            <img src={user.avatar} alt={user.name} style={{ width: "70px", height: "70px", borderRadius: "35px", objectFit: "cover", marginBottom: "10px" }} />
            <h3 style={{ margin: "0 0 5px 0", color: "#b27a4c" }}>{user.name}</h3>
            <p style={{ fontSize: "0.9rem", color: "#555", marginBottom: "10px" }}>Shared: {user.common.join(", ")}</p>
            <FollowButton />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredWishlist.length === 0 && (
        <p style={{ marginTop: "40px", textAlign: "center", color: "#777" }}>
          No destinations found. Start exploring!
        </p>
      )}

    </div>
  );
};

export default WishlistPage;


