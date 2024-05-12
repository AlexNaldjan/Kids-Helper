/* eslint-disable quotes */
/* eslint-disable import/no-unresolved */
const router = require("express").Router();
const { User } = require("../../db/models");
const { verifyAuthorizationMiddleware } = require("../../config/utils");

// ручка для редактирования профиля

router.put("/profile", verifyAuthorizationMiddleware, async (req, res) => {
  const { username, email } = req.body;
  console.log("===>", req.body);
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      console.log(user);
      user.username = username || user.username;
      await user.save();
      res.status(200).json({ message: "Profile updated successfully." });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
