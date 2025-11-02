const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model")
const authMiddleware = async (req , res,next ) =>{
    try {
        let token = res.cookies.token ; 
        if (!token) return res.status(404).json({
            message : "token not found",
        })

        let deoode = jwt.verify(token , process.env.JWT_SECRET)
        let user = userModel.findById(decode.id);

        if (!user) return res.status(404).json({
            message : "Invalid token",
        })

        req.user = user ;
        next ();

    } catch (error) {
        console.log("error in auth middle ware --->", error );
        return res.status(404).json({
            message: "error in auth middle ware",
        })
    }
}
module.exports=authMiddleware