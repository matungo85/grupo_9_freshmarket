var express = require('express');
var router = express.Router();
var apiController = require('../controllers/apiController');

router.get('/', function(req, res) {
    res.send ('Estoy en la ruta de la api')
})

router.get('/users/login', function(req, res) {
    res.send ('Esta es la ruta de la api para verificar el correo electronico')
});



//apiController.login);

 

module.exports = router;
