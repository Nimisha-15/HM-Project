require("dotenv").config
const express = require("express");
const { connect } = require("mongoose");
const connectDb = require("./src/config/db");
const app = express()
app.use(express.json());

connectDb();


const port = process.env.port || 4500;

app.listen(port , ()=>{
    console.log(`server is running on port ${port}`)
})