import React, { useState, useEffect } from "react";
import { useCart } from "react-use-cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import apiClient from "../apiServices";

interface CartProps {
  id: number;
}

const Cart: React.FC<CartProps> = ({ id }) => {
  const { isEmpty, items, updateItemQuantity, removeItem, emptyCart } = useCart();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calculateTotal = () => {
      const newTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      setTotal(newTotal);
    };

    calculateTotal();
  }, [items]);

  const placeOrder = async () => {
    const menuItems = items.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    console.log("MenuItems:", menuItems);

    try {
      console.log("Received restaurantId:", id);
      const response = await apiClient.post("/orders", { menuItems, restaurantId: id });

      if (response.status === 201) {
        alert("Order placed successfully!");
        emptyCart();
      } else {
        alert("Failed to place the order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing the order");
    }
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear the cart?")) {
      emptyCart();
    }
  };

  return (
    <div
      className="sticky top-52 justify-center items-center flex flex-col p-4 border border-black"
      style={{ height: "calc(100vh - 64px - 73px - 73px)" }}
    >
      <div className=" flex-grow flex flex-col justify-center items-center">
        {!isEmpty && (
          <button onClick={handleClearCart} className="absolute top-4 right-4 text-red-500">
            <FontAwesomeIcon icon={faTrashAlt} className="text-xl" />
          </button>
        )}
        <div className="flex-grow w-full">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center h-full">
              <FontAwesomeIcon icon={faShoppingCart} className="text-6xl text-gray-300 mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="pb-5 pl-5 pt-7">Your Order</div>
              <div className="p-5">Basket</div>
              <div
                className="w-full h-auto overflow-y-auto mb-4"
                style={{
                  maxHeight: items.length > 3 ? "320px" : "auto",
                }}
              >
                <div className="pl-5">
                  <ul className="w-full">
                    {items.map((item) => (
                      <div className="border border-blue-500 p-2 mb-3" key={item.id}>
                        <li className="flex justify-between p-2 border-b">
                          <span>{item.name}</span>
                          <span>
                            {item.quantity} x {item.price}
                          </span>
                          <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
                          <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</button>
                          <button onClick={() => removeItem(item.id)}>Remove</button>
                        </li>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bottom-0 m-5 flex justify-between">
                <span>Total</span>
                <span>{total.toFixed(2)}</span>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="w-full mt-auto">
        <button
          onClick={placeOrder}
          className={`w-full px-4 py-2 ${items.length > 0 ? "bg-yellow-500" : "bg-gray-300 cursor-not-allowed"} text-white`}
          disabled={isEmpty}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
