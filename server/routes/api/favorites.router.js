const router = require('express').Router();

const { Liked, Social_service } = require('../../db/models/index');

router.post('/liked/:id', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const liked = await Liked.findOne({
      where: { userId, serviceId: Number(id) },
    });
    if (liked) {
      return res.status(200).json({ text: 'OK' });
    }
    return res.status(401).json({ text: 'NO' });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ text: 'NO' });
  }
});

router.post('/add/liked/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const liked = await Liked.findOne({
      where: { userId, serviceId: Number(id) },
    });
    if (liked) {
      return res.status(401).json({ text: 'NO' });
    }
    await Liked.create({ userId, serviceId: Number(id) });
    return res.status(200).json({ text: 'OK' });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ text: 'NO' });
  }
});

router.delete('/liked/:id', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    await Liked.destroy({ where: { userId, serviceId: Number(id) } });
    return res.status(200).json({ text: 'OK' });
  } catch (error) {
    console.log(error);
    return res.sendStatus(401);
  }
});

router.get('/liked/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const favoritesData = await Liked.findAll({
      where: { userId: Number(id) },
      include: [
        {
          model: Social_service,
          as: 'socialService',
        },
      ],
    });
    const favorites = favoritesData.map((item) => item.socialService);
    res.json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching favorites' });
  }
});

module.exports = router;
