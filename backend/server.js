import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";

import ProductsRoute from "./Routes/productsRoutes.js";
import UserRoute from "./Routes/userRoute.js";
import OrderRoute from "./Routes/orderRoutes.js";
import uploadRoute from "./Routes/uploadRoute.js";

import connectDB from "./config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.use(cors());

app.use("/api/products", ProductsRoute);
app.use("/api/users", UserRoute);
app.use("/api/orders", OrderRoute);
app.use("/api/upload", uploadRoute);

// Create uploads folder if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve static files from the React frontend app
// const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.get("/api/config/paypal", (req, res) => {
  return res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

app.get("/", (req, res) => {
  res.send("API working");
});
