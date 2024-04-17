import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './mix.css';
import { Link } from 'react-router-dom';

function MuesliMixer() {
    const [totalPrice, setTotalPrice] = useState(0);
    const [total_weight, setTotalWeight] = useState(0);
    const [total_carbohydrates, setTotalCarbohydrates] = useState(0);
    const [total_proteins, setTotalProteins] = useState(0);
    const [total_fats, setTotalFats] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Basics");
    const [MuesliName, setMuesliName] = useState("");
    const [data, setData] = useState([]);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/component/getComponent", 
                  );
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);
    

    const categories = ["Basics", "Fruits", "Nuts", "Choco", "Seeds", "Specials"];


    const renderSelectviewItem = (category) => {
        setSelectedCategory(category);
    };
    
 

    const calculateBaseComponentWeight = (additionalComponentsWeight) => {
        return 600 - additionalComponentsWeight;
    };
    
    const getAdditionalComponentsWeight = () => {
        return selectedItems.reduce((acc, item) => {
            if (item.component_category !== "Basics") {
                acc += item.weight_in_gram;
            }
            return acc;
        }, 0);
    };

       const addItem = (item) => {
        console.log("added",item);
        const itemExists = selectedItems.some((selectedItem) => selectedItem.component_id === item.component_id);
        if(itemExists)
        {
            return removeItem(item.component_id);
        }

        if (item.component_category === "Basics" && selectedItems.some((selectedItem) => selectedItem.component_category === "Basics")) {
            alert("Only one basics component can be selected.");
            return;
        }
        //if no basics component is selected
        if (item.component_category !== "Basics" && !selectedItems.some((selectedItem) => selectedItem.component_category === "Basics")) {
            alert("At least one basics component must be selected. Before adding any other component.");
            return;
        }

        //check if basics component exeeded the weight limit 600g if this component is added
        

        if (!itemExists) {
            setSelectedItems([...selectedItems, item]);
            updateTotals(item, 'add');
          
        } else {
            removeItem(item.component_id);
        }
       
    };

    const removeItem = (id) => {
        console.log("removed",id);
        const removedItem = selectedItems.find((item) => item.component_id === id);

        if (removedItem.component_category === "Basics" && selectedItems.length > 1) {
            alert("Remove other basics component before removing this one.")
            return;
        }

    
        const updatedItems = selectedItems.filter((item) => item.component_id !== id);

        setSelectedItems(updatedItems);
        updateTotals(removedItem, 'remove');
    };
    
    const updateTotals = (item, action) => {
        const factor = action === 'add' ? 1 : -1;

        setTotalPrice(totalPrice + (item.price * factor));
        setTotalWeight(total_weight + (item.weight_in_gram * factor));
        setTotalCarbohydrates(total_carbohydrates + (item.carbohydrates_per_gram * factor));
        setTotalProteins(total_proteins + (item.proteins_per_gram * factor));
        setTotalFats(total_fats + (item.fats_per_gram * factor));

        const additionalComponentsWeight = getAdditionalComponentsWeight();
        const baseComponentWeight = calculateBaseComponentWeight(additionalComponentsWeight);
        //update base component weight if basics component is present
        if (selectedItems.some((item) => item.component_category === "Basics")) {
           selectedItems.forEach((item) => {
                if (item.component_category === "Basics") {
                    item.weight_in_gram = baseComponentWeight;
                }
            });
        }

        console.log("additionalComponentsWeight",additionalComponentsWeight);
        console.log("baseComponentWeight",baseComponentWeight);

    };

    const isItemAdded = (id) => {
        console.log("selectedItems",selectedItems);
        return selectedItems.some((item) => item.component_id === id);
    };
    const onSave = async() => {
        if(MuesliName === "")
        {
            return alert("Please enter Muesli Name");
        }
        var additionalComponentsWeight = getAdditionalComponentsWeight();
        var baseComponentWeight = calculateBaseComponentWeight(additionalComponentsWeight);
        if(baseComponentWeight || NaN < 0){
            return alert("Base component weight exceeded the limit");
        }
        var data = {
            museli_mix_name: MuesliName,
            base_component_id: selectedItems.find((item) => item.component_category === "Basics").component_id,
            base_component_name: selectedItems.find((item) => item.component_category === "Basics").component_name,
            "total_price": totalPrice,
            "total_protein": total_proteins,
            "total_fats": total_fats,
            "total_carbohydrates": total_carbohydrates,
            individual_component: selectedItems.map((item) => {
                return {
                    component_id: item.component_id,
                    component_name: item.component_name,
                    weight_in_gram: item.weight_in_gram,
                    price: item.price,
                    carbohydrates_per_gram: item.carbohydrates_per_gram,
                    proteins_per_gram: item.proteins_per_gram,
                    fats_per_gram: item.fats_per_gram
                };
            }
        )
        }
        var response = await axios.post("http://localhost:5000/mix/addMuseliMix",data, {
            headers: {
              'x-auth-token': token,
            },
          });
        console.log(response);
        if(response.status === 200)
        {
            //reset all values
            setTotalPrice(0);
            setTotalWeight(0);
            setTotalCarbohydrates(0);
            setTotalProteins(0);
            setTotalFats(0);
            setSelectedItems([]);
            setMuesliName("");

           return alert("Muesli Mix Saved Successfully");
        }
        else
        {
            return alert("Error in saving Muesli Mix");
        }
    };

    return (
        <div className="AMain">
            <div className="Acontainer">
                <div className="header">
                <Link to="/dashboard">
                    <button type='button'>Go Back</button>
                    </Link>
                    <h1>Muesli Mixer</h1>
                </div>
                <div className="mixAArea">
                    <div className='Aselector'>
                        <div className="selectCategory">
                            {categories.map((category, index) => (
                                <div className="category" key={index} onClick={() => renderSelectviewItem(category)}>
                                    <p>{category}</p>
                                </div>
                            ))}
                        </div>
                        <div className="selectViewItem">
                            {data[selectedCategory]?.map((item, index) => (
                                <div className="selectCards" key={index}>
                                    <div className="imgCard">
                                        {/* Placeholder for image */}
                                    </div>
                                    <div className="info">
                                        <div className="name">
                                            <p>{item.component_name}</p>
                                        </div>
                                        <div className="weight">
                                            <p>{item.weight_in_gram} Per Gram</p>
                                        </div>
                                    </div>
                                    <div className="price">
                                        <p>₹{item.price}</p>
                                    </div>
                                    <div className="add">
                                    <button onClick={() => addItem(item)}>
                                            {isItemAdded(item.component_id) ? 'Remove' : 'Add'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="viewAArea">
                        <p>Muesli Name </p>
                        <input type="text" value={MuesliName} placeholder="Muesli Name" onChange={(e)=>{
                            setMuesliName(e.target.value);
                        }} />
                        <div className="viewAItem">
                        {/* <div className="item">
                                <div className="weight">
                                    <input type="text" placeholder="***" readOnly />
                                </div>
                                <div className="itemName">
                                    <p>Item</p>
                                </div>
                                <div style={{marginLeft:"10px"}} className="Sprice">price</div>

                            </div> */}
                            {selectedItems.map((item, index) => (
                                <div className="item" key={index}>
                                    <div style={{width:"300px", display:"flex",justifyContent:"space-between"}}>
                                    <div className="weight" style={{marginLeft:"3px"}}>
                                        <input type="text" placeholder={item.weight_in_gram} readOnly />
                                    </div>
                                    <div className="itemName" style={{marginLeft:"3px"}}>
                                        <p>{item.component_name}</p>
                                    </div>
                                    <div className="Sprice" style={{marginLeft:"3px"}}>₹{item.price}</div>
                                    </div>
                                    <div className="remove" style={{marginLeft:"3px"}}>
                                        <button onClick={() => removeItem(item.component_id)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                            {/* <div className="item">
                                <div className="weight">
                                    <input type="text" placeholder="***" readOnly />
                                </div>
                                <div className="itemName">
                                    <p>Item</p>
                                </div>
                                <div style={{marginLeft:"10px"}} className="Sprice">price</div>

                            </div> */}
                            
                            


                        </div>
                        <div className="nutrient">
                        <div className="totalCarbohydrates">
                                <p>Total Carbohydrates: {total_carbohydrates}g</p>
                            </div>
                            <div className="totalProteins">
                                <p>Total Proteins: {total_proteins}g</p>
                            </div>
                            <div className="totalFats">
                                <p>Total Fats: {total_fats}g</p>
                            </div>
                        </div>
                        <div className="total">
                        <div className="totalPrice">
                                <p>Total Price: ₹{totalPrice}</p>
                            </div>
                            <div className="totalWeight">
                                <button type='button' onClick={onSave}>Save</button>
                            </div>
                            
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MuesliMixer;
