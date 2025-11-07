require("dotenv").config();
const imageKit = require("imagekit");

const storageInstance = new imageKit({
    publicKey : process.env.Img_publicKey,
    privateKey : process.env.Img_privateKey,
    urlEndpoint: process.env.URL_endpoint,
});

const sendFiles =async (file,fileName )=>{
    return await storageInstance.upload ({
        file ,
        fileName ,
        folder : "hm",
    });
};

module.exports = sendFiles ;