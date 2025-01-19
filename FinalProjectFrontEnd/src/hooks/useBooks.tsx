import { useState, useEffect, useCallback } from "react";
import { BookType } from "../@types";
import { getBooks } from "../services/Books-Service";

const useBooks = () => {
  const [books, setBooks] = useState<BookType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Fetch books function using async/await
  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getBooks(); // Await the response from the API
      setBooks(response.data);
      setError(null); // Reset error if the fetch is successful
    } catch (error: any) {
      setError(error); // Set the error if the fetch fails
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch books initially when the component mounts
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // Return books data, loading state, error, and refetch function
  return { books, loading, error, refetchBooks: fetchBooks };
};

export default useBooks;
