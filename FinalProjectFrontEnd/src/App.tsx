import React from "react";
import { Route, Routes } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext"; // Import CartProvider

import Home from "./routes/Home";
import About from "./routes/About";
import Register from "./routes/Register";
import Login from "./routes/Login";
import Books from "./routes/Books";
import NotFound from "./routes/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NoAuthenticationRoute from "./components/NoAuthenticationRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import SingleBook from "./routes/SingleBook";
import CreateBook from "./routes/CreateBook";
import EditBook from "./routes/EditBook";
import Cart from './routes/Cart'; 
import Checkout from "./routes/Checkout";
import OrderSuccess from "./routes/OrderSuccess";
import UsersPage from "./routes/UsersPage";
import UserPage from "./routes/UserPage";
import OrdersPage from "./routes/OrdersPage";
import OrderDetails from "./routes/OrderDetails";
import CreateOrderPage from "./routes/CreateOrderPage";
import EditOrderPage from "./routes/EditOrderPage";
import UserSettingsPage from "./routes/UserSettingsPage";

import EditUserForm from "./routes/EditUserForm";
import CreateNewUserPage from "./routes/CreateNewUserPage";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import NotAuthorizedPage from "./routes/NotAuthorizedPage";
import NotFoundPage from "./routes/NotFoundPage";
import ContactUs from "./routes/ContuctUs";

const App = () => {
  const url = import.meta.env.VITE_BASE_URL;
  console.log(url);

  return (
    <CartProvider> {/* Wrap the entire application with CartProvider */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<NoAuthenticationRoute><Register /></NoAuthenticationRoute>} />
        <Route path="/login" element={<NoAuthenticationRoute><Login /></NoAuthenticationRoute>} />
        <Route path="/books" element={<ProtectedAdminRoute><Books /></ProtectedAdminRoute>} />
        <Route path="/books/create" element={<ProtectedRoute><CreateBook /></ProtectedRoute>} />
        <Route path="/books/edit/:bookId" element={<EditBook />} />
        <Route path="/cart" element={<Cart />} /> {/* Include the Cart route here */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/books/:id" element={<SingleBook />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/order-success/:orderId" element={<OrderSuccess />} />
        <Route path="/users" element={<ProtectedAdminRoute><UsersPage /></ProtectedAdminRoute>} />
        <Route path="/users/:userId" element={<ProtectedAdminRoute><UserPage /></ProtectedAdminRoute>} />
        <Route path="/orders" element={<ProtectedAdminRoute><OrdersPage /></ProtectedAdminRoute>} />
        <Route path="/orders/:orderId" element={<ProtectedAdminRoute><OrderDetails /></ProtectedAdminRoute>} /> {/* Ensure OrderDetails is properly rendered here */}
        <Route path="/create-order" element={<ProtectedAdminRoute><CreateOrderPage /></ProtectedAdminRoute>} />
        <Route path="/edit-order/:orderId" element={<ProtectedAdminRoute><EditOrderPage /></ProtectedAdminRoute>} />
        <Route path="/user-settings" element={<ProtectedRoute><UserSettingsPage /></ProtectedRoute>} />
        <Route path="/users/edit/:id" element={<ProtectedAdminRoute><EditUserForm /></ProtectedAdminRoute>} />
        <Route path="/users/create" element={<ProtectedAdminRoute><CreateNewUserPage /></ProtectedAdminRoute>} />
        <Route path="/401" element={<NotAuthorizedPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="/contact-us" element={<ContactUs />} />


        
      </Routes>
      <Footer />
    </CartProvider>
  );
};

export default App;
