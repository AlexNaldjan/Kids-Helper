const router = require("express").Router();
const { Kid, Event } = require("../../db/models");

// создать ребенка
router.post("/profile/kids/:id", async (req, res) => {
  const userId = req.params.id;
  const { name, age, color } = req.body;
  console.log(req.body);

  try {
    const newKid = await Kid.create({
      name,
      age,
      color,
      userId,
    });
    res.status(201).json(newKid);
  } catch (error) {
    console.error("Error adding new kid:", error);
    res.status(500).send(error.message);
  }
});

router.put("/profile/kids/:id", async (req, res) => {
  const kidId = req.params.id;
  const { name, age, color } = req.body;

  try {
    const kid = await Kid.findByPk(Number(kidId));

    if (kid) {
      await Kid.update(
        {
          name,
          age,
          color,
        },
        { where: { id: Number(kidId) } }
      );
      const updatedKid = await Kid.findByPk(Number(kidId));
      res.status(200).json(updatedKid);
    } else {
      res.status(404).send("Kid not found");
    }
  } catch (error) {
    console.error("Error updating kid:", error);
    res.status(500).send(error.message);
  }
});

router.delete("/profile/kids/:id", async (req, res) => {
  const kidId = req.params.id;
  console.log("delete", kidId);

  try {
    const kid = await Kid.findByPk(Number(kidId));

    if (kid) {
      await Event.update({ kidId: null }, { where: { kidId } });
      const deleted = await Kid.destroy({
        where: { id: Number(kidId) },
      });

      if (deleted) {
        res.status(204).send("Kid deleted");
      } else {
        res.status(404).send("Kid not found");
      }
    }
  } catch (error) {
    console.error("Error deleting kid:", error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
