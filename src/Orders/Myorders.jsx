import React, { useState, useEffect } from 'react';
import './myOrders.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Myorders = () => {

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/user/getUser', {
          headers: {
            'x-auth-token': token,
          },
        });
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);



  return (
    <div className="Main">
      <div className="container">
        <div className="header">
          <h1>Just Muesli</h1>
          <h4>My Orders</h4>
        </div>
        
      
      </div>
    </div>
  );
};

export default Myorders;
