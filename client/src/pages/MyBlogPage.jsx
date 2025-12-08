import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { myBlogs } from "../data/myBlogs";

const MyBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const blog = myBlogs.find((b) => b.id === Number(id));

  if (!blog) {
    return (
      <div style={{ padding: 40 }}>
        <h1>Blog not found</h1>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", paddingBottom: 60 }}>
      {/* Top Navigation */}
      <div
        style={{
          padding: "1rem 2rem",
          borderBottom: "1px solid #eee",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          background: "#fff",
          zIndex: 10,
        }}
      >
        <h2 style={{ margin: 0 }}>My Blog</h2>

        <button
          onClick={() => navigate(`/edit-blog/${blog.id}`)}
          style={{
            padding: ".5rem 1rem",
            background: "#FFB400",
            border: "none",
            borderRadius: "8px",
            color: "#fff",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Edit Blog
        </button>
      </div>

      {/* HERO IMAGE */}
      <div style={{ width: "100%", maxHeight: 480, overflow: "hidden" }}>
        <img
          src={blog.heroImage}
          alt={blog.title}
          style={{ width: "100%", objectFit: "cover" }}
        />
      </div>

      <div style={{ padding: "2rem", maxWidth: 900, margin: "0 auto" }}>
        {/* TITLE */}
        <h1 style={{ marginBottom: 16 }}>{blog.title}</h1>

        {/* STORY */}
        <p style={{ lineHeight: 1.7, whiteSpace: "pre-line" }}>{blog.story}</p>

        {/* SECTIONS */}
        {blog.sections.map((sec, idx) => (
          <div
            key={idx}
            style={{
              marginTop: 30,
              padding: 20,
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <h2>{sec.title}</h2>
            {sec.image && (
              <img
                src={sec.image}
                alt={sec.title}
                style={{
                  width: "100%",
                  borderRadius: 10,
                  margin: "12px 0",
                }}
              />
            )}
            <p>{sec.text}</p>
          </div>
        ))}

        {/* COMMENTS */}
        <div
          style={{
            marginTop: 40,
            padding: 20,
            background: "#ffffff",
            borderRadius: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Comments</h2>

          {blog.comments.length === 0 && (
            <p style={{ color: "#666" }}>No comments yet.</p>
          )}

          {blog.comments.map((c, i) => (
            <div
              key={i}
              style={{
                marginBottom: 14,
                paddingBottom: 10,
                borderBottom: "1px solid #eee",
              }}
            >
              <strong>{c.user}</strong>
              <p style={{ margin: "4px 0" }}>{c.text}</p>
              <span style={{ fontSize: 12, color: "#ff3b7b" }}>
                ❤️ {c.likes}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBlogPage;
