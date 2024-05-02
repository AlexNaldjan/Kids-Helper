const router = require('express').Router();
const bcrypt = require('bcrypt');
const cookie = require('cookie');

const { User } = require('../../db/models/index');
const {
  getTokens,
  refreshTokenAge,
  verifyAuthorizationMiddleware,
  verifyRefreshTokenMiddleware,
} = require('../../config/utils');

router.post('/register', async (req, res) => {
  const { email, username, passwordHash } = req.body;
  try {
    if (!email || !username || !passwordHash) {
      return res.status(401).json({ message: 'Need all fields' });
    }
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res
        .status(409)
        .json({ message: 'User with that login already exist' });
    }
    if (!user) {
      const hashedPassword = await bcrypt.hash(passwordHash, 10);
      await User.create({
        email,
        username,
        password: hashedPassword,
      });
      return res.status(200).json({ text: 'OK' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Need all fields' });
    }
    const user = await User.findOne({ where: { email } });

    const isSamePassword = await bcrypt.compare(password, user.password);

    if (user && isSamePassword) {
      const { accessToken, refreshToken } = getTokens(email);
      return res
        .status(200)
        .setHeader(
          'Set-Cookie',
          cookie.serialize('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: refreshTokenAge,
          })
        )
        .send({ accessToken });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/logout', (req, res) => {
  res
    .setHeader(
      'Set-cookie',
      cookie.serialize('refreshToken', '', {
        httpOnly: true,
        maxAge: 0,
      })
    )
    .sendStatus(200);
});

router.post('/profile', verifyAuthorizationMiddleware, async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(200).send({
        username: user.username,
        avatar: user.avatar,
        email: user.email,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/refresh', verifyRefreshTokenMiddleware, (req, res) => {
  const { accessToken, refreshToken } = getTokens(req.user.login);

  res.setHeader(
    'Set-Cookie',
    cookie.serialize('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    })
  );
  res.send({ accessToken });
});

module.exports = router;
