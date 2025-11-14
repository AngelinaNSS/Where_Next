import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const PlaceModal = ({ isOpen, onRequestClose, place }) => {
  if (!place) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          transform: "translate(-50%, -50%)",
          maxWidth: "600px",
          width: "90%",
          padding: "30px",
          borderRadius: "12px",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        },
      }}
    >
      <button
        onClick={onRequestClose}
        style={{
          float: "right",
          background: "none",
          border: "none",
          fontSize: "1.5rem",
          cursor: "pointer",
        }}
      >
        ✖
      </button>

      {place.photo && (
        <img
          src={place.photo}
          alt={place.name}
          style={{ width: "100%", borderRadius: "8px", marginBottom: "15px" }}
        />
      )}
      <h2>{place.name}</h2>
      <p>{place.location.formatted_address}</p>
      {place.rating && <p>Rating: {place.rating} ⭐</p>}
      {place.tel && <p>Phone: {place.tel}</p>}
      {place.website && (
        <p>
          Website: <a href={place.website}>{place.website}</a>
        </p>
      )}
    </Modal>
  );
};

export default PlaceModal;
