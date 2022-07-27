import Notification from "../models/Notification.js"
import asyncHandler from "express-async-handler"
import nodemailer from "nodemailer"

/**
 * @description Send a notification
 * @param {Object} req
 * @param {Object} res
 * @authentication required
 * @route POST /notifications/send
 * @access private
 */
export const sendNotifications = asyncHandler(async (req, res) => {
  const recipient = req.body.recipient
  const message = req.body.message
  const subject = req.body.subject

  try {
    /**
     * Email
     */
    let transporter = nodemailer.createTransport({
      pool: true,
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
      },
      tls: {
          rejectUnauthorized: false
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"I-Dentify" <server@i-dentify.co.za>', // sender address
      to: recipient.email, // list of receivers
      subject: subject, // Subject line
      text: message, // plain text body
      html: message // html body
    })

    console.log("Message sent: %s", info.messageId);

    /**
     * Whatsapp
     *
    let whatsapp = require('whatsapp-web-api');
    let wapi = whatsapp.createInstance({
      storage: 'memory'
    });

    wapi.initialize().then(() => {
      wapi.sendMessage("+278344444444", "SOS Alert");
    }
    ).catch(err => {
      console.log(err);
    })
    */

    res.status(200).json({
      success: true,
    });

  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
})

