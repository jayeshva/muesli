import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const LoginForm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    
    if (token) {
      // Check token validity
      axios.get('http://localhost:5000/isTokenValid', {
        headers: {
          "x-auth-token": token
        }
      })
      .then(response => {
        if (response.data.login) {
          navigate('/dashboard');
        }
      })
      .catch(error => {
        console.error('Error checking token validity:', error);
      });
    }
  }, []);

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', loginData);
      
      if(response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        navigate('/dashboard');
      }
      
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
        {message && <p className="message">{message}</p>}
      </form>
      <p>
        Are you a new user? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginForm;
