const express=require("express");
const { createProductController, 
        getallProductController, 
        updateProductController } = require("../controllers/product.controller");
const uploads = require("../config/multer") ;
const sellerMiddlerware = require("../middleware/seller.middleware");

const router=express.Router()


router.post("/create" ,sellerMiddlerware, uploads.array("images" , 5),createProductController);
router.get("/allProduct" ,sellerMiddlerware , uploads.array("images", 5), getallProductController);
router.put("/update/:id" ,sellerMiddlerware, uploads.array("images", 5), updateProductController);


module.exports= router;