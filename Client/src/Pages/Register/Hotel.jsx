import React, { useState } from 'react'
import './Hotel.css'
import { useNavigate } from 'react-router-dom'

export default function Hotel() {

  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    organization_name: '',
    owner: '',
    email: '',
    phone_number: '',
    password: '',
    address: '',
    city: ''
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register/hotel`, {
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
      alert('Hotel registered successfully!')
      console.log(data);
      navigate('/login');
    }
    catch(err){
      console.log(err);
      alert('Unable to connect to server');
    }
  }

  return (
    <div className="hotel-page">

      <div className="hotel-card">

        <div className="hotel-heading">
          <h1>Hotel Registration</h1>
          <p>
            Register your hotel and help reduce food waste
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Organization Name */}
          <div className="hotel-input-group">
            <label>Organization Name</label>

            <input
              type="text"
              name="organization_name"
              placeholder="Enter hotel name"
              value={formData.organization_name}
              onChange={handleChange}
              required
            />
          </div>


          {/* Owner */}
          <div className="hotel-input-group">
            <label>Owner</label>

            <input
              type="text"
              name="owner"
              placeholder="Enter owner's name"
              value={formData.owner}
              onChange={handleChange}
              required
            />
          </div>


          {/* Email */}
          <div className="hotel-input-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter hotel email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>


          {/* Phone */}
          <div className="hotel-input-group">
            <label>Phone Number</label>

            <input
              type="tel"
              name="phone_number"
              placeholder="Enter phone number"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </div>


          {/* Password */}
          <div className="hotel-input-group">
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


          {/* Address */}
          <div className="hotel-input-group">
            <label>Address</label>

            <textarea
              name="address"
              placeholder="Enter hotel address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>


          {/* City */}
          <div className="hotel-input-group">
            <label>City</label>

            <input
              type="text"
              name="city"
              placeholder="Enter city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>


          {/* Register */}
          <button
            type="submit"
            className="hotel-register-btn"
          >
            Register Hotel
          </button>

        </form>

      </div>

    </div>
  )
}