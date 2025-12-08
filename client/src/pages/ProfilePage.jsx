import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiTreasureMap } from "react-icons/gi";
import { MdInsights, MdCardGiftcard } from "react-icons/md";
import { FaRegHeart, FaImages } from "react-icons/fa";
import { IoMdMap } from "react-icons/io";
import { useTranslation } from "react-i18next";
import HamburgerMenu from "../components/HamburgerMenu";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth < 900);
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  
  const colors = {
    bgGradient: "linear-gradient(180deg, #fff7fb 0%, #f7fff9 100%)",
    text: "#2c2c2c",
    card: "#ffffff",
    accentPink: "#FF9DB7",
    accentAqua: "#9DE6E6",
    accentYellow: "#FFD7A6",
    brown: "#d4a373",
    softShadow: "0 12px 30px rgba(50,50,93,0.06)",
  };

  const sidebarButton = (bg) => ({
    width: "100%",
    padding: "12px 18px",
    backgroundColor: bg,
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "1rem",
    cursor: "pointer",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    justifyContent: "center",
    transition: "transform .18s ease, box-shadow .18s ease",
    boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
  });

  return (
    <>
      <style>{`
        :root{
          --container-max: 1200px;
          --card-radius: 16px;
          --gutter: 1.25rem;
        }

        .pp-root{
          min-height: 100vh;
          background: ${colors.bgGradient};
          font-family: 'Poppins', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
          color: ${colors.text};
          padding: 2.25rem 1rem;
        }

        .pp-container{
          max-width: var(--container-max);
          margin: 0 auto;
          width: 100%;
        }

        /* topbar */
        .pp-topbar{
          display:flex;
          justify-content:space-between;
          align-items:center;
          gap:12px;
          padding: 1rem;
          border-radius: 14px;
          margin-bottom: 1.25rem;
          background: rgba(255,255,255,0.65);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(0,0,0,0.03);
          box-shadow: 0 8px 24px rgba(50,50,93,0.04);
        }
        .pp-title{
          margin:0;
          font-size:1.6rem;
          color: ${colors.accentAqua};
          letter-spacing:-0.3px;
        }
        .pp-top-actions{ display:flex; gap:10px; align-items:center; }

        .pp-search{
          padding: .7rem .9rem;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.07);
          width: 340px;
          max-width: 45vw;
          outline:none;
        }

        .pp-back-pill{
          background: linear-gradient(90deg, ${colors.accentPink}, ${colors.accentAqua});
          color:#fff;
          border:none;
          padding:.6rem .95rem;
          border-radius:999px;
          font-weight:600;
          cursor:pointer;
          box-shadow: 0 8px 20px rgba(157,230,230,0.16);
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .pp-back-pill:hover{ transform: translateY(-3px); }

        /* layout: sidebar + main */
        .pp-layout{
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 1.5rem;
          align-items: start;
        }

        /* sidebar card */
        .pp-sidebar{
          background: ${colors.card};
          border-radius: var(--card-radius);
          padding: 1.25rem;
          box-shadow: ${colors.softShadow};
          border: 1px solid rgba(0,0,0,0.04);
        }

        .profile-head{
          display:flex;
          gap:12px;
          align-items:center;
        }
        .profile-avatar{
          width:90px;
          height:90px;
          border-radius:50%;
          object-fit:cover;
          cursor:pointer;
          border: 6px solid rgba(255,157,183,0.08);
        }

        .pp-bio{
          color:#444;
          line-height:1.5;
          margin: .9rem 0;
        }

        .pp-stats{
          display:flex;
          gap:12px;
          font-weight:700;
          color:#333;
          margin-top:.6rem;
        }

        .pp-sidebar .btn-group{ display:flex; flex-direction:column; gap:10px; margin-top:14px; }

        /* main content cards */
        .pp-main{
          min-width:0;
        }

        .pp-card{
          background: ${colors.card};
          border-radius: var(--card-radius);
          padding: 1.25rem;
          box-shadow: ${colors.softShadow};
          border: 1px solid rgba(0,0,0,0.04);
          margin-bottom: 1rem;
          transition: transform .16s ease, box-shadow .16s ease;
        }
        .pp-card:hover{ transform: translateY(-6px); box-shadow: 0 20px 44px rgba(50,50,93,0.06); }

        .grid-dests{
          display:grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1rem;
        }
        .dest-card{
          border-radius: 12px;
          overflow:hidden;
          cursor:pointer;
          background: linear-gradient(180deg, #ffffff, #fff9fb);
          border: 1px solid rgba(0,0,0,0.03);
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .dest-card:hover{ transform: translateY(-6px); box-shadow: 0 12px 30px rgba(50,50,93,0.06); }
        .dest-image{ height:140px; background-size:cover; background-position:center; }

        .blog-grid{
          display:grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1rem;
        }
        .blog-card{ padding: 1rem; border-radius: 12px; background: #fff; border: 1px solid rgba(0,0,0,0.03); }

        .next-button-wrap{ display:flex; justify-content:flex-end; margin-top: 1rem; }
        .next-button{
          margin-top: 0;
          padding: .9rem 1.2rem;
          background: linear-gradient(90deg, ${colors.accentAqua}, ${colors.accentPink});
          color: #fff;
          border: none;
          border-radius: 12px;
          font-weight:700;
          cursor:pointer;
          box-shadow: 0 10px 30px rgba(157,230,230,0.14);
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .next-button:hover{ transform: translateX(6px); }

        /* responsive */
        @media (max-width: 980px){
          .pp-layout{ grid-template-columns: 1fr; }
          .pp-topbar{ flex-direction: column; align-items:flex-start; gap:.6rem; }
        }
      `}</style>

      <div className="pp-root">
        <div className="pp-container">
          {/* Hamburger menu */}
          <div style={{ position: "absolute", top: 0.5, left: 3 }}>
            <HamburgerMenu />
          </div>

          {/* TOP BAR / HERO */}
          <div className="pp-topbar">
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <h1 className="pp-title">{t("Where Next")}</h1>
              <div style={{ color: "#6b6b6b", fontSize: 13 }}>{t("Discover your next adventure")}</div>
            </div>

            <div className="pp-top-actions">
              <input
                className="pp-search"
                type="text"
                placeholder="Search city or country..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && query.trim() !== "") {
                    navigate(`/search/${query}`);
                  }
                }}
              />

              <button
                className="pp-back-pill"
                onClick={() => navigate("/auth")}
                onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                {t("back")}
              </button>
            </div>
          </div>

          {/* LAYOUT: Sidebar + Main */}
          <div className="pp-layout">
            {/* SIDEBAR */}
            <aside className="pp-sidebar">
              <div className="profile-head">
                <img
                  src="/profile.jpg"
                  alt="portrait"
                  onClick={() => navigate("/edit-profile")}
                  className="profile-avatar"
                />
                <div>
                  <h2 style={{ margin: 0, fontSize: "1.2rem", color: colors.accentAqua }}>Wendy_1289</h2>
                  <div style={{ color: "#666", fontSize: 13 }}>{t("adventurer")}</div>
                </div>
              </div>

              <p className="pp-bio">
                Hi, I'm Wendy — explorer and storyteller sharing global travel
                experiences. Expect sustainable travel tips, itineraries, and honest
                reflections from the road.
              </p>

              <div style={{ display: "grid", gap: 6 }}>
                <div><strong>{t("hobbies")}:</strong> Hiking, Photography, Local Cuisine</div>
                <div><strong>Favorite place:</strong> Kyoto, Japan</div>
                <div><strong>Next destination:</strong> Iceland</div>
              </div>

              <div className="pp-stats">
                <div>{t("followers")}: 1280</div>
                <div>{t("following")}: 245</div>
              </div>

              <div className="btn-group">
                <button onClick={() => navigate("/rewards")} style={sidebarButton(colors.accentAqua)}>
                  <MdCardGiftcard size={18} /> <span style={{ marginLeft: 8 }}>{t("rewards")}</span>
                </button>

                <button onClick={() => navigate("/wishlist")} style={sidebarButton(colors.accentPink)}>
                  <FaRegHeart size={16} /> <span style={{ marginLeft: 8 }}>{t("wishlist")}</span>
                </button>

                <button onClick={() => navigate("/travel-gallery")} style={sidebarButton(colors.accentYellow)}>
                  <FaImages size={16} /> <span style={{ marginLeft: 8 }}>Travel Gallery</span>
                </button>

                <button onClick={() => navigate("/travel-map")} style={sidebarButton(colors.brown)}>
                  <IoMdMap size={18} /> <span style={{ marginLeft: 8 }}>{t("Take the Quiz")}</span>
                </button>

                <button onClick={() => navigate("/progress")} style={sidebarButton("#3b82f6")}>
                  <MdInsights size={18} /> <span style={{ marginLeft: 8 }}>{t("my_progress")}</span>
                </button>
              </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="pp-main">
              
              {/* MY BLOGS SECTION */}
