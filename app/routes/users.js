import express from "express";

import { getUsers, getUserBySub, createUser } from "../controllers/users.js";

const router = express.Router();

// Create a user
router.post("/create", createUser);

// Get all users
router.get("/", getUsers);

// Get user by sub
router.get("/sub/:sub", getUserBySub);

export default router;