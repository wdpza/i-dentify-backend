import User from "../models/User.js";
import generator from 'generate-password'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import nodemailer from "nodemailer";

export const createUser = asyncHandler(async (req, res) => {
  const { sub } = req.body;
  if(!sub) {
    return res.status(400).json({
      success: false,
      message: "Missing sub"
    });
  }

  // Check if user exists and create if not
  try {
    const user = await User.findOne({ sub });

    if(user) {
      console.log("user exists");
      return res.status(200).json({
        success: true,
        data: user
      });
    } else {
      try {
        const user = await User.create(req.body);

        res.status(200).json({
          success: true,
          data: user
        });

        console.log("User created: ", user);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export const sendSOS = asyncHandler(async (req, res) => {
  try {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'dario.bechtelar83@ethereal.email',
          pass: 'Tb85A4rZwrSSAEVuUg'
      }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Wikus du Plessis" <wikus@example.com>', // sender address
      to: "simplexityza@gmail.com",
      subject: "SOS Alert", // Subject line
      text: "SOS Alert", // plain text body
      html: "<b>SOS Alert</b>" // html body
    });

    console.log("Message sent: %s", info.messageId);

    res.status(200).json({
      success: true,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ qrCode: req.params.qrCode });

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      data: users
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const updateUser = async (req, res) => {
  try {
    const user = await User.findOne({ qrCode: req.params.qrCode });

    // Update user data if user exists and access token is correct
    if (user && user.accessToken === req.body.accessToken) {
      const updateUser = await User.findOneAndUpdate({ qrCode: req.params.qrCode }, req.body, { new: true });

      res.status(200).json({
        success: true,
        data: updateUser
      });
    }
    // If user exists but access token is incorrect
    else if (user) {
      res.status(401).json({
        success: false,
        message: 'Invalid access token'
      });
    } else {
      res.status(404).json({
        success: true,
        message: 'User not found'
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const sendUserNotifications = async (req, res) => {
  try {
    const user = await User.findOne({ sub: req.params.sub });

    const { sosContacts } = req.body;

    if (user) {
      const newNotifications = [];

      for (let i = 0; i < sosContacts.length; i++) {
        newNotifications.push(notifications[i]);
      }

      const updateUser = await User.findOneAndUpdate({ sub: req.params.sub }, { sosContacts: newNotifications }, { new: true });

      res.status(200).json({
        success: true,
        data: updateUser
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  /*
  const subject = 'Welcome to the app!';
  const text = `Hello ${name}, welcome to the app!`;
  const html = `<h1>Hello ${name}, welcome to the app!</h1>`;
  */

  /*
  const mailOptions = {
    from: 'Epresense',
    to: email,
    subject: subject,
    text: text,
    html: html
  };

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  */
}

export const getUserByQrCode = async (req, res) => {
  try {
    const user = await User.findOne({ qrCode: req.params.qrCode });

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const getUserBySub = async (req, res) => {
  try {
    const user = await User.findOne({ sub: req.params.sub });

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}