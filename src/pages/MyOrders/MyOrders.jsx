import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import parcel_icon from "../../assets/parcel_icon.png";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/v1/order/userorders`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h2>
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((order, index) => (
          <div
            key={index}
            className="my-orders-order bg-white rounded-lg shadow p-4"
          >
            <img src={parcel_icon} alt="" className="w-12 h-12 mb-4" />
            <p className="text-sm text-gray-600">
              {order.items.map((item, index) => {
                if (index === order.items.length - 1) {
                  return item.name + " x " + item.quantity;
                } else {
                  return item.name + " x " + item.quantity + ",";
                }
              })}
            </p>
            <p className="text-lg font-semibold text-gray-800">
              ${order.amount}
            </p>
            <p className="text-sm text-gray-500">Items:{order.items.length}</p>
            <p className="mt-2">
              <span className="text-red-500">*</span>
              <b className="text-gray-700 ml-1">{order.status}</b>
            </p>
            <button
              onClick={fetchOrders}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Track Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
