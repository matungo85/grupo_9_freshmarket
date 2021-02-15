var express = require('express');
var router = express.Router();
var productApiController = require('../../controllers/api/productController')


router.get('/', productApiController.list)

router.get('/:id', productApiController.detail)

module.exports = router