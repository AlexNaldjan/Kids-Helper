const router = require('express').Router();

const { Social_service, Rating, User } = require('../../db/models/index');

router.get('/socialService/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const socialService = await Social_service.findAll({
      include: {
        model: User,
        required: false,
        where: { id: Number(id) },
        attributes: ['id'],
        through: {
          model: Rating,
          attributes: ['ratingUser'],
        },
      },
      order: [['id', 'ASC']],
    });
    // console.log(JSON.parse(JSON.stringify(socialService)));
    res.status(200).json(socialService);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
});
module.exports = router;
