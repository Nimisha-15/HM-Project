const sellerModel = require("../models/seller.model")
const jwt = require("jsonwebtoken");

const sellerMiddlerware= async (req,res,next) =>{
    try {
        let sellertoken = req.cookies.sellertoken;

        if(!sellertoken) return res.status(404).json({
            message: "seller token is not found " ,
        })
        
        let decode = jwt.verify(sellertoken , process.env.jwt.seller_secret)

        if(!decode) returnres.status(400).json({
            message: "invalid token "
        })
        let seller = await sellerModel.findById(decode.id);

        req.seller = seller ;
        next ();

    } catch (error) {
        console.log("error in seller middleware --->", error )
        return res.status(404).json({
            message : 'error in the seller middleware ',
        })
    }
}

module.exports = sellerMiddlerware;
