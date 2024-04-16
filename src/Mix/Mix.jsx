import React, { useState } from 'react';
import './mix.css';

function MuesliMixer() {
    const [totalPrice, setTotalPrice] = useState(0);
    const [total_weight, setTotalWeight] = useState(0);
    const [total_carbohydrates, setTotalCarbohydrates] = useState(0);
    const [total_proteins, setTotalProteins] = useState(0);
    const [total_fats, setTotalFats] = useState(0);

    const [selectedCategory, setSelectedCategory] = useState("basics");

    const categories = ["basics", "fruits", "nuts", "chco", "seeds", "specials"];

    const data = {
        basics: [
            {
                id: 1,
                name: "Oats",
                price: 1.5,
                weight: 600,
                carbohydrates: 66,
                proteins: 17,
                fats: 7
            },
            {
                id: 2,
                name: "Cornflakes",
                price: 1.5,
                weight: 600,
                carbohydrates: 84,
                proteins: 7,
                fats: 0.4
            },
            {
                id: 1,
                name: "Oats",
                price: 1.5,
                weight: 600,
                carbohydrates: 66,
                proteins: 17,
                fats: 7
            },
            {
                id: 2,
                name: "Cornflakes",
                price: 1.5,
                weight: 600,
                carbohydrates: 84,
                proteins: 7,
                fats: 0.4
            },
            {
                id: 1,
                name: "Oats",
                price: 1.5,
                weight: 600,
                carbohydrates: 66,
                proteins: 17,
                fats: 7
            },
            {
                id: 2,
                name: "Cornflakes",
                price: 1.5,
                weight: 600,
                carbohydrates: 84,
                proteins: 7,
                fats: 0.4
            },
            {
                id: 1,
                name: "Oats",
                price: 1.5,
                weight: 600,
                carbohydrates: 66,
                proteins: 17,
                fats: 7
            },
            {
                id: 2,
                name: "Cornflakes",
                price: 1.5,
                weight: 600,
                carbohydrates: 84,
                proteins: 7,
                fats: 0.4
            },
            {
                id: 1,
                name: "Oats",
                price: 1.5,
                weight: 600,
                carbohydrates: 66,
                proteins: 17,
                fats: 7
            },
            {
                id: 2,
                name: "Cornflakes",
                price: 1.5,
                weight: 600,
                carbohydrates: 84,
                proteins: 7,
                fats: 0.4
            },
            {
                id: 1,
                name: "Oats",
                price: 1.5,
                weight: 600,
                carbohydrates: 66,
                proteins: 17,
                fats: 7
            },
            {
                id: 2,
                name: "Cornflakes",
                price: 1.5,
                weight: 600,
                carbohydrates: 84,
                proteins: 7,
                fats: 0.4
            },
        ],
        fruits: [
            {
                id: 1,
                name: "Banana",
                price: 1.5,
                weight: 100,
                carbohydrates: 23,
                proteins: 1.3,
                fats: 0.2
            },
            {
                id: 2,
                name: "Apple",
                price: 1.5,
                weight: 100,
                carbohydrates: 14,
                proteins: 0.3,
                fats: 0.2
            },
            // ... (similar structure for other items in fruits)
        ],
        nuts: [
            {
                id: 1,
                name: "Almonds",
                price: 1.5,
                weight: 100,
                carbohydrates: 22,
                proteins: 21,
                fats: 50
            },
            {
                id: 2,
                name: "Cashews",
                price: 1.5,
                weight: 100,
                carbohydrates: 30,
                proteins: 18,
                fats: 44
            },
            // ... (similar structure for other items in nuts)
        ],
        chco: [
            {
                id: 1,
                name: "White Chocolate",
                price: 1.5,
                weight: 100,
                carbohydrates: 60,
                proteins: 5,
                fats: 33
            },
            {
                id: 2,
                name: "Milk Chocolate",
                price: 1.5,
                weight: 100,
                carbohydrates: 60,
                proteins: 5,
                fats: 33
            },
            // ... (similar structure for other items in chco)
        ],
        seeds: [
            {
                id: 1,
                name: "Chia Seeds",
                price: 1.5,
                weight: 100,
                carbohydrates: 44,
                proteins: 17,
                fats: 31
            },
            {
                id: 2,
                name: "Flax Seeds",
                price: 1.5,
                weight: 100,
                carbohydrates: 29,
                proteins: 18,
                fats: 42
            },
            // ... (similar structure for other items in seeds)
        ],
        specials: [
            {
                id: 1,
                name: "Honey",
                price: 1.5,
                weight: 100,
                carbohydrates: 82,
                proteins: 0.3,
                fats: 0
            },
            {
                id: 2,
                name: "Maple Syrup",
                price: 1.5,
                weight: 100,
                carbohydrates: 67,
                proteins: 0.04,
                fats: 0
            },
            // ... (similar structure for other items in specials)
        ]
    };

    const renderSelectviewItem = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div className="Main">
            <div className="container">
                <div className="header">
                    <h1>Muesli Mixer</h1>
                </div>
                <div className="mixArea">
                    <div className='selector'>
                        <div className="selectCategory">
                            {categories.map((category, index) => (
                                <div className="category" key={index} onClick={() => renderSelectviewItem(category)}>
                                    <p>{category}</p>
                                </div>
                            ))}
                        </div>
                        <div className="selectViewItem">
                            {data[selectedCategory].map((item, index) => (
                                <div className="selectCards" key={index}>
                                    <div className="imgCard">
                                        {/* Placeholder for image */}
                                    </div>
                                    <div className="info">
                                        <div className="name">
                                            <p>{item.name}</p>
                                        </div>
                                        <div className="weight">
                                            <p>{item.weight} Per Gram</p>
                                        </div>
                                    </div>
                                    <div className="price">
                                        <p>${item.price}</p>
                                    </div>
                                    <div className="add">
                                        <button>Add</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="viewArea">
                        <p>Muesli Name </p>
                        <input type="text" placeholder="Muesli Name" />
                        <div className="viewItem">
                            <div className="item">
                                <div className="weight">
                                    <input type="text" placeholder="***" readOnly />
                                </div>
                                <div className="itemName">
                                    <p>Item</p>
                                </div>
                                <div style={{marginLeft:"10px"}} className="Sprice">price</div>

                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MuesliMixer;
