const express = require("express");
const User = require("./models").user;
const app = express();
const PORT = 4000;
const jsonParser = express.json();
const userRouter = require("./routes/userRouter");

app.use(jsonParser);

app.use("/user", userRouter);

app.use("/Images", express.static("./Images"));

app.listen(PORT, () => console.log(`Server started in port: ${PORT}`));
