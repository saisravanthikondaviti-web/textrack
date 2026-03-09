import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";
import "../styles.css";

export default function PublicNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo */}
      <h2 className="logo">
        <img src={logo} alt="TextileTrack Logo" className="logo-img" />
        TextileTrack
      </h2>

      {/* Hamburger */}
      <div
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Nav Links */}
      <div className={`nav-links ${menuOpen ? "show" : ""}`}>
        <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
        <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>

        <Link
          to="/login"
          className="login-btn"
          style={{
            background: "#18a9d4",
            color: "white",
            padding: "10px 14px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "500",
            display: "inline-block"
          }}
          onClick={() => setMenuOpen(false)}
        >
          Login
        </Link>
      </div>
    </nav>
  );
}