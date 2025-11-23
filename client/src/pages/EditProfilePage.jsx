import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProfilePage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("Wendy_1289");
  const [bio, setBio] = useState("Adventurer of dreams.");
  const [profilePic, setProfilePic] = useState("/profile.jpg");
  const [hobbies, setHobbies] = useState("");
  const [favoritePlace, setFavoritePlace] = useState("");
  const [nextDestination, setNextDestination] = useState("");

  const handleSave = () => {
    // Save logic can be added here later
    navigate("/profile");
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
        <button
  onClick={() => navigate(-1)} // goes back to the previous page
  style={{
    marginBottom: "1.5rem",
    padding: "8px 14px",
    backgroundColor: "#eee",
    color: "#333",
    border: "1px solid #ccc",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  }}
>
  ← Back
</button>

      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "20px",
          border: "2px solid #ccc",
          boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
        }}
      >
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            marginBottom: "1rem",
            padding: "8px 14px",
            backgroundColor: "#eee",
            color: "#333",
            border: "1px solid #ccc",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          ← Back
        </button>

        {/* Title */}
        <h1
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            color: "#007f5f",
            fontSize: "1.8rem",
          }}
        >
          Edit Profile
        </h1>

        {/* Profile Picture */}
        <div style={{ textAlign: "center" }}>
          <img
            src={profilePic}
            alt="profile"
            style={{
              width: "130px",
              height: "130px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "4px solid #007f5f",
              marginBottom: "1rem",
            }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) setProfilePic(URL.createObjectURL(file));
            }}
            style={{ marginTop: "0.5rem" }}
          />
        </div>

        {/* Name */}
        <div style={{ marginTop: "1.5rem" }}>
          <label style={{ fontWeight: "600" }}>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              marginTop: "6px",
            }}
          />
        </div>

        {/* Bio */}
        <div style={{ marginTop: "1.5rem" }}>
          <label style={{ fontWeight: "600" }}>Bio:</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows="4"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              marginTop: "6px",
            }}
          />
        </div>

        {/* Hobbies */}
        <div style={{ marginTop: "1.5rem" }}>
          <label style={{ fontWeight: "600" }}>Hobbies:</label>
          <input
            type="text"
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
            placeholder="e.g., Hiking, Reading"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              marginTop: "6px",
            }}
          />
        </div>

        {/* Favorite Place */}
        <div style={{ marginTop: "1.5rem" }}>
          <label style={{ fontWeight: "600" }}>Favorite Place:</label>
          <input
            type="text"
            value={favoritePlace}
            onChange={(e) => setFavoritePlace(e.target.value)}
            placeholder="e.g., Paris, Bali"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              marginTop: "6px",
            }}
          />
        </div>

        {/* Next Destination */}
        <div style={{ marginTop: "1.5rem" }}>
          <label style={{ fontWeight: "600" }}>Next Destination:</label>
          <input
            type="text"
            value={nextDestination}
            onChange={(e) => setNextDestination(e.target.value)}
            placeholder="e.g., Tokyo"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              marginTop: "6px",
            }}
          />
        </div>

        <button
          onClick={handleSave}
          style={{
            marginTop: "2rem",
            width: "100%",
            padding: "12px",
            background: "#007f5f",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            fontSize: "1.1rem",
            cursor: "pointer",
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfilePage;



