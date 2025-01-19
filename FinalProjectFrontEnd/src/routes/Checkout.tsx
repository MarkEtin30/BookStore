import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useBooks from "../hooks/useBooks";
import { BookType } from "../@types";
import { createOrder } from "../services/Orders-Service";

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { error, loading, books = [] } = useBooks();
  const [cart, setCart] = useState<BookType[]>([]);
  const [orderData, setOrderData] = useState({
    userId: 0,
    orderDate: new Date().toISOString(),
    totalAmount: 0,
    status: "Pending",
    shippingAddress: "",
    email: "",
    name: "",
    phone: "",
    orderItems: [] as { bookId: number; quantity: number; priceAtTimeOfPurchase: number }[],
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Helper function to validate phone number
  const isPhoneValid = (phone: string): boolean => {
    const phoneRegex = /^[0-9]{10,15}$/; // Adjust based on requirements
    return phoneRegex.test(phone);
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const filteredBooks = books
      .filter((book) => storedCart.some((item) => item.id === book.id))
      .map((book) => {
        const cartItem = storedCart.find((item) => item.id === book.id);
        return { ...book, quantity: cartItem?.quantity || 1 };
      });
    setCart(filteredBooks);
  }, [books]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const claims = JSON.parse(atob(token.split(".")[1]));
      const userId = claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      setOrderData((prevState) => ({ ...prevState, userId }));
    }
  }, []);

  useEffect(() => {
    const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setOrderData((prevState) => ({
      ...prevState,
      totalAmount,
      orderItems: cart.map((item) => ({
        bookId: item.id,
        quantity: item.quantity,
        priceAtTimeOfPurchase: item.price,
      })),
    }));
  }, [cart]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderData((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateForm = (): boolean => {
    let errors: { [key: string]: string } = {};
    if (!orderData.shippingAddress) {
      errors.shippingAddress = "Shipping address is required.";
    }
    if (!orderData.phone || !isPhoneValid(orderData.phone)) {
      errors.phone = "Please enter a valid phone number (10-15 digits).";
    }
    if (!orderData.name) {
      errors.name = "Name is required.";
    }
    if (!orderData.email && !orderData.userId) {
      errors.email = "Email is required for guest users.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() && !orderData.userId ) {
      return; // Stop submission if there are validation errors
    }

    try {
      const createdOrder = await createOrder(orderData);
      navigate(`/order-success/${createdOrder.orderId}`);
      setCart([]);
      localStorage.removeItem("cart");
    } catch (error) {
      // console.error("Failed to place order:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100 dark:bg-gray-800 dark:text-gray-200">
      <div className="card shadow-lg dark:bg-gray-700 dark:text-gray-200 bg-gray-100 w-full max-w-4xl">
        <div className="card-body">
          <h1 className="text-center mb-4 display-4 text-primary">Checkout</h1>

          {error && <p className="text-danger mb-4">Error: {error.message}</p>}
          {loading && <p className="text-muted mb-4">Loading...</p>}

          {!loading && cart.length > 0 ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="shippingAddress" className="form-label">
                  Shipping Address:<span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  id="shippingAddress"
                  name="shippingAddress"
                  className={`form-control ${formErrors.shippingAddress ? "is-invalid" : ""}`}
                  value={orderData.shippingAddress}
                  onChange={handleInputChange}
                  required
                />
                {formErrors.shippingAddress && <div className="invalid-feedback">{formErrors.shippingAddress}</div>}
              </div>

              {/* Conditional Fields for Guest Users */}
              {!orderData.userId && (
                <>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email:<span className="text-red-700">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
                      value={orderData.email}
                      onChange={handleInputChange}
                      required
                    />
                    {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name:<span className="text-red-700">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className={`form-control ${formErrors.name ? "is-invalid" : ""}`}
                      value={orderData.name}
                      onChange={handleInputChange}
                      required
                    />
                    {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      Phone:<span className="text-red-700">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className={`form-control ${formErrors.phone ? "is-invalid" : ""}`}
                      value={orderData.phone}
                      onChange={handleInputChange}
                      required
                    />
                    {formErrors.phone && <div className="invalid-feedback">{formErrors.phone}</div>}
                  </div>
                </>
              )}

              {/* Order Summary */}
              <div className="mb-4">
                <h3 className="h5">Order Summary</h3>
                <ul className="list-unstyled">
                  {cart.map((item) => (
                    <li key={item.id} className="d-flex justify-content-between">
                      <span>{item.title} (x{item.quantity})</span>
                      <span>${item.price}</span>
                    </li>
                  ))}
                </ul>
                <div className="font-weight-bold">Total: ${orderData.totalAmount}</div>
              </div>

              {/* Submit Button */}
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg shadow-lg"
                >
                  Place Order
                </button>
              </div>
            </form>
          ) : (
            <p className="text-center text-lg text-muted">Your cart is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
