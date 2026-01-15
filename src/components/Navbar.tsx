// src/components/Navbar.tsx
import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
      <a className="navbar-brand" href="#hero">
        <strong>Estifanos Abebe</strong>{" "}
        <span style={{ fontSize: "0.85em", fontStyle: "italic", opacity: 0.8 }}>
        (Visual Artsit from Ethiopia)
        </span>
      </a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active" href="#hero" onClick={closeNavbar}>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#artworks" onClick={closeNavbar}>
                Artworks
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about" onClick={closeNavbar}>
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact" onClick={closeNavbar}>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
