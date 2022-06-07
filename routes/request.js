const express = require("express");
const Request = require("../models").request;
const { Router } = express;
const requestRouter = new Router();
const authMiddleware = require("../auth/middleware");

requestRouter.post("/", authMiddleware, async (req, res) => {
  try {
    const { receiverId } = req.body;
    console.log("this req", req.body);

    const newRequest = await Request.create({
      receiverId,
      senderId: req.user.id,
    });

    res.status(200).send({ message: "Request sent successfully!" });
  } catch (e) {
    console.log(e.message);
  }
});

// requestRouter.get("/", authMiddleware, async (req, res) => {
//   try {
//     const receiverId = req.user.id;
//     const requestsReceived = await Request.findAll({
//       where: Request.receiverId === receiverId,
//       include: { model: user, attributes: ["name"] },
//     });
//     res.status(200).send(requestsReceived);
//   } catch (e) {
//     console.log(e.message);
//   }
// });
module.exports = requestRouter;