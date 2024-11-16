import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import FoodItem from "./FoodItem";

const FoodDisplay = ({}) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="food-display py-10 bg-gray-100" id="food-display">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Top dishes near you
      </h2>
      <div className="food-display-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {food_list.map((item, index) => (
          <FoodItem
            key={index}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
