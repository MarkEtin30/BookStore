import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleOrder } from "../services/Orders-Service"; // Assuming getSingleOrder fetches a single order by ID
import { OrderType } from "../@types";

const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<OrderType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    if (orderId) {
      setLoading(true);
      getSingleOrder(orderId)
        .then((response) => {
          setOrder(response);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, [orderId]);

  if (loading) return <div>Loading order details...</div>;

  if (error || !order) {
    console.error("Failed to fetch order details:", error.message);
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-red-600">There was an issue retrieving the order. Please try again later.</p>
        <pre className="bg-gray-100 p-4 rounded-md mt-4">
          {JSON.stringify(error, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100 dark:bg-gray-800 dark:text-gray-200">
      <div className="card shadow-lg dark:bg-gray-700 dark:text-gray-200 bg-gray-100 w-full max-w-4xl">
     <div className="container mx-auto py-8">  
      
          <h1 className="text-2xl font-bold mb-4">Order Details for Order ID: {order.orderId}</h1>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Total Amount:</strong> {order.totalAmount}</p>
        <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
        <h3 className="text-lg font-semibold mt-4">Order Items</h3>
        <div className="mt-4 border-t border-gray-300 dark:border-gray-600 pt-4">
        <ul >
          {order.orderItems?.map((item) => (
            <li key={item.bookId}>
              <p><strong>OrderItem ID:</strong> {item.orderItemId}</p>
              <p><strong>Book ID:</strong> {item.bookId}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Price at Time of Purchase:</strong> {item.priceAtTimeOfPurchase}</p>
            </li>
          ))}
        </ul>
        </div>
        </div>
        
        </div>
    </div>
  );
};

export default OrderDetails;
