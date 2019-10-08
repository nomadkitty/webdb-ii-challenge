const express = require("express");
const knex = require("knex");

const knexConfig = require("../knexfile.js");

const db = knex(knexConfig.development);

const router = express.Router();

router.get("/", (req, res) => {
  db("cars")
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(err => {
      res.status(500).json({ message: "Fail to retrieve cars." });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db("cars")
    .where({ id })
    .first()
    .then(car => {
      res.status(200).json(car);
    })
    .catch(err => {
      res.status(500).json({ message: "Fail to retrieve car." });
    });
});

router.post("/", (req, res) => {
  const newCar = req.body;
  db("cars")
    .insert(newCar)
    .then(ids => {
      db("cars")
        .where({ id: ids[0] })
        .then(car => {
          res.status(200).json(car);
        });
    })
    .catch(err => {
      res.status(500).json({ message: "Fail to store car." });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  db("cars")
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ message: "Fail to update car." });
    });
});

router.delete("/:id", (req, res) => {
  db("cars")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ message: "Fail to delete car." });
    });
});

module.exports = router;
