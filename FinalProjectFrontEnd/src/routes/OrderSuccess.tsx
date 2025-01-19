import React from 'react';
import { useParams } from 'react-router-dom';

const OrderSuccess: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100 dark:bg-gray-800 dark:text-gray-200">
      <div className="card shadow-lg dark:bg-gray-700 dark:text-gray-200 bg-gray-100 w-full max-w-4xl">
        <div className="card-body text-center">
          <h1 className="text-3xl font-bold text-green-600 dark:text-green-400">
            Order Successful!
          </h1>
          <p className="mt-4 text-lg text-gray-800 dark:text-gray-200">
            Thank you for your order. Your order ID is:
          </p>
          <p className="mt-2 text-xl font-bold text-gray-900 dark:text-gray-100">
            {orderId}
          </p>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            We will send you updates to your email once your order is processed and shipped.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="mt-6 btn btn-primary"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
