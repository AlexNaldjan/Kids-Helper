/* eslint-disable quotes */
/* eslint-disable import/no-unresolved */
const router = require("express").Router();
const { User } = require("../../db/models");

// ручка для редактирования профиля
router.put("/profile/update/:id", async (req, res) => {
  const { username } = req.body;
  const userId = Number(req.params.id);

  try {
    const user = await User.findByPk(userId);
    if (user) {
      // console.log({ user });
      const newUser = await User.update(
        {
          username,
        },
        { where: { id: userId } }
      );
      console.log("====", newUser);
      if (newUser) {
        return res.status(204).json({ message: "success!" });
      }
      return res.status(500).json({ message: "error while deleting" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
