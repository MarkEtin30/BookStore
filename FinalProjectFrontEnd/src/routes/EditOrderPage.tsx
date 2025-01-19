import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleOrder, updateOrder } from "../services/Orders-Service";

const EditOrderPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [formData, setFormData] = useState({
    orderId: 0,
    userId: 0,
    orderDate: new Date().toISOString(),
    totalAmount: 0,
    status: "",
    shippingAddress: "",
    orderItems: [
      {
        orderId: 0,
        bookId: 0,
        quantity: 0,
        priceAtTimeOfPurchase: 0,
      },
    ],
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    getSingleOrder(orderId)
      .then((data) => {
        setOrder(data);
        setFormData(data);
      })
      .catch((error) => {
        setErrorMessage("There must be at least on item in any order");
        // console.error("Error fetching order:", error);
      });
  }, [orderId]);

  // Check if required fields are filled
  const validateForm = () => {
    if (!formData.orderDate || !formData.status || !formData.totalAmount || !formData.shippingAddress) {
      return "Please fill in all required fields.";
    }

    if (formData.orderItems.length === 0) {
      return "At least one item must be added to the order.";
    }

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate before submitting
    const error = validateForm();
    if (error) {
      setErrorMessage(error);
      return;
    }

    updateOrder(orderId, formData)
      .then(() => {
        alert("Order updated successfully!");
        navigate("/orders");
      })
      .catch((error) => {
        // console.error("Error updating order:", error);
      });
  };

  const handleUpdateOrderField = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleAddOrderItem = () => {
    setFormData({
      ...formData,
      orderItems: [
        ...formData.orderItems,
        {
          orderId: formData.orderItems.length,
          bookId: 0,
          quantity: 0,
          priceAtTimeOfPurchase: 0,
        },
      ],
    });
  };

  const handleUpdateOrderItem = (index, key, value) => {
    const updatedItems = [...formData.orderItems];
    updatedItems[index][key] = value;
    setFormData({ ...formData, orderItems: updatedItems });
  };

  const handleDeleteOrderItem = (index) => {
    const updatedItems = formData.orderItems.filter((_, i) => i !== index);
    setFormData({ ...formData, orderItems: updatedItems });
  };

  const statusOptions = ["Pending", "Shipped", "Delivered", "Cancelled"];

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100 dark:bg-gray-800 dark:text-black-400">
      <div className="card shadow-lg dark:bg-gray-700 dark:text-gray-400 bg-gray-100 w-full max-w-4xl rounded-lg">
        <div className="container mx-auto py-8 dark:bg-gray-700 bg-gray-100 text-black-400 dark:text-black-400">
          <h1 className="text-2xl font-bold mb-4">Edit Order</h1>

          {errorMessage && (
            <div className="mb-4 p-4 text-red-500 border border-red-500 rounded">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label>Order Date: <span className="text-red-700">*</span></label>
              <input
                type="datetime-local"
                value={formData.orderDate}
                onChange={(e) =>
                  handleUpdateOrderField("orderDate", e.target.value)
                }
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label>Status: <span className="text-red-700">*</span></label>
              <select
                value={formData.status}
                onChange={(e) => handleUpdateOrderField("status", e.target.value)}
                className="border p-2 rounded w-full"
              >
                <option value="">Select Status</option>
                {statusOptions.map((status, index) => (
                  <option key={index} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label>Total Amount: <span className="text-red-700">*</span></label>
              <input
                type="number"
                value={formData.totalAmount}
                onChange={(e) =>
                  handleUpdateOrderField("totalAmount", Number(e.target.value))
                }
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label>Shipping Address: <span className="text-red-700">*</span></label>
              <input
                type="text"
                value={formData.shippingAddress}
                onChange={(e) =>
                  handleUpdateOrderField("shippingAddress", e.target.value)
                }
                className="border p-2 rounded w-full"
              />
            </div>

            {/* Order Items */}
            <div className="mb-4">
              <h3 className="font-bold">Order Items</h3>
              {formData.orderItems.map((item, index) => (
                <div key={index} className="border p-2 rounded mb-2">
                  <label>Book ID:</label>
                  <input
                    type="number"
                    value={item.bookId}
                    onChange={(e) =>
                      handleUpdateOrderItem(index, "bookId", Number(e.target.value))
                    }
                    className="border p-2 rounded w-full mb-2"
                  />
                  <label>Quantity:</label>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleUpdateOrderItem(index, "quantity", Number(e.target.value))
                    }
                    className="border p-2 rounded w-full mb-2"
                  />
                  <label>Price at Purchase:</label>
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
                    className="border p-2 rounded w-full mb-2"
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

            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded"
            >
              Update Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditOrderPage;
