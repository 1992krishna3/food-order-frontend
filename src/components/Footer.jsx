import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="bg-gray-900 text-white py-8" id="footer">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <div className="space-y-4">
          <img src={assets.logo} alt="" className="w-32" />
          <p>jhgdhffbfhfnjnfjnfjkfn</p>
          <div className="flex space-x-4">
            <img src={assets.facebook_icon} alt="" className="w-6 h-6" />
            <img src={assets.twitter_icon} alt="" className="w-6 h-6" />
            <img src={assets.linkedin_icon} alt="" className="w-6 h-6" />
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">COMPANY</h2>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">About us</li>
            <li className="hover:text-white cursor-pointer">Delivery</li>
            <li className="hover:text-white cursor-pointer">Privacy policy</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">GET IN TOUCH</h2>
          <ul className="space-y-2 text-gray-400">
            <li>356677888888</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr className="my-6 border-gray-700" />
      <p className="text-center text-gray-500 text-sm">
        copyright 2024 Tomato.com - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
