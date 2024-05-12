const router = require('express').Router();

const { Social_service } = require('../../db/models/index');

router.get('/socialService', async (req, res) => {
  try {
    const socialService = await Social_service.findAll();
    res.status(200).json(socialService);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
