/* eslint-disable quotes */
/* eslint-disable import/no-unresolved */
require("dotenv").config();

const express = require("express");
const serverConfig = require("./config/serverConfig");

const authRouter = require("./routes/api/auth.routes");
// const profileRouter = require("./routes/api/profile.routes");
const kidsRouter = require("./routes/api/kids.routes");

const app = express();

const PORT = process.env.PORT || 3000;

serverConfig(app);

app.use("/api/auth", authRouter);
app.use("/", kidsRouter);
// app.use("/api/", profileRouter);

app.listen(PORT, () => console.log(`Server is up on ${PORT} port!`));
