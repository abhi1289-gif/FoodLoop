import React, { useEffect, useState } from 'react'
import './Food.css'
import { useNavigate } from 'react-router-dom'

export default function Food() {

  const navigate = useNavigate()

  const [foodData, setFoodData] = useState([])
  const [loading, setLoading] = useState(true)

  const role = localStorage.getItem('role')

  useEffect(() => {

    const fetchFood = async () => {

      try {

        const response = await fetch(`${import.meta.env.VITE_API_URL}/food`)

        const data = await response.json()

        if (!response.ok) {
          alert(data.message)
          return
        }

        setFoodData(data)

      }
      catch (error) {

        console.error(error)
        alert('Unable to fetch food')

      }
      finally {

        setLoading(false)

      }
    }

    fetchFood()

  }, [])


  // CHARITY REQUESTS FOOD
  const handleRequest = async (foodId) => {

    try {

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/food/request`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            food_id: foodId,
            charity_id: localStorage.getItem('Id')
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.message)
        return
      }

      // Update UI
      setFoodData(prevFood =>
        prevFood.map(food =>
          food.id === foodId
            ? { ...food, status: 'REQUESTED' }
            : food
        )
      )

    } catch (error) {

      console.error(error)
      alert('Unable to request food')

    }
  }


  // VOLUNTEER PICKS UP FOOD
const handlePickup = async (foodId) => {

    try {

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/food/pick-up`,
            {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    food_id: foodId,
                    volunteer_id: localStorage.getItem('Id')
                })
            }
        );


        const data = await response.json();


        if (!response.ok) {

            alert(data.message);
            return;

        }


        setFoodData(prevFood =>
            prevFood.map(food =>
                food.id === foodId
                    ? {
                        ...food,
                        status: 'PICKED_UP',
                        volunteer_id: localStorage.getItem('Id')
                    }
                    : food
            )
        );


        alert('Pickup accepted successfully!');

    }
    catch (error) {

        console.error(error);

        alert('Unable to pick-up food');

    }

};


  return (

    <div className="food-page">

      {/* HEADER */}

      <div className="food-header">

        <div>

          <h1>Food Donations</h1>

          <p>

            {role === 'hotel' && (
              <span>
                Donate your surplus food and help reduce food waste
              </span>
            )}

            {role === 'charity' && (
              <span>
                Find surplus food available for your organization
              </span>
            )}

            {role === 'volunteer' && (
              <span>
                Help deliver requested food to organizations in need
              </span>
            )}

          </p>

        </div>


        {/* HOTEL */}

        {role === 'hotel' && (

          <button
            className="add-food-btn"
            onClick={() => navigate('/add-food')}
          >
            + Add Food
          </button>

        )}

      </div>


      {/* FOOD */}

      {loading ? (

        <p>Loading food...</p>

      ) : foodData.length === 0 ? (

        <p>No food donations available.</p>

      ) : (

        <div className="food-grid">

          {foodData.map((food) => (

            <div className="food-card" key={food.id}>

              {/* VOLUNTEER + PICKED UP */}
              {role === 'volunteer' && food.status === 'PICKED_UP' ? (

                <div className="delivery-card">

                  <h2>🚚 Delivery Details</h2>

                  <div className="delivery-section">
                    <h3>🏨 Hotel</h3>

                    <p>
                      <strong>{food.hotel_name}</strong>
                    </p>

                    <p>
                      📞 {food.hotel_phone}
                    </p>

                    <p>
                      📍 {food.pickup_location}
                    </p>
                  </div>


                  <div className="delivery-section">

                    <h3>🤝 Charity</h3>

                    <p>
                      <strong>{food.charity_name}</strong>
                    </p>

                    <p>
                      📞 {food.charity_phone}
                    </p>

                    <p>
                      📍 {food.charity_address}
                    </p>

                  </div>

                </div>

              ) : (

                /* NORMAL CARD */
                <>

                  {/* HOTEL INFO */}

                  <div className="hotel-info">

                    <div className="hotel-icon">
                      🏨
                    </div>

                    <div>

                      <h2>
                        {food.hotel_name}
                      </h2>

                      <p>
                        📞 {food.hotel_phone}
                      </p>

                    </div>

                  </div>


                  <div className="divider"></div>


                  {/* FOOD INFO */}

                  <div className="food-info">

                    <h3>
                      🍚 {food.food_name}
                    </h3>

                    <p>
                      📦 <strong>Quantity:</strong>{' '}
                      {food.quantity} meals
                    </p>

                    <p>
                      📝 {food.description}
                    </p>

                    <p>
                      📍 <strong>Location:</strong>{' '}
                      {food.pickup_location}
                    </p>

                    <p>
                      ⏰ <strong>Available until:</strong>{' '}
                      {food.available_until}
                    </p>

                  </div>


                  {/* STATUS */}

                  <div className="food-status">

                    <span
                      className={`status ${food.status.toLowerCase()}`}
                    >
                      {food.status}
                    </span>

                  </div>


                  {/* CHARITY */}

                  {role === 'charity' &&
                    food.status === 'AVAILABLE' && (

                      <button
                        className="request-btn"
                        onClick={() => handleRequest(food.id)}
                      >
                        Request Food
                      </button>

                  )}


                  {/* VOLUNTEER */}

                  {role === 'volunteer' &&
                    food.status === 'REQUESTED' && (

                      <button
                        className="pickup-btn"
                        onClick={() => handlePickup(food.id)}
                      >
                        🚚 Pickup
                      </button>

                  )}

                </>

              )}

            </div>

          ))}

        </div>

      )}

    </div>

  )
}