import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles.css";

export default function PublicNavbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">
        <img src={logo} alt="TextileTrack Logo" className="logo-img" />
        TextileTrack
      </h2>

      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#faq">FAQ</a>
        <a href="#contact">Contact</a>

        <Link to="/login" className="login-btn">
          Login
        </Link>
      </div>
    </nav>
  );
}