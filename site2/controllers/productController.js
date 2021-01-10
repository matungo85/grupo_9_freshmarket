const fs = require('fs')
const path = require('path')
const db = require('../database/models')
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

function saveProducts(products) {
    
    const productsFilePath = path.join(__dirname, '..', 'data/productos.json');

    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '))

}

controller = {
    cart: function(req, res) {
        res.render('product/productCart');
    },

    list: (req, res) => {

        if(req.params.category){
         let category = req.params.category; 
 
         const products = getAllProducts().filter((product) => {
             return product.category == category;
         });

         
         res.render('product/productList', {
             products: products 
         });
 
        }
        else {
         res.render('product/productList', {
             products: getAllProducts() 
         });
        }
     },

    detail: function (req, res){
        const id = req.params.id;

        productosArray = getAllProducts();

        producto = productosArray.find((producto) => producto.id == id)

        res.render('product/productDetail', {producto: producto});
    },
    
    load: function(req, res) {

        res.render ('product/productCreate');
    },

    store: async function(req, res, next) {

        await db.Product.create({
            name: req.body.productName,
            brand: req.body.brand,
            weight_volume: req.body.volumen,
            unit: req.body.unidad,
            price: req.body.price,
            discount: req.body.discount,
            category_id: req.body.category,
            description: req.body.description,
            image: req.files[0].filename,
        })


        res.redirect('/');
    },

    edit: function(req, res){

        let products = getAllProducts();
        const id = req.params.id;
        const productToEdit = products.find((product) => product.id == id);

        res.render('product/productEdition', {product: productToEdit});
    },

    processEdit: function(req,res, next){

        let products = getAllProducts();
        const id = req.params.id;
        console.log('llegue aca');

        var newProducts = products.map(function (product) {
            
            if (product.id == id) {

                product.name = req.body.productName;
                product.brand = req.body.brand;
                product.format = req.body.unidad;
                product.format2 = req.body.volumen;
                product.price = req.body.price;
                product.discount = req.body.discount;
                product.category = req.body.category;
                product.stock = req.body.stock;
                product.description = req.body.description;
                product.image = (req.files[0]) ? req.files[0].filename : product.image;

            }
            return product;
        })

        saveProducts(newProducts);

        res.redirect('/');

    },

    delete: function(req, res) {
        
        const id = req.params.id;

        const products = getAllProducts();

        const newProducts = products.filter((producto) => {if (producto.id != id) {
            return producto
        } });
        
        saveProducts(newProducts);
        res.redirect('/');
        
    }




}

module.exports = controller;