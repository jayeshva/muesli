import React, { useState, useEffect } from 'react';
import './myOrders.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Mymuesli = () => {
  const [mixData, setMixData] = useState([]);
  const [selectedMix, setSelectedMix] = useState(null);
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
          setMixData(response.data);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchMixes();
  }, []);

  const handleView = async (mixId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/mix/getMuseliMix/${mixId}`, {
        headers: {
          'x-auth-token': token,
        },
      });
      console.log("Received mix details:", response.data);  // Log the received data
      setSelectedMix(response.data);
    } catch (error) {
      console.error('Error fetching mix details:', error);
    }
  };
  

  const handleDelete = async (mixId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/mix/deleteMuseliMix/${mixId}`, {
        headers: {
          'x-auth-token': token,
        },
      });
      const updatedMixes = mixData.filter((mix) => mix.museli_id !== mixId);
      setMixData(updatedMixes);
    } catch (error) {
      console.error('Error deleting mix:', error);
    }
  };

  return (
    <div className="Main">
      <div className="container">
        <div className="header">
          <h1>Just Muesli</h1>
          <h4> My Mixes</h4>
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
                  <button style={{ marginLeft: "20px" }} onClick={() => handleView(item.museli_id)}>View</button>
                  <button style={{ marginLeft: "20px" }}>Edit</button>
                  <button style={{ marginLeft: "20px" }} onClick={() => handleDelete(item.museli_id)}>Delete</button>
                </div>
              ))}
            </div>
          </div>
          <div className="viewArea">
          {selectedMix && Object.keys(selectedMix).length > 0 ? (
  <>
    <div className="nutrient">
      <div className="totalCarbohydrates">
        <p>Muesli Cost: ₹{selectedMix[0].total_price}</p>
      </div>
      <div className="totalProteins">
        <p>Total Proteins: {selectedMix[0].total_protein}g</p>
      </div>
      <div className="totalFats">
        <p>Total Fats: {selectedMix[0].total_fats}g</p>
      </div>
      <div className="totalCarbohydrates">
        <p>Total Carbohydrates: {selectedMix[0].total_carbohydrates}g</p>
      </div>
    </div>
    <div className="individualComponents">
      <h3>Individual Components:</h3>
      {selectedMix[0].individual_component && selectedMix[0].individual_component.length > 0 ? (
        selectedMix[0].individual_component.map((component, index) => (
          <div key={index}>
            <p>{component.component_name}: {component.weight_in_gram}g</p>
          </div>
        ))
      ) : (
        <p>No individual components found</p>
      )}
    </div>
  </>
) : (
  <p>Select a mix to view details</p>
)}

</div>

        </div>
      </div>
    </div>
  );
};

export default Mymuesli;
