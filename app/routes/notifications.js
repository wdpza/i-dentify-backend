import express from "express";

import { sendNotifications, sendSOSNotifications } from "../controllers/notifications.js"

const router = express.Router()

/**
 * @api {post} /notifications/send Send notification
 * @apiName SendNotifications
 * @apiGroup Notifications
 * @apiVersion 1.0.0
 * @access private
 */
router.post("/send", sendNotifications)

/**
 * @api {post} /notifications/sos/:sub Send SOS contact a notification
 * @apiName sendSosNotifications
 * @apiGroup Notifications
 * @apiVersion 1.0.0
 * @access private
 */
router.post("/sos/:sub", sendSOSNotifications)

export default router