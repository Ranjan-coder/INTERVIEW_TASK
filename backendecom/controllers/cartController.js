// const Cart = require('../models/Cart');
// const mongoose = require('mongoose');

// // Get user's cart
// const getCart = async (req, res) => {
//   console.log('User ID:', req.user.id);
//   try {
//     const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
//     if (!cart) {
//       return res.status(404).json({ message: 'Cart not found' });
//     }
//     res.json(cart);
//   } catch (error) {
//     console.error('Error fetching cart:', error);
//     res.status(500).json({ message: 'Failed to fetch cart', error });
//   }
// };


// // Add item to cart
// const addToCart = async (req, res) => {
//   const { productId, quantity } = req.body;
  
//   if (!mongoose.Types.ObjectId.isValid(productId)) {
//     return res.status(400).json({ message: 'Invalid product ID' });
//   }

//   try {
//     let cart = await Cart.findOne({ userId: req.user.id });
//     if (!cart) {
//       cart = new Cart({ userId: req.user.id, items: [] });
//     }

//     const existingItem = cart.items.find(item => item.productId.toString() === productId);
//     if (existingItem) {
//       existingItem.quantity += quantity;
//     } else {
//       cart.items.push({ productId, quantity });
//     }

//     await cart.save();
//     res.status(200).json(cart);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to add item to cart', error });
//   }
// };

// // Remove item from cart
// const removeFromCart = async (req, res) => {
//   const { productId } = req.body;
  
//   if (!mongoose.Types.ObjectId.isValid(productId)) {
//     return res.status(400).json({ message: 'Invalid product ID' });
//   }

//   try {
//     const cart = await Cart.findOne({ userId: req.user.id });
//     if (!cart) {
//       return res.status(404).json({ message: 'Cart not found' });
//     }
    
//     cart.items = cart.items.filter(item => item.productId.toString() !== productId);
//     await cart.save();
//     res.status(200).json(cart);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to remove item from cart', error });
//   }
// };

// // Clear cart
// const clearCart = async (req, res) => {
//   try {
//     await Cart.findOneAndDelete({ userId: req.user.id });
//     res.status(200).json({ message: 'Cart cleared' });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to clear cart', error });
//   }
// };

// module.exports = { getCart, addToCart, removeFromCart, clearCart };




const Cart = require('../models/Cart');
const mongoose = require('mongoose');
const Order = require('../models/orderModel'); // Assuming you have an Order model

// Get user's cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Failed to fetch cart', error });
  }
};

// Add item to cart or increase quantity
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  try {
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: 'Item added to cart', cart });
  } catch (error) {
    console.error('Failed to add item to cart:', error);
    res.status(500).json({ message: 'Failed to add item to cart', error });
  }
};

// Decrease quantity or remove item if quantity is 0
const removeFromCart = async (req, res) => {
  const { productId, quantity } = req.body;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId);
    if (!existingItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Decrease quantity or remove item if quantity becomes 0
    if (existingItem.quantity > quantity) {
      existingItem.quantity -= quantity;
    } else {
      cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    }

    await cart.save();
    res.status(200).json({ message: 'Item updated in cart', cart });
  } catch (error) {
    console.error('Failed to remove item from cart:', error);
    res.status(500).json({ message: 'Failed to update item in cart', error });
  }
};

// Clear cart after successful order placement
const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.user.id });
    res.status(200).json({ message: 'Cart cleared' });
  } catch (error) {
    console.error('Failed to clear cart:', error);
    res.status(500).json({ message: 'Failed to clear cart', error });
  }
};

// Place an order
const placeOrder = async (req, res) => {
  const { products, totalAmount } = req.body;

  try {
    // Create a new order
    const newOrder = new Order({
      user: req.user.id,
      products,
      totalAmount,
      status: 'Pending', // Or another status based on your business logic
    });

    // Save the order
    await newOrder.save();

    // Clear the cart after order placement
    await Cart.findOneAndDelete({ userId: req.user.id });

    res.status(200).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.error('Failed to place order:', error);
    res.status(500).json({ message: 'Failed to place order', error });
  }
};

module.exports = { getCart, addToCart, removeFromCart, clearCart, placeOrder };
