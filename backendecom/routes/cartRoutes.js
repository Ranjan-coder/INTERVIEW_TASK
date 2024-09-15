const express = require('express');
const router = express.Router();
const authMiddleware  = require('../middleware/authMiddleware');
const { getCart, addToCart, removeFromCart, clearCart } = require('../controllers/cartController');

// GET /api/cart - Get user's cart
router.get('/', authMiddleware, getCart);

// POST /api/cart/add - Add item to cart
router.post('/add', authMiddleware, addToCart);

// POST /api/cart/remove - Remove item from cart
router.post('/remove', authMiddleware, removeFromCart);

// POST /api/cart/clear - Clear cart
router.post('/clear', authMiddleware, clearCart);

module.exports = router;
