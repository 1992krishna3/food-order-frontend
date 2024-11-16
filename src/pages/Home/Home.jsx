import React, { useState } from "react";
import Header from "../../components/Header";
import ExploreMenu from "../../components/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [category, setcategory] = useState("All");

  const navigate = useNavigate();

  const handlePayment = () => {
    navigate("/payment");
  };
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setcategory={setcategory} />
      <FoodDisplay category={category} />
      <Link to="/payment">Go to Payment</Link>
      <button onClick={handlePayment}>Go to Payment</button>
    </div>
  );
};

export default Home;
