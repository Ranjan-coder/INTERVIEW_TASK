const Order = require('../models/orderModel');
const Cart = require('../models/Cart');

// Create a new order
const createOrder = async (req, res) => {
  try {
    // Find the cart for the user
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Calculate the total amount
    let totalAmount = 0;
    for (const item of cart.items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(400).json({ message: `Product with ID ${item.productId} not found` });
      }
      totalAmount += product.price * item.quantity;
    }

    // Create a new order
    const order = new Order({
      user: req.user.id,
      products: cart.items.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      })),
      totalAmount,
    });

    // Save the order and clear the user's cart
    await order.save();
    await Cart.findOneAndDelete({ userId: req.user.id });

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order', error });
  }
};

// Get all orders (for admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'username email');
    res.status(200).json(orders);
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders', error });
  }
};

// Get a single order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'username email');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch the order', error });
  }
};


module.exports = {
  createOrder,
  getAllOrders,
  getOrderById
};
