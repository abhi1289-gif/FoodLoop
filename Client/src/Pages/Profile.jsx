import React from 'react';

export default function Profile() {

  const userData = localStorage.getItem("user");

  if (!userData) {
    return (
      <div>
        <h1>My Profile</h1>
        <p>User information not found. Please login again.</p>
      </div>
    );
  }

  const user = JSON.parse(userData);
  const role = localStorage.getItem("role");

  return (
    <div>
      <h1>My Profile</h1>

      <p>
        <strong>Role:</strong> {role}
      </p>

      <p>
        <strong>ID:</strong> {user.id}
      </p>

      <p>
        <strong>Name / Owner:</strong> {user.owner || user.name}
      </p>

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <p>
        <strong>Phone:</strong> {user.phone_number}
      </p>

      <p>
        <strong>Address:</strong> {user.address}
      </p>

      <p>
        <strong>City:</strong> {user.city}
      </p>
    </div>
  );
}