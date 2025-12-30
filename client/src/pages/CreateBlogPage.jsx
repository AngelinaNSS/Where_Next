import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateBlogPage = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // preview only
    }
  };

  const handlePublish = () => {
    const newBlog = {
      id: Date.now(),
      title,
      location,
      content,
      isPublic,
      image,
    };

    // TEMP STORAGE: We can replace this with Firebase or your backend later
    const existing = JSON.parse(localStorage.getItem("blogs") || "[]");
    existing.push(newBlog);
    localStorage.setItem("blogs", JSON.stringify(existing));

    navigate("/profile"); // or /my-blogs
  };

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        padding: "2rem",
        background: "linear-gradient(135deg, #fee3f0, #c1eff2, #ffffff)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          background: "rgba(255,255,255,0.9)",
          padding: "2.5rem",
          borderRadius: "24px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h1
          style={{
            marginBottom: "1.2rem",
            textAlign: "center",
            background: "linear-gradient(90deg, #3ac7d8, #6ee7e0)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontSize: "2rem",
            fontWeight: 700,
          }}
        >
          Create Your Blog
        </h1>

        {/* Upload Image */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ fontWeight: 600 }}>Cover Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ marginTop: "0.5rem" }}
          />

          {image && (
            <img
              src={image}
              alt="Preview"
              style={{
                width: "100%",
                marginTop: "1rem",
                borderRadius: "14px",
                objectFit: "cover",
              }}
            />
          )}
        </div>

        {/* Title */}
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />

        {/* Location */}
        <input
          type="text"
          placeholder="Location (optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={inputStyle}
        />

        {/* Blog Content */}
        <textarea
          placeholder="Write your story..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            ...inputStyle,
            height: "180px",
            resize: "vertical",
            padding: "1rem",
          }}
        />

        {/* Visibility Toggle */}
        <div
          style={{
            margin: "1rem 0",
            display: "flex",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <label style={{ fontWeight: 600 }}>Visibility:</label>

          <select
            value={isPublic ? "public" : "private"}
            onChange={(e) => setIsPublic(e.target.value === "public")}
            style={{
              padding: "0.6rem",
              borderRadius: "10px",
              border: "1px solid #ccc",
            }}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        {/* Publish Button */}
        <button
          onClick={handlePublish}
          style={{
            width: "100%",
            padding: "1rem",
            marginTop: "1rem",
            border: "none",
            borderRadius: "16px",
            background: "linear-gradient(135deg, #8be3ff, #f9bddb)",
            color: "white",
            fontWeight: 600,
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
        >
          Publish Blog
        </button>

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            width: "100%",
            padding: "0.9rem",
            marginTop: "1rem",
            background: "#e3e3e3",
            border: "none",
            borderRadius: "14px",
            cursor: "pointer",
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "0.9rem",
  borderRadius: "14px",
  border: "1px solid #ccc",
  marginBottom: "1rem",
  fontSize: "1rem",
  background: "white",
};

export default CreateBlogPage;
