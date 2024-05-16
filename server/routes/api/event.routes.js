/* eslint-disable import/no-unresolved */
/* eslint-disable quotes */

const router = require("express").Router();
const { Event } = require("../../db/models");

router.post("/profile/events", async (req, res) => {
  const { userId, title, description, category, date, cost, kidId } = req.body;
  console.log(kidId);
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
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Ошибка при создании события" });
  }
});

module.exports = router;
