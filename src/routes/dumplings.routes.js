const express = require("express");
const router = express.Router();

const dumplings = [];

// param for dumpling id
router.param("id", (req, res, next, id) => {
  req.dumpling = dumplings.find(
    (dumpling) => dumpling.id === parseInt(req.params.id)
  );
  next();
});

router.get("/", (req, res) => {
  res.status(200).json(dumplings);
});

router.get("/presenter", (req, res) => {
  let numberGenerator = Math.floor(Math.random() * dumplings.length - 1) + 1;
  res.status(200).json(dumplings[numberGenerator]);
});

router.post("/", (req, res) => {
  let newDumpling = {
    id: dumplings.length + 1,
    name: req.body.name,
  };
  dumplings.push(newDumpling);
  res.status(201).json(newDumpling);
});

router.get("/:name", (req, res) => {
  let eDumpling = dumplings.find(
    (dumpling) => dumpling.name === req.params.name
  );
  res.status(200).json(eDumpling);
});

router.put("/:id", (req, res) => {
  req.dumpling.name = req.body.name;
  res.status(200).json(req.dumpling);
});

router.delete("/:id", (req, res) => {
  let index = dumplings.indexOf(req.dumpling);
  dumplings.splice(index, 1);

  res.status(200).json(req.dumpling);
});

module.exports = router;
