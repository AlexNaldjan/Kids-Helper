const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const serverConfig = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(morgan('dev'));
  app.use(cors());
};
module.exports = serverConfig;
