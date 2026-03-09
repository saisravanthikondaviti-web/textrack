import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./styles.css";

export default function UserDashboard() {
  return (
    <div className="user-dashboard-container">
      <Navbar />

      <main className="user-dashboard-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}