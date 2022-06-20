import QRCode from "../models/QRCode.js";
import generator from 'generate-password'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";

/**
 * @description Create a QR code
 * @param {Object} req
 * @param {Object} res
 *
 * @authentication required
 *
 * @route POST /qr/create
 *
 * @returns {Object} JSON
 */
export const createQRCode = asyncHandler(async (req, res) => {

  const accessToken = generator.generate({
    length: 10,
    numbers: true,
    uppercase: true,
  });

  const { uid } = req.body;

  if(!uid) {
    return res.status(400).json({
      success: false,
      message: "Missing uid"
    });
  }

  try {
    req.body.accessToken = accessToken;

    const qrCode = await QRCode.create(req.body);

    res.status(200).json({
      success: true,
      data: qrCode
    });

    console.log("QRCode created: ", qrCode);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @description Confirm a QR code and assign user
 * @param {Object} req
 * @param {Object} res
 *
 * @authentication required
 *
 * @route POST /qr/:uid/confirm
 *
 * @returns {Object} JSON
 */
export const confirmQRCode = asyncHandler(async (req, res) => {
  try {
    const qrCode = await QRCode.findOne({ uid: req.params.uid });
    const { sub } = req.body;

    const response = await QRCode.updateOne({ uid: req.params.uid }, {
      $set: {
        sub: sub,
        isConfirmed: true
      }
    });

    res.status(200).json({
      success: true,
      data: response
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export const getQRCode = async (req, res) => {
  try {
    const qrCode = await QRCode.findOne({ uid: req.params.uid });
    console.log(qrCode);
    res.status(200).json({
      success: true,
      data: qrCode
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const getQRCodes = async (req, res) => {
  try {
    const qrCodes = await QRCode.find();
    res.status(200).json({
      success: true,
      data: qrCodes
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const getQRCodesBySub = asyncHandler(async (req, res) => {
  try {
    const qrCodes = await QRCode.find({ sub: req.params.sub });
    res.status(200).json({
      success: true,
      data: qrCodes
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
