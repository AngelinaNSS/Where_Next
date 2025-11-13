import React from "react";
import { useNavigate } from "react-router-dom";

const BlogPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "1rem" }}>
        Back
      </button>
      <h1>Blog Page</h1>
      <p>This is where the full blog content will show.</p>
    </div>
  );
};

export default BlogPage;
