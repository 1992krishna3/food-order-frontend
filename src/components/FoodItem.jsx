import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow-lg">
      <div className="relative">
        <img className="w-full h-full object-cover" src={image} alt={name} />
        {!cartItems[id] ? (
          <img
            className="absolute top-2 right-2 w-8 h-8 cursor-pointer"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="absolute top-2 right-2 bg-white border border-gray-300 rounded-lg flex items-center p-2 space-x-2">
            <img
              className="w-6 h-6 cursor-pointer"
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p className="text-lg font-semibold">{cartItems[id]}</p>
            <img
              className="w-6 h-6 cursor-pointer"
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2 ">
          <p className="text-lg font-semibold">{name}</p>
          <img src={assets.rating_starts} alt="Rating" className="w-16 h-4" />
        </div>
        <p className="text-gray-600 text-sm mb-2">{description}</p>
        <p className="text-xl font-bold text-green-600">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
