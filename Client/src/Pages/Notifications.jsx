import React, { useEffect, useState } from 'react'
import './Notifications.css'

export default function Notifications() {

  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  const userId = localStorage.getItem('Id')
  const role = localStorage.getItem('role')

  useEffect(() => {

    const fetchNotifications = async () => {

      try {

        console.log("User ID:", userId)
        console.log("Role:", role)

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/notifications?user_id=${userId}&role=${role}`
        )

        const data = await response.json()

        console.log("Notifications:", data)

        if (!response.ok) {
          alert(data.message)
          return
        }

        setNotifications(data)

      }
      catch (error) {

        console.error(error)
        alert('Unable to fetch notifications')

      }
      finally {

        setLoading(false)

      }

    }

    fetchNotifications()

  }, [userId, role])


  return (

    <div className="notifications-page">

      <div className="notifications-header">

        <h1>Notifications</h1>

        <p>
          Stay updated with your FoodLoop activities.
        </p>

      </div>


      {loading ? (

        <div className="notification-empty">
          <div className="notification-icon">🔄</div>
          <h2>Loading...</h2>
        </div>

      ) : notifications.length === 0 ? (

        <div className="notification-empty">

          <div className="notification-icon">
            🔔
          </div>

          <h2>No notifications</h2>

          <p>
            You're all caught up!
          </p>

        </div>

      ) : (

        <div className="notification-list">

          {notifications.map((notification) => (

            <div
              className={`notification-card ${
                notification.is_read ? '' : 'unread'
              }`}
              key={notification.id}
            >

              <div className="notification-card-icon">
                🔔
              </div>

              <div className="notification-content">

                <p>
                  {notification.message}
                </p>

                <span>
                  {new Date(
                    notification.created_at
                  ).toLocaleString()}
                </span>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  )
}