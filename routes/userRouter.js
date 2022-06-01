const express = require("express");
const { Router } = express;
const userRouter = new Router();
const User = require("../models").user;

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: "4000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Please upload JPG, PNG or GIF file");
  },
}).single("image");

userRouter.get("/", async (req, res) => {
  try {
    const allUsers = await User.findAll();
    console.log(allUsers);
    return res.status(200).send(allUsers);
  } catch (e) {
    console.log(e);
  }
});

userRouter.post("/", upload, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = await User.create({
      name,
      email,
      password,
      image: req.file.path,
    });
    res.status(200).send(newUser);
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = userRouter;
