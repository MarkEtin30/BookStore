import React, { useState, useEffect } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import useBooks from "../hooks/useBooks"; // Custom hook to fetch books
import { deleteBook } from "../services/Books-Service"; // Function to delete a book
import { BookType, CategoryType } from "../@types";

const Books = () => {
  const { error, loading, books = [] } = useBooks();
  const [deletingBookId, setDeletingBookId] = useState<number | null>(null); // Track book ID being deleted
  const [cart, setCart] = useState<BookType[]>([]); // To store cart items
  const [cartInsert, setCartInsert] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // State for selected category
  const [categories, setCategories] = useState<string[]>([]); // State to store categories for filtering
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query

  const navigate = useNavigate();

  // Fetch cart from localStorage on component load
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (Array.isArray(storedCart)) {
      setCart(storedCart); // Set cart state from localStorage only if it's an array
    } else {
      setCart([]); // Ensure cart is an array if storedCart is not valid
    }
  }, [cartInsert]);

  // Extract categories from books for filtering
  useEffect(() => {
    const allCategories = books.reduce<string[]>((acc, book) => {
      if (book.categories) {
        book.categories.forEach((category: CategoryType) => {
          if (!acc.includes(category.name)) {
            acc.push(category.name);
          }
        });
      }
      return acc;
    }, []);
    setCategories(allCategories);
  }, [books]);



  useEffect(() => {
  
  }, [books]);







  // Handle adding a book to the cart
  const handleAddToCart = (bookId: number) => {
    const existingItem = cart.find((item) => item.id === bookId);
    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map((item) =>
        item.id === bookId ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { id: bookId, quantity: 1 }];
    }

    updateCartInLocalStorage(updatedCart);
    alert("Book added to the cart!");
  };

  // Handle delete request
  const handleDelete = async (bookId: number) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      setDeletingBookId(bookId);
      try {
        await deleteBook(bookId); // Send delete request

        
        navigate(0);

      } catch (err) {
        // console.error(`Error deleting book with ID: ${bookId}`, err);
      } finally {
        setDeletingBookId(null);
      }
    }
  };

  const updateCartInLocalStorage = (updatedCart: BookType[]) => {
    const minimalCart = updatedCart.map(({ id, quantity }) => ({ id, quantity }));
    localStorage.setItem("cart", JSON.stringify(minimalCart));
    setCart(updatedCart);
  };

  // Filter books based on selected category and search query
  const filteredBooks = books.filter((book) => {
    const matchesCategory =
      !selectedCategory || book.categories.some((category) => category.name === selectedCategory);
    const matchesSearchQuery =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearchQuery;
  });

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100 dark:bg-gray-800 dark:text-gray-200">
      <div className="card shadow-lg dark:bg-gray-700 dark:text-gray-200 bg-gray-100 w-full max-w-4xl">
        <div className="card-body">
          <h1 className="text-center mb-6 text-3xl font-bold text-blue-600 dark:text-blue-400">
            Books Mangment 
          </h1>

          {/* Search input */}
          <div className="mb-4 text-center">
            <input
              type="text"
              placeholder="Search by title or description..."
              className="form-control"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category filter dropdown */}
          <div className="mb-4 text-center">
            <label className="mr-2">Filter by Category:</label>
            <select
              className="form-select"
              onChange={(e) => setSelectedCategory(e.target.value)}
              value={selectedCategory || ""}
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Create New Book Button */}
          <div className="m-6 text-center">
            <Link to="/books/create" className="btn btn-primary btn-lg">
              Create New Book
            </Link>
          </div>

          {/* Error handling */}
          {error && (
            <div className="alert alert-danger" role="alert">
              <p>Error: {error.message}</p>
              <button
                onClick={() => window.location.reload()}
                className="btn btn-primary mt-2"
              >
                Retry
              </button>
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {/* Books list */}
          {!loading && filteredBooks.length > 0 ? (
            <ul className="list-group space-y-6">
              {filteredBooks.map((book) => {
                return (
                  <li
                    key={book.id}
                    className="list-group-item p-4 border rounded-lg shadow-sm dark:bg-gray-800 dark:text-gray-200 bg-gray-50"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <Link
                          to={`/books/${book.id}`}
                          aria-label={`View details for ${book.title}`}
                          className="text-decoration-none dark:text-gray-200 hover:underline"
                        >
                          <h5 className="text-xl font-semibold">{book.title}</h5>
                        </Link>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                          <strong>Language:</strong> {book.language}
                        </p>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                          <strong>Price:</strong> ${book.price}
                        </p>

                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                          <strong>Author:</strong> {book.author}
                        </p>

                        {/* Categories display */}
                        <div>
                          <strong>Categories:</strong>
                          <ul>
                            {book.categories.map((category, index) => (
                              <li key={index}>{category.name}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex flex-col items-end space-y-2">
                        {/* Edit Button */}
                        <Link
                          to={`/books/edit/${book.id}`}
                          className="btn btn-secondary btn-sm"
                        >
                          Edit
                        </Link>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(book.id)}
                          className="btn btn-danger btn-sm"
                          disabled={deletingBookId === book.id}
                        >
                          {deletingBookId === book.id ? (
                            <div className="spinner-border spinner-border-sm text-white" role="status">
                              <span className="visually-hidden">Deleting...</span>
                            </div>
                          ) : (
                            "Delete"
                          )}
                        </button>

                        {/* Add to Cart Button */}
                        <button
                          onClick={() => handleAddToCart(book.id)}
                          className="btn btn-success btn-sm mt-2"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>

                    {/* Book Image */}
                    <div className="mt-2">
                      <img
                        src={book.imageUrl || "/images/no-image.png"} // Fallback image if none is available
                        alt={book.title}
                        className="card-img-top rounded-md max-w-[200px] max-h-[300px] object-cover mx-auto"
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            // Empty state when no books are available
            !loading &&
            !error && (
              <div className="text-center">
                <img
                  src="/images/no-books.png"
                  alt="No books available"
                  className="mx-auto mb-4"
                />
                <p className="text-muted">No books available at the moment. Check back later!</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Books;
