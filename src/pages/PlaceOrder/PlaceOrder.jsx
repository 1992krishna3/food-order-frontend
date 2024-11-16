import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PlaceOrder = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });
  const { getTotalCartAmount, token, food_list, cartItems, url, userId } =
    useContext(StoreContext);

  const navigate = useNavigate();

  console.log("Cart Items in PlaceOrder:", cartItems);
  console.log("Food List in PlaceOrder:", food_list);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({
          name: item.name, // Add name of the item
          price: item.price, // Add price of the item

          quantity: cartItems[item._id],
        });
      }
    });

    console.log(getTotalCartAmount());

    const orderData = {
      userId: "670a224929c79745ff79262d",
      address: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        street: data.street,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        country: data.country,
        phone: data.phone,
      },

      items: orderItems,

      amount: getTotalCartAmount() + 2,
    };
    console.log("Order Data:", orderData);
    console.log("Order User ID:", orderData.userId);
    console.log("Order Address:", orderData.address);
    console.log("Order Items:", orderData.items);
    console.log("Order Amount:", orderData.amount);

    try {
      console.log("Base URL:", url);
      console.log("Token:", token);

      const response = await axios.post(
        `${url}/api/v1/order/place`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        const { session_url } = response.data;
        console.log("Redirecting to Stripe session URL:", session_url);
        window.location.replace(session_url);
      } else {
        console.error("Order placement failed:", response.data);
        alert(response.data.message || "Error placing order");
      }
      console.log(response);
    } catch (error) {
      console.error(
        "Error placing order:",
        error.response ? error.response.data : error.message
      );
      alert(
        error.response?.data?.message ||
          "There was an error placing your order."
      );
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <div>
      <form
        onSubmit={placeOrder}
        className="place-order p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div className="place-order-left space-y-4">
          <p className="title text-2xl font-bold mb-4">Delivery Information</p>
          <div className="multi-fields grid grid-cols-2 gap-4">
            <input
              required
              name="firstName"
              onChange={onChangeHandler}
              value={data.firstName}
              type="text"
              placeholder="First name"
              className="border rounded-lg p-3 w-full"
            />
            <input
              required
              name="lastName"
              onChange={onChangeHandler}
              value={data.lastName}
              type="text"
              placeholder="Last name"
              className="border rounded-lg p-3 w-full"
            />
          </div>
          <input
            required
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Email address"
            className="border rounded-lg p-3 w-full"
          />
          <input
            required
            name="street"
            onChange={onChangeHandler}
            value={data.street}
            type="text"
            placeholder="Street"
            className="border rounded-lg p-3 w-full"
          />
          <div className="multi-fields grid grid-cols-2 gap-4">
            <input
              required
              name="city"
              onChange={onChangeHandler}
              value={data.city}
              type="text"
              placeholder="City"
              className="border rounded-lg p-3 w-full"
            />
            <input
              required
              name="state"
              onChange={onChangeHandler}
              value={data.state}
              type="text"
              placeholder="State"
              className="border rounded-lg p-3 w-full"
            />
          </div>
          <div className="multi-fields grid grid-cols-2 gap-4">
            <input
              required
              name="pincode"
              onChange={onChangeHandler}
              value={data.pincode}
              type="text"
              placeholder="Pincode"
              className="border rounded-lg p-3 w-full"
            />
            <input
              required
              name="country"
              onChange={onChangeHandler}
              value={data.country}
              type="text"
              placeholder="Country"
              className="border rounded-lg p-3 w-full"
            />
          </div>
          <input
            required
            name="phone"
            onChange={onChangeHandler}
            value={data.phone}
            type="text"
            placeholder="Phone"
            className="border rounded-lg p-3 w-full"
          />
        </div>
        <div className="place-order-right space-y-6"></div>

        <div className="cart-total mb-4">
          <h2 className="text-xl font-bold">Cart Totals</h2>
        </div>
        <div className="cart-total-details flex justify-between mb-2">
          <p>Subtotal</p>
          <p className="font-medium">${getTotalCartAmount()}</p>
        </div>
        <hr />
        <div className="cart-total-details flex justify-between my-2">
          <p>Delivery Fee</p>
          <p className="font-medium">${2}</p>
        </div>
        <hr />
        <div className="cart-total-details flex justify-between my-4">
          <b>Total</b>
          <b className="font-bold">${getTotalCartAmount() + 2}</b>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          PROCEED TO PAYMENT
        </button>
      </form>
    </div>
  );
};
export default PlaceOrder;
