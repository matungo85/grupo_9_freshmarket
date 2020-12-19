var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
const path = require('path');
const multer = require('multer');
const validator = require('../middlewares/validator')
const auth = require('../middlewares/auth');
const guest = require('../middlewares/guest')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../public/images/users')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
 
var upload = multer({ storage: storage })


router.get('/register', guest, userController.register);

router.post('/register',upload.any(), validator.register ,userController.processRegister);

router.get('/login', guest, userController.login);

router.post('/login', validator.login, userController.processLogin);

router.get('/logout', auth ,userController.logout)

module.exports = router;
