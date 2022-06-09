const express = require("express");
const { Router } = express;
const auth = new Router();
const User = require("../models").user;
const bcrypt = require("bcrypt");
const { toJWT } = require("../auth/jwt");
const { SALT_ROUNDS } = require("../config/constants");
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../auth/middleware");
const Request = require("../models").request;
const Conversation = require("../models").conversation;

// IMAGE UPLOAD LOGIC
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
  /*  fileFilter: (req, file, cb) => {
   const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Please upload JPG, PNG or GIF file");
  },*/
}).single("image");

// GET ALL USERS (ADD AUTH LATER)

auth.get("/", async (req, res) => {
  try {
    const allUsers = await User.findAll();
    console.log(allUsers);
    return res.status(200).send(allUsers);
  } catch (e) {
    console.log(e);
  }
});

// SIGNUP ROUTE
auth.post("/signup", upload, async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      description,
      address,
      city,
      country,
      isHost,
    } = req.body;

    console.log("this is the file req log", req.files);
    const newUser = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, SALT_ROUNDS),
      image: req.file.path,
      description,
      address,
      city,
      country,
      isHost,
    });

    delete newUser.dataValues["password"];

    const token = toJWT({ userId: newUser.id });
    console.log("new user", newUser.dataValues);

    res.status(201).send({ token, user: newUser.dataValues });
  } catch (e) {
    console.log(e.message);
    if (e.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .send({ message: "There is an existing account with this email" });
    }

    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

// LOGIN ROUTE

auth.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Please provide both email and password" });
    }

    const user = await User.findOne({
      where: { email },
      include: [
        { model: Request, as: "receiver" },
        { model: Request, as: "sender" },
        { model: Conversation, as: "seeker" },
        { model: Conversation, as: "host" },
      ],
    });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).send({
        message: "User with that email not found or password incorrect",
      });
    }

    delete user.dataValues["password"];

    const token = toJWT({ userId: user.id });
    console.log("userdata", user.dataValues);

    return res.status(200).send({ token, user: user.dataValues });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

auth.get("/me", authMiddleware, async (req, res) => {
  delete req.user.dataValues["password"];
  res.status(200).send({ ...req.user.dataValues });
});

module.exports = auth;
