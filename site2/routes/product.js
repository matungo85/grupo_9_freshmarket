var express = require('express');
var router = express.Router();
const multer = require('multer')
const path = require('path')
var productController = require('../controllers/productController')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + '/../public/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
var upload = multer({ storage: storage })

router.get('/cart', productController.cart);

router.get('/detail/:id', productController.detail);

router.get('/load', productController.load);

router.get ('/list/:category', productController.listar )

router.post('/load', upload.any(), productController.store)

module.exports = router;
