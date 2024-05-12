/* eslint-disable quotes */
/* eslint-disable import/no-unresolved */
require("dotenv").config();

const express = require("express");
const serverConfig = require("./config/serverConfig");

const kidsRouter = require("./routes/api/kids.routes");
const authRouter = require("./routes/api/auth.routes");
const profileRouter = require("./routes/api/profile.routes");
const socialServiceRouter = require("./routes/api/socialService.router");

const app = express();

const PORT = process.env.PORT || 3000;

serverConfig(app);

app.use("/api", kidsRouter);
app.use("/api/auth", authRouter);
app.use("/api", profileRouter);
app.use("/api", socialServiceRouter);

app.listen(PORT, () => console.log(`Server is up on ${PORT} port!`));
