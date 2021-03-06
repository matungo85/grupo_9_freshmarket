var express = require('express');
var router = express.Router();
const db = require('../database/models')

/* GET home page. */
router.get('/', async function(req, res, next) {
  const products = await db.Product.findAll({limit: 3});
  res.render('home', {products: products});
});

module.exports = router;
