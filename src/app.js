const express = require("express");
const app = express();

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

app.get("/", (req, res) => {
  res.status(200).json(win);
});

module.exports = app;
