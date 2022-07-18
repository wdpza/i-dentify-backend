import express from "express";

import { getUsers, getUserBySub, createUser, sendSOS } from "../controllers/users.js";

const router = express.Router();

// Create a user
router.post("/create", createUser);

// Send SOS Notifications
router.post("/sos", sendSOS);

// Get all users
router.get("/", getUsers);

// Get user by sub
router.get("/sub/:sub", getUserBySub);

export default router;