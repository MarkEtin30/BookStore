import axios from 'axios';

const createOrder = async (order) => {
  try {
    const response = await axios.post('/api/orders', order);
  } catch (error) {
  }
};

// Example order payload
const orderPayload = {
  userId: 1,
  orderDate: new Date().toISOString(),
  totalAmount: 120.0,
  status: 'Pending',
  shippingAddress: '123 Main St',
  orderItems: [
    { bookId: 1, quantity: 2, priceAtTimeOfPurchase: 20.0 },
    { bookId: 2, quantity: 1, priceAtTimeOfPurchase: 80.0 },
  ],
};

// Call the createOrder function
createOrder(orderPayload);
