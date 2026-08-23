import React from 'react'
import './About.css'
import { useNavigate } from 'react-router-dom'

export default function About() {

  const navigate = useNavigate();

  return (
    <div className="about-page">

      {/* HEADER */}

      <div className="about-header">

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <h1>About FoodLoop</h1>

        <p>
          Connecting surplus food with people and organizations
          who need it.
        </p>

      </div>


      {/* ABOUT APPLICATION */}

      <div className="about-container">

        <section className="about-card">

          <div className="about-icon">
            🍱
          </div>

          <h2>What is FoodLoop?</h2>

          <p>
            FoodLoop is a food redistribution platform designed to
            reduce food waste and connect surplus food with
            organizations and communities in need.
          </p>

          <p>
            Hotels and other food providers can list their surplus
            food, charities can request available food, and volunteers
            can pick up and deliver the requested food.
          </p>

        </section>


        {/* HOW IT WORKS */}

        <section className="about-card">

          <h2>How FoodLoop Works</h2>

          <div className="steps">

            <div className="step">
              <span>🏨</span>
              <div>
                <h3>Hotels</h3>
                <p>
                  Add surplus food and provide pickup details.
                </p>
              </div>
            </div>


            <div className="step">
              <span>🤝</span>
              <div>
                <h3>Charities</h3>
                <p>
                  Find available food and request donations
                  for their organizations.
                </p>
              </div>
            </div>


            <div className="step">
              <span>🚚</span>
              <div>
                <h3>Volunteers</h3>
                <p>
                  Pick up requested food and deliver it to
                  the requesting charity.
                </p>
              </div>
            </div>

          </div>

        </section>


        {/* MISSION */}

        <section className="about-card mission-card">

          <div className="about-icon">
            ❤️
          </div>

          <h2>Our Mission</h2>

          <p>
            Our goal is to create a simple platform where surplus
            food does not go to waste when it can help someone in
            need.
          </p>

          <p>
            FoodLoop brings hotels, charities and volunteers together
            through one platform to make food donation easier,
            faster and more organized.
          </p>

        </section>


        {/* AUTHOR */}

        <section className="about-card author-card">

          <div className="author-avatar">
            👨‍💻
          </div>

          <h2>About the Author</h2>

          <h3>Abhishek Sonparote</h3>

          <p className="author-role">
            Developer & Creator of FoodLoop
          </p>

          <p>
            FoodLoop was developed as a project to explore how
            technology can be used to solve real-world problems
            such as food waste and food accessibility.
          </p>


          <div className="contact-info">

            <div>
              📧
              <span>
                abhisheksonparote6@gmail.com
              </span>
            </div>

            <div>
              📞
              <span>
                +91 81809 81105
              </span>
            </div>

          </div>

        </section>


        {/* FOOTER */}

        <div className="about-footer">

          <p>
            © 2026 FoodLoop. All rights reserved.
          </p>

        </div>

      </div>

    </div>
  )
}