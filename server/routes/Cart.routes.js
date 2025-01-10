import express from 'express';
import { addToCart, getCart, removeFromCart, updateCartQuantity, dropCart } from '../controllers/cart.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/').post(protect, addToCart).get(protect, getCart);
router.route('/update').post(protect, updateCartQuantity);
router.route('/remove').delete(protect, removeFromCart);
router.route('/drop').delete(protect, dropCart);

export default router;
