const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models/index');

router.post('/register', async (req, res) => {
  const { email, name, passwordHash } = req.body;
  try {
    if (!email || !name || !passwordHash) {
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
        name,
        password: hashedPassword,
        total: 0,
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
      return res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
