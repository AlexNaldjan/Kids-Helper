/* eslint-disable import/no-unresolved */
/* eslint-disable quotes */
const router = require("express").Router();
const fileMiddleware = require("../../config/uploadMiddleware");
const { User } = require("../../db/models");

router.post(
  "/profile/upload",
  fileMiddleware.single("avatar"),
  async (req, res) => {
    const { userId } = req.body;
    const fileUrl = `/images/${req.file.filename}`;

    try {
      const user = await User.findByPk(userId);
      if (user) {
        user.avatar = fileUrl;
        await User.update(
          {
            avatar,
          },
          { where: { id: userId } }
        );
        res.send("Файл загружен и URL сохранен в базе данных.");
      } else {
        res.status(404).send("Пользователь не найден.");
      }
    } catch (error) {
      console.error("Ошибка при сохранении URL", error);
      res.status(500).send("Ошибка при сохранении URL");
    }
  }
);

module.exports = router;
