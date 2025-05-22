import express, { urlencoded } from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";

import ProductsRoute from "./Routes/ProductsRoutes.js";
import UserRoute from "./Routes/userRoute.js";
import OrderRoute from "./Routes/orderRoutes.js";

import connectDB from "./config/db.js";

const PORT = process.env.PORT;
connectDB();

const app = express();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}⚡⚡`);
});

// Body parser middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

app.use("/api/products", ProductsRoute);
app.use("/api/users", UserRoute);
app.use("/api/orders", OrderRoute);

app.get("/api/config/paypal", (req, res) => {
  return res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

app.get("/", (req, res) => {
  res.send("API working");
});
