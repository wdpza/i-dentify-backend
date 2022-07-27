import express from "express";

import { sendNotifications } from "../controllers/notifications.js"

const router = express.Router()

/**
 * @api {post} /notifications Send notification
 * @apiName SendNotifications
 * @apiGroup Notifications
 * @apiVersion 1.0.0
 * @access private
 */
router.post("/send", sendNotifications)

export default router