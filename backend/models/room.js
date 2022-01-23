const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 50,
    },

    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },

    price: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 50,
    },

    rentPrice: {
      type: Number,
      trim: true,
      maxlength: 50,
      default: 0
    },

    checkInDate: {
      type: String,
      trim: true,
      maxlength: 50,
    },

    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },

    viewType: {
      type: String,
      trim: true,
      required: true,
      maxlength: 50,
    },

    bathTub: {
      type: String,
      trim: true,
      required: true,
      maxlength: 50,
    },

    balcony: {
      type: String,
      trim: true,
      required: true,
      maxlength: 50,
    },

    floorArea: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 50,
    },

    wifi: {
      type: String,
      trim: true,
      required: true,
      maxlength: 50,
    },

    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
