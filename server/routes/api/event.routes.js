/* eslint-disable import/no-unresolved */
/* eslint-disable quotes */

const router = require('express').Router();

const { Event } = require('../../db/models');

// eslint-disable-next-line consistent-return
router.post('/profile/events', async (req, res) => {
  const { userId, title, description, category, date, cost, kidId } = req.body;

  if (!date) {
    console.log(date);
    return res.status(400).json({ error: 'Date is required' });
  }
  try {
    const event = await Event.create({
      userId,
      title,
      description,
      category,
      date,
      cost,
      kidId,
    });

    res.status(201).json(event);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Ошибка при создании события' });
  }
});

router.get('/profile/events', async (req, res) => {
  try {
    const { userId } = req.query;

    const events = await Event.findAll({ where: { userId: Number(userId) } });
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// eslint-disable-next-line consistent-return
router.delete('/profile/events/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const event = await Event.findByPk(id);
    console.log('thi is event', event);
    if (!event) {
      return res.status(404).send('Событие не найдено');
    }
    await event.destroy();
    res.status(200).send('Событие удалено');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete events' });
  }
});

module.exports = router;
