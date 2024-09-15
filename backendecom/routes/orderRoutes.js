const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, getOrderById } = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/orders - Create a new order
router.post('/', authMiddleware, createOrder);

// GET /api/orders - Get all orders (for admin)
router.get('/', authMiddleware, getAllOrders);

// GET /api/orders/:id - Get a single order by ID
router.get('/:id', authMiddleware, getOrderById);

module.exports = router;
