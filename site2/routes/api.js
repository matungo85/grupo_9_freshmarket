var express = require('express');
var router = express.Router();
var apiController = require('../controllers/apiController');



router.post('/users/login', apiController.login);

 

module.exports = router;
