// src/routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const { Order, OrderItem, Book } = require("../models"); // Sequelize models

// POST route to create an order and order items
router.post("/order", async (req, res) => {
  try {
    const { user, books } = req.body;

    // Validate the user data
    if (!user.name || !user.email || !user.address) {
      return res.status(400).json({ message: "Missing user details" });
    }

    // Step 1: Create the Order
    const order = await Order.create({
      userId: user.id, // Assuming user ID is passed in the user object
      shippingAddress: user.address,
      status: "Pending",
      totalAmount: books.reduce(
        (total, book) => total + book.priceAtTimeOfPurchase * book.quantity,
        0
      ),
    });

    // Step 2: Create Order Items
    const orderItems = books.map((book) => ({
      orderId: order.id, // Use the orderId generated in Step 1
      bookId: book.bookId, // Book ID from the cart
      quantity: book.quantity, // Quantity of the book from the cart
      priceAtTimeOfPurchase: book.priceAtTimeOfPurchase, // Price at the time of purchase
    }));

    await OrderItem.bulkCreate(orderItems); // Insert all order items at once

    return res
      .status(200)
      .json({ success: true, message: "Purchase successful!" });
  } catch (error) {
    // console.error("Error processing purchase:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
});

module.exports = router;
