require("dotenv").config()
const express = require("express");
const authRoute=require("./src/routes/auth.route")
const productRoute=require("./src/routes/product.route")
const sellerRoute = require("./src/routes/seller.route")
const connectDb = require("./src/config/db");
const cookieParser = require("cookie-parser");


const app = express()
app.use(express.json());
app.use(cookieParser());

connectDb();

app.use("/api/auth/user" , authRoute);
app.use("/api/products" , productRoute);
app.use("/api/auth/seller", sellerRoute);



let port = process.env.port || 4500;
app.listen(port , (req,res)=>{
    console.log(`server is running on port ${port}`)
})