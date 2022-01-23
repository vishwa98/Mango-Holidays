const mongoose = require("mongoose");

const categoryAdminSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("CategoryAdmin", categoryAdminSchema);
