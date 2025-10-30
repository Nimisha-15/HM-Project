const ProductModel = require("../models/product.model");
const sendFiles = require("../services/storage.services");

const createProductController = async (req, res) => {
  try {
    if (!req.files)
      return res.status(422).json({
        message: "Images is required",
      });

    const uploadedImgs = await Promise.all(
      req.files.map(
        async (val) => await sendFiles(val.buffer, val.originalname)
      )
    );

    let { productName, amount, description, currency, size, color } = req.body;

    if (!productName || !amount || !description || !currency || !color || !size)
      return res.status(422).json({
        message: "All fields are required",
      });

    let newProduct = await ProductModel.create({
      productName,
      price: {
        amount,
        currency,
      },
      description,
      colors: color,
      sizes: size,
      images: uploadedImgs.map((val) => val.url),
    });

    return res.status(201).json({
      message: "Product created",
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

module.exports = {
  createProductController,
};
