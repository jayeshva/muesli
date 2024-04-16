import React, { useState } from 'react';
import axios from 'axios';
import './register.css';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for sign-in option
import { countries } from './countries'; // Import countries array

const RegisterForm = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    address: '',
    country: '',
    pincode: '',
    mobile: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/user/createUser', userData);
      setMessage('User registered successfully');
      setUserData({
        name: '',
        address: '',
        country: '',
        pincode: '',
        mobile: '',
        email: '',
        password: '',
      });
    } catch (error) {
      setMessage('Error registering user');
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={userData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={userData.address}
          onChange={handleChange}
          required
        />
        <select
          name="country"
          value={userData.country}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select Country</option>
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={userData.pincode}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile"
          value={userData.mobile}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
        {message && <p className="message">{message}</p>}
      </form>
      <p>
        Already a user? <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
};

export default RegisterForm;
