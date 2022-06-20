import express from "express";
import Image from "../models/Image.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

export const getImages = async (req, res) => {
  try {
    const images = await Image.find();

    res.status(200).json({
      success: true,
      data: images
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const uploadImages = async (req, res) => {

  const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000000 },
  }).array("files", 999);

  try {
    let imagePath = "abc";

    upload(req, res, (err) => {
      if (err) {
        console.log(err);
      } else {
        if (req.files == undefined) {
          console.log("File not found.");
        } else {
          //image uploaded successfully
          req.files.map(function (file) {
            //[TODO] create unique folder for each user
            imagePath = "uploads/" + file.filename;
            const image = Image.create({
              title: file.filename,
              path: imagePath
            });
          });
        }
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
} 

export const uploadImage = async (req, res) => {
  try {
    const image = await Image.create(req.body);

    console.log(image);

    res.status(200).json({
      success: true,
      data: image
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}