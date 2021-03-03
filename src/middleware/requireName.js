const requireName = (req, res, next) => {
  if (req.body.name.length === 0) {
    const err = new Error("Name is empty");
    err.statusCode = 400;
    next(err);
  } else {
    next();
  }
};

module.exports = requireName;
