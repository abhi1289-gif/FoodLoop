import React, { useState } from 'react'
import './AddFood.css'
import { useNavigate } from 'react-router-dom'

export default function AddFood() {

  const navigate = useNavigate()

  const hotelId = localStorage.getItem('Id');

  const [formData, setFormData] = useState({
    food_name: '',
    quantity: '',
    description: '',
    pickup_location: '',
    available_until: ''
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

    if (!hotelId) {
      alert('Hotel information not found. Please login again.');
      navigate('/login');
      return;
    }

    try {

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/food/add`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            ...formData,

            hotel_id: hotelId
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.message)
        return
      }

      alert('Food added successfully!')

      navigate('/food')

    } catch (error) {

      console.error(error)

      alert('Unable to connect to server')
    }
  }


  return (
    <div className="add-food-page">

      <div className="add-food-card">

        <h1>Add Food Donation</h1>

        <p>
          Share surplus food with people who need it.
        </p>


        <form onSubmit={handleSubmit}>

          <div className="add-food-input">

            <label>Food Name</label>

            <input
              type="text"
              name="food_name"
              placeholder="Example: Rice & Dal"
              value={formData.food_name}
              onChange={handleChange}
              required
            />

          </div>


          <div className="add-food-input">

            <label>Quantity</label>

            <input
              type="number"
              name="quantity"
              placeholder="Number of meals"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              required
            />

          </div>


          <div className="add-food-input">

            <label>Description</label>

            <textarea
              name="description"
              placeholder="Describe the food..."
              value={formData.description}
              onChange={handleChange}
            />

          </div>


          <div className="add-food-input">

            <label>Pickup Location</label>

            <input
              type="text"
              name="pickup_location"
              placeholder="Enter pickup location"
              value={formData.pickup_location}
              onChange={handleChange}
              required
            />

          </div>


          <div className="add-food-input">

            <label>Available Until</label>

            <input
              type="datetime-local"
              name="available_until"
              value={formData.available_until}
              onChange={handleChange}
              required
            />

          </div>


          <button
            type="submit"
            className="add-food-submit"
          >
            Add Food
          </button>

        </form>

      </div>

    </div>
  )
}