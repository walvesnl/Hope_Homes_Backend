const express = require("express");
const Conversation = require("../models").conversation;
const Message = require("../models").message;
const { Router } = express;
const conversationRouter = new Router();
const authMiddleware = require("../auth/middleware");
const Request = require("../models").request;

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
      const reqToDelete = await Request.findByPk(req.body.requestId);

      reqToDelete.destroy();

      res
        .status(200)
        .send({ message: "Conversation room created!", newConversation });
    } else {
      const newConversation = await Conversation.create({
        hostId: req.body.id,
        hostName: req.body.name,
        hostImage: req.body.image,
        seekerId: req.user.id,
        seekerName: req.user.name,
        seekerImage: req.user.image,
      });
      const reqToDelete = await Request.findByPk(req.body.requestId);

      reqToDelete.destroy();

      res
        .status(200)
        .send({ message: "Conversation room created!", newConversation });
    }
  } catch (e) {
    console.log(e.message);
  }
});

conversationRouter.get("/:id", authMiddleware, async (req, res) => {
  try {
    const conv = await Conversation.findByPk(req.params.id, {
      include: { model: Message },
    });

    if (req.user.isHost === true) {
      if (conv.hostId !== req.user.id) {
        return res
          .status(401)
          .send({ message: "You cannot access this conversation" });
      } else {
        return res.status(200).send(conv);
      }
    } else {
      if (conv.seekerId !== req.user.id) {
        return res
          .status(401)
          .send({ message: "You cannot access this conversation" });
      } else {
        return res.status(200).send(conv);
      }
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = conversationRouter;