<section className="pp-card">
  <div style={{ 
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12
  }}>
    <h2 style={{ color: colors.accentAqua }}>{t("My Blogs")}</h2>

    {/* Create new blog button */}
    <button
      onClick={() => navigate("/create-blog")}
      style={{
        padding: ".6rem 1rem",
        borderRadius: "10px",
        background: `linear-gradient(90deg, ${colors.accentAqua}, ${colors.accentPink})`,
        color: "#fff",
        fontWeight: "600",
        border: "none",
        cursor: "pointer",
        boxShadow: "0 8px 20px rgba(157,230,230,0.20)"
      }}
    >
      + Create Blog
    </button>
  </div>

  {/* MY BLOGS */}
  <div className="grid-dests">

    {[
      {
        id: 1,
        title: "My Kyoto Adventure",
        image: "/kyoto.jpg",
        description: "Temples, tea houses, cherry blossoms…",
      },
      {
        id: 2,
        title: "Cape Town Memories",
        image: "/capetown.jpg",
        description: "Hiking Table Mountain + penguin beaches!",
      },
      {
        id: 3,
        title: "Iceland Roadtrip",
        image: "/iceland.jpg",
        description: "Waterfalls, geysers, hot springs & volcanoes.",
      },
      {
        id: 4,
        title: "Bali Wellness Escape",
        image:
          "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60",
        description: "Rice terraces, beaches & peaceful mornings.",
      },
    ].map((blog) => (
      <div
        key={blog.id}
        className="dest-card"
        onClick={() => navigate(`/my-blog/${blog.id}`)}

      >
        <div
          className="dest-image"
          style={{ backgroundImage: `url(${blog.image})` }}
        />

        <div style={{ padding: 12 }}>
          <h3 style={{ margin: 0, color: colors.brown }}>{blog.title}</h3>
          <p style={{ marginTop: 6, color: "#444", fontSize: 14 }}>
            {blog.description}
          </p>

          {/* Likes + Edit */}
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            marginTop: 8 
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <FaRegHeart size={16} color={colors.accentPink} />
              <span style={{ fontSize: 14, color: "#444" }}>128</span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/edit-blog/${blog.id}`);
              }}
              style={{
                padding: ".3rem .6rem",
                fontSize: "0.8rem",
                background: colors.accentYellow,
                color: "#fff",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>


              {/* TRENDING BLOGS */}
              <section className="pp-card">
                <h2 style={{ color: colors.accentAqua, marginBottom: 12 }}>{t("Trending Blogs")}</h2>

                <div className="blog-grid">
                  {(() => {
                    const blogs = [
                      {
                        id: 1,
                        title: "My Experience in Oceania",
                        excerpt:
                          "The most beautiful place on Earth! Here's how my trip began!",
                      },
                      {
                        id: 2,
                        title: "Travel back in time and visit Yosemite National Park",
                        excerpt:
                          "750,000 acres of soaring cliffs, cascading waterfalls, and lush meadows make Yosemite one of the world's natural wonders.",
                      },
                      {
                        id: 3,
                        title: "Why I find Egypt fascinating...",
                        excerpt:
                          "Beaches, Museums, and exciting night life. A must-visit.",
                      },
                      {
                        id: 4,
                        title: "What Nobody Tells You About Sri Lanka",
                        excerpt:
                          "Blue lagoons, Temples, Delicious Teas, and a vibrant culture. Check out my blog:) ",
                      },
                    ];

                    return blogs.map((blog) => (
                      <div
                        key={blog.id}
                        className="blog-card"
                        onClick={() => navigate(`/blog/${blog.id}`)}
                      >
                        <h3 style={{ margin: 0, color: colors.brown }}>{blog.title}</h3>
                        <p style={{ marginTop: 6, color: "#444" }}>{blog.excerpt}</p>
                      </div>
                    ));
                  })()}
                </div>
              </section>

              {/* NEXT BUTTON */}
              <div className="next-button-wrap">
                <button className="next-button" onClick={() => navigate("/travel-tools")}>Next →</button>
              </div>
              {/* END NEXT BUTTON */}

            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;





