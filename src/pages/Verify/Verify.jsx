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

  const verifyPayment = async () => {
    if (!success || !orderId) {
      console.error("Missing success or orderId parameters");
      navigate("/");
      return;
    }
    
   
    
    try {
      
      const response = await axios.get(`${url}/api/v1/order/verify`, {
        params:{success,orderId},
      });
      console.log("API Response:", response.data);
      
      if (response.data.success) {
        console.log(
          "Payment verified successfully. Redirecting to 'myorders' page...",
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
  useEffect(() => {
  
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
// import { useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";

// const VerifyPayment = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const success = searchParams.get("success") === "true";
//     const orderId = searchParams.get("orderId");

//     if (success) {
//       // Optionally, you can verify the payment with your backend
//       // After verification, navigate to the My Orders page
//       navigate("/myorders", { state: { orderId } });
//     } else {
//       // Handle payment failure
//       alert("Payment failed. Please try again.");
//       navigate("/");
//     }
//   }, [searchParams, navigate]);

//   return null; // Or display a loading spinner while processing
// };

// export default VerifyPayment;
