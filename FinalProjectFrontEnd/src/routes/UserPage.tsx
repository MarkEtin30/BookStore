import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserType, OrderType } from "../@types"; // Ensure UserType and OrderType are imported
import { getUserById } from "../services/Users-Service"; // Replace with your service for fetching user details

const UserPage: React.FC = () => {
  const { userId, orderId } = useParams<{ userId: string; orderId?: string }>();
  const navigate = useNavigate(); // Use navigate hook to redirect
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      getUserById(parseInt(userId))
        .then((response) => {
          setUser(response);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, [userId]);

  const handleOrderClick = (orderId: number) => {
    if (orderId) {
      navigate(`/orders/${orderId}`); // Navigate to the OrderDetails page
    } else {
      alert("Invalid order ID.");
    }
  };

  if (loading) return <div>Loading user details...</div>;

  if (error || !user) return (
    <div>
      <div>Error: {error ? error.message : 'User not found'}</div>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>
  );

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100 dark:bg-gray-800 dark:text-black-400">
    <div className="card shadow-lg dark:bg-gray-700 dark:text-gray-400 bg-gray-100 w-full max-w-4xl rounded-lg">
     <div className="container mx-auto py-8 dark:bg-gray-700 bg-gray-100 text-black-400 dark:text-black-400">
      <h1 className="text-2xl font-bold mb-4">{user?.username}'s Details</h1>

      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <p><strong>ID:</strong> {user?.id}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Phone Number:</strong> {user?.phoneNumber}</p>
        <h2 className="text-xl font-semibold mt-4">Orders</h2>
        <div className="mt-4 border-t border-gray-300 dark:border-gray-600 pt-4">

        <ul>
          {user?.orders?.length > 0 ? (
            user.orders.map((order: OrderType) => (
              <li
                key={order.orderId}
                className="mb-2 cursor-pointer hover:bg-gray-200 p-2 rounded"
                onClick={() => handleOrderClick(order.orderId)}
              >
                <p><strong>Order ID:</strong> {order.orderId}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Total Amount:</strong> {order.totalAmount}</p>
                <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
              </li>
            ))
          ) : (
            <li>No orders found.</li>
          )}
        </ul>
        </div>
      </div>
    </div>
    </div> 
    </div>
  );
};

export default UserPage;
