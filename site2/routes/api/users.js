var express = require('express');
var router = express.Router();
var userApiController = require('../../controllers/api/userController')

router.get('/', userApiController.list)

router.get('/:id', userApiController.detail)

module.exports = router