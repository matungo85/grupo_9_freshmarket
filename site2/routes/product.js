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

router.get('/list/:category?', productController.list);

router.get('/cart', productController.cart);

router.get('/:id/detail', productController.detail);

router.get('/create', productController.load);

router.post('/create', upload.any(), productController.store);

router.get('/:id/edit', productController.edit);

router.put('/:id', upload.any(), productController.processEdit);

router.delete('/:id', productController.delete);

module.exports = router;
