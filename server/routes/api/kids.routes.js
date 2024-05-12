/* eslint-disable import/no-unresolved */
/* eslint-disable quotes */
const router = require("express").Router();
const { User, Kid } = require("../../db/models");

const { verifyAuthorizationMiddleware } = require("../../config/utils");

router.get("/profile/kids/:id", async (req, res) => {
  const { userId } = req.params;

  try {
    const kids = await Kid.findAll({
      where: { userId },
    });
    console.log(kids);
    res.status(200).json(kids);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post(
  "/profile/kids",
  verifyAuthorizationMiddleware,
  async (req, res) => {
    const { name, age, userId } = req.body; // Предполагается, что userId передается в запросе

    try {
      const newKid = await Kid.create({
        name,
        age,
        userId,
      });
      res.status(201).json(newKid);
    } catch (error) {
      console.error("Error adding new kid:", error);
      res.status(500).send(error.message);
    }
  }
);

router.put(
  "/profile/kids/:id",
  verifyAuthorizationMiddleware,
  async (req, res) => {
    const { name, age } = req.body;
    try {
      const [updated] = await Kid.update(
        {
          name,
          age,
        },
        {
          where: { id: req.params.id },
        }
      );

      if (updated) {
        const updatedKid = await Kid.findByPk(req.params.id);
        res.status(200).json(updatedKid);
      } else {
        res.status(404).send("Kid not found");
      }
    } catch (error) {
      console.error("Error updating kid:", error);
      res.status(500).send(error.message);
    }
  }
);

router.delete(
  "/profile/kids/:id",
  verifyAuthorizationMiddleware,
  async (req, res) => {
    try {
      const deleted = await Kid.destroy({
        where: { id: req.params.id },
      });

      if (deleted) {
        res.status(204).send("Kid deleted");
      } else {
        res.status(404).send("Kid not found");
      }
    } catch (error) {
      console.error("Error deleting kid:", error);
      res.status(500).send(error.message);
    }
  }
);

module.exports = router;
