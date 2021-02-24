const express = require("express");
const app = express();
app.use(express.json());

// win = who-is-next
const win = {
  0: "GET    /",
  1: "GET    /dumplings",
  2: "POST   /dumplings",
  3: "GET    /dumplings/:name",
  4: "PUT    /dumplings/:id",
  5: "DELETE /dumplings/:id",
  6: "-----------------------",
  7: "GET    /dumplings/presenter",
};

const dumplings = [];

app.get("/", (req, res) => {
  res.status(200).json(win);
});

app.get("/dumplings", (req, res) => {
  res.status(200).json(dumplings);
});

app.post("/dumplings", (req, res) => {
  let newDumpling = {
    id: dumplings.length + 1,
    name: req.body.name,
  };
  dumplings.push(newDumpling);
  res.status(201).json(newDumpling);
});

module.exports = app;
