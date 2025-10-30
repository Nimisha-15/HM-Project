const userModel = require('../models/user.model')
const jwt = require("jsonwebtoken");

const registerController = async(req,res)=>{
    const {name , email , password , size ,discription} = req.body ;

    if(!name || !email || !password || !size || !discription) return res.status(422).json({
        message : "all feilds are required",
    })

    const user = await userModel.findOne(email);
    if(user) return res.status(404).json({
        message : "user already register",
    })

    const newUser = userModel.create({
        name ,pasword ,email,
    })

    

}