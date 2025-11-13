import React from "react";
import { useNavigate } from "react-router-dom";

const VideoPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "1rem" }}>
        Back
      </button>
      <h1>Video Page</h1>
      <p>This is where the video will play.</p>
    </div>
  );
};

export default VideoPage;
