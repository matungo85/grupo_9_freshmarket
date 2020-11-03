var controller = {};

controller = {
    cart: function(req, res) {
        res.render('productCart');
    },
    detail: function (req, res){
        res.render('productDetail');
    }
}

module.exports = controller;