const fs = require('fs')
const path = require('path')
const db = require('../database/models')
var controller = {};
const {check, validationResult, body} = require('express-validator');

function getAllProducts() {
    
    const productsFilePath = path.join(__dirname, '..', 'data/productos.json');
        
    const contenidoProductos = fs.readFileSync(productsFilePath, 'utf-8');

    if (contenidoProductos == ''){
        return [];
    } else {
        return JSON.parse(contenidoProductos);
    }

}


controller = {
    cart: function(req, res) {
        res.render('product/productCart');
    },

    list: async (req, res) => {

        if(req.params.category){
         let category = req.params.category; 
 
         const products = await db.Product.findAll({
             where: {category_id: category}, include: ["category"]           
            })

      
         
         res.render('product/productList', {
             products: products 
         });
 
        }
        else {
       
            const products = await db.Product.findAll({include: ["category"]});

            res.render('product/productList', {products: products});
        }
     },

    detail: async function (req, res){
        const id = req.params.id;

        const producto = await db.Product.findByPk(id, {include: ["category"]});

        res.render('product/productDetail', {producto: producto});
    },
    
    load: async function(req, res) {

        const categories = await db.Category.findAll()
        res.render ('product/productCreate', {categories: categories});
        
    },

    store: async function(req, res, next) {
        
        const errors = validationResult(req);
        
        if (errors.isEmpty()) {
            await db.Product.create({
                name: req.body.productName,
                brand: req.body.brand,
                weight_volume: req.body.volumen,
                unit: req.body.unidad,
                price: req.body.price,
                discount: req.body.discount,
                category_id: req.body.category,
                description: req.body.description,
                image: req.files[0].filename
            })
    
            res.redirect('/');
            
        } else {
            const categories = await db.Category.findAll()
            res.render('product/productCreate', {errors: errors.errors, categories: categories})
        }


        
    },

    edit: async function(req, res){

        
        const id = req.params.id;
        const producto = await db.Product.findByPk(id);
        const categorias = await db.Category.findAll();

        res.render('product/productEdition', {product: producto, categories: categorias});
    },

    processEdit: async function(req,res, next){

        const id = req.params.id;
 
        const errors = validationResult(req);
        const product = db.Product.findByPk(id);

        if(errors.isEmpty()) {
            await db.Product.update({
                name: req.body.productName,
                brand: req.body.brand,
                weight_volume: req.body.volumen,
                unit: req.body.unidad,
                price: req.body.price,
                discount: req.body.discount,
                category_id: req.body.category,
                description: req.body.description,
                image: req.files[0] ? req.files[0].filename : product.image,
            }, {where: {id: req.params.id}})
            res.redirect('/');
        
        } else {
            const producto = await db.Product.findByPk(id);
            const categorias = await db.Category.findAll();

            res.render('product/productEdition', {errors: errors.errors, product: producto, categories: categorias});
            
        }

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