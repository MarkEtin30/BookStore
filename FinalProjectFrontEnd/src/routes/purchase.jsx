const express = require("express");
const router = express.Router();
const { Order, OrderItem, Book, User } = require("../models"); // Assuming Sequelize models are being used

router.post("/purchase", async (req, res) => {
  try {
    const { user, books } = req.body;

    // Validate user data
    if (!user.name || !user.email || !user.address) {
      return res.status(400).json({ message: "Missing user details" });
    }

    // Check if books exist in the database
    for (let book of books) {
      const dbBook = await Book.findByPk(book.bookId);
      if (!dbBook) {
        return res.status(400).json({ message: `Book with ID ${book.bookId} not found` });
      }
    }

    // Create the Order
    const order = await Order.create({
      userId: user.id, // Assuming you have a way to find the user ID
      shippingAddress: user.address,
      status: "Pending",
      totalAmount: books.reduce((total, book) => total + book.priceAtTimeOfPurchase * book.quantity, 0),
    });

    // Create Order Items
    const orderItems = books.map((book) => ({
      orderId: order.id,
      bookId: book.bookId,
      quantity: book.quantity,
      priceAtTimeOfPurchase: book.priceAtTimeOfPurchase,
    }));

    await OrderItem.bulkCreate(orderItems); // Bulk insert the items

    return res.status(200).json({ success: true, message: "Purchase successful!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
});

module.exports = router;
