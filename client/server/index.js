const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// In-memory posts array
const posts = [];

// Root
app.get("/", (req, res) => {
  res.send("Hello! Backend is working.");
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend is running!" });
});

// GET all posts
app.get("/api/posts", (req, res) => {
  res.json(posts);
});

// POST a new post
app.post("/api/posts", (req, res) => {
  const { title, content } = req.body;
  const post = { id: posts.length + 1, title, content };
  posts.push(post);
  res.json(post);
});

// Serve test HTML file
app.get("/test-post", (req, res) => {
  res.sendFile(path.join(__dirname, "test-post.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));




