import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } =
    useContext(StoreContext);

  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/order"); // Navigate to PlaceOrder page
  };

  console.log("Cart Items:", cartItems);
  console.log("Food List:", food_list);

  return (
    <div className="cart p-6 max-w-4xl mx-auto">
      <div className="cart-Items border-b border-gray-300 pb-4">
        <div className="grid grid-cols-6 font-semibold text-lg text-gray-700 mb-2">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {food_list.map((food) => {
          const quantity = cartItems[food._id];
          if (quantity > 0) {
            return (
              <div
                key={food._id}
                className="grid grid-cols-6 items-center gap-4 py-4 border-b border-gray-300"
              >
                <img
                  src={`${url}/images/${food.Image}`}
                  alt={food.name || "Food Item"}
                  className="w-16 h-16 object-cover rounded-lg"
                ></img>

                <p className="text-gray-800 font-medium">{food.name}</p>
                <p className="text-gray-800">${food.price}</p>
                <p className="text-gray-800">{cartItems[food._id]}</p>
                <p className="text-gray-800">
                  ${food.price * cartItems[food._id]}
                </p>

                <p
                  onClick={() => removeFromCart(food._id)}
                  className="text-red-500 font-bold cursor-pointer hover:text-red-700"
                >
                  {" "}
                  x
                </p>

                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom mt-6">
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
      </div>
      <button
        onClick={handleCheckout}
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        PROCEED TO CHECKOUT
      </button>
    </div>
  );
};

export default Cart;
