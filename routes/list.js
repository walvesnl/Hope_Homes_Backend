const express = require("express");
const { Router } = express;
const list = new Router();
const User = require("../models").user;
const bcrypt = require("bcrypt");
const { toJWT } = require("../auth/jwt");
const { SALT_ROUNDS } = require("../config/constants");

const authMiddleware = require("../auth/middleware");
const { password } = require("pg/lib/defaults");

list.get("/", authMiddleware, async (req, res, next) => {
  try {
    if (req.user.isHost === true) {
      const allUsers = await User.findAll({
        where: { isHost: false },
        attributes: ["id", "name", "description", "image", "country"],
      });
      res.status(200).send(allUsers);
    } else {
      const allUsers = await User.findAll({
        where: { isHost: true },
        attributes: [
          "id",
          "name",
          "description",
          "image",
          "address",
          "city",
          "country",
        ],
      });
      res.status(200).send(allUsers);
    }
  } catch (e) {
    console.log(e.message);
  }
});
module.exports = list;
