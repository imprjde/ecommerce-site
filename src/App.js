import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import CartView from "./components/CartView";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";


function App() {
  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cart, setCart]= useState([])


  const fetchDataFunction = () => {
    setIsLoading(true);
    setTimeout(() => {
      axios
        .get("https://fakestoreapi.com/products")
        .then((res) => setApiData(res.data));
      setIsLoading(false);
    }, 2000);
  };
  useEffect(() => {
    fetchDataFunction();
  }, []);

  const FilteredCartItems = cartItems.filter(
    (object, index, array) =>
      index === array.findIndex((obj) => obj.title === object.title)
  );

  useEffect(() => {
    // Add quantity property to each object in apiData
    const updatedApiData = FilteredCartItems.map(item => ({ ...item, quantity: 1 }));
    setCart(updatedApiData);
  }, [cartItems]);




  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
  };
  function handleDelete(id) {
    setCartItems(cartItems.filter((item) => item.id !== id));
  }
  const updateQuantity = (index, newQuantity) => {
    const newCart = [...cart]; // Create a copy of the cart array
    newCart[index].quantity = newQuantity; // Update the quantity of the specified object
    setCart(newCart); // Update the state with the new cart array
  };




  return (
    
    <BrowserRouter>
  
    <Routes>
    <Route path="/" element={<Home apiData={apiData} setIsLoading={setIsLoading} isLoading={isLoading} cart={cart} handleAddToCart={handleAddToCart} handleDelete={handleDelete} cartItems={cartItems} setCartItems={setCartItems} updateQuantity={updateQuantity}/>}  />
    <Route path="/cart" element={<CartView apiData={apiData}  handleAddToCart={handleAddToCart} cart={cart} handleDelete={handleDelete} cartItems={cartItems} setCartItems={setCartItems} updateQuantity={updateQuantity}/>}  />
    </Routes>
    </BrowserRouter>
  );
}

export default App;

