var express = require('express');
var router = express.Router();
const multer = require('multer')
const path = require('path')
var productController = require('../controllers/productController')
const db = require('../database/models')
const validator = require('../middlewares/validator')
const authentication = require('../middlewares/auth')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + '/../public/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
var upload = multer({ storage: storage })

router.get('/list/:category?', productController.list);

router.get('/cart', productController.cart);

router.get('/:id/detail', productController.detail);

router.get('/create', authentication, productController.load);

router.post('/create', upload.any(), validator.product, productController.store);

router.get('/:id/edit', authentication, productController.edit);

router.put('/:id', upload.any(), validator.product, productController.processEdit);

router.delete('/:id', authentication, productController.delete);

router.get('/prueba', function (req, res) {
  
  const productos = db.Product.findAll();
  console.log(productos);

});

module.exports = router;
