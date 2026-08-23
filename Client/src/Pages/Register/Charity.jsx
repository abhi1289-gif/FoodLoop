import React, { useState } from 'react'
import './Charity.css'
import { useNavigate } from 'react-router-dom'

export default function Charity() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    organization_name: '',
    contact_person: '',
    email: '',
    phone_number: '',
    password: '',
    address: '',
    city: '',
    people_served: '',
    type_charity: ''
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register/charity`, {
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
      alert('Charity registered successfully!');
      console.log(data);
      navigate('/login');
    }
    catch(err){
      console.log(err);
      alert('Unable to connect to server');
    }
  }

  return (
    <div className="charity-page">

      <div className="charity-card">

        <div className="charity-heading">
          <h1>Charity Registration</h1>
          <p>
            Register your organization and help provide food to people in need
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Organization Name */}
          <div className="charity-input-group">
            <label>Organization Name</label>

            <input
              type="text"
              name="organization_name"
              placeholder="Enter organization name"
              value={formData.organization_name}
              onChange={handleChange}
              required
            />
          </div>


          {/* Contact Person */}
          <div className="charity-input-group">
            <label>Contact Person</label>

            <input
              type="text"
              name="contact_person"
              placeholder="Enter contact person's name"
              value={formData.contact_person}
              onChange={handleChange}
              required
            />
          </div>


          {/* Email */}
          <div className="charity-input-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter organization email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>


          {/* Phone Number */}
          <div className="charity-input-group">
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
          <div className="charity-input-group">
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
          <div className="charity-input-group">
            <label>Address</label>

            <textarea
              name="address"
              placeholder="Enter organization address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>


          {/* City */}
          <div className="charity-input-group">
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


          {/* People Served */}
          <div className="charity-input-group">
            <label>Number of People Served</label>

            <input
              type="number"
              name="people_served"
              placeholder="Enter number of people served"
              min="1"
              value={formData.people_served}
              onChange={handleChange}
              required
            />
          </div>


          {/* Type of Charity */}
          <div className="charity-input-group">
            <label>Type of Charity</label>

            <select
              name="type_charity"
              value={formData.type_charity}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select charity type
              </option>

              <option value="Orphanage">
                Orphanage
              </option>

              <option value="Old Age Home">
                Old Age Home
              </option>

              <option value="Homeless Shelter">
                Homeless Shelter
              </option>

              <option value="Community Kitchen">
                Community Kitchen
              </option>

              <option value="Other">
                Other
              </option>
            </select>
          </div>


          {/* Register */}
          <button
            type="submit"
            className="charity-register-btn"
          >
            Register Charity
          </button>

        </form>

      </div>

    </div>
  )
}