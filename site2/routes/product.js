var express = require('express');
var router = express.Router();

var productController = require('../controllers/productController')


router.get('/cart', productController.cart);

router.get('/detail', productController.detail);

router.get('/load', productController.load);

router.post('/load', productController.store)

module.exports = router;
