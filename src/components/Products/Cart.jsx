import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  clearCart,
  updateQuantity,
} from "../../features/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state) => state.cart);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(updateQuantity({ productId, quantity: 1 }));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(updateQuantity({ productId, quantity: -1 }));
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-center"> Your Cart</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <button
                  onClick={() => navigate("/products")}
                  className="relative bg-blue-500 text-white py-2 px-8 rounded-lg shadow-md hover:bg-blue-600 transition duration-200 flex items-center"
                >
                  View Products
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="container mx-auto p-6">
            {items.length === 0 ? (
          <p className="text-center text-lg text-gray-600">
            Your cart is empty
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center transition transform hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-40 h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-600 mb-2">Price: ${item.price}</p>

                {/* Quantity Adjustment */}
                <div className="flex items-center space-x-4 mb-4">
                  <button
                    onClick={() => handleDecreaseQuantity(item.id)}
                    className="bg-gray-200 text-black py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-200"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => handleIncreaseQuantity(item.id)}
                    className="bg-gray-200 text-black py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-200"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-200"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Bill Section */}
        <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Total Price: ${totalPrice}
          </h3>
          <div className="flex justify-between items-center">
            <button
              onClick={handleClearCart}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Clear Cart
            </button>
            <button
              className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition duration-200"
              // Add your checkout logic here
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
