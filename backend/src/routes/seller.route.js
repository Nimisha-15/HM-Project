const express = require("express")
const {route} = require("./product.route");
const sellerMiddlerware = require("../middleware/seller.middleware");
const registerSellerController = require("../controllers/sellerController");

const router = express.Router();

router.post('/register',registerSellerController);

module.exports = router;