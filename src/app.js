require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

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

const usersRouter = require("./routes/users.routes");
app.use("/users", usersRouter);

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).send(err.message);
});

module.exports = app;
