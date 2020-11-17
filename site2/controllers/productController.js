const fs = require('fs')
const path = require('path')
var controller = {};

controller = {
    cart: function(req, res) {
        res.render('product/productCart');
    },
    detail: function (req, res){
        const id = req.params.id;

        const productsFilePath = path.join(__dirname, '..', 'data/productos.json');
        
        const productosJson = fs.readFileSync(productsFilePath, 'utf-8');

        productosArray = JSON.parse(productosJson);

        producto = productosArray.find((producto) => producto.id == id)

        res.render('product/productDetail', {producto: producto});
    },
    load: function(req, res) {
        res.render ('product/productLoad');
    },
    store: function(req, res, next) {

        const productsFilePath = path.join(__dirname, '..', 'data/productos.json');
        
        const contenidoProductos = fs.readFileSync(productsFilePath, 'utf-8');

        let productos;
        let productId;

        if (contenidoProductos == ''){
            productos = [];
            productId = 1
        } else {
            productos = JSON.parse(contenidoProductos);
            productId = productos[productos.length - 1].id + 1
        }


        let newProduct = {
            id: productId,
            name: req.body.productName,
            brand: req.body.brand,
            price: req.body.price,
            discount: req.body.discount,
            category: req.body.category,
            stock: req.body.stock,
            description: req.body.description,
            image: req.files[0].filename,
        }       
        
        
        productos.push(newProduct);

        const NuevosProductosJson = JSON.stringify(productos, null, ' ');

        fs.writeFileSync(productsFilePath, NuevosProductosJson);

        res.redirect('/');
    }


}

module.exports = controller;