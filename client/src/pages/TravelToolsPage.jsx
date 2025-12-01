import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiAirplaneDeparture } from "react-icons/gi";
import { FaSuitcaseRolling, FaMoneyBillWave } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";

const TravelToolsPage = () => {
  const navigate = useNavigate();

  // Pastel color palette for "Cute Travel Theme"
  const colors = {
    bg: "linear-gradient(180deg, #fff7fb 0%, #f7fff9 100%)",
    text: "#2c2c2c",
    card: "#ffffff",
    accent: "#FF9DB7", // pink
    accent2: "#9DE6E6", // aqua
    accent3: "#FFD7A6", // warm yellow
    softShadow: "0 8px 24px rgba(50,50,93,0.08)",
  };

  const [budget, setBudget] = useState({
    flights: "",
    stay: "",
    food: "",
    activities: "",
  });

  const totalBudget =
    Number(budget.flights || 0) +
    Number(budget.stay || 0) +
    Number(budget.food || 0) +
    Number(budget.activities || 0);

  // PACKING LIST
  const packing_items = [
    "Passport",
    "Charger",
    "Toiletries",
    "Comfortable Shoes",
    "Travel Pillow",
    "Camera",
    "Water Bottle",
    "Snacks",
    "Sunscreen",
  ];

  const [checkedItems, setCheckedItems] = useState([]);

  const toggleItem = (item) => {
    setCheckedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <>
      {/* Embedded CSS so this file is plug-and-play */}
      <style>{`
        :root{
          --bg-accent: #fff7fb;
          --card-radius: 18px;
          --gap: 1.25rem;
        }

        .ttp-root{
          min-height: 100vh;
          background: ${colors.bg};
          padding: 3rem 1.25rem;
          font-family: 'Poppins', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
          color: ${colors.text};
        }

        /* Centered container so content doesn't hug the left */
        .ttp-container{
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .ttp-hero{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap: 1rem;
          margin-bottom: 1.6rem;
        }

        .ttp-title{
          display:flex;
          flex-direction:column;
          gap:6px;
        }
        .ttp-title h1{
          margin:0;
          font-size: 1.9rem;
          color: #2c2c2c;
          letter-spacing: -0.2px;
        }
        .ttp-sub{
          margin:0;
          color:#6b6b6b;
          font-size:0.95rem;
        }

        .ttp-back{
          background: linear-gradient(90deg, ${colors.accent}, ${colors.accent2});
          border: none;
          color: white;
          padding: 0.6rem 0.9rem;
          border-radius: 999px;
          font-weight:600;
          box-shadow: 0 6px 18px rgba(157, 230, 230, 0.18);
          cursor:pointer;
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .ttp-back:hover{ transform: translateY(-3px); box-shadow: 0 10px 24px rgba(157, 230, 230, 0.25) }

        /* Grid layout with nicer spacing */
        .tt-grid{
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--gap);
        }

        /* Cards */
        .tt-card{
          background: ${colors.card};
          border-radius: var(--card-radius);
          padding: 1.25rem;
          box-shadow: ${colors.softShadow};
          transition: transform .18s ease, box-shadow .18s ease;
          border: 1px solid rgba(200,200,200,0.08);
        }
        .tt-card:hover{ transform: translateY(-6px); box-shadow: 0 18px 40px rgba(50,50,93,0.08); }

        .tt-card h2{
          margin:0 0 .85rem 0;
          display:flex;
          align-items:center;
          gap:10px;
          font-size:1.05rem;
          color:#3b3b3b;
        }

        /* Inputs */
        .tt-input{
          width:100%;
          padding: .6rem .8rem;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.08);
          outline:none;
          font-size: 0.95rem;
        }

        /* Packing list */
        .tt-list{
          list-style:none;
          padding:0;
          margin:0;
          display:flex;
          flex-direction:column;
          gap:10px;
        }
        .tt-list label{
          display:flex;
          align-items:center;
          gap:10px;
          user-select:none;
        }

        /* Currency card special */
        .tt-currency-note{
          margin-top: .6rem;
          color:#666;
          font-size:0.95rem;
          line-height:1.4;
        }

        /* Best time bar */
        .tt-best{
          margin-top:1.6rem;
          display:flex;
          gap:.9rem;
          align-items:center;
        }
        .tt-best .badge{
          background: linear-gradient(180deg, ${colors.accent3}, #fff2dc);
          padding:.8rem 1rem;
          border-radius:12px;
          box-shadow: 0 8px 20px rgba(255,215,170,0.12);
          flex:1;
        }

        /* Responsive: single column on small screens */
        @media (max-width: 880px){
          .tt-grid{ grid-template-columns: 1fr; }
          .ttp-hero{ flex-direction:column; align-items:flex-start; gap:.6rem }
        }

        /* Cute small animated pin at top-right of hero */
        .cute-pin{
          width:46px;
          height:46px;
          border-radius:50%;
          display:flex;
          align-items:center;
          justify-content:center;
          background: linear-gradient(135deg, ${colors.accent}, ${colors.accent2});
          box-shadow: 0 8px 20px rgba(150,120,160,0.12);
          transform-origin:center;
          animation: floaty 4s ease-in-out infinite;
        }
        @keyframes floaty{
          0% { transform: translateY(0); }
          50% { transform: translateY(-8px) rotate(-6deg); }
          100% { transform: translateY(0); }
        }

        .total-pill{
          display:inline-block;
          padding:8px 12px;
          background: linear-gradient(90deg, rgba(157,157,230,0.08), rgba(255,157,183,0.06));
          border-radius:999px;
          font-weight:700;
          color:#2c2c2c;
        }
      `}</style>

      <div className="ttp-root">
        <div className="ttp-container">
          {/* HERO */}
          <div className="ttp-hero">
            <div className="ttp-title">
              <h1>Travel Tools & Tips</h1>
              <p className="ttp-sub">Cute, pastel helpers for your next trip — calculators, packing lists and quick tips.</p>
            </div>

            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <button className="ttp-back" onClick={() => navigate(-1)}>Back</button>

              {/* little floating pin */}
              <div className="cute-pin" title="Where Next">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#fff" />
                  <circle cx="12" cy="9" r="2.5" fill="#FF9DB7"/>
                </svg>
              </div>
            </div>
          </div>

          {/* GRID */}
          <div className="tt-grid">
            {/* Budget Calculator */}
            <div className="tt-card" style={{ background: "linear-gradient(180deg, #ffffff, #fff8fb)" }}>
              <h2><GiAirplaneDeparture size={20} /> Budget Calculator</h2>

              <div style={{ display: "grid", gap: 10 }}>
                {["flights", "stay", "food", "activities"].map((field) => (
                  <input
                    key={field}
                    type="number"
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={budget[field]}
                    onChange={(e) =>
                      setBudget({ ...budget, [field]: e.target.value })
                    }
                    className="tt-input"
                  />
                ))}
              </div>

              <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ color: "#6b6b6b", fontWeight: 600 }}>Estimated Total</div>
                <div className="total-pill">€{totalBudget}</div>
              </div>
            </div>

            {/* Packing Checklist */}
            <div className="tt-card" style={{ background: "linear-gradient(180deg,#ffffff,#f8fff9)" }}>
              <h2><FaSuitcaseRolling size={20} /> Packing Checklist</h2>

              <ul className="tt-list" style={{ marginTop: 6 }}>
                {packing_items.map((item) => (
                  <li key={item}>
                    <label>
                      <input
                        type="checkbox"
                        checked={checkedItems.includes(item)}
                        onChange={() => toggleItem(item)}
                        style={{ width: 16, height: 16, accentColor: "#FF9DB7" }}
                      />
                      <span style={{ marginLeft: 6 }}>{item}</span>
                    </label>
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "center" }}>
                <button
                  onClick={() => setCheckedItems(packing_items)}
                  style={{
                    background: "transparent",
                    border: "1px dashed rgba(0,0,0,0.06)",
                    padding: "8px 10px",
                    borderRadius: 999,
                    fontSize: 13,
                    cursor: "pointer"
                  }}
                >
                  Check all
                </button>
                <button
                  onClick={() => setCheckedItems([])}
                  style={{
                    background: "transparent",
                    border: "1px dashed rgba(0,0,0,0.06)",
                    padding: "8px 10px",
                    borderRadius: 999,
                    fontSize: 13,
                    cursor: "pointer"
                  }}
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Currency Converter */}
            <div className="tt-card" style={{ background: "linear-gradient(180deg,#ffffff,#fffaf3)" }}>
              <h2><FaMoneyBillWave size={20} /> Currency Converter</h2>

              <p className="tt-currency-note">
                Static demo rates — for production you can plug in an API (ex: exchangerate.host).
              </p>

              <div style={{ marginTop: 10, display: "grid", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>1 EUR</div>
                  <div style={{ fontWeight: 700 }}>≈ 1.07 USD</div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>1 EUR</div>
                  <div style={{ fontWeight: 700 }}>≈ 160 JPY</div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>1 EUR</div>
                  <div style={{ fontWeight: 700 }}>≈ 18 ZAR</div>
                </div>
              </div>
            </div>

            {/* Safety Tips */}
            <div className="tt-card" style={{ background: "linear-gradient(180deg,#ffffff,#f7f9ff)" }}>
              <h2><MdSecurity size={20} /> Safety Tips</h2>

              <ul style={{ marginTop: 10, lineHeight: 1.6, color: "#555" }}>
                <li>Keep digital copies of all important documents.</li>
                <li>Avoid showing valuables in public places.</li>
                <li>Research local emergency numbers.</li>
                <li>Learn basic phrases in the local language.</li>
                <li>Stay aware of your surroundings.</li>
              </ul>
            </div>
          </div>

          {/* Best time to visit (cute badges) */}
          <div className="tt-best">
            <div className="badge tt-card" style={{ flex: 1 }}>
              <strong>Bali</strong>
              <div style={{ color: "#666", marginTop: 6 }}>Best: April — October</div>
            </div>
            <div className="badge tt-card" style={{ flex: 1 }}>
              <strong>Iceland</strong>
              <div style={{ color: "#666", marginTop: 6 }}>Best: Sep — Mar (Auroras)</div>
            </div>
            <div className="badge tt-card" style={{ flex: 1 }}>
              <strong>Japan</strong>
              <div style={{ color: "#666", marginTop: 6 }}>Best: Mar — May (Sakura)</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TravelToolsPage;

