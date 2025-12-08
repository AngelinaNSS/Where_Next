import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProfilePage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("Wendy_1289");
  const [bio, setBio] = useState("Adventurer of dreams.");
  const [hobbies, setHobbies] = useState("");
  const [favoritePlace, setFavoritePlace] = useState("");
  const [nextDestination, setNextDestination] = useState("");
  const [profilePic, setProfilePic] = useState("/profile.jpg");

  const colors = {
    bgGradient: "linear-gradient(180deg, #fff7fb 0%, #f7fff9 100%)",
    accentAqua: "#9DE6E6",
    accentPink: "#FF9DB7",
    card: "#ffffff",
  };

  return (
    <>
      <style>{`
        /* GLOBAL HARD FIX TO BLOCK SIDEWAYS SCROLL */
        * {
          box-sizing: border-box;
        }

        html, body {
          margin: 50;
          padding: 100;
          width: 100%;
          
        }

        #root {
          width: 100%;
          height: 100%:
        }

        /* PAGE LAYOUT */
        .page-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          overflow-x: hidden !important;
          background: ${colors.bgGradient};
          padding: 3rem 1rem;
          min-height: 10vh;
          font-family: 'Poppins', sans-serif;
        }

        .profile-card {
          width: 100%;
          max-width: 500px;
          background: #fff;
          border-radius: 50px;
          padding: 2rem;
          box-shadow: 0 28px 28px rgba(0,0,0,0.08);
          position: relative;
        }

        .title {
          text-align: center;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 3.7rem;
          color: ${colors.accentAqua};
        }

        .back {
          position: absolute;
          top: 16px;
          left: 16px;
          background: linear-gradient(90deg, ${colors.accentPink}, ${colors.accentAqua});
          color: #fff;
          padding: .55rem 1rem;
          border: none;
          border-radius: 999px;
          cursor: pointer;
          font-weight: 600;
          font-size: .9rem;
          box-shadow: 0 6px 20px rgba(0,0,0,0.1);
          transition: 0.2s ease;
        }
        .back:hover { transform: translateY(-3px); }

        .pic-area {
          text-align: center;
          margin-bottom: 1.6rem;
        }

        .pic {
          width: 130px;
          height: 130px;
          border-radius: 50%;
          object-fit: cover;
          border: 5px solid ${colors.accentAqua};
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        .label {
          font-weight: 600;
          font-size: .95rem;
          margin-bottom: 8px;
          color: #333;
          display: block;
        }

        .input, .textarea {
          width: 100%;
          padding: 12px;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.1);
          background: #fff;
          font-size: 1rem;
          margin-bottom: 1.5rem;
        }

        .textarea {
          resize: none;
          height: 80px;
        }

        .save-btn {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(90deg, ${colors.accentAqua}, ${colors.accentPink});
          color: #fff;
          font-size: 1.15rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(157,230,230,0.25);
          transition: 0.25s ease;
        }
        .save-btn:hover {
          transform: translateY(-4px);
        }
      `}</style>

      {/* No SIDEWAYS OVERFLOW */}
      <div className="page-wrapper">

        <div className="profile-card">
          <button className="back" onClick={() => navigate(-1)}>← Back</button>

          <h1 className="title">Edit Profile</h1>

          <div className="pic-area">
            <img src={profilePic} className="pic" alt="profile" />
            <input
              type="file"
              accept="image/*"
              style={{ marginTop: "12px" }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setProfilePic(URL.createObjectURL(file));
              }}
            />
          </div>

          <label className="label">Name</label>
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="label">Bio</label>
          <textarea
            className="textarea"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <label className="label">Hobbies</label>
          <input
            className="input"
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
            placeholder="e.g., Hiking, Reading"
          />

          <label className="label">Favorite Place</label>
          <input
            className="input"
            value={favoritePlace}
            onChange={(e) => setFavoritePlace(e.target.value)}
            placeholder="e.g., Bali, Paris"
          />

          <label className="label">Next Destination</label>
          <input
            className="input"
            value={nextDestination}
            onChange={(e) => setNextDestination(e.target.value)}
            placeholder="e.g., Japan"
          />

          <button className="save-btn" onClick={() => navigate("/profile")}>
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default EditProfilePage;

