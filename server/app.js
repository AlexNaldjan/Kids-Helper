/* eslint-disable import/no-unresolved */
require('dotenv').config();

const express = require('express');
const serverConfig = require('./config/serverConfig');

const authRouter = require('./routes/api/auth.routes');
const socialServiceRouter = require('./routes/api/socialService.router');

const app = express();

const PORT = process.env.PORT || 3000;

serverConfig(app);

app.use('/api/auth', authRouter);
app.use('/api', socialServiceRouter);

app.listen(PORT, () => console.log(`Server is up on ${PORT} port!`));
