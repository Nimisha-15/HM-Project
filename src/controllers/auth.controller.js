require("dotenv").config();
const userModel = require('../models/user.model')
const jwt = require("jsonwebtoken");

const registerController = async(req,res)=>{
    try {
        const {name , email ,phone , password , size ,discription} = req.body ;

    if(!name || !email || !phone || !password || !size || !discription) return res.status(422).json({
        message : "all feilds are required",
    })

    const user = await userModel.findOne(email);
    if(user) return res.status(404).json({
        message : "user already register",
    })

    const newUser = await userModel.create({
        name ,password ,email, phone
    })

    res.status(200).json({
        message : 'user successfully register',
    })
    } catch (error) {
        console.log(" error in register --> ", error)
        return res.status(401).json({
            messsage : "Error in register the user ",
        })
    }
}

const loginController = async (req,res)=>{
   try {
     const {email , password} = req.body ;

    if(!email || !password ) return res.status (401).json({
        message : "all feilds are required",
    })


    const existingUser =await userModel.findOne(email);
    if(!existingUser) res.status(404).json({
        message : " user not register . Register first ",
    })

    let cp = user.comparepass(password);    

    if (!cp) return res.status(401).json({
        message : "incorrect password ",
    })

    const token = jwt.sign({id : user._id} , process.env.JWT_SECRET{
        expiresIn : "1h"
    })
    res.cookies ("token " , token );

    res.status(201).json({
        message : "User logged in successfully ",
    })
   } catch (error) {
    console.log("error in login the user ---->", error );
    return res.status(404).json({
        message : "error in login controller ",
    })
   }
}

const logoutController 

module.export = {
    registerController ,
    loginController,
}