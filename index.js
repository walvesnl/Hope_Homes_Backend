const express = require("express");
const app = express();
const socketio = require("socket.io");
const http = require("http");
const { PORT } = require("./config/constants");
const cors = require("cors");
const jsonParser = express.json();
const authRouter = require("./routes/auth");
const listRouter = require("./routes/list");
const requestRouter = require("./routes/request");
const conversationRouter = require("./routes/conversation");
const Message = require("./models").message;

app.use(cors());
app.use(jsonParser);

const server = http.createServer(app);
const io = socketio(server);

app.use("/auth", authRouter);
app.use("/list", listRouter);
app.use("/request", requestRouter);
app.use("/conversation", conversationRouter);

app.use("/Images", express.static("./Images"));

io.on("connection", (socket) => {
  console.log("We have a new connection");

  socket.on("join", ({ userId, conversationId }, callback) => {
    console.log("joined convo", userId, conversationId);

    socket.join(conversationId);
  });

  socket.on("sendMessage", (message, callback) => {
    io.to(message.conversationId).emit("message", {
      senderId: message.senderId,
      body: message.body,
      conversationId: message.conversationId,
    });

    Message.create({
      body: message.body,
      senderId: message.senderId,
      conversationId: message.conversationId,
    });

    callback();
  });

  socket.on("disconnect", () => {
    console.log("User has left");
  });
});

server.listen(PORT, () => console.log(`Server started in port: ${PORT}`));
