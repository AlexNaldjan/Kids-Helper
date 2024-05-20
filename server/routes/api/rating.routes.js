const router = require('express').Router();

const { Social_service, Rating } = require('../../db/models/index');

router.post('/rating', async (req, res) => {
  try {
    const { userId, serviceId, ratingUser } = req.body;
    const ratingStars = await Rating.findOne({ where: { userId, serviceId } });
    if (ratingStars) {
      return res.status(401).json({ text: 'NO' });
    }
    await Rating.create({ userId, serviceId, ratingUser });
    const stars = await Rating.findAll({ where: { serviceId } });
    const starsArray = JSON.parse(JSON.stringify(stars));
    const sumStars = starsArray.reduce((a, item) => a + item.ratingUser, 0);
    const lenStars = starsArray.length;
    const ratingSr = sumStars / lenStars;
    await Social_service.update(
      { rating: ratingSr },
      { where: { id: Number(serviceId) } }
    );
    return res.status(200).json({ text: 'OK' });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
