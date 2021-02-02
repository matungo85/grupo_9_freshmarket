var express = require('express');
var router = express.Router();
var apiController = require('../controllers/apiController');

router.get('/', function(req, res) {
    res.send ('Estoy en la ruta de la api')
})

router.get('/users/login', apiController.login);

 

module.exports = router;
