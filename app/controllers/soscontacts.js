import SosContact from "../models/SosContact.js"
import asyncHandler from "express-async-handler"

/**
 * @description Create a SOS Contact
 *
 * @param {Object} req
 * @param {Object} res
 *
 * @authentication required
 *
 * @route POST /sos/create
 *
 * @returns {Object} JSON
 */
export const createSOSContact = asyncHandler(async (req, res) => {
  try {
    const sosContact = await SosContact.create(req.body);

    res.status(200).json({
      success: true,
      data: sosContact
    })

    console.log("SosContact created: ", sosContact)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export const deleteSOSContact = asyncHandler(async (req, res) => {
  console.log(req.params)

  try {
    const sosContact = await SosContact.findOneAndDelete({ "_id": req.params._id });

    res.status(200).json({
      success: true,
      data: sosContact
    })

    console.log("SOS contact deleted: ", SosContact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

export const getSOSContacts = asyncHandler(async (req, res) => {
  try {
    const sosContacts = await SosContact.find();
    res.status(200).json({
      success: true,
      data: sosContacts
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

export const getSOSContactsBySub = asyncHandler(async (req, res) => {
  try {
    const sosContacts = await SosContact.find({ sub: req.params.sub });
    res.status(200).json({
      success: true,
      data: sosContacts
    });
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})