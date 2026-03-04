// src/components/Navbar.jsx
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import logo from "../assets/logo.png";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar">
      <h2 className="logo">
        <img src={logo} alt="TextileTrack Logo" className="logo-img" />
        TextileTrack
      </h2>

      {/* Hamburger Icon */}
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
        <NavLink to="/user" end onClick={() => setMenuOpen(false)}>Home</NavLink>
        <NavLink to="/user/products" onClick={() => setMenuOpen(false)}>Products</NavLink>
        <NavLink to="/user/cart" onClick={() => setMenuOpen(false)}>Cart</NavLink>
        <NavLink to="/user/orders" onClick={() => setMenuOpen(false)}>Orders</NavLink>
        <NavLink
          to="/user/profile"
          className="profile-icon"
          onClick={() => setMenuOpen(false)}
        >
          <FaUserCircle size={26} />
        </NavLink>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}