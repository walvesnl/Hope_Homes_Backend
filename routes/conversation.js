const express = require("express");
const Conversation = require("../models").conversation;
const { Router } = express;
const conversationRouter = new Router();
const authMiddleware = require("../auth/middleware");

conversationRouter.post("/", authMiddleware, async (req, res) => {
  try {
    console.log("logging body", req.body);

    if (req.user.isHost === true) {
      const newConversation = await Conversation.create({
        hostId: req.user.id,
        hostName: req.user.name,
        hostImage: req.user.image,
        seekerId: req.body.id,
        seekerName: req.body.name,
        seekerImage: req.body.image,
      });
    } else {
      const newConversation = await Conversation.create({
        hostId: req.body.id,
        hostName: req.body.name,
        hostImage: req.body.image,
        seekerId: req.user.id,
        seekerName: req.user.name,
        seekerImage: req.user.image,
      });
    }
    res.status(200).send({ message: "Conversation room created!" });
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = conversationRouter;
