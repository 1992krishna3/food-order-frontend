import React from "react";

const Header = () => {
  return (
    <div
      className=" bg-no-repeat bg-center bg-contain h-screen flex flex-col items-start justify-center space-y-6 ml-10 "
      style={{
        backgroundImage: `url('/header_img.png')`,
        backgroundSize: "80%",
      }}
    >
      <div className="header-contents text-left bg-opacity-70 p-8 rounded-lg shadow-lg max-w-xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-black-800">
          Order your favourite food here
        </h2>
        <p className="text-black-600 mb-6">
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Our
          mission is to satisfy your carvings and elevate your dinig
          experience,one delicious meal at a time
        </p>
        <button className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300">
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
