import React from 'react'
import './Header.css'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Header() {

  const navigate = useNavigate();
  const location = useLocation();

  const goToAbout = () => {
    navigate('/about');
  }

  const goToNotifications = () => {
    navigate('/notifications');
  }

  // Public pages where notification/profile should NOT appear
  const publicPages = [
    '/',
    '/login',
    '/pre-register',
    '/register/hotel',
    '/register/charity',
    '/register/volunteer'
  ];

  const isPublicPage = publicPages.includes(location.pathname);

  return (

    <header className="header">

      {/* LEFT */}
      <div className="header-left">

        <div className="logo">
          <img
            src="/FoodLoop_logo.jpeg"
            alt="FoodLoop Logo"
          />
        </div>

        <div className="brand-name">
          FoodLoop
        </div>

      </div>


      {/* RIGHT */}
      <nav className="header-right">

        <a onClick={goToAbout}>
          About
        </a>

        <a href="mailto:abhisheksonparote6@gmail.com?subject=FoodLoop%20Contact">
          Contact Us
        </a>


        {/* ONLY authenticated pages */}
        {!isPublicPage && (

          <button
            className="notification-btn"
            onClick={goToNotifications}
          >
            🔔
          </button>

        )}


        {!isPublicPage && (

          <button className="profile-btn">
            <span className="profile-icon">
              👤
            </span>
          </button>

        )}

      </nav>

    </header>
  )
}