const fs = require('fs')
const path = require('path')
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
    },
    store: function(req, res) {

        console.log(req.body);
        
        let newProduct = {
            name: req.body.productName,
            brand: req.body.brand,
            price: req.body.price,
            discount: req.body.discount,
            category: req.body.category,
            stock: req.body.stock,
            description: req.body.description,
        }
        

        const productsFilePath = path.join(__dirname, '..', 'data/productos.json');
        
        const contenidoProductos = fs.readFileSync(productsFilePath, 'utf-8');

        let productos;

        if (contenidoProductos == ''){
            productos = [];
        } else {
            productos = JSON.parse(contenidoProductos);
        }

        productos.push(newProduct);

        const productosJson = JSON.stringify(productos, null, '');

        fs.writeFileSync(productsFilePath, productosJson);

        res.redirect('/');
    }

}

module.exports = controller;