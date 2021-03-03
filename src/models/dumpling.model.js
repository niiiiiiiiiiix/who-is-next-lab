const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dumplingSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      unique: true,
    },
  },
  {
    collation: { locale: "en", strength: 2 },
  }
);

const dumplingModel = mongoose.model("Dumpling", dumplingSchema);
module.exports = dumplingModel;
