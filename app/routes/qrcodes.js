import express from "express"

import { getQRCode, getQRCodes, createQRCode, getQRCodesBySub, updateQRCode, confirmQRCode, deleteQRCode } from "../controllers/qrcodes.js";

const router = express.Router()

/**
 * @api {post} /qr/create Create qrcode
 * @apiName createQRCode
 * @apiGroup QRCodes
 * @apiVersion 1.0.0
 * @access private
 */
router.post("/create", createQRCode)

/**
 * @api {delete} api/v1/qr/:uid Delete user
 * @apiName DeleteQRCode
 * @apiGroup QRCodes
 * @apiVersion 1.0.0
 * @access private
 */
 router.delete("/:uid", deleteQRCode)

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
router.get("/:sub", getQRCodesBySub)

/**
 * @api {get} /qr/uid/:uid Get qrcode by uid
 * @apiName getQRCode
 * @apiGroup QRCodes
 * @apiVersion 1.0.0
 * @auth true [todo: add authentication]
 */
router.get("/uid/:uid", getQRCode)

/**
 * @api {post} /qr/:sub/confirm Confirm qrcode
 * @apiName confirmQRCode
 * @apiGroup QRCodes
 * @apiVersion 1.0.0
 */
router.put("/confirm/:uid", confirmQRCode)

/**
 * @api {post} /qr/update Update qrcode
 * @apiName updateQRCode
 * @apiGroup QRCodes
 * @apiVersion 1.0.0
 */
router.put("/:uid", updateQRCode)

export default router