const express = require("express");
const Request = require("../models").request;
const { Router } = express;
const requestRouter = new Router();
const authMiddleware = require("../auth/middleware");

requestRouter.post("/", authMiddleware, async (req, res) => {
  try {
    const { receiverId } = req.body;

    const newRequest = await Request.create({
      receiverId,
      senderId: req.user.id,
      senderName: req.user.name,
      senderImage: req.user.image,
    });

    res.status(200).send({ message: "Request sent successfully!", newRequest });
  } catch (e) {
    console.log(e.message);
  }
});

requestRouter.delete("/delete/:id", async (req, res) => {
  try {
    const requestId = req.params.id;

    const reqToDelete = await Request.findByPk(requestId);
    reqToDelete.destroy();

    res.status(200).send({ message: "Request deleted successfully" });
  } catch (e) {
    console.log(e);
  }
});

module.exports = requestRouter;
