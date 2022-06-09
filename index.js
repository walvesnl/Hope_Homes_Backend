const express = require("express");
const app = express();
const { PORT } = require("./config/constants");
const cors = require("cors");
const jsonParser = express.json();
const authRouter = require("./routes/auth");
const listRouter = require("./routes/list");
const requestRouter = require("./routes/request");
const conversationRouter = require("./routes/conversation");

app.use(cors());
app.use(jsonParser);

app.use("/auth", authRouter);
app.use("/list", listRouter);
app.use("/request", requestRouter);
app.use("/conversation", conversationRouter);

app.use("/Images", express.static("./Images"));

app.listen(PORT, () => console.log(`Server started in port: ${PORT}`));
