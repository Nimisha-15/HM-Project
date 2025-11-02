
const sendFiles = require("../services/storage.services");
const productModel = require("../models/product.model");

const createProductController = async(req,res) =>{
  try {

     let { title, amount, description, currency, size, color } = req.body

    if (!title || !amount || !description || !currency || !color || !size)  return res.status(422).json({
        message: "All fields are required",
      });

      
    if (!req.files)
      return res.status(422).json({
        message: "Images is required",
      });

    const uploadedImgs = await Promise.all(
      req.files.map(
        async (val) => await sendFiles(val.buffer, val.originalname)
      )
    );
   
    let newProduct = await productModel.create({
      title,
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
      product:newProduct
    });
  } catch (error) {
    console.log("error in product Controller --->" , error );
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

module.exports = {
  createProductController,
};
