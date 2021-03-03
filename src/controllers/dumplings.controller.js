const Dumpling = require("../models/dumpling.model");

const createOneDumpling = async (dumpling, next) => {
  try {
    const newDumpling = new Dumpling(dumpling);
    await newDumpling.save();
    return newDumpling;
  } catch (err) {
    next(err);
  }
};

const getAllDumplings = async (next) => {
  try {
    const dumplings = await Dumpling.find();
    return dumplings;
  } catch (err) {
    next(err);
  }
};

const findById = async (id, next) => {
  try {
    const dumpling = await Dumpling.findById(id);
    return dumpling;
  } catch (err) {
    next(err);
  }
};

const updateById = async (id, body, next) => {
  try {
    const dumpling = await Dumpling.findByIdAndUpdate(id, body, {
      new: true, // return updated content, if false return old value
      runValidators: true, // check against mongoose song model
    });
    return dumpling;
  } catch (err) {
    next(err);
  }
};

const deleteById = async (id, next) => {
  try {
    const dumpling = await Dumpling.findByIdAndDelete(id);
    return dumpling;
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createOneDumpling,
  getAllDumplings,
  findById,
  updateById,
  deleteById,
};
