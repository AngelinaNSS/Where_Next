import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault(); // prevent form from refreshing page
    if (!query.trim()) return; // ignore empty search
    navigate(`/search/${query}`);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Poppins, sans-serif" }}>
      <h1>Where Next?</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Type a city or country..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            fontSize: "16px",
            marginRight: "10px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Home;
