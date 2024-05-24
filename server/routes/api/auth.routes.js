/* eslint-disable consistent-return */
const router = require('express').Router();
const bcrypt = require('bcrypt');
const cookie = require('cookie');

const { User, Kid } = require('../../db/models/index');
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
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: refreshTokenAge,
      });
      res.setHeader(
        'Set-Token',
        cookie.serialize('refreshToken', refreshToken, {
          httpOnly: true,
          maxAge: refreshTokenAge,
        })
      );
      return res.status(200).send({ accessToken, refreshToken });
    }
    return res.status(401).send('Login fail');
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

router.get('/profile', verifyAuthorizationMiddleware, async (req, res) => {
  if (!req.user || !req.user.email) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const user = await User.findOne({
      where: { email: req.user.email },
      attributes: ['id', 'email', 'username'],
      include: [
        {
          model: Kid,
          attributes: ['id', 'name', 'age', 'color'],
          as: 'Kids',
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      id: user.id,
      email: user.email,
      username: user.username,
      kids: user.Kids,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/refresh', verifyRefreshTokenMiddleware, (req, res) => {
  const { accessToken, refreshToken } = getTokens(req.user.email);

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
