const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    title : {
        type : String ,
        required : true ,
    },
    description : {
        type : String ,
        required : true ,
    },
    image :{
        type : Array,
        default : []
    },
    sizes : {
        type: String,
        enum : ['s' , 'm' , 'l' , 'xl'],
        default:["m"]
    },
    price :{
        amount : {
            type : String ,
            required : true ,
        },
        currency : {
            type : String,
            enum : ["INR" , "USD"],
            default : "INR",
        }
    },
    color : [{
        type : String,
    }],

    user_id :   {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    }
})

const productModel = mongoose.model("products" , productSchema);
module.exports=productModel