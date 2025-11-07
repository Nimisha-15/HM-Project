const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
    sellerName : {
        type : String ,
        require : true ,
    },
    sellerPhone : {
        type : String ,
        maxLength : 10 ,
        minLength : 10 ,
        unique : true ,
    },
    password : {
        type : String ,
        unique : true , 
    },
    sellerEmail : {
        type : String ,
        unique : true ,
        required : true ,
    },
    sellerAddhar : {
        type : String ,
        unique : true ,
    },
    products : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "products"
    }]
},
{
    timestamps : true ,
})

sellerSchema.pre("save" ,async function (next){
    const hashedPass =await  bcrypt.hash (this.password , 10);
    this.password = hashedPass;
    next();
})
sellerSchema.method.compare = function(password){
    const comparePass = bcrypt.compare(password , this.password);
    return comparePass ; 
}

const sellerModel = mongoose.model("seller" , sellerSchema);
module.exports =  sellerModel ;