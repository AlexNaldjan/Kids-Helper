const router = require('express').Router();

const { Social_service, Rating } = require('../../db/models/index');

router.post('rating', async (req, res) => {
  try {
    const { userId, serviceId, rating } = req.body;
    const ratingStars = await Rating.findOne({ where: { userId, serviceId } });
    if (ratingStars) {
      return res.status(401).json({ text: 'NO' });
    }
    await Rating.create({ userId, serviceId, rating });
    return res.status(200).json({ text: 'OK' });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
