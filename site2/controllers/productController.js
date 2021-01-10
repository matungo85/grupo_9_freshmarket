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

    list: async (req, res) => {

        if(req.params.category){
         let category = req.params.category; 
 
         const products = await db.Product.findAll({
             where: {category_id: category}, include: [category]
            })
         
         res.render('product/productList', {
             products: products 
         });
 
        }
        else {
            const products = await db.Product.findAll();

            res.render('product/productList', {products: products});
        }
     },

    detail: async function (req, res){
        const id = req.params.id;

        const producto = await db.Product.findByPk(id, {include: [category]});

        res.render('product/productDetail', {producto: producto});
    },
    
    load: async function(req, res) {

        console.log("llegue")
        const categories = await db.Category.findAll()
        console.log("llegue aca tambien")
        res.render ('product/productCreate', {categories: categories});
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

    edit: async function(req, res){

        
        const id = req.params.id;
        const producto = await db.Product.findByPk(id);
        const categorias = await db.Category.findAll();



        res.render('product/productEdition', {product: producto, categories: categorias});
    },

    processEdit: async function(req,res, next){

        const id = req.params.id;
 

        await db.Product.update({
            name: req.body.productName,
            brand: req.body.brand,
            weight_volume: req.body.volumen,
            unit: req.body.unidad,
            price: req.body.price,
            discount: req.body.discount,
            category_id: req.body.category,
            description: req.body.description,
            image: req.files[0].filename,
        }, {where: {id: req.params.id}})


        res.redirect('/');

    },

    delete: async function(req, res) {
        
        const id = req.params.id;

        await db.Product.destroy({
            where: {
                id: req.params.id
            }
        })
        
        res.redirect('/');
        
    }




}

module.exports = controller;