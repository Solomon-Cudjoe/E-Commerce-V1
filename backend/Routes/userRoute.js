import express from "express";
const router = express.Router();

import {
  authUser,
  registerUser,
  logoutUser,
  updateUser,
  updateUserProfile,
  getUserById,
  getUserProfile,
  getUsers,
  deleteUser,
} from "../Controllers/userController.js";

import { protect, admin } from "../middlewares/authMiddleware.js";

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/logout", logoutUser);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
