import express from "express";

import { getQRCode, getQRCodes, createQRCode, confirmQRCode, getQRCodesBySub } from "../controllers/qrcodes.js";

const router = express.Router();

// GET
router.get("/", getQRCodes);
router.get("/:uid", getQRCode);
router.get("/user/:sub", getQRCodesBySub)

// POST
router.post("/create", createQRCode);
router.post("/:uid/confirm", confirmQRCode);

export default router;