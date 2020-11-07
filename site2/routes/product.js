var express = require('express');
var router = express.Router();

var productController = require('../controllers/productController')


router.get('/cart', productController.cart);

router.get('/detail', productController.detail);

router.get('/load', productController.load )

module.exports = router;
