import User from "../models/User.js"
import asyncHandler from "express-async-handler"
import nodemailer from "nodemailer"

/**
 * @api {get} /users Get all users
 * @apiName GetUsers
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @auth true [todo: add authentication]
 */
export const getUsers = asyncHandler( async (req, res) => {
  try {
    const users = await User.find()

    res.status(200).json({
      success: true,
      data: users
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

/**
 * @api {get} /users/:sub Get user by sub
 * @apiName GetUserBySub
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @auth true [todo: add authentication]
 */
export const getUserBySub = asyncHandler( async (req, res) => {
  try {
    const user = await User.findOne({ sub: req.params.sub })

    res.status(200).json({
      success: true,
      data: user
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

/**
 * @api {post} /users/create Create user
 * @apiName CreateUser
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @param {String} name User name
 */
export const createUser = asyncHandler(async (req, res) => {
  const { sub } = req.body;
  if(!sub) {
    return res.status(400).json({
      success: false,
      message: "Missing sub"
    });
  }

  if(req.body.sosContacts.length < 1) {
    return res.status(400).json({
      success: false,
      message: "At least 1 SOS contact required."
    })
  }

  if(req.body.sosContacts.length > 5) {
    return res.status(400).json({
      success: false,
      message: "SOS contacts cannot be more than 5"
    })
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
        })

      } catch (err) {
        res.status(500).json({ message: err.message })
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

/**
 * @desc Update user
 * @api {put} /users/:sub Update user
 * @apiName UpdateUser
 * @route /users/:sub
 */
export const updateUser = asyncHandler( async (req, res) => {
const user = await User.findOne({ sub: req.params.sub });

  if(!user) {
    return res.status(400)
    throw new Error("User not found");
  }

  const updatedUser = await User.findOneAndUpdate({ sub: req.params.sub }, req.body, {
    new: true,
  })

  res.status(200).json({
    success: true,
    data: updatedUser
  })
})

/**
 * @desc Update user SOS contacts
 * @api {put} /users/:sub/sos Update user SOS contacts
 * @apiName UpdateUserSOS
 */
export const updateUserMedical = asyncHandler( async (req, res) => {
  const user = await User.findOne({ sub: req.params.sub });

  if(!user) {
    return res.status(400)
    throw new Error("User not found");
  }

  const updatedUser = await User.findOneAndUpdate({ sub: req.params.sub }, req.body, {
    new: true,
  })

  res.status(200).json({
    success: true,
    data: updatedUser
  })
})

/**
 * @desc Delete user
 * @api {delete} /users/:sub Delete user
 * @apiName DeleteUser
 * @route /users/:sub
 * @access private
 */
export const deleteUser = asyncHandler( async (req, res) => {
  const user = await User.findOne({ sub: req.params.sub });

  if(!user) {
    return res.status(400)
    throw new Error("User not found");
  }

  await User.findOneAndDelete({ sub: req.params.sub });

  res.status(200).json({
    success: true,
    data: user
  })
})

/**
 * @api {post} /users/:sub/:contactId Send SOS contact a notification
 * @apiName sendSosContactNotification
 * @apiGroup Users
 * @apiVersion 1.0.0
 */
export const sendSosContactNotification = asyncHandler(async (req, res) => {

  const { sub } = req.params;

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

    console.log("Message sent: %s", info.messageId)

    res.status(200).json({
      success: true,
    });

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

/**
 * @api {post} /users/:sub/sos Send SOS
 * @apiName SendSOS
 * @apiGroup Users
 * @apiVersion 1.0.0
 */
export const sendSOS = asyncHandler(async (req, res) => {
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
    })

    console.log("Message sent: %s", info.messageId)

    res.status(200).json({
      success: true,
    });

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});

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

/**
 * @api {get} /users/uid/:uid Get user by uid
 * @apiName GetUserByUID
 * @apiGroup Users
 * @apiVersion 1.0.0
 */
export const getUserByUID = async (req, res) => {
  try {
    const user = await User.findOne({ qrCode: req.params.uid });

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

