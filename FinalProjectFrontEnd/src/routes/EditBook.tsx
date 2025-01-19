import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleBook, updateBook } from "../services/Books-Service";

const EditBook = () => {
  const { bookId: bookIdParam } = useParams();
  const bookId = parseInt(bookIdParam, 10);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    price: "",
    imageUrl: "",
    language: "",
    publicationDate: "",
    publisher: "",
    categories: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSingleBook(bookId);
        const book = response.data;

        const categoryData = [
          { id: 1, name: "History" },
          { id: 2, name: "Sci-Fi" },
          { id: 3, name: "Fantasy" },
          { id: 4, name: "Biography" },
          { id: 5, name: "Technology" },
          { id: 6, name: "Thriller" },
          { id: 7, name: "Adventure" },
          { id: 8, name: "Philosophy" },
          { id: 9, name: "Psychology" },
          { id: 10, name: "Self-Help" }
        ];

        setCategories(categoryData);

        setFormData({
          title: book.title || "",
          description: book.description || "",
          author: book.author || "",
          price: book.price || "",
          imageUrl: book.imageUrl || "",
          language: book.language || "",
          publicationDate: book.publicationDate || "",
          publisher: book.publisher || "",
          categories: book.categories || [],
        });
      } catch (err) {
        setError("Failed to fetch book data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [bookId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    const categoryId = parseInt(value);
    const category = categories.find((cat) => cat.id === categoryId);

    setFormData((prev) => {
      let updatedCategories;
      if (checked) {
        updatedCategories = [...prev.categories, category];
      } else {
        updatedCategories = prev.categories.filter((cat) => cat.id !== categoryId);
      }
      return { ...prev, categories: updatedCategories };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.categories.length === 0) {
      setError("Please select at least one category.");
      return;
    }

    const updatedFormData = {
      id: bookId,
      title: formData.title,
      description: formData.description,
      author: formData.author,
      price: parseFloat(formData.price),
      imageUrl: formData.imageUrl,
      language: formData.language,
      publicationDate: formData.publicationDate,
      publisher: formData.publisher,
      categories: formData.categories.map((category) => category.id),
    };

    try {
      setLoading(true);
      await updateBook(bookId, updatedFormData);
      setSuccessMessage("Book updated successfully!");
      setTimeout(() => navigate(`/books/${bookId}`), 1500);
    } catch (err) {
      setError("Failed to update the book. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-500 dark:text-gray-300">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100 dark:bg-gray-800 dark:text-gray-200">
      <div className="card shadow-lg dark:bg-gray-700 dark:text-gray-200 bg-gray-100 w-full max-w-xl">
        <div className="card-body">
          <h1 className="text-center mb-4 text-2xl font-bold">Edit Book</h1>

          {error && (
            <div className="alert alert-danger text-center mb-4" role="alert">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="alert alert-success text-center mb-4" role="alert">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: "Title", name: "title", type: "text", required: true },
              { label: "Description", name: "description", type: "textarea", required: true  },
              { label: "Author", name: "author", type: "text", required: true },
              { label: "Price ($)", name: "price", type: "number", required: true },
              { label: "Image URL", name: "imageUrl", type: "url", required: true },
              { label: "Language", name: "language", type: "text", required: true },
              { label: "Publication Date", name: "publicationDate", type: "string", required: true},
              { label: "Publisher", name: "publisher", type: "text", required: true },
            ].map(({ label, name, type, required }) => (
              <div key={name}>
                <label htmlFor={name} className="block text-sm font-bold">
                  {label} {required && <span className="text-red-500">*</span>}
                </label>
                {type === "textarea" ? (
                  <textarea
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
                  ></textarea>
                ) : (
                  <input
                    type={type}
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
                    required={required}
                  />
                )}
              </div>
            ))}



          <div>
            <label className="block text-sm font-bold mb-2">
              Categories <span className="text-red-500">*</span>
            </label>
            <div className="space-y-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center space-x-3"
                >
                  <input
                    type="checkbox"
                    id={`category-${category.id}`}
                    name="categories"
                    value={category.id}
                    checked={formData.categories.some((c) => c.id === category.id)}
                    onChange={handleCategoryChange}
                    className="h-4 w-4"
                  />
                  <label
                    htmlFor={`category-${category.id}`}
                    className="text-sm font-medium text-gray-800"
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </div>

            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className={`bg-blue-500 text-white px-4 py-2 rounded ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
