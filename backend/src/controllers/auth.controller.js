require("dotenv").config();
const userModel = require('../models/user.model')
const jwt = require("jsonwebtoken");

const registerController = async(req,res)=>{
    try {
        const {name , email ,phone , password , size ,discription} = req.body ;

    if(!name || !email || !phone || !password ) return res.status(422).json({
        message : "all feilds are required",
    })

    const user = await userModel.findOne({email});
    if(user) return res.status(404).json({
        message : "user already register",
        
    })

    const newUser = await userModel.create({
        name ,password ,email, phone
    })

    res.status(200).json({
        message : 'user successfully register',
        user:newUser
    })
    } catch (error) {
        console.log(" error in register --> ", error)
        return res.status(401).json({
            messsage : "Error in register the user ",
            error:error
        })
    }
}

const loginController = async (req,res)=>{
   try {
     const {email , password} = req.body ;

    if(!email || !password ) return res.status (401).json({
        message : "all feilds are required",
    })


    const user =await userModel.findOne({email});
    if(!user) res.status(404).json({
        message : " user not register . Register first ",
    })

    let cp = user.comparePass(password);    

    if (!cp) return res.status(401).json({
        message : "incorrect password ",
    })

    const token = jwt.sign({id : user._id} , process.env.JWT_SECRET,{
        expiresIn : "1h"
    })
    res.cookie("token",token);

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

// const logoutController = async (req,res)=>{
//     try {
        
//     } catch (error) {
//         console.log("error in logout -->", error );
//         return res.status(400).json({
//             message : "error in logout ",
//         })
//     }
// }



module.exports = {
    registerController ,
    loginController,
    
}