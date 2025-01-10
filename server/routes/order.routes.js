import express from 'express';
import { createOrder, getUserOrders } from '../controllers/order.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Create a new order
router.post('/', protect, createOrder);

// Get user orders
router.get('/', protect, getUserOrders);

export default router;
    