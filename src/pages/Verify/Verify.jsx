import React, { useEffect } from "react";
import { useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
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

    console.log("Sending to backend:", { success, orderId });
    try {
      const response = await axios.post(`${url}/api/v1/order/verify`, {
        success,
        orderId,
      });
      if (response.data.success) {
        console.log(
          "Payment verified and order recorded:",
          response.data.order
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
  }, [success, orderId]);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
