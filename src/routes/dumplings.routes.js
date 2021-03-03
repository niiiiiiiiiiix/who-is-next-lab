const express = require("express");
const router = express.Router();

// const Dumpling = require("../models/dumpling.model");
const ctrl = require("../controllers/dumplings.controller");
const jsonContent = require("../middleware/requireJSONcontent");
const requireName = require("../middleware/requireName");
// const requireDumpling = require("../middleware/requireDumpling");

// param for dumpling id
// router.param("id", (req, res, next, id) => {
//   req.dumpling = dumplings.find(
//     (dumpling) => dumpling.id === parseInt(req.params.id)
//   );
//   next();
// });

router.get("/", async (req, res, next) => {
  const dumplings = await ctrl.getAllDumplings(next);
  res.status(200).json(dumplings);
});

router.get("/presenter", async (req, res, next) => {
  const dumplings = await ctrl.getAllDumplings(next);
  let numberGenerator = Math.floor(Math.random() * dumplings.length);
  res.status(200).json(dumplings[numberGenerator]);
});

router.get("/:name", async (req, res, next) => {
  const dumplings = await ctrl.findOneDumpling(req.params.name, next);
  res.status(200).json(dumplings);
});

router.post("/", async (req, res, next) => {
  const dumplings = await ctrl.createOneDumpling(req.body, next);
  res.status(201).json(dumplings);
});

router.put("/:id", [jsonContent, requireName], async (req, res, next) => {
  try {
    const dumpling = await ctrl.updateById(req.params.id, req.body, next);
    res.status(200).json(dumpling);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const dumpling = await ctrl.deleteById(req.params.id, next);
    if (dumpling === null) {
      const error = new Error("Dumpling does not exist");
      error.statusCode = 400;
      next(error);
    } else {
      res.status(200).json(dumpling);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
