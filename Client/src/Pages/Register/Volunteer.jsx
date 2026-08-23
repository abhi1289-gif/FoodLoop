import React, { useState } from 'react'
import './Volunteer.css'
import { useNavigate } from 'react-router-dom'

export default function Volunteer() {

  const navigate = useNavigate();
  

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    password: '',
    city: '',
    availability: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register/volunteer`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await response.json();

      if(!response.ok){
        alert(data.message);
        return;
      }
      alert('Volunteer registered successfully!')
      console.log(data);
      navigate('/login');
    }
    catch(err){
      console.log(err);
      alert('Unable to connect to server');
    }
  }

  return (
    <div className="volunteer-page">

      <div className="volunteer-card">

        <div className="volunteer-heading">
          <h1>Volunteer Registration</h1>
          <p>
            Join FoodLoop and help deliver surplus food to charities
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Name */}
          <div className="volunteer-input-group">
            <label>Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>


          {/* Email */}
          <div className="volunteer-input-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>


          {/* Phone Number */}
          <div className="volunteer-input-group">
            <label>Phone Number</label>

            <input
              type="tel"
              name="phone_number"
              placeholder="Enter your phone number"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </div>


          {/* Password */}
          <div className="volunteer-input-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>


          {/* City */}
          <div className="volunteer-input-group">
            <label>City</label>

            <input
              type="text"
              name="city"
              placeholder="Enter your city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>


          {/* Availability */}
          <div className="volunteer-input-group">
            <label>Availability</label>

            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select your availability
              </option>

              <option value="Morning">
                Morning
              </option>

              <option value="Afternoon">
                Afternoon
              </option>

              <option value="Evening">
                Evening
              </option>

              <option value="Full Day">
                Full Day
              </option>

              <option value="Weekends">
                Weekends
              </option>
            </select>
          </div>


          {/* Register Button */}
          <button
            type="submit"
            className="volunteer-register-btn"
          >
            Register as Volunteer
          </button>

        </form>

      </div>

    </div>
  )
}