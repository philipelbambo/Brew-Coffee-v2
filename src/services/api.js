// src/services/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const fetchCarts = () => api.get('/carts');
export const addToCart = (cartData) => api.post('/carts', cartData);
export const updateCart = (id, cartData) => api.put(`/carts/${id}`, cartData);
export const deleteCart = (id) => api.delete(`/carts/${id}`);

export const fetchOrders = () => api.get('/orders');
export const createOrder = (orderData) => api.post('/orders', orderData);
export const updateOrder = (id, orderData) => api.put(`/orders/${id}`, orderData);
export const deleteOrder = (id) => api.delete(`/orders/${id}`);
