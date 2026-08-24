import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'

export default function Login() {

  const navigate = useNavigate();
  
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = {phone, password, role};

    try{

      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if(!response.ok){
        alert(data.message);
        return;
      }

      localStorage.setItem('role', role);
      localStorage.setItem('Id', data.userId);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(data.user));

      alert('You are Successfully logged in');
      navigate('/food');  
    }
    catch(err){
      console.log(err);
      alert('Unable to log in');
    }
  }

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>Welcome Back</h1>

        <p className="login-subtitle">
          Login to your FoodLoop account
        </p>

        <form onSubmit={handleLogin}>

          {/* Phone Number */}
          <div className="input-group">
            <label>Phone Number</label>

            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>


          {/* Password */}
          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>


          {/* Role */}
          <div className="input-group">
            <label>Login As</label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="" disabled>
                Select your role
              </option>

              <option value="hotel">
                Hotel
              </option>

              <option value="charity">
                Charity
              </option>

              <option value="volunteer">
                Volunteer
              </option>
            </select>
          </div>


          {/* Login Button */}
          <button className="login-btn" type="submit">
            Login
          </button>

        </form>

      </div>

    </div>
  )
}