import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Main.css'

export default function Main() {

  const navigate = useNavigate()

  return (
    <div className="main-page">

      {/* HERO */}

      <section className="main-hero">

        {/* LEFT */}

        <div className="main-content">

          <div className="main-badge">
            🌱 Reduce Food Waste • Feed Hope
          </div>

          <h1>
            Turning Surplus Food
            <br />
            Into <span>Hope.</span>
          </h1>

          <p>
            FoodLoop connects hotels, charities and volunteers
            to make sure surplus food reaches people who need it.
          </p>

          <div className="main-buttons">

            <button
              className="main-login-btn"
              onClick={() => navigate('/login')}
            >
              Sign In
            </button>

            <button
              className="main-register-btn"
              onClick={() => navigate('/preregister')}
            >
              Register
            </button>

          </div>

          <div className="main-stats">

            <div>
              <strong>Hotels</strong>
              <span>Donate surplus food</span>
            </div>

            <div>
              <strong>Charities</strong>
              <span>Receive food</span>
            </div>

            <div>
              <strong>Volunteers</strong>
              <span>Deliver donations</span>
            </div>

          </div>

        </div>


        {/* RIGHT LOGO */}

        <div className="main-logo-area">

          <div className="logo-glow"></div>

          <div className="logo-circle">

            <img
              src="/FoodLoop_logo.jpeg"
              alt="FoodLoop Logo"
            />

          </div>

          <div className="logo-tagline">
            <span>♻</span>
            Reduce Waste. Feed Hope.
          </div>

        </div>

      </section>


      {/* ABOUT SECTION */}

      <section className="main-about">

        <h2>One Loop. Three Communities.</h2>

        <p>
          FoodLoop creates a simple connection between those
          who have surplus food and those who can put it to good use.
        </p>

        <div className="community-cards">

          <div className="community-card">
            <div>🏨</div>
            <h3>Hotels</h3>
            <p>
              Share safe surplus food instead of letting it go to waste.
            </p>
          </div>

          <div className="community-card">
            <div>🤝</div>
            <h3>Charities</h3>
            <p>
              Request available food and help serve your community.
            </p>
          </div>

          <div className="community-card">
            <div>🚚</div>
            <h3>Volunteers</h3>
            <p>
              Pick up donations and deliver them where they are needed.
            </p>
          </div>

        </div>

      </section>


      {/* FOOTER */}

      <footer className="main-footer">

        <div>
          <strong>FoodLoop</strong>
          <p>Reduce Waste. Feed Hope.</p>
        </div>

        <div className="footer-links">
          <span onClick={() => navigate('/about')}>About</span>
          <a
            href="mailto:abhisheksonparote6@gmail.com?subject=FoodLoop%20Contact"
            className="contact-link"
            >
            Contact Us
            </a>
        </div>

        <p className="copyright">
          © 2026 FoodLoop. All rights reserved.
        </p>

      </footer>

    </div>
  )
}