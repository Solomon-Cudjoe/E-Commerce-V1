import express from "express";
// import products from "../data/products.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../Models/ProductModel.js";

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    console.log(products);
    return res.json(products);
  })
);
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  })
);
export default router;
