import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
    const navigate = useNavigate();
    const [selectedLanguage, setSelectedLanguage] = useState("English");

    const handleLanguageChange = (e) => {
        setSelectedLanguage(e.target.value);
    };

    return (
        <div className="Main">
            <div className="container">
                <div className="header">
                    <h1>Just Muesli</h1>
                    <div className="language-switcher">
                        <label>
                            <input 
                                type="radio" 
                                value="English" 
                                checked={selectedLanguage === "English"} 
                                onChange={handleLanguageChange} 
                            />
                            English
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                value="Deutsch" 
                                checked={selectedLanguage === "Deutsch"} 
                                onChange={handleLanguageChange} 
                            />
                            Deutsch
                        </label>
                    </div>
                </div>
                <div className="navigation">
                    <Link to="/editUser">
                    <button>Edit Customer Details</button>
                    </Link>
                    <button>My Orders</button>
                    <Link to="/mix">
                    <button>Mix</button>
                    </Link>
                    <button>My Muesli Mixes</button>
                    <button>Order</button>
                    <button>Exit</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
