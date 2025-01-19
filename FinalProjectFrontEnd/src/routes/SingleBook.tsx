import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { BookType, CategoryType } from "../@types";
import { format } from "date-fns";

const SingleBook = () => {
  const { id: idString } = useParams<{ id: string }>();
  const id = parseInt(idString || "");

  const { data: book, error, loading } = useFetch<BookType>(`books/${id}`);

  // State for cart
  const [cart, setCart] = useState<{ id: number; quantity: number }[]>([]);

  // Fetch cart from localStorage on component load
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (Array.isArray(storedCart)) {
      setCart(storedCart);
    } else {
      setCart([]);
    }
  }, []);

  // Handle adding a book to the cart
  const handleAddToCart = (bookId: number) => {
    const updatedCart = cart.map((item) =>
      item.id === bookId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    if (!cart.find((item) => item.id === bookId)) {
      updatedCart.push({ id: bookId, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    alert("Book added to the cart!");
  };

  // Format publication date
  const formattedDate = book?.publicationDate
    ? format(new Date(book.publicationDate), "MMMM dd, yyyy")
    : "Unknown";

  if (isNaN(id)) {
    return <div className="text-center text-danger">Invalid product ID</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100 dark:bg-gray-800 dark:text-gray-200">
      <div className="card shadow-lg dark:bg-gray-700 dark:text-gray-200 bg-gray-100 w-full max-w-4xl">
        <div className="card-body">
          <h1 className="text-center mb-4 text-3xl font-bold">Book Details</h1>

          {/* Error State */}
          {error && (
            <div className="alert alert-danger text-center" role="alert">
              Error: {error}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {/* Book Details */}
          {!loading && book && (
            <div className="flex flex-wrap justify-center gap-6">
              {/* Book Cover */}
              <div className="max-w-sm">
                <div className="card shadow-sm rounded-lg">
                  <img
                    src={book.imageUrl || "/default-image.jpg"}
                    alt={book.title || "No Image Available"}
                    className="card-img-top rounded-lg w-full"
                  />
                </div>
              </div>

              {/* Book Info */}
              <div className="flex-1 max-w-md">
                <div className="card shadow-sm rounded-lg dark:bg-gray-800 dark:text-gray-200 bg-gray-50">
                  <div className="card-body">
                    <h2 className="card-title text-2xl font-semibold">
                      {book.title}
                    </h2>
                    <p className="card-text text-gray-600 dark:text-gray-400 mb-3">
                      {book.description}
                    </p>
                    <p className="font-bold text-lg text-gray-700 dark:text-gray-300">
                      Price: ${book.price}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Author: {book.author}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Published Date: {formattedDate}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Publisher: {book.publisher}
                    </p>

                    {/* Categories */}
                    {book.categories && (
                      <div className="mt-4">
                        <p className="font-bold text-lg text-gray-700 dark:text-gray-300">
                          Categories:
                        </p>
                        <ul className="list-disc pl-5">
                          {book.categories.map((category: CategoryType) => (
                            <li
                              key={category.id}
                              className="text-gray-600 dark:text-gray-400"
                            >
                              {category.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="text-center mt-4">
                      <button
                        onClick={() => handleAddToCart(book.id)}
                        className="btn btn-success btn-lg"
                        aria-label={`Add ${book.title} to Cart`}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !book && (
            <div className="text-center text-muted">
              <p>Book not found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
