const router = require('express').Router();

const { Comment } = require('../../db/models');

router.get('/comment/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Comment.findAll({
      where: { serviceId: Number(id) },
    });

    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
});
router.post('/add/comment', async (req, res) => {
  const { comment, userName, userId, serviceId } = req.body;
  try {
    await Comment.create({ comment, userName, userId, serviceId });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
