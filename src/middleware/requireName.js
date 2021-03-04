const requireName = (req, res, next) => {
  if (req.body.name.length === 0) {
    const err = new Error("Name is empty");
    err.statusCode = 400;
    next(err);
  } else if (req.body.name.length < 3) {
    const err = new Error("Name needs to be longer than 3");
    err.statusCode = 400;
    next(err);
  } else {
    next();
  }
};

module.exports = requireName;
