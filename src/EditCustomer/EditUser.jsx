import React, { useState, useEffect } from 'react';
import './editUser.css';
import { countries } from '../LoginRegister/countries'; // Import countries array
import axios from 'axios';
import { Link } from 'react-router-dom';

const EditUser = () => {
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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/user/getUser', {
          headers: {
            'x-auth-token': token,
          },
        });
        setUserData(response.data[0]); // Assuming the user data is returned as an array with a single object
      } catch (error) {
        console.error('Error fetching user:', error);
        setMessage('Error fetching user');
      }
    };

    fetchUser();
  }, []);

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
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/user/editUser', userData, {
        headers: {
          'x-auth-token': token,
        },
      });
      setMessage('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
      setMessage('Error updating user');
    }
  };

  return (
    <div className="Main">
      <div className="container">
        <div className="header">
          <h1>Just Muesli</h1>
          <h4>Edit Customer Details</h4>
        </div>
        <div className="editUser">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={userData.name || ''}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={userData.address || ''}
              onChange={handleChange}
              required
            />
          <select
          name="country"
          value={userData.country || ''}
          onChange={handleChange}
          required
          style={{ width: '220px', padding: '10px' }}
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
              value={userData.pincode || ''}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile"
              value={userData.mobile || ''}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userData.email || ''}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userData.password || ''}
              onChange={handleChange}
              required
            />
            <div style={{width:"200px",display:"flex",flexDirection:"row",justifyContent:'space-between'}}>
            <button type="submit">Update</button>
            <Link to="/dashboard">
            <button type="button">Cancel</button>
            </Link>
            </div>
           
            {message && <p className="message">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
