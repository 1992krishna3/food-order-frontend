import React, { useState } from "react";
import Navbar from "./components/Navbar";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer";
import LoginPopup from "./components/LoginPopup";

import { loadStripe } from "@stripe/stripe-js";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    const publicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
    // Only load Stripe if in development (HTTP) or production with HTTPS
    if (
      publicKey &&
      (window.location.protocol === "https:" ||
        window.location.hostname === "https://food-order-backend-5.onrender.com")
    ) {
      stripePromise = loadStripe(publicKey);
    }
  }
  return stripePromise;
};

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const stripe = getStripe();

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="min-h-screen bg-gray-100">
        <Navbar setShowLogin={setShowLogin} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
