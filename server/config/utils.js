const jwt = require('jsonwebtoken');

const signatureAccess = 'Secret_54_access';
const signatureRefresh = 'Secret_54_refresh';

const accessTokenAge = 50;
const refreshTokenAge = 60 * 60 * 24;

const verifyAuthorizationMiddleware = (req, res, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.split(' ')[1]
    : '';
  if (!token) {
    return res.sendStatus(401);
  }
  try {
    const decoded = jwt.verify(token, signatureAccess);
    req.user = decoded;
  } catch (error) {
    return res.sendStatus(401);
  }
  return next();
};

const verifyRefreshTokenMiddleware = (req, res, next) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.sendStatus(401);
  }
  try {
    const decoded = jwt.verify(refreshToken, signatureRefresh);
    req.user = decoded;
  } catch (error) {
    return res.sendStatus(401);
  }
  return next();
};

const getTokens = (email) => ({
  accessToken: jwt.sign({ email }, signatureAccess, {
    expiresIn: `${accessTokenAge}s`,
  }),
  refreshToken: jwt.sign({ email }, signatureRefresh, {
    expiresIn: `${refreshTokenAge}s`,
  }),
});
module.exports = {
  getTokens,
  refreshTokenAge,
  verifyAuthorizationMiddleware,
  verifyRefreshTokenMiddleware,
};
