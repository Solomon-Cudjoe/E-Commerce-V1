import asyncHandler from "../middlewares/asyncHandler.js";
import Order from "../Models/orderModel.js";

// Create new order
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  // Add validation for all required fields
  if (!shippingAddress || !paymentMethod || !itemsPrice || !totalPrice) {
    res.status(400);
    throw new Error("Missing required order information");
  }

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((item) => ({
        ...item,
        product: item._id || item.product,
        delete: item._id,
        return: item._id,
        // product: item.product,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });

    try {
      const createdOrder = await order.save();
      console.log("Your order: ", createdOrder); // Log the saved order
      res.status(201).json(createdOrder);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  }
});

// Get logged in user order
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// Get order by id
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// Update order to paid
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// Update order to delivered
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    (order.isDelivered = true), (order.deliveredAt = Date.now());

    const updateOrder = await order.save();

    return res.status(200).json(updateOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// Get all orders
// Admin only
const getOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "id name");
    res.status(200).json(orders);

    if (orders.length === 0) {
      res.status(404);
      throw new Error("No orders found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export {
  addOrderItems,
  getMyOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
  getOrderById,
};
