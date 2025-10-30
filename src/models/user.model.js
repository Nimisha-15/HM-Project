const mongoose = require("mongoose")
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true ,
    },
    password : {
        type : String,
        required : true,
        unique : true ,
        minLength : 7
    },
    email :{
        type : String ,
        required : true ,
        unique : true,
    },
    phone : {
        type : String ,
        require : true ,
        minLength : 10,
        maxLength : 10,
    },
},{
    timestamps : true,
})
userSchema.pre("save" ,async function(next){
    const hashPass = await bcrypt.hash(this.password, 10);
    this.password = hashPass;
    next ();
})

userSchema.methods.comparePass =async function(password){
    const comparePass =await bcrypt.compare(password , this.password)
}

const userModel = mongoose.model("user" ,userSchema);
module.exports = userModel;