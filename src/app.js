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

app.get("/", (req, res) => {
  res.status(200).json(win);
});

const dumplingsRouter = require("./routes/dumplings.routes");
app.use("/dumplings", dumplingsRouter);

module.exports = app;
