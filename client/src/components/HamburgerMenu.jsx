import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Step 2A: The hamburger icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{ fontSize: "24px", background: "none", border: "none", cursor: "pointer" }}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Step 2B: The dropdown menu */}
      {isOpen && (
        <div>
          <ul style={{ listStyle: "none" }}>
            <li>Settings</li>
            <li>About</li>
            <li>Wishlist</li>
            <li>Rewards</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
