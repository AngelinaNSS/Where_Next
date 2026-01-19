import React from "react";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        padding: "2rem",
        background: "linear-gradient(135deg, #fee3f0, #c1eff2, #ffffff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
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
        {/* Title */}
        <h1
          style={{
            marginBottom: "1.5rem",
            textAlign: "center",
            background: "linear-gradient(90deg, #3ac7d8, #6ee7e0)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontSize: "2.2rem",
            fontWeight: 700,
          }}
        >
          About Us
        </h1>

        {/* About the Platform */}
        <section style={{ marginBottom: "2rem" }}>
          <h2 style={sectionTitle}>Our Platform</h2>
          <p style={paragraph}>
            Our platform is a space created for aspiring travelers to share
            their moments, stories, and experiences from around the world.
            It offers an opportunity to preserve travel memories in a digital
            format while connecting with people who share the same passion
            for exploration.
          </p>
          <p style={paragraph}>
            Whether it’s a short city escape or a life-changing journey,
            this platform allows users to inspire one another, exchange
            insights, and discover destinations through real stories told
            by real people.
          </p>
        </section>

        {/* Mission */}
        <section style={{ marginBottom: "2rem" }}>
          <h2 style={sectionTitle}>Our Mission</h2>
          <p style={paragraph}>
            We believe travel is more than visiting places — it’s about
            connection, learning, and shared experiences. Our mission is to
            create a welcoming digital environment where travelers from
            different backgrounds can learn from one another and feel inspired
            to explore the world with curiosity and respect.
          </p>
        </section>

        {/* Founders */}
        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={sectionTitle}>The Creators</h2>
          <p style={paragraph}>
            This platform was founded in 2026 by two tech students with a
            shared curiosity for different cultures, countries, and stories.
            Inspired by the experiences of others, we wanted to build a space
            where technology and storytelling come together.
          </p>
          <p style={paragraph}>
            As students, we are continuously learning — not only about
            software development, but also about the world through the
            perspectives of fellow travelers. This project reflects our
            passion for creativity, connection, and meaningful digital
            experiences.
          </p>
        </section>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            width: "100%",
            padding: "0.9rem",
            background: "#e3e3e3",
            border: "none",
            borderRadius: "14px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

/* Shared styles */
const sectionTitle = {
  fontSize: "1.4rem",
  fontWeight: 600,
  marginBottom: "0.6rem",
  color: "#333",
};

const paragraph = {
  fontSize: "1rem",
  lineHeight: 1.6,
  color: "#555",
  marginBottom: "0.8rem",
};

export default AboutPage;

