
const sendFiles = require("../services/imagekit")
const productModel = require("../models/product.model");

const createProductController = async(req,res) =>{
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
    console.log("images --->" , uploadedImgs);

    let { title, amount, description, currency, size, color } = req.body;

   // Add all required fields to the check
if (!title || !description || !size || !amount || !color || !currency ) {
    return res.status(400).json({
        message: "All fields are required in product creation",
    });
}

   
    let newProduct = await productModel.create({
      title,
      price: {
        amount,
        currency,
      },
      description,
      color: color,
      size: size,
      images: uploadedImgs.map((val) => val.url),
    });

    return res.status(201).json({
      message: "Product created",
      product:newProduct,
    });
  } catch (error) {
    console.log("error in product Controller --->" , error );
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

const getallProductController  = async (req, res)=>{
  try {
    let products = await productModel.find ({});

    if(!products) return res.status(404).json({
      message : "products not found", 
    })
    
    return res.status(200).json({
      message: "Products fetched ", 
    })
    
  } catch (error) {
    console.log("error in get all product controller --->" , error);
    return res.status(404).json({
      message : "error in get products ",
    })
  }
}

const updateProductController = async(req,res) =>{
  try {
    let product_id = req.params.id;

    if(product_id) return res.status(404).json({
      message : "product not found"
    })

    let {title , amount ,description , currency ,size , color} = req.body ;

    const uploadedImgs = await Promise.all(
      req.files.map(
        async (val) => sendFiles(val.buffer , val .originalname),
      )
    )

    let updateproduct = await productModel.findByIdAndUpdate({_id: product_id}, {title, size , color , images : uploadedImgs.map((val) =>val.url)})

    await updateproduct.save();

    if(!updateproduct) return res.status(400).json({
      message : "error in product saving " , 
    })

    return res.status(201).json({
      message: "Product Updated",
      updateproduct : updateproduct,
    })
    
  } catch (error) {
    console.log("eoor in the update product controller ---->" , error )
    return res.status(404).json({
      message : "error in update products ",
    })
  }
}


module.exports = {
  createProductController,
  getallProductController,
  updateProductController,
};
