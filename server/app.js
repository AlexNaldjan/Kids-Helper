require('dotenv').config();

const express = require('express');
const serverConfig = require('./config/serverConfig');

const authRouter = require('./routes/api/auth.routes');

const app = express();

const PORT = process.env.PORT || 3000;

serverConfig(app);

app.use('/api/auth', authRouter);

app.listen(PORT, () => console.log(`Server is up on ${PORT} port!`));
