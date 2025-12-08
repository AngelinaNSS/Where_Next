// src/pages/SearchResults.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const FOURSQUARE_API_KEY = "21TYA00KWNO4ZXEVKEC2QWSUYL2DE1IVUB3XERQEMFUXHP0A";

const SearchResults = () => {
  const { query } = useParams();
  const navigate = useNavigate();

  const [countryData, setCountryData] = useState(null);
  const [wikiSummary, setWikiSummary] = useState("");
  const [landmarks, setLandmarks] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [cafes, setCafes] = useState([]);
  const [latLng, setLatLng] = useState([20, 0]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // -----------------------------
  // Fetch all data
  // -----------------------------
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setErrorMsg("");

      try {
        // Fetch Country Data
        let countryCoords = null;
        try {
          const countryRes = await fetch(
            `https://restcountries.com/v3.1/name/${query}`
          );
          const countryJson = await countryRes.json();

          if (Array.isArray(countryJson) && countryJson.length > 0) {
            setCountryData(countryJson[0]);
            countryCoords = countryJson[0].latlng;
          }
        } catch {
          setCountryData(null);
        }

        let lat = 20;
        let lng = 0;

        if (countryCoords) {
          lat = countryCoords[0];
          lng = countryCoords[1];
        } else {
          try {
            const geoRes = await fetch(
              `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
            );
            const geoJson = await geoRes.json();
            if (geoJson.length > 0) {
              lat = parseFloat(geoJson[0].lat);
              lng = parseFloat(geoJson[0].lon);
            }
          } catch {}
        }

        setLatLng([lat, lng]);

        // Wikipedia Summary
        try {
          const wikiRes = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${query}`
          );
          const wikiJson = await wikiRes.json();
          setWikiSummary(
            wikiJson.extract || wikiJson.title || "No summary available."
          );
        } catch {
          setWikiSummary("No summary available.");
        }

        // Foursquare Helper
        const fetchFoursquare = async (type) => {
          try {
            const res = await fetch(
              `https://api.foursquare.com/v3/places/search?query=${type}&ll=${lat},${lng}&limit=6`,
              {
                headers: {
                  Accept: "application/json",
                  Authorization: FOURSQUARE_API_KEY,
                },
              }
            );
            const data = await res.json();
            return data.results || [];
          } catch {
            return [];
          }
        };

        const landmarksData = await fetchFoursquare("tourist attraction");
        const hotelsData = await fetchFoursquare("hotel");
        const cafesData = await fetchFoursquare("cafe");

        // Fetch Photos From Foursquare
        const fetchPhoto = async (fsq_id) => {
          try {
            const res = await fetch(
              `https://api.foursquare.com/v3/places/${fsq_id}/photos?limit=1`,
              {
                headers: {
                  Accept: "application/json",
                  Authorization: FOURSQUARE_API_KEY,
                },
              }
            );
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
              return `${data[0].prefix}400x300${data[0].suffix}`;
            }
            return null;
          } catch {
            return null;
          }
        };

        const addPhotos = async (places) =>
          await Promise.all(
            places.map(async (p) => ({ ...p, photo: await fetchPhoto(p.fsq_id) }))
          );

        setLandmarks(await addPhotos(landmarksData));
        setHotels(await addPhotos(hotelsData));
        setCafes(await addPhotos(cafesData));
      } catch (err) {
        console.error(err);
        setErrorMsg("Something went wrong while fetching data.");
      }

      setLoading(false);
    };

    fetchData();
  }, [query]);

  // -------------------------------
  // Loading
  // -------------------------------
  if (loading)
    return (
      <div
        style={{
          padding: "60px",
          fontFamily: "Poppins, sans-serif",
          fontSize: "1.2rem",
        }}
      >
        <h1>Searching for “{query}”...</h1>
      </div>
    );

  // -------------------------------
  // Error
  // -------------------------------
  if (errorMsg)
    return (
      <div style={{ padding: "40px", fontFamily: "Poppins, sans-serif" }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            marginBottom: "20px",
            padding: "10px 15px",
            cursor: "pointer",
            backgroundColor: "#b08b63",
            border: "none",
            borderRadius: "6px",
            color: "#fff",
            fontWeight: "600",
          }}
        >
          ⬅ Back
        </button>
        <h2>{errorMsg}</h2>
      </div>
    );

  // -------------------------------
  // Shared Styles
  // -------------------------------
  const sectionStyle = {
    marginBottom: "40px",
    padding: "25px",
    borderRadius: "14px",
    backgroundColor: "#ffffff",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  };

  const cardStyle = {
    padding: "15px",
    backgroundColor: "#ffffff",
    borderRadius: "14px",
    boxShadow: "0 6px 12px rgba(0,0,0,0.08)",
    textAlign: "center",
    cursor: "pointer",
    transition: "0.25s ease",
  };

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Poppins, sans-serif",
        backgroundColor: "#f8f4ec",
        minHeight: "100vh",
      }}
    >
      {/* 🌿 Search Banner */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "linear-gradient(135deg, #a7c7b7, #2b6048)",
          padding: "30px",
          borderRadius: "18px",
          color: "#fff",
          marginBottom: "35px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
          cursor: "pointer",
        }}
        onClick={() => navigate(`/destination/${query}`)}
      >
        <h1 style={{ fontSize: "2.4rem", margin: 0 }}>{query}</h1>

        {countryData?.flags?.png && (
          <img
            src={countryData.flags.png}
            alt="flag"
            style={{
              width: "90px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            }}
          />
        )}
      </div>

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "30px",
          padding: "10px 18px",
          cursor: "pointer",
          backgroundColor: "#b08b63",
          border: "none",
          borderRadius: "8px",
          color: "#fff",
          fontWeight: "600",
        }}
      >
        ⬅ Back
      </button>

      {/* FACTS SECTION */}
      {countryData && (
        <div style={sectionStyle}>
          <h2 style={{ marginBottom: "20px", color: "#2b6048" }}>
            Quick Facts
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "18px",
            }}
          >
            <div><strong>Capital:</strong> {countryData.capital?.[0] || "—"}</div>
            <div><strong>Population:</strong> {countryData.population?.toLocaleString()}</div>
            <div><strong>Region:</strong> {countryData.region}</div>
            <div><strong>Currency:</strong> {Object.values(countryData.currencies || {})[0]?.name}</div>
            <div><strong>Languages:</strong> {Object.values(countryData.languages || {}).join(", ")}</div>
          </div>
        </div>
      )}

      {/* SUMMARY */}
      <div style={sectionStyle}>
        <h2 style={{ color: "#2b6048" }}>About {query}</h2>
        <p style={{ lineHeight: "1.6" }}>{wikiSummary}</p>
      </div>

      {/* MAP */}
      <div style={sectionStyle}>
        <h2 style={{ marginBottom: "20px", color: "#2b6048" }}>
          Explore on Map
        </h2>
        <div
          style={{
            height: "500px",
            borderRadius: "14px",
            overflow: "hidden",
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
          }}
        >
          <MapContainer center={latLng} zoom={12} style={{ height: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {[...landmarks, ...hotels, ...cafes].map((place) => (
              <Marker
                key={place.fsq_id}
                position={[
                  place.geocodes?.main?.latitude || latLng[0],
                  place.geocodes?.main?.longitude || latLng[1],
                ]}
              >
                <Popup>
                  {place.photo && (
                    <img
                      src={place.photo}
                      alt={place.name}
                      style={{
                        width: "100%",
                        borderRadius: "6px",
                        marginBottom: "5px",
                      }}
                    />
                  )}
                  <strong>{place.name}</strong>
                  <br />
                  {place.location?.formatted_address ||
                    "Address not available"}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* ALL SECTIONS */}
      {[
        { title: "Famous Tourist Attractions", data: landmarks },
        { title: "Hotels", data: hotels },
        { title: "Cafes & Local Spots", data: cafes },
      ].map(
        (section) =>
          section.data.length > 0 && (
            <div key={section.title} style={sectionStyle}>
              <h2 style={{ marginBottom: "20px", color: "#2b6048" }}>
                {section.title}
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: "22px",
                }}
              >
                {section.data.map((item) => (
                  <div
                    key={item.fsq_id}
                    style={cardStyle}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "translateY(-6px)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "translateY(0)")
                    }
                  >
                    {item.photo && (
                      <img
                        src={item.photo}
                        alt={item.name}
                        style={{
                          width: "100%",
                          height: "150px",
                          objectFit: "cover",
                          borderRadius: "10px",
                          marginBottom: "12px",
                        }}
                      />
                    )}
                    <h3 style={{ fontSize: "1.2rem", color: "#2b6048" }}>
                      {item.name}
                    </h3>
                    <p style={{ fontSize: "0.9rem" }}>
                      {item.location?.formatted_address ||
                        "Address unavailable"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default SearchResults;




