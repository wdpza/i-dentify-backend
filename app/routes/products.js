import express from "express";

import { importProducts, getProducts, getProduct, createProduct } from "../controllers/products.js";

const router = express.Router();

router.get("/import", importProducts);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", createProduct);

export default router;