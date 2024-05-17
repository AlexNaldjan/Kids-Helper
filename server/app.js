/* eslint-disable import/no-unresolved */
/* eslint-disable quotes */
require("dotenv").config();

const express = require("express");
const serverConfig = require("./config/serverConfig");

const kidsRouter = require("./routes/api/kids.routes");
const authRouter = require("./routes/api/auth.routes");
const profileRouter = require("./routes/api/profile.routes");
const socialServiceRouter = require("./routes/api/socialService.router");
const ratingRouter = require('./routes/api/rating.routes');
const eventRouter = require("./routes/api/event.routes");
// const uploadRouter = require("./routes/api/upload.routes");

const app = express();

const PORT = process.env.PORT || 3000;

serverConfig(app);

app.use("/api", kidsRouter);
app.use("/api/auth", authRouter);
app.use("/api", profileRouter);
app.use("/api", socialServiceRouter);
app.use('/api', ratingRouter);
app.use("/api", eventRouter);
// app.use("/api", uploadRouter);


app.listen(PORT, () => console.log(`Server is up on ${PORT} port!`));
