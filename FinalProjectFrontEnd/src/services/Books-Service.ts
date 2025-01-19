import axios from "axios";
import request1 from "../utilities/axios-interceptors"; // Assuming this is the default export

const url = import.meta.env.VITE_BASE_URL + "/books";

// Get all books
export const getBooks = () => {
  return request1({
    url: "/books",
  });
};

// Get a single book by ID
export const getSingleBook = (id) => {
  return request1({
    url: `/books/${id}`,
  });
};

// Post a new book
export const postBooks = (data) => {
  return request1({
    method: "POST",
    url: "/books",
    data: data, // Send the necessary data for the new book
  });
};

// Delete a book by ID
export const deleteBook = async (bookId) => {
  try {
    const response = await request1({
      method: "DELETE",
      url: `/books/${bookId}`,
    });
    return response.data; // Return success message or response
  } catch (error) {
    throw error;
  }
};

// Update a book by ID
export const updateBook = async (bookId, formData) => {
  try {
    const response = await request1({
      method: "PUT",
      url: `/books/${bookId}`,
      data: formData, // Send the updated book data
    });
    return response; // Return the API response
  } catch (error) {
    console.error(`Failed to update book with ID ${bookId}:`, error.message);
    throw error; // Rethrow the error for further handling in the component
  }
};


// Define the API base URL for your backend
const url2 = import.meta.env.VITE_BASE_URL;

// Function to create a new order (purchase)
export const createOrder = (data: {
  user: {
    name: string;
    email: string;
    address: string;
  };
  books: {
    bookId: number;
    quantity: number;
    priceAtTimeOfPurchase: number;
  }[];
}) => {
  return request1({
    method: "POST",
    url: "/orders",  // The endpoint for creating an order
    data: data,      // Pass the order and user details in the request body
  });
};





