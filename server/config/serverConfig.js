const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const serverConfig = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(morgan("dev"));
  app.use(express.static(path.join(__dirname, "../public")));
  app.use(
    cors({
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
};

module.exports = serverConfig;
