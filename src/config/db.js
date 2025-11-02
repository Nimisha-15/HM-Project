require("dotenv").config();
const mongoose = require('mongoose')
const connectDb = async ()=>{
    try {
        let db =await mongoose.connect(process.env.mongo_uri);
        console.log("MongoDb connected");
    } catch (error) {
        console.log("Error in connecting mongo db -->", error );
    }
}
module.exports = connectDb;