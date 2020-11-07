var controller = {};

controller = {
    cart: function(req, res) {
        res.render('product/productCart');
    },
    detail: function (req, res){
        res.render('product/productDetail');
    },
    load: function(req, res) {
        res.render ('product/productLoad');
    }
}

module.exports = controller;