import React from "react";
import { menu_list } from "../assets/assets";

const ExploreMenu = ({ category, setcategory }) => {
  return (
    <div className="p-10" id="explore-menu">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">
        Explore our menu
      </h1>
      <p className="text-gray-600 mb-8">
        Choose from a diverse menu featuring a delectable array of dishes
        crafted with the finest ingredients and culinary expertise. Our mission
        is to satisfy your carvings and elevate your dinig experience,one
        delicious meal at a time
      </p>

      <div className="flex flex-wrap gap-2 cursor-pointer">
        {menu_list.map((item, index) => (
          <div
            onClick={() =>
              setcategory((prev) =>
                prev === item.menu_name ? "All" : item.menu_name
              )
            }
            key={index}
            className="flex-shrink-0 w-25 border rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={item.menu_image}
              alt={item.menu_name}
              className={`w-full h-40 object-cover ${
                category === item.menu_name ? "active" : ""
              } `}
            />
            <div className="p-4">
              <p className="text-lg font-semibold">{item.menu_name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ExploreMenu;
