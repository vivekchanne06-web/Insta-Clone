import React from "react";
import "./style/about.scss";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-card">
        <h1>🚀 React Project Made By: Vivek Channe</h1>

        <div className="about-info">
          <p>🎓 Final Year ENTC Engineering Student</p>
          <p>📚 Learner of Cohort 2.0 & Full Stack Development Engineering</p>
          <p>🏆 Current CGPA: 9.45</p>
          <p>🎓 Diploma in ENTC with Distinction</p>
          <p>📍 Pune, Maharashtra</p>
        </div>

        <div className="contact-section">
          <h3>📬 Contact Me</h3>
          <p>✉️ vivekchanne06@gmail.com</p>
          <p className="status">
            Open for Internship • Ready to Hire • Projects
          </p>
        </div>

        <div className="skills-section">
          <h3>Tech Stack</h3>
          <div className="skills">
            <span>React</span>
            <span>JavaScript</span>
            <span>Tailwind CSS</span>
            <span>Node.js</span>
            <span>MongoDB</span>
            <span>Full Stack Development</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;