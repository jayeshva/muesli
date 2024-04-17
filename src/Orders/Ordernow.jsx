import React, { useState, useEffect } from 'react';
import './myOrders.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Ordernow = () => {
  const [mixData, setMixData] = useState([]);
  const [selectedMixes, setSelectedMixes] = useState({});
  const [museliCost, setMuseliCost] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [taxCost, setTaxCost] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchMixes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/mix/getMuseliMix', {
          headers: {
            'x-auth-token': token,
          },
        });
        if (response.data) {
          const initialSelectedMixes = {};
          response.data.forEach((mix) => {
            initialSelectedMixes[mix._id] = { quantity: 0, price: mix.total_price };
          });
          setSelectedMixes(initialSelectedMixes);
          setMixData(response.data);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchMixes();
  }, []);

  useEffect(() => {
    let muesliCost = 0;
    let shippingCost = 0;
    let taxCost = 0;
    let totalPrice = 0;

    Object.values(selectedMixes).forEach(({ quantity, price }) => {
      muesliCost += quantity * price;
    });

    setMuseliCost(muesliCost);
    
    // Calculate shipping cost, tax, and total price (you can adjust these calculations as per your requirements)
    shippingCost = muesliCost > 1000 ? 0 : 50;
    taxCost = muesliCost * 0.18; // 18% tax
    totalPrice = muesliCost + shippingCost + taxCost;

    setShippingCost(shippingCost);
    setTaxCost(taxCost);
    setTotalPrice(totalPrice);
  }, [selectedMixes]);

  const handleAdd = (mixId, quantity) => {
    const updatedSelectedMixes = {
      ...selectedMixes,
      [mixId]: {
        ...selectedMixes[mixId],
        quantity: selectedMixes[mixId].quantity + quantity,
      },
    };
    setSelectedMixes(updatedSelectedMixes);
  };

  const handleRemove = (mixId, quantity) => {
    const updatedSelectedMixes = {
      ...selectedMixes,
      [mixId]: {
        ...selectedMixes[mixId],
        quantity: selectedMixes[mixId].quantity - quantity,
      },
    };
    setSelectedMixes(updatedSelectedMixes);
  };

  return (
    <div className="Main">
      <div className="container">
        <div className="header">
          <h1>Just Muesli</h1>
          <h4> Order Now</h4>
        </div>
        <div className="mixArea">
          <div className='selector'>
            <div className="selectViewItem">
              {mixData?.map((item, index) => (
                <div className="selectCards" key={index}>
                  <div className="info">
                    <div className="name" style={{ marginTop: "30px" }}>
                      <p>{item.museli_mix_name}</p>
                    </div>
                  </div>
                  <div className="price" style={{ marginRight: "10px" }}>
                    <p>₹{item.total_price}</p>
                  </div>
                  <button onClick={() => handleRemove(item._id, 1)}>-</button>
                  <input
                    type="number"
                    value={selectedMixes[item._id]?.quantity || 0}
                    readOnly
                    style={{ width: "40px", height: "15px", marginLeft: "10px" ,marginRight:"10px" }}
                  />
                  <button onClick={() => handleAdd(item._id, 1)}>+</button>
                </div>
              ))}
            </div>
          </div>
          <div className="viewArea">
            <div className="nutrient">
              <div className="totalCarbohydrates">
                <p>Muesli Cost: ₹{museliCost}</p>
              </div>
              <div className="totalProteins">
                <p>Shipping Cost: ₹{shippingCost}</p>
              </div>
              <div className="totalFats">
                <p>Tax Cost: ₹{taxCost}</p>
              </div>
            </div>
            <div className="total">
              <div className="totalPrice">
                <p>Total Price: ₹{totalPrice}</p>
              </div>
              <div className="totalWeight">
                <button type='button'>Order Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ordernow;
