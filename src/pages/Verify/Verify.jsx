import React, { useEffect } from "react";
import { useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  console.log("Success:", success);
  console.log("Order ID:", orderId);

  useEffect(() => {
  const verifyPayment = async () => {
    if (!success || !orderId) {
      console.error("Missing success or orderId parameters");
      navigate("/");
      return;
    }
    
    console.log("Sending GET request to:", `${url}/api/v1/order/verify`);
    console.log("Query parameters:", { success, orderId });

    
    try {
      console.log("Verifying payment...");
      const response = await axios.get("https://food-order-backend-5.onrender.com/api/v1/order/verify", {
        params:{success,orderId},
      });
      console.log("API Response:", response.data);
      
      if (response.data.success) {
        console.log(
          "Payment verified:",
          response.data.message
        );
        navigate("/myorders");
      } else {
        console.error("Verification failed:", response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.error(
        "Error during verification:",
        error.response ? error.response.data : error.message
      );
      navigate("/");
    }
  };
  
    verifyPayment();
  }, [success, orderId, url, navigate]);

  return (
    <div className="verify">
      <div className="spinner"></div>
      <p>Verifying payment...</p>
    </div>
  );
};

export default Verify;
