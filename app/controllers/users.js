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

export const sendSosContactNotifications = asyncHandler(async (req, res) => {

  console.log(req)

  try {
    let transporter = nodemailer.createTransport({
      pool: true,
      host: 'mail.i-dentify.co.za',
      port: 587,
      auth: {
          user: 'server@i-dentify.co.za',
          pass: 'MythicGradsJuicyQua12'
      },
      tls: {
          rejectUnauthorized: false
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"I-Dentify" <server@i-dentify.co.za>', // sender address
      to: "simplexityza@gmail.com",
      subject: "", // Subject line
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

export const sendSOS = asyncHandler(async (req, res) => {

  console.log(req.body)

  try {

    let transporter = nodemailer.createTransport({
      pool: true,
      host: 'mail.i-dentify.co.za',
      port: 587,
      auth: {
          user: 'server@i-dentify.co.za',
          pass: 'MythicGradsJuicyQua12'
      },
      tls: {
          rejectUnauthorized: false
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"I-Dentify" <server@i-dentify.co.za>', // sender address
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