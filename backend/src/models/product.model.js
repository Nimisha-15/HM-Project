const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  images: {
    type: Array,
    default: [],
  },
  size: {
    type: String,
    enum: ["s", "m", "l", "xl"],
    required: true,
  },
  price: {
    amount: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      enum: ["INR", "USD"],
      default: "INR",
    },
  },
  categories: {
    type: String,
    enum: ["LADIES", "MENS", "KIDS", "HOME", "BEAUTY"],
    required: true,
    default: "LADIES",
  },
  color: [
    {
      type: String,
    },
  ],
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const productModel = mongoose.model("products", productSchema);
module.exports = productModel;