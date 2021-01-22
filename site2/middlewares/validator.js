const {check, validationResult, body} = require('express-validator');
const fs = require('fs');
const path = require('path')
const bcryptjs = require('bcryptjs')
const db = require('../database/models')

module.exports = {
    register: [
        body('name').notEmpty().withMessage('El campo nombre es Obligatorio').bail()
                .isLength({min: 2}).withMessage('El nombre debe tener al menos dos caracteres'),
        body('lastname').notEmpty().withMessage('El campo apellido es Obligatorio').bail()
                .isLength({min: 2}).withMessage('El apellido debe tener al menos dos caracteres'),
        body('email').notEmpty().withMessage('El campo email es Obligatorio').bail()
                .isEmail().withMessage('El campo debe ser un email').bail()
                .custom( async (value) => {

                    const user = await db.User.findOne({where: {email: value}})

                    if(user) {
                        return false
                    } else {
                        return true
                    }
                }

                ).withMessage('El email ya esta registrado').bail(),
        body('phone').notEmpty().withMessage('El campo teléfono es Obligatorio').bail(),
        body('dni').notEmpty().withMessage('El campo dni es Obligatorio').bail(),
        body('avatar').custom((value, {req}) => req.files[0]).withMessage('La imagen es obligatoria').bail()
                .custom((value, {req}) => {
                    const auxi = ['.jpg', '.png', '.jpeg', '.gif'];
                    extention = path.extname(req.files[0].originalname)
                    return auxi.includes(extention)
                }).withMessage('extension invalida').bail(),
        body('password').isLength({min: 8}).withMessage('la contraseña debe tener 8 o mas caracteres')
                .custom((value, {req}) => value == req.body.retype).withMessage('la contraseñas ingresadas no coinciden')

    ],

    login: [
        body('mail').isEmail().withMessage('el campo debe ser un email').bail()
            .notEmpty().withMessage('el campo Email es obligatorio').bail()
            .custom((value, {req}) => {

                return db.User.findOne({where: {email: value}}).then(user => {
                    if (!user || !bcryptjs.compareSync(req.body.pass, user.password)) {
                        return Promise.reject()
                    }
                  })
                }
            ).withMessage('Credenciales Inválidas') 
    ],

    product: [
        body('productName').notEmpty().withMessage('El campo nombre es obligatorio').bail()
            .isLength({min: 5}).withMessage('El campo nombre debe tener un mínimo de 5 caracteres'),
        body('brand').notEmpty().withMessage('El campo marca es obligatorio').bail()
            .isLength({min: 5}).withMessage('El campo marca debe tener un mínimo de 5 caracteres'),
        body('description').isLength({min: 20}).withMessage('El campo descripción debe tener al menos 20 caracteres'),
        body('imageProduct').custom(async (value, {req}) => {
                
        
                if (req.method == 'PUT') {
                    console.log("entre al method put")
                    const product = await db.Product.findOne({where: { id: req.params.id}})
                    console.log(product.image)
                    console.log(req.files[0])
                    if (!product.image && !req.files[0]) {
                        console.log("entre al segundo if")
                        return false
                    } else {
                        console.log("entre al segundo if por false")
                        return true
                    }
                } 

            }).withMessage('La imagen es obligatoria').bail()
            .custom(async (value, {req}) => {
                const auxi = ['.jpg', '.png', '.jpeg', '.gif'];
                extention = path.extname(req.files[0].originalname)
                return auxi.includes(extention)
                }).withMessage('extension invalida').bail()
    ]
}