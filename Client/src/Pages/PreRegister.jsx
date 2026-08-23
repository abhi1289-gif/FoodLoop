import React from 'react'
import { useNavigate } from 'react-router-dom'
import './PreRegister.css'

export default function PreRegister() {

  const navigate = useNavigate()

  const goToHotel = () => {
    navigate('/register/hotel')
  }

  const goToCharity = () => {
    navigate('/register/charity')
  }

  const goToVolunteer = () => {
    navigate('/register/volunteer')
  }

  return (
    <div className="pre-register">

      <div className="pre-register-heading">
        <h1>Join FoodLoop</h1>
        <p>
          Choose how you want to make a difference
        </p>
      </div>

      <div className="registration-container">

        {/* HOTEL */}
        <div className="registration-card">

          <div className="registration-icon">
            🏨
          </div>

          <h2>Hotel</h2>

          <p>
            Donate your hotel's surplus food and help ensure
            good food reaches people who need it.
          </p>

          <button onClick={goToHotel}>
            Register as Hotel
          </button>

        </div>


        {/* CHARITY */}
        <div className="registration-card">

          <div className="registration-icon">
            🏠
          </div>

          <h2>Charity</h2>

          <p>
            Receive surplus food through FoodLoop and help
            distribute it to people in need.
          </p>

          <button onClick={goToCharity}>
            Register as Charity
          </button>

        </div>


        {/* VOLUNTEER */}
        <div className="registration-card">

          <div className="registration-icon">
            🤝
          </div>

          <h2>Volunteer</h2>

          <p>
            Collect surplus food from hotels and deliver it
            safely to the designated charity.
          </p>

          <button onClick={goToVolunteer}>
            Register as Volunteer
          </button>

        </div>

      </div>

    </div>
  )
}