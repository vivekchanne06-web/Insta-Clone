import React from "react";
import { Link } from "react-router-dom";
import "./style/home.scss";

const Home = () => {
  return (
    <div className="home-container">

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to InstaClone 🚀</h1>
          <p>
            A modern Instagram-inspired social platform built with
            React, Node.js & MongoDB.
          </p>

          <div className="hero-buttons">
            <Link to="/Register" className="btn primary">
              Get Started
            </Link>
            <Link to="/login" className="btn secondary">
              Login
            </Link>
          </div>
        </div>
      </section>


      {/* FEATURES SECTION */}
      <section className="features">
        <h2>✨ Features</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <h3>📸 Create & Share Posts</h3>
            <p>Upload and share your moments with friends.</p>
          </div>

          <div className="feature-card">
            <h3>❤️ Like & Engage</h3>
            <p>Like posts and interact with your community.</p>
          </div>

          <div className="feature-card">
            <h3>👥 Follow System</h3>
            <p>Follow users and build your social network.</p>
          </div>

          <div className="feature-card">
            <h3>🔐 Secure Authentication</h3>
            <p>JWT-based authentication system for safety.</p>
          </div>

        </div>
      </section>


      {/* FOOTER SECTION */}
      <footer className="home-footer">
        <p>
          Built with ❤️ by Vivek Channe | Full Stack Developer
        </p>
      </footer>

    </div>
  );
};

export default Home;