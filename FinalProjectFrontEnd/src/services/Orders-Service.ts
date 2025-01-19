import axios from "axios";

// Define the API base URL for your backend
const baseURL = import.meta.env.VITE_BASE_URL;

// Get all orders
export const getOrders = () => {
  return axios.get(`${baseURL}/orders`)
    .then(response => response.data)
    .catch(error => {
      console.error("Failed to fetch orders:", error.message);
      throw error;
    });
};



// Get a single order by ID
export const getSingleOrder = (id) => {
  return axios.get(`${baseURL}/orders/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error(`Failed to fetch order with ID ${id}:`, error.message);
      throw error;
    });
};



// Create a new order
export const createOrder = (data) => {
  return axios.post(`${baseURL}/orders`, data)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};



// Update an order by ID
export const updateOrder = (orderId, formData) => {
  return axios.put(`${baseURL}/orders/${orderId}`, formData)
    .then(response => response.data)
    .catch(error => {
      // console.error(`Failed to update order with ID ${orderId}:`, error.message);
      throw error;
    });
};

// Delete an order by ID
export const deleteOrder = (orderId) => {
  return axios.delete(`${baseURL}/orders/${orderId}`)
    .then(response => response.data)
    .catch(error => {
      console.error(`Failed to delete order with ID ${orderId}:`, error.message);
      throw error;
    });
};
