import React, { useState, useEffect, useCallback } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import useBooks from "../hooks/useBooks";
import { BookType } from "../@types";
import { logout } from "../services/Authentication-Service";

const Cart = () => {
  const { error, loading, books = [] } = useBooks();
  const [cart, setCart] = useState<BookType[]>([]);
  const navigate = useNavigate();
  

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    let filteredBooks = books.filter(book => storedCart.some(cartItem => cartItem.id === book.id));

    filteredBooks = books
      .filter((book) => storedCart.some((item) => item.id === book.id))
      .map((book) => {
        const cartItem = storedCart.find((item) => item.id === book.id);
        return {
          ...book,
          quantity: cartItem?.quantity || 1,
        };
      });

    setCart(filteredBooks);
  }, [books]);

  const updateCartInLocalStorage = (updatedCart: BookType[]) => {
    const minimalCart = updatedCart.map(({ id, quantity }) => ({ id, quantity }));
    localStorage.setItem("cart", JSON.stringify(minimalCart));
    setCart(updatedCart);
  };

  const handleQuantityChange = (id: number, newQuantityChange: number): void => {
    const currentItem = cart.find((item) => item.id === id);

    if (!currentItem) return;

    if (newQuantityChange == 0) {
      currentItem.quantity = 0;
    }

    if ((currentItem.quantity + newQuantityChange <= 0)) {
      const updatedCart = cart.filter((item) => item.id !== id);
      updateCartInLocalStorage(updatedCart);
      setCart(updatedCart);
      return;
    }

    let newQuantity = currentItem.quantity + newQuantityChange;
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );

    setCart(updatedCart);
    updateCartInLocalStorage(updatedCart);
  };

  const handleClearCart = () =>{
    updateCartInLocalStorage([]);
    setCart([]);
  }


 
  

  if (loading) return <p className="text-gray-400 flex justify-center items-center min-h-screen p-4 bg-gray-100 dark:bg-gray-800 dark:text-gray-200">
    Loading...</p>;
  if (error) return <p className="text-gray-400 flex justify-center items-center min-h-screen p-4 bg-gray-100 dark:bg-gray-800 dark:text-gray-200">
    Error loading books: {error.message}</p>;


  

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100 dark:bg-gray-800 dark:text-gray-200">
      <div className="card shadow-lg dark:bg-gray-700 dark:text-gray-200 bg-gray-100 w-full max-w-xl mt-4">
        <div className="card-body">
          <h5 className="card-title text-center text-gray-800 dark:text-gray-200">Your Cart</h5>
          {cart.length > 0 ? (
            <ul className="list-group">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center bg-gray-700 dark:bg-gray-600"
                >
                 <div>
                  <h6 className="mb-0 text-gray-800 dark:text-gray-200 text-sm sm:text-base">{item.title || "Unknown Book"}</h6>
                  <p className="mb-0 text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Quantity: {item.quantity}</p>
                </div>
                <div className="d-flex justify-content-end align-items-center">
                  <button
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="btn btn-sm btn-outline-success mx-1 p-1"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className="btn btn-sm btn-outline-danger mx-1 p-1"
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleQuantityChange(item.id, 0)}
                    className="btn btn-sm btn-outline-danger mx-1 p-1"
                  >
                    Remove
                  </button>
                </div>

                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-400 dark:text-gray-500">Your cart is empty.</p>
          )}

          {cart.length > 0 && (
            <div className="mt-4 d-flex justify-content-between">
              <button
                onClick={() => handleClearCart()}
                className="btn btn-outline-secondary"
              >
                Clear Cart
              </button>
              <Link to="/checkout" className="btn btn-primary">
                Proceed to Checkout
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
