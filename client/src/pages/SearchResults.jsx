// src/pages/SearchResults.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icons
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setErrorMsg("");

      try {
        // --- Fetch country data ---
        let countryCoords = null;
        try {
          const countryRes = await fetch(
            `https://restcountries.com/v3.1/name/${query}`
          );
          const countryJson = await countryRes.json();
          if (Array.isArray(countryJson) && countryJson.length > 0) {
            setCountryData(countryJson[0]);
            countryCoords = countryJson[0].latlng;
          } else {
            setCountryData(null);
          }
        } catch {
          setCountryData(null);
        }

        // --- Set lat/lng ---
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

        // --- Wikipedia summary ---
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

        // --- Foursquare helper ---
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

        // --- Fetch places ---
        const landmarksData = await fetchFoursquare("tourist attraction");
        const hotelsData = await fetchFoursquare("hotel");
        const cafesData = await fetchFoursquare("cafe");

        // --- Fetch photos for places ---
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
              return `${data[0].prefix}300x200${data[0].suffix}`;
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

  if (loading)
    return (
      <div style={{ padding: "40px", fontFamily: "Poppins, sans-serif" }}>
        <h1>Loading results for "{query}"...</h1>
      </div>
    );

  if (errorMsg)
    return (
      <div style={{ padding: "40px", fontFamily: "Poppins, sans-serif" }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            marginBottom: "20px",
            padding: "10px 15px",
            cursor: "pointer",
          }}
        >
          ⬅ Back
        </button>
        <h2>{errorMsg}</h2>
      </div>
    );

  const sectionStyle = {
    marginBottom: "40px",
    padding: "25px",
    borderRadius: "12px",
    backgroundColor: "#fefefe",
    boxShadow: "0 6px 15px rgba(0,0,0,0.05)",
  };

  const cardStyle = {
    padding: "15px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
    cursor: "pointer",
    transition: "transform 0.2s",
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Poppins, sans-serif" }}>
      {/* Banner */}
      
     <div
  onClick={() => navigate(`/destination/${query}`)}
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "30px",
    padding: "20px",
    borderRadius: "12px",
    background:
      "linear-gradient(120deg, #a7c7b7 0%, #007f5f 100%)",
    color: "#fff",
    cursor: "pointer",
    transition: "transform 0.2s",
  }}
  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
>
  <h1 style={{ fontSize: "2.5rem" }}>{query}</h1>
  {countryData?.flags?.png && (
    <img
      src={countryData.flags.png}
      alt="flag"
      style={{ width: "80px", borderRadius: "8px" }}
    />
  )}
</div>


      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "20px",
          padding: "10px 15px",
          cursor: "pointer",
          borderRadius: "6px",
          border: "none",
          backgroundColor: "#d4a373",
          color: "#2c2c2c",
          fontWeight: "600",
        }}
      >
        ⬅ Back
      </button>

      {/* Wikipedia Summary */}
      <div style={sectionStyle}>
        <h2>About {query}</h2>
        <p>{wikiSummary}</p>
      </div>

      {/* Map */}
      <div style={sectionStyle}>
        <h2>Explore on Map</h2>
        <MapContainer
          center={latLng}
          zoom={12}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
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
                {place.location?.formatted_address || "Address not available"}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Sections */}
      {landmarks.length > 0 && (
        <div style={sectionStyle}>
          <h2>Famous Tourist Attractions</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
            }}
          >
            {landmarks.map((lm) => (
              <div
                key={lm.fsq_id}
                style={cardStyle}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                {lm.photo && (
                  <img
                    src={lm.photo}
                    alt={lm.name}
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      marginBottom: "10px",
                    }}
                  />
                )}
                <h3>{lm.name}</h3>
                <p>{lm.location?.formatted_address || "Address not available"}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {hotels.length > 0 && (
        <div style={sectionStyle}>
          <h2>Hotels</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
            }}
          >
            {hotels.map((ht) => (
              <div
                key={ht.fsq_id}
                style={cardStyle}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                {ht.photo && (
                  <img
                    src={ht.photo}
                    alt={ht.name}
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      marginBottom: "10px",
                    }}
                  />
                )}
                <h3>{ht.name}</h3>
                <p>{ht.location?.formatted_address || "Address not available"}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {cafes.length > 0 && (
        <div style={sectionStyle}>
          <h2>Cafes & Local Spots</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
            }}
          >
            {cafes.map((cafe) => (
              <div
                key={cafe.fsq_id}
                style={cardStyle}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                {cafe.photo && (
                  <img
                    src={cafe.photo}
                    alt={cafe.name}
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      marginBottom: "10px",
                    }}
                  />
                )}
                <h3>{cafe.name}</h3>
                <p>{cafe.location?.formatted_address || "Address not available"}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;



