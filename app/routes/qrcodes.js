import express from "express"

import { getQRCode, getQRCodes, createQRCode, getQRCodesBySub, updateQRCode, confirmQRCode } from "../controllers/qrcodes.js";

const router = express.Router()

/**
 * @api {get} /qr Get all qrcodes
 * @apiName getQRCodes
 * @apiGroup QRCodes
 * @apiVersion 1.0.0
 */
router.get("/", getQRCodes)

/**
 * @api {get} /qr/:sub Get qrcodes by sub
 * @apiName getQRCodesBySub
 * @apiGroup QRCodes
 * @apiVersion 1.0.0
 * @auth true [todo: add authentication]
 */
router.get("/sub/:sub", getQRCodesBySub)

/**
 * @api {get} /qr/:uid Get qrcode by uid
 * @apiName getQRCode
 * @apiGroup QRCodes
 * @apiVersion 1.0.0
 * @auth true [todo: add authentication]
 */
router.get("/uid/:uid", getQRCode)

/**
 * @api {post} /qr/create Create qrcode
 * @apiName createQRCode
 * @apiGroup QRCodes
 * @apiVersion 1.0.0
 * @auth true [todo: add authentication]
 */
router.post("/create", createQRCode)

/**
 * @api {post} /qr/:sub/confirm Confirm qrcode
 * @apiName confirmQRCode
 * @apiGroup QRCodes
 * @apiVersion 1.0.0
 */
router.post("/:sub/confirm", confirmQRCode)

/**
 * @api {post} /qr/update Update qrcode
 * @apiName updateQRCode
 * @apiGroup QRCodes
 * @apiVersion 1.0.0
 */
router.post("/:uid/update", updateQRCode)

export default router