import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postBooks } from "../services/Books-Service"; // Ensure this sends a valid request to your API

const CreateBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
    language: "",
    author: "",
    publisher: "",
    publicationDate: "",
    categories: [],
    quantity: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Mock categories (replace with real categories from your backend or API)
  const categories = [
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
  // Updated handleInputChange function to handle both input and textarea elements
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const updatedCategories = checked
        ? [...prev.categories, parseInt(value)]
        : prev.categories.filter((categoryId) => categoryId !== parseInt(value));
      return { ...prev, categories: updatedCategories };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset messages
    setError("");
    setSuccess("");

    if (
      !formData.title ||
      !formData.price ||
      !formData.imageUrl ||
      formData.categories.length === 0
    ) {
      setError(
        "Title, Price, Image URL, and at least one category are required fields."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await postBooks({
        ...formData,
        price: parseFloat(formData.price),
        quantity: formData.quantity ? parseInt(formData.quantity) : 0, // Handle empty or invalid quantity
      });

      if (!response) {
        throw new Error("Failed to create the book.");
      }

      setSuccess("Book created successfully!");
      setFormData({
        title: "",
        description: "",
        price: "",
        imageUrl: "",
        language: "",
        author: "",
        publisher: "",
        publicationDate: "",
        categories: [],
        quantity: "",
      });
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100 dark:bg-gray-800 dark:text-gray-200">
      <div className="card shadow-lg dark:bg-gray-700 dark:text-gray-200 bg-gray-100 w-full max-w-xl">
        <div className="card-body">
          <h1 className="text-center mb-4 text-2xl font-bold">Create New Book</h1>
          {error && (
            <div className="alert alert-danger text-center mb-4 bg-red-500 text-white p-2 rounded">
              {error}
            </div>
          )}
          {success && (
            <div className="alert alert-success text-center mb-4 bg-green-500 text-white p-2 rounded">
              {success}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-bold">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-bold">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange} // This is now correctly typed for both input and textarea
                rows={3}
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
              ></textarea>
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-bold">
                Price ($) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
                required
              />
            </div>

            <div>
              <label htmlFor="imageUrl" className="block text-sm font-bold">
                Image URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
                required
              />
            </div>
            <div>
              <label htmlFor="language" className="block text-sm font-bold">
                Language  <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="language"
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
              />
            </div>
            <div>
              <label htmlFor="author" className="block text-sm font-bold">
                Author  <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
                required
              />
            </div>
            <div>
              <label htmlFor="publisher" className="block text-sm font-bold">
                Publisher  <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="publisher"
                name="publisher"
                value={formData.publisher}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
              />
            </div>
            <div>
              <label htmlFor="publicationDate" className="block text-sm font-bold">
                Publication Date  <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="publicationDate"
                name="publicationDate"
                value={formData.publicationDate}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
              />
            </div>



            <div>
              <label className="block text-sm font-bold mb-2">
                Categories <span className="text-red-500">*</span>
              </label>


              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`category-${category.id}`}
                      name="categories"
                      value={category.id}
                      checked={formData.categories.includes(category.id)}
                      onChange={handleCategoryChange}
                      className="h-4 w-4"
                    />
                    <label htmlFor={`category-${category.id}`} className="text-sm">
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
                className={`btn btn-primary btn-lg w-full ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Submitting..." : "Create Book"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBook;
