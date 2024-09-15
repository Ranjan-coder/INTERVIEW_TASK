const express = require('express');
const { getProducts, getProductById, getProductsByCategory  } = require('../controllers/productController');
const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.get('/:category', getProductsByCategory);

module.exports = router;
