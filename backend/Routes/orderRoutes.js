import express from "express";
const router = express.Router();

import {
  addOrderItems,
  getMyOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
  getOrderById,
} from "../Controllers/orderController.js";

import { protect, admin } from "../middlewares/authMiddleware.js";

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/mine").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;
