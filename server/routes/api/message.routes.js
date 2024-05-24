const router = require('express').Router();
const { Message } = require('../../db/models');

router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching messages' });
  }
});

module.exports = router;
