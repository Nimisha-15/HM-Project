const mongoose = require("mongoose");

const sellerModel = new mongoose.Schema({
    sellerName : {
        type : String ,
        require : true ,
    },
    sellerPhone : {
        type : String ,
        maxLength
    }
})