var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
const path = require('path');
const multer = require('multer');
const validator = require('../middlewares/validator')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../public/images/users')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
 
var upload = multer({ storage: storage })


router.get('/register', userController.register);

router.post('/register',upload.any(), validator.register ,userController.processRegister);

router.get('/login', userController.login);

router.post('/login', validator.login, userController.processLogin);

module.exports = router;
