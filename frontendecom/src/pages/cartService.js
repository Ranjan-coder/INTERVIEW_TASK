// services/cartService.js
import API from '../utils/api';

export const fetchCart = async () => {
  const response = await API.get('/cart');
  return response.data;
};

export const addToCart = async (productId, quantity) => {
  const response = await API.post('/cart/add', { productId, quantity });
  return response.data;
};

export const removeFromCart = async (productId) => {
  const response = await API.post('/cart/remove', { productId });
  return response.data;
};

export const clearCart = async () => {
  const response = await API.post('/cart/clear');
  return response.data;
};
