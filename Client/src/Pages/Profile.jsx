import React from 'react';
import './Profile.css';

export default function Profile() {

  const userData = localStorage.getItem("user");

  if (!userData) {
    return (
      <div className="profile-page">
        <div className="profile-card error-card">
          <h1>My Profile</h1>
          <p>User information not found. Please login again.</p>
        </div>
      </div>
    );
  }

  const user = JSON.parse(userData);
  const role = localStorage.getItem("role");

  const displayName = user.owner || user.name || "User";

  return (
    <div className="profile-page">

      <div className="profile-card">

        {/* Profile Header */}
        <div className="profile-header">

          <div className="profile-avatar">
            👤
          </div>

          <div>
            <h1>{displayName}</h1>

            <p className="profile-role">
              {role?.charAt(0).toUpperCase() + role?.slice(1)}
            </p>
          </div>

        </div>


        {/* User Information */}
        <div className="profile-section">

          <h2>Personal Information</h2>

          <div className="profile-grid">

            <div className="profile-item">
              <span className="profile-label">User ID</span>
              <span className="profile-value">{user.id}</span>
            </div>

            <div className="profile-item">
              <span className="profile-label">Role</span>
              <span className="profile-value role-badge">
                {role}
              </span>
            </div>

            <div className="profile-item">
              <span className="profile-label">Name / Owner</span>
              <span className="profile-value">
                {displayName}
              </span>
            </div>

            <div className="profile-item">
              <span className="profile-label">Email</span>
              <span className="profile-value">
                {user.email}
              </span>
            </div>

            <div className="profile-item">
              <span className="profile-label">Phone Number</span>
              <span className="profile-value">
                {user.phone_number}
              </span>
            </div>

            <div className="profile-item">
              <span className="profile-label">City</span>
              <span className="profile-value">
                {user.city}
              </span>
            </div>

          </div>

        </div>


        {/* Address */}
        <div className="profile-section">

          <h2>Address</h2>

          <div className="address-box">
            📍 {user.address || "Address not provided"}
          </div>

        </div>

      </div>

    </div>
  );
}