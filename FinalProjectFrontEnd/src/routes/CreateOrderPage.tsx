import React, { useState } from "react";
import { createOrder } from "../services/Orders-Service";
import { useNavigate } from "react-router-dom";

const CreateOrderPage = () => {
  const [newOrder, setNewOrder] = useState({
    userId: 0,
    orderDate: new Date().toISOString(),
    totalAmount: 0,
    status: "",
    shippingAddress: "",
    orderItems: [
      {
        orderItemId: 0,
        orderId: 0,
        bookId: 0,
        quantity: 0,
        priceAtTimeOfPurchase: 0,
      },
    ],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
 

  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  const handleCreateOrder = () => {
    if (!newOrder.userId || !newOrder.status || !newOrder.shippingAddress) {
      alert("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);
    createOrder(newOrder)
      .then(() => {
        alert("Order created successfully!");
        resetOrderForm();
        navigate(`/orders`);
      })
      .catch((error) => {
        setErrorMessage("There must be at least on item in any order");
        // console.error("Error creating order, note that each order must have at least one item, and valid bookID!", error);
        alert("Failed to create order.");
      })
      .finally(() => setIsSubmitting(false));
  };

  const resetOrderForm = () => {
    setNewOrder({
      userId: 0,
      orderDate: new Date().toISOString(),
      totalAmount: 0,
      status: "",
      shippingAddress: "",
      orderItems: [
        {
          orderItemId: 0,
          orderId: 0,
          bookId: 0,
          quantity: 0,
          priceAtTimeOfPurchase: 0,
        },
      ],
    });
  };

  const handleAddOrderItem = () => {
    setNewOrder({
      ...newOrder,
      orderItems: [
        ...newOrder.orderItems,
        {
          orderItemId: newOrder.orderItems.length,
          orderId: 0,
          bookId: 0,
          quantity: 0,
          priceAtTimeOfPurchase: 0,
        },
      ],
    });
  };

  const handleUpdateOrderItem = (index, key, value) => {
    const updatedItems = [...newOrder.orderItems];
    updatedItems[index][key] = value;
    const totalAmount = updatedItems.reduce(
      (sum, item) => sum + item.quantity * item.priceAtTimeOfPurchase,
      0
    );
    setNewOrder({ ...newOrder, orderItems: updatedItems, totalAmount });
  };

  const handleDeleteOrderItem = (index) => {
    const updatedItems = newOrder.orderItems.filter((_, i) => i !== index);
    const totalAmount = updatedItems.reduce(
      (sum, item) => sum + item.quantity * item.priceAtTimeOfPurchase,
      0
    );
    setNewOrder({ ...newOrder, orderItems: updatedItems, totalAmount });
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100 dark:bg-gray-800 dark:text-black-400">
    <div className="card shadow-lg dark:bg-gray-700 dark:text-gray-400 bg-gray-100 w-full max-w-4xl rounded-lg">
      <div className="container mx-auto py-8 dark:bg-gray-700 bg-gray-100 text-black-400 dark:text-black-400"> 
      <h1 className="text-2xl font-bold mb-4 dark:text-gray-200">
        Create New Order
      </h1>


      {errorMessage && (
            <div className="mb-4 p-4 text-red-500 border border-red-500 rounded">
              {errorMessage}
            </div>
          )}

      <div className="mb-4">
        <label className="block mb-1">User ID:  <span className="text-red-900">* </span></label>
        <input
          type="number"
          value={newOrder.userId}
          onChange={(e) =>
            setNewOrder({ ...newOrder, userId: Number(e.target.value) })
          }
          className="border p-2 rounded w-full dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Status: <span className="text-red-900">* </span> </label>
        <select
          value={newOrder.status}
          onChange={(e) =>
            setNewOrder({ ...newOrder, status: e.target.value })
          }
          className="border p-2 rounded w-full dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
        >
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Total Amount:   </label>
        <input
          type="number"
          value={newOrder.totalAmount}
          readOnly
          className="border p-2 rounded w-full bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Shipping Address:  <span className="text-red-900">* </span> </label>
        <input
          type="text"
          value={newOrder.shippingAddress}
          onChange={(e) =>
            setNewOrder({ ...newOrder, shippingAddress: e.target.value })
          }
          className="border p-2 rounded w-full dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
        />
      </div>

      {/* Order Items */}
      <div className="mb-4">
        <h3 className="font-bold dark:text-gray-200">Order Items</h3>
        {newOrder.orderItems.map((item, index) => (
          <div
            key={index}
            className="border p-2 rounded mb-2 dark:bg-gray-900 dark:border-gray-700"
          >
            <label className="block mb-1">Book ID: <span className="text-red-900">* </span></label>
            <input
              type="number"
              value={item.bookId}
              onChange={(e) =>
                handleUpdateOrderItem(index, "bookId", Number(e.target.value))
              }
              className="border p-2 rounded w-full mb-2 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
            />
            <label className="block mb-1">Quantity: <span className="text-red-900">* </span></label>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                handleUpdateOrderItem(index, "quantity", Number(e.target.value))
              }
              className="border p-2 rounded w-full mb-2 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
            />
            <label className="block mb-1">Price at Purchase: <span className="text-red-900">* </span></label>
            <input
              type="number"
              value={item.priceAtTimeOfPurchase}
              onChange={(e) =>
                handleUpdateOrderItem(
                  index,
                  "priceAtTimeOfPurchase",
                  Number(e.target.value)
                )
              }
              className="border p-2 rounded w-full mb-2 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
            />
            <button
              onClick={() => handleDeleteOrderItem(index)}
              className="bg-red-500 text-white py-1 px-2 rounded"
            >
              Remove Item
            </button>
          </div>
        ))}
        <button
          onClick={handleAddOrderItem}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add Order Item
        </button>
      </div>

      <div className="mb-4">
        <h3 className="font-bold dark:text-gray-200">Order Summary</h3>
        <p className="dark:text-gray-300">Total Items: {newOrder.orderItems.length}</p>
        <p className="dark:text-gray-300">Total Amount: {newOrder.totalAmount}</p>
      </div>

      <button
        onClick={handleCreateOrder}
        className="bg-green-500 text-white py-2 px-4 rounded"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Create Order"}
      </button>
    </div>
    </div>
    </div>
  );
};

export default CreateOrderPage;
