import QRCode from "../models/QRCode.js"
import generator from 'generate-password'
import asyncHandler from "express-async-handler"
import { v4 as uuidv4 } from "uuid"

/**
 * [todo: add authentication]
 */

/**
 * @description Create a QR code
 *
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

  const uuid = uuidv4();

  const accessToken = generator.generate({
    length: 10,
    numbers: true,
    uppercase: true,
  })

  req.body.accessToken = accessToken
  req.body.uid = uuid;

  try {
    const qrCode = await QRCode.create(req.body);

    res.status(200).json({
      success: true,
      data: qrCode
    })

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
    })

    res.status(200).json({
      success: true,
      data: response
    })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

/**
 * @description Get QR code by uid
 * @param {Object} req
 * @param {Object} res
 *
 * @authentication required [todo: add authentication]
 *
 * @route GET /qr/uid/:uid
 *
 * @returns {Object} JSON
 */
export const getQRCode = async (req, res) => {
  try {
    const qrCode = await QRCode.findOne({ uid: req.params.uid });
    console.log(qrCode)
    res.status(200).json({
      success: true,
      data: qrCode
    })
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

/**
 * @description Get all QR codes
 * @param   {object} req
 * @param   {object} res
 * @returns {object} JSON
 * @authentication required [todo: add authentication]
 */
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

/**
 * @description Get QR codes by sub
 * @param   {object} req
 * @param   {object} res
 * @param   {string} req.params.sub
 * @returns {object} JSON
 * @authentication required [todo: add authentication]
 */
export const getQRCodesBySub = asyncHandler(async (req, res) => {
  try {
    const qrCodes = await QRCode.find({ sub: req.params.sub });
    res.status(200).json({
      success: true,
      data: qrCodes
    });
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

/**
 * @description Update QR code
 *
 * @param   {object} req
 * @param   {object} res
 * @param   {string} req.params.uid
 * @returns {object} JSON
 * @authentication required [todo: add authentication]
 * @route PUT /qr/:uid
 */
export const updateQRCode = asyncHandler(async (req, res) => {
  try {
    const qrCode = await QRCode.findOneAndUpdate({ uid: req.params.uid }, req.body, {
      new: true,
      runValidators: true,
      data: req.body
    })

    res.status(200).json({
      success: true,
      data: qrCode
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
