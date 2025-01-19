import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useBooks from "../hooks/useBooks"; // Custom hook to fetch books
import { deleteBook } from "../services/Books-Service"; // Function to delete a book
import { BookType, CategoryType } from "../@types";

const Home = () => {
  const { error, loading, books = [] } = useBooks();
  const [deletingBookId, setDeletingBookId] = useState<number | null>(null); // Track book ID being deleted
  const [cart, setCart] = useState<BookType[]>([]); // To store cart items
  const [cartInsert, setCartInsert] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // State for selected category
  const [categories, setCategories] = useState<string[]>([]); // State to store categories for filtering
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query

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
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100 dark:bg-gray-800 dark:text-black-400">
    <div className="card shadow-lg dark:bg-gray-700 dark:text-black-400 bg-gray-100 w-full max-w-4xl rounded-lg">
     <div className="container mx-auto py-8 dark:bg-gray-700 bg-gray-100 text-black-500 dark:text-black-400">
      <div className="card-body p-6">
        {/* Page Title */}
        <h1 className="text-center mb-4 text-4xl font-extrabold text-blue-600 dark:text-blue-400">
          Book Store
        </h1>
      
        
        <h2 className="text-center mb-6 text-xl font-semibold text-gray-600 dark:text-gray-300">
          Explore Your Next Favorite Book
        </h2>
  
        {/* Explanatory Segment */}
        <div className="mb-6 text-center">
        <div className="flex justify-center items-center">
        <img 
          src="https://img.freepik.com/premium-photo/electronic-books-online-knowledge-base-internet-digital-library-e-library_662214-215678.jpg?w=740" 
          alt="Bookstore Banner" 
          className="max-w-full h-auto p-3"
        />
      </div>

          <p className="text-lg text-gray-700 dark:text-gray-400">
            Welcome to our Book Store! Here, you can explore a wide range of books from various genres
            and authors. Whether you're a fan of fiction, non-fiction, or educational materials, we have
            something for everyone. Browse through our collection, use the search bar to find your next
            favorite read, or filter books by category to narrow down your choices.
          </p>
          <p className="mt-2 text-lg text-gray-700 dark:text-gray-400">
            Our mission is to make it easy and enjoyable for you to discover new books that inspire and
            enrich your life. Happy reading!
          </p>

          
        </div>
  
        {/* Search Bar */}
        <div className="mb-6 flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="text"
            placeholder="Search by title or description..."
            className="form-control p-2 border border-gray-300 rounded-lg w-full sm:w-2/3 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="form-select p-2 border border-gray-300 rounded-lg w-full sm:w-1/3 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
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
  
        {/* Error Handling */}
        {error && (
          <div className="alert alert-danger bg-red-100 text-red-700 p-4 rounded-lg mb-6 dark:bg-red-800 dark:text-red-200">
            <p className="mb-2">Error: {error.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        )}
  
        {/* Loading State */}
        {loading && (
          <div className="text-center my-6">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
  
        {/* Books List */}
        {!loading && filteredBooks.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredBooks.map((book) => (
              <li
                key={book.id}
                className="p-4 border rounded-lg shadow-sm bg-gray-50 dark:bg-gray-800 dark:text-gray-200 flex flex-col justify-between"
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                  {/* Book Image */}
                  <img
                    src={book.imageUrl || "/images/no-image.png"} // Fallback image
                    alt={book.title}
                    className="rounded-md max-w-[150px] max-h-[200px] object-cover"
                  />
  
                  {/* Book Details */}
                  <div className="flex-1">
                    <Link
                      to={`/books/${book.id}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <h5 className="text-xl font-bold">{book.title}</h5>
                    </Link>
                    <p className="mt-2 text-gray-700 dark:text-gray-400">
                      <strong>Author:</strong> {book.author}
                    </p>
                    <p className="mt-1 text-gray-700 dark:text-gray-400">
                      <strong>Language:</strong> {book.language}
                    </p>
                    <p className="mt-1 text-gray-700 dark:text-gray-400">
                      <strong>Price:</strong> ${book.price}
                    </p>
  
                    {/* Categories */}
                    <div className="mt-2">
                      <strong>Categories:</strong>
                      <ul className="list-disc pl-5">
                        {book.categories.map((category, index) => (
                          <li key={index} className="text-sm">
                            {category.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
  
                {/* Actions - Buttons */}
                <div className="mt-4 flex flex-col gap-2">
                  <button
                    onClick={() => handleAddToCart(book.id)}
                    className="btn btn-success bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                  >
                    Add to Cart
                  </button>
                  <Link
                    to={`/books/${book.id}`}
                    className="btn btn-primary bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 text-center"
                  >
                    More Details
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          !loading &&
          !error && (
            <div className="text-center">
              <img
                src="/images/no-books.png"
                alt="No books available"
                className="mx-auto mb-4"
              />
              <p className="text-gray-600 dark:text-gray-400">
                No books available at the moment. Check back later!
              </p>
            </div>
          )
        )}
      </div>
    </div>
  </div>
  </div>
  
  );
  
};

export default Home;
