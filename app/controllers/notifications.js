import Notification from "../models/Notification.js"
import User from "../models/User.js"
import asyncHandler from "express-async-handler"
import nodemailer from "nodemailer"
import axios from "axios"

/**
 * @description Send a notification
 * @param {Object} req
 * @param {Object} res
 * @authentication required
 * @route POST /notifications/send
 * @access private
 */
export const sendNotification = asyncHandler(async (req, res) => {
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
     */
    const url = `https://graph.facebook.com/v13.0/${process.env.WHATSAPP_NUMBER_ID}/messages`
    const data = {
      "messaging_product": "whatsapp",
      "to": recipient.whatsapp,
      "type": "template",
      "template": {
          "name": "hello_world",
          "language": {
              "code": "en_US"
          }
      }
    }

    await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.WHATSAPP_TOKEN}`,
      },
    }).then(response => {
      console.log(response.data)
    }).catch(error => {
      console.log(error)
    })

    res.status(200).json({
      success: true,
    });

  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
})

/**
 * @description Send SOS notification to all sos contacts
 * @param {Object} req
 * @param {Object} res
 * @authentication required
 */
export const sendSOSNotifications = asyncHandler(async (req, res) => {
  const sub = req.params.sub
  const user = await User.findOne({ sub: sub })

  const sosContacts = user.metaData.sosContacts
  let message = req.body.message
  const subject = 'SOS Alert!'

  if(!sub) {
    return res.status(400).json({
      success: false,
      message: "Sub is required"
    })
  }

  if(!user) {
    return res.status(400).json({
      success: false,
      message: "User not found"
    })
  } else {
    // verify jwt token
    const decoded = jwt.verify(sub, process.env.JWT_SECRET)
    if(!decoded) {
      return res.status(400).json({
        success: false,
        message: "Invalid token"
      })
    }
  }

  if(!sosContacts) {
    return res.status(400).json({
      success: false,
      message: "No sos contacts found"
    })
  }

  if(!message) {
    message = "No info provided."
  }

  // Loop through each and make call to send notification
  for(let i = 0; i < sosContacts.length; i++) {
    const contact = sosContacts[i];
    let apiFeedback = []

    let prepNumber = contact.number.replace(/\D/g, '')
    let number = '27' + prepNumber.substring(1)

    axios.post(`${process.env.API_URL}/notifications/send`, {
      recipient: {
        email: contact.email,
        whatsapp: number,
        name: contact.name + ' ' + contact.surname
      },
      message: message,
      subject: subject
    }).then(response => {
      apiFeedback.push(response.data)
      console.log(response.data)
    }).catch(error => {
      console.log(error)
    })
  }

  res.status(200).json({
    success: true,
    messages: apiFeedback
  })
})



