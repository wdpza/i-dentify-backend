import express from "express";

import { getImages, uploadImages, uploadImage } from "../controllers/images.js";

const router = express.Router();

router.get("/", getImages);
router.post("/", uploadImages);
//router.post("/upload", uploadImage);

export default router;