import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import { deleteOrder, getOrders } from "../services/Orders-Service";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    setLoading(true);
    getOrders()
      .then((response) => {
        setOrders(response);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const handleDeleteOrder = (orderId) => {
    deleteOrder(orderId)
      .then(() => {
        alert("Order deleted successfully!");
        fetchOrders();
      })
      .catch((error) => {
        alert("Failed to delete order.");
      });
  };

  if (loading) return <div>Loading orders...</div>;

  if (error) {
    return (
      <div className="p-4">
        <p>Error fetching orders. Please try again later.</p>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  const categorizeOrders = (status) => {
    return orders.filter(order => order.status.toLowerCase() === status.toLowerCase());
  };

  const statuses = ['pending', 'shipped', 'delivered', 'cancelled'];

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100 dark:bg-gray-800 dark:text-gray-200">
      <div className="card shadow-lg dark:bg-gray-700 dark:text-gray-200 bg-gray-100 w-full max-w-4xl rounded-lg">
        <div className="container mx-auto py-8 dark:bg-gray-700 bg-gray-100 text-gray-800 dark:text-gray-200">
          <h1 className="text-center mb-6 text-3xl font-bold text-blue-600 dark:text-blue-400">
            Orders Management
          </h1>
          <Link 
            to="/create-order" 
            className="bg-blue-500 text-white py-2 px-4 rounded mb-4 inline-block hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500"
          >
            Create New Order
          </Link>

          {statuses.map((status) => (
            <div key={status} className="mb-8">
              <h2 className="text-xl font-bold mb-2">{status.charAt(0).toUpperCase() + status.slice(1)} Orders</h2>
              {categorizeOrders(status).length === 0 ? (
                <p>No {status} orders available.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categorizeOrders(status).map((order) => (
                    <div 
                      key={order.orderId} 
                      className=" rounded-lg shadow-md border 
                      border-gray-200 dark:border-gray-700 p-6"
                    >
                      <p className="font-semibold mb-2">
                        <strong>Order ID:</strong> {order.orderId}
                      </p>
                      <p className="mb-2">
                        <strong>User ID:</strong> {order.userId}
                      </p>
                      <p className="mb-2">
                        <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}
                      </p>
                      <p className="mb-2">
                        <strong>Status:</strong> {order.status}
                      </p>
                      <p className="mb-2">
                        <strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}
                      </p>
                      <p className="mb-4">
                        <strong>Shipping Address:</strong> {order.shippingAddress}
                      </p>
                      <div className="flex space-x-4">
                        <Link 
                          to={`/edit-order/${order.orderId}`} 
                          className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500"
                        >
                          Edit
                        </Link>
                        <button 
                          onClick={() => handleDeleteOrder(order.orderId)} 
                          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 dark:bg-red-400 dark:hover:bg-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div> 
    </div>
  );
};

export default OrdersPage;
