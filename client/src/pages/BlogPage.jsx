import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import blogs from "../data/blogs";
import "./BlogPage.css";

const MAX_COMMENT_LENGTH = 280;

const SAMPLE_GIFS = [
  { url: "https://media.giphy.com/media/3o6Zt6ML6BklcajjsA/giphy.gif", tags: ["happy", "yay"] },
  { url: "https://media.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif", tags: ["wow", "amazing"] },
  { url: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif", tags: ["cute", "cat"] },
  { url: "https://media.giphy.com/media/26gssIytJvy1b1THO/giphy.gif", tags: ["travel", "plane"] },
  { url: "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif", tags: ["sun", "happy"] },
  { url: "https://media.giphy.com/media/l0ExncehJzexFpRHq/giphy.gif", tags: ["party", "cheers"] },
  { url: "https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif", tags: ["thumbs", "like"] },
  { url: "https://media.giphy.com/media/3oEjHU1l8sLwZ6Qh5K/giphy.gif", tags: ["excited"] },
];

const EMOJI_PALETTE = ["❤️", "😍", "🔥", "😂", "👏", "🤩", "🌍", "✈️", "🎒", "📸"];

const BlogPage = () => {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const traveler = blogs ? blogs[blogId] : undefined;

  // Comments state (local only) - a few sample comments
  const [comments, setComments] = useState([
    { user: "Emily", text: "This trip looks amazing!", likes: 4, liked: false, gif: null },
    { user: "Leo", text: "Adding this to my bucket list 😍", likes: 7, liked: false, gif: SAMPLE_GIFS[1].url },
    { user: "Maya", text: "Those photos are stunning 🔥", likes: 2, liked: false, gif: null },
    { user: "Owen", text: "Best itinerary ever!", likes: 1, liked: false, gif: SAMPLE_GIFS[3].url },
    { user: "Zara", text: "I want to go now 😭", likes: 5, liked: false, gif: null },
  ]);

  const [newComment, setNewComment] = useState("");
  const [selectedGif, setSelectedGif] = useState(null); // URL
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [gifSearch, setGifSearch] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);

  const gifLibrary = useMemo(() => {
    // In a real app you might fetch GIPHY/Tenor. For now we filter SAMPLE_GIFS
    const qs = gifSearch.trim().toLowerCase();
    if (!qs) return SAMPLE_GIFS;
    return SAMPLE_GIFS.filter(g => g.tags.join(" ").includes(qs) || g.url.includes(qs));
  }, [gifSearch]);

  const visibleComments = showAllComments ? comments : comments.slice(0, 3);

  // Add new comment
  const addComment = () => {
    const text = newComment.trim();
    if (!text && !selectedGif) return; // require content
    if (text.length > MAX_COMMENT_LENGTH) return;

    const newC = {
      user: "You",
      text,
      likes: 0,
      liked: false,
      gif: selectedGif,
      createdAt: Date.now(),
    };
    setComments([newC, ...comments]);
    setNewComment("");
    setSelectedGif(null);
    setShowGifPicker(false);
    setShowEmojiPicker(false);
    setGifSearch("");
    setShowAllComments(true); // show newest immediately
  };

  // Toggle like
  const toggleLike = (index) => {
    const updated = [...comments];
    updated[index].liked = !updated[index].liked;
    updated[index].likes += updated[index].liked ? 1 : -1;
    setComments(updated);
  };

  // Insert emoji to input at cursor (simple append)
  const insertEmoji = (emoji) => {
    setNewComment((s) => (s ? s + " " + emoji : emoji));
  };

  // Add GIF by URL (allow user to paste GIF url)
  const addCustomGif = () => {
    const url = prompt("Paste a GIF URL (direct link ending with .gif or hosted).");
    if (!url) return;
    setSelectedGif(url);
    setShowGifPicker(false);
  };

  if (!traveler) {
    return (
      <div className="blog-not-found">
        <div className="blog-not-found-inner">
          <h1>Blog not found</h1>
          <button onClick={() => navigate(-1)}>Go back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page">
      {/* HEADER */}
      <header className="blog-header">
        <h1 className="blog-logo">Where Next</h1>
        <button className="back-btn" onClick={() => navigate(-1)}>
          Back
        </button>
      </header>

      {/* HERO */}
      {traveler.heroImage && (
        <div className="blog-hero">
          <img src={traveler.heroImage} alt={traveler.title} />
          <div className="blog-hero-overlay">
            <h2>{traveler.name}</h2>
          </div>
        </div>
      )}

      {/* MAIN */}
      <div className="blog-container">
        {/* SIDEBAR */}
        <aside className={`blog-sidebar ${isMobile ? "mobile" : ""}`}>
          <img
            className="sidebar-img"
            src={traveler.image || "https://via.placeholder.com/300x300"}
            alt={traveler.name}
          />

          <h3 className="sidebar-name">{traveler.name}</h3>
          <p className="sidebar-bio">{traveler.bio}</p>

          {/* Travel Tips */}
          {traveler.tips && (
            <div className="sidebar-section">
              <h4>Travel Tips</h4>
              <ul>
                {traveler.tips.map((t, idx) => (
                  <li key={idx}>{t}</li>
                ))}
              </ul>
            </div>
          )}

          {/* COMMENTS SECTION */}
          <div className="comments-section">
            <h4>Comments</h4>

            {/* Comment input area */}
            <div className="comment-input-row enhanced">
              <div className="input-left">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={newComment}
                  maxLength={MAX_COMMENT_LENGTH}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <div className="controls-row">
                  <button
                    className="tiny-btn"
                    onClick={() => setShowEmojiPicker((s) => !s)}
                    title="Emoji"
                  >
                    😊
                  </button>

                  <button
                    className="tiny-btn"
                    onClick={() => setShowGifPicker((s) => !s)}
                    title="GIF"
                  >
                    GIF
                  </button>

                  <button className="tiny-btn" onClick={addCustomGif} title="Paste GIF URL">
                    ➕GIF
                  </button>

                  <div className="char-counter">
                    {newComment.length}/{MAX_COMMENT_LENGTH}
                  </div>
                </div>

                {/* Emoji picker */}
                {showEmojiPicker && (
                  <div className="emoji-picker">
                    {EMOJI_PALETTE.map((em, i) => (
                      <button
                        key={i}
                        className="emoji-btn"
                        onClick={() => insertEmoji(em)}
                        aria-label={`emoji-${i}`}
                      >
                        {em}
                      </button>
                    ))}
                  </div>
                )}

                {/* GIF picker */}
                {showGifPicker && (
                  <div className="gif-picker">
                    <div className="gif-search-row">
                      <input
                        type="search"
                        placeholder="Search GIFs (try: travel, cat, happy)"
                        value={gifSearch}
                        onChange={(e) => setGifSearch(e.target.value)}
                      />
                      <button className="tiny-btn" onClick={() => setGifSearch("")}>
                        Clear
                      </button>
                    </div>
                    <div className="gif-grid">
                      {gifLibrary.map((g, i) => (
                        <button
                          key={i}
                          className={`gif-thumb ${selectedGif === g.url ? "selected" : ""}`}
                          onClick={() => setSelectedGif(g.url)}
                        >
                          <img src={g.url} alt={`gif-${i}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Selected GIF preview */}
                {selectedGif && (
                  <div className="selected-gif-preview">
                    <img src={selectedGif} alt="selected gif" />
                    <button className="remove-gif" onClick={() => setSelectedGif(null)}>
                      Remove
                    </button>
                  </div>
                )}
              </div>

              <div className="input-right">
                <button
                  className="send-comment-btn"
                  onClick={addComment}
                  disabled={newComment.trim().length === 0 && !selectedGif}
                >
                  Post
                </button>
              </div>
            </div>

            {/* COMMENT LIST */}
            <div className="comment-list">
              {visibleComments.map((comment, idx) => (
                <div className="comment-item" key={idx}>
                  <div className="comment-avatar">
                    {comment.user ? comment.user[0].toUpperCase() : "U"}
                  </div>

                  <div className="comment-body">
                    <div className="comment-head">
                      <strong className="comment-name">{comment.user}</strong>
                      <div className="comment-actions">
                        <button
                          className={`heart-btn ${comment.liked ? "liked" : ""}`}
                          onClick={() => toggleLike(idx)}
                          aria-label="like"
                        >
                          ❤️
                        </button>
                        <span className="like-count">{comment.likes}</span>
                      </div>
                    </div>

                    <p className="comment-text">{comment.text}</p>

                    {comment.gif && (
                      <div className="comment-gif">
                        <img src={comment.gif} alt="comment gif" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Show more */}
            {comments.length > 3 && (
              <div className="show-more-row">
                <button className="ghost-btn" onClick={() => setShowAllComments((s) => !s)}>
                  {showAllComments ? "Show fewer" : `Show more (${comments.length - 3})`}
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* MAIN ARTICLE */}
        <main className="blog-main">
          {traveler.story && (
            <section className="blog-card">
              {traveler.story.split("\n\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </section>
          )}

          {traveler.sections &&
            traveler.sections.map((section, idx) => (
              <section key={idx} className="blog-card">
                <h3 className="section-title">{section.title}</h3>

                {section.image && (
                  <img src={section.image} alt={section.title} className="section-img" />
                )}

                <p>{section.text}</p>
              </section>
            ))}
        </main>
      </div>
    </div>
  );
};

export default BlogPage;


