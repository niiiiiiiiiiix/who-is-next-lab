const requireDumpling = async (req, res, next) => {
  if (dumpling === null) {
    const err = new Error("Dumpling does not exist");
    err.statusCode = 400;
    next(err);
  } else {
    next();
  }
};

module.exports = requireDumpling;
