import { Router } from "express";
import { UserControllers } from "./users.controller";



const router = Router();

// Create user
router.post("/", UserControllers.createUser);

// Get all users
router.get("/", UserControllers.getAllUsers);

// Get user by ID
router.get("/:id", UserControllers.getUserById);

// Update user by ID
router.patch("/:id", UserControllers.updateUserById);

// Delete user by ID
router.delete("/:id", UserControllers.deleteUser);

export const UserRoutes = router;
