const sellerModel = require("../models/seller.model");
const jwt = require("jsonwebtoken");


const registerSellerController =async (req,res)=>{
    try {
        let {sellerName , password ,sellerPhone , sellerEmail , sellerAddhar } =req.body 

        let existingSeller = await sellerModel.findOne({sellerEmail});
        if (existingSeller) return res.status(404).json({
            message : "this seller email id alreafy esxist ",
        })

        let newSeller = await sellerModel.create({
            sellerName,
            sellerPhone,
            sellerEmail,
            sellerAddhar,
            password,
        })
        let sellerToken = jwt.sign({seller_id : newSeller._id} , process.env.JWT_SECRET,{
            expiresIn : "10hr"
        });
        res.cookie("sellerToken");

        return res.status(200).json({
            message : "seller created successfully " ,
            seller : newSeller ,
        })

    } catch (error) {
        console.log("error in seller controller --->" , error);
        return res.status(404).json({
            message : "internal server error in seller conttroller",
        })
        
    }

}
module.exports = registerSellerController