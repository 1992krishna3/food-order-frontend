import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "https://food-order-backend-5.onrender.com"; // backend URL
  const [token, setToken] = useState("");

  console.log("Cart Items in StoreContext:", cartItems);
  console.log("Food List in StoreContext:", food_list);


  
  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    if (token) {
      setToken(token);
      loadCartData(token); // Load cart data on component mount
    }
  }, []);

  const addToCart = async (foodId) => {
    try {
      const newQuantity = cartItems[foodId] ? cartItems[foodId] + 1 : 1;
      setCartItems((prev) => ({ ...prev, [foodId]: newQuantity }));

      // Define the data payload for the request
      const data = {
        foodId,
        quantity: cartItems[foodId] ? cartItems[foodId] + 1 : 1,
      };

      // Send the request to the backend to add to cart
      const response = await axios.post(`${url}/api/cart/add`, data, {
        headers: {
          Authorization: `Bearer ${token}`, // Add JWT token for authentication
          "Content-Type": "application/json",
        },
      });
      console.log("Item added to cart:", response.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const currentToken = token || localStorage.getItem("authToken");
      if (!currentToken) {
        throw new Error("No valid token found.");
      }

      const newQuantity = Math.max(cartItems[itemId] - 1, 0);
      setCartItems((prev) => ({ ...prev, [itemId]: newQuantity }));

      const data = { itemId, quantity: newQuantity };
      console.log("Removing item with data:", data);

      const response = await axios.post(`${url}/api/cart/remove`, data, {
        headers: {
          Authorization: `Bearer ${currentToken}`, // Add JWT token for authentication
        },
      });

      console.log("Item removed from cart on server:", response.data);
    } catch (error) {
      console.error(
        "Error removing item from cart:",
        error.response?.data || error.message
      );
    }
  };
  const updateCart = async (userId, foodId, quantity) => {
    try {
      const response = await axios.put(`${url}/api/cart/update`, {
        userId,
        foodId,
        quantity,
      });

      if (response.status === 200) {
        console.log("Cart updated successfully:", response.data);
      }
    } catch (error) {
      console.error("Error while updating cart:", error.message);
      alert("An error occurred while updating the cart.");
    }
  };

  const getTotalCartAmount = () => {
    if (food_list.length === 0) {
      return 0;
    }

    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        // Find the product in the food_list
        const itemInfo = food_list.find(
          (product) => product._id === String(item)
        );
        // Log to debug which item is causing the issue
        if (!itemInfo) {
          continue; // Skip this iteration if itemInfo is not found
        }

        // If itemInfo is found, proceed to calculate the total
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    console.log(`Total cart amount: ${totalAmount}`);
    return totalAmount;
  };

  const loadCartData = async (token) => {
    try {
      // Send the request to the backend to get cart data
      const response = await axios.post(
        `${url}/api/cart/get`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Correctly set the Authorization header
            "Content-Type": "application/json", // Optional but good to include
          },
        }
      );

      console.log("Cart data loaded:", response.data);

      //Set the cart items from the response
      setCartItems(response.data.cartData);
    } catch (error) {
      console.error(
        "Error loading cart data:",
        error.response?.data || error.message
      );
    }
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    updateCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
