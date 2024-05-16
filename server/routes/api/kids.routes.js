/* eslint-disable import/no-unresolved */
/* eslint-disable quotes */
const router = require("express").Router();
const { Kid } = require("../../db/models");

// создать ребенка
router.post("/profile/kids/:id", async (req, res) => {
  const userId = req.params.id;
  const { name, age } = req.body;

  try {
    const newKid = await Kid.create({
      name,
      age,
      userId,
    });
    res.status(201).json(newKid);
    console.log({ newKid });
  } catch (error) {
    console.error("Error adding new kid:", error);
    res.status(500).send(error.message);
  }
});

router.put("/profile/kids/:id", async (req, res) => {
  const kidId = req.params.id;
  const { name, age } = req.body;

  console.log("srverrrrr", kidId);

  try {
    const kid = await Kid.findByPk(Number(kidId));

    if (kid) {
      console.log(name, age);
      await Kid.update(
        {
          name,
          age,
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
    console.log(kid);
    if (kid) {
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
