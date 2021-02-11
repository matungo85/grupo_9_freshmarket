var express = require('express');
var router = express.Router();
var productApiController = require('../../controllers/api/productController')


router.get('/', productApiController.list)

module.exports = router