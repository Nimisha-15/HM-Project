require("dotenv").config();
const imageKit = require("imagekit");

const imagekit = new imageKit({
    publicKey : process.env.ImgpublicKey,
    privateKey : process.env.Img_privateKey,
    urlendPoint : process.env.URL_endpoint,
});

const sendFiles =async (file,fileName )=>{
    return await storageinstance.upload ({
        file ,
        fileName ,
        folder : HM,
    });
};

module.exports = sendFiles ;