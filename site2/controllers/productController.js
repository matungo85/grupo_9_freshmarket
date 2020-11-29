const fs = require('fs')
const path = require('path')
var controller = {};

function getAllProducts() {
    
    const productsFilePath = path.join(__dirname, '..', 'data/productos.json');
        
    const contenidoProductos = fs.readFileSync(productsFilePath, 'utf-8');

    if (contenidoProductos == ''){
        return [];
    } else {
        return JSON.parse(contenidoProductos);
    }

}

function saveProduct(product) {

    let productos = getAllProducts();

    productos.push(product);

    const productsFilePath = path.join(__dirname, '..', 'data/productos.json');

    fs.writeFileSync(productsFilePath, JSON.stringify(productos, null, ' '))


}

controller = {
    cart: function(req, res) {
        res.render('product/productCart');
    },
    detail: function (req, res){
        const id = req.params.id;


        productosArray = getAllProducts();

        producto = productosArray.find((producto) => producto.id == id)

        res.render('product/productDetail', {producto: producto});
    },
    load: function(req, res) {
        res.render ('product/productLoad');
    },
    store: function(req, res, next) {

        let productos = getAllProducts();

        let productId = productos.length == 0 ? 1 : productos[productos.length - 1].id + 1

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
        
        saveProduct(newProduct)

        res.redirect('/');
    },

    listar: (req, res) => {

        let productos = getAllProducts();

		const almacen = productos.filter((product) => {
			return productos.category == 'almacen';
		});
		const verduleria = productos.filter((product) => {
			return productos.category == 'verduleria';
        });
        const panaderia = productos.filter((product) => {
			return productos.category == 'panaderia';
        });
        const carniceria = productos.filter((product) => {
			return productos.category == 'carniceria';
		});

		res.render('product/list/:category', {
			almacenProducts: almacen,
            verduleriaProducts: verduleria, 
            panaderiaProducts: panaderia, 
            carniceriaProducts: carniceria
		});

module.exports = controller;