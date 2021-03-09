const {check, validationResult, body} = require('express-validator');
const fs = require('fs');
const path = require('path')
const bcryptjs = require('bcryptjs')
const db = require('../database/models')

module.exports = {
    register: [
        body('name').notEmpty().withMessage('El campo nombre es obligatorio').bail()
                .isLength({min: 2}).withMessage('El nombre debe tener al menos dos caracteres'),
        body('lastname').notEmpty().withMessage('El campo apellido es obligatorio').bail()
                .isLength({min: 2}).withMessage('El apellido debe tener al menos dos caracteres'),
        body('email').notEmpty().withMessage('El campo email es obligatorio').bail()
                .isEmail().withMessage('El campo debe ser un email').bail()
                .custom((value) => {

                    return db.User.findOne({where: {email: value}}).then((user) => {
                        if (user) {
                            return Promise.reject("El email esta registrado")
                        }
                    })

                }).bail(),
        body('phone').notEmpty().withMessage('El campo teléfono es obligatorio').bail(),
        body('dni').notEmpty().withMessage('El campo DNI es obligatorio').bail(),
        body('avatar').custom((value, {req}) => req.files[0]).withMessage('La imagen es obligatoria').bail()
                .custom((value, {req}) => {
                    const auxi = ['.jpg', '.png', '.jpeg', '.gif'];
                    extention = path.extname(req.files[0].originalname)
                    return auxi.includes(extention)
                }).withMessage('Extension invalida').bail(),
        body('password').isLength({min: 8}).withMessage('La contraseña debe tener 8 o mas caracteres')
                .custom((value, {req}) => value == req.body.retype).withMessage('La contraseñas ingresadas no coinciden')

    ],

    login: [
        body('mail').isEmail().withMessage('El campo debe ser un email').bail()
            .notEmpty().withMessage('El campo email es obligatorio').bail()
            .custom((value, {req}) => {

                return db.User.findOne({where: {email: value}}).then(user => {
                    if (!user || !bcryptjs.compareSync(req.body.pass, user.password)) {
                        return Promise.reject()
                    }
                  })
                }
            ).withMessage('Credenciales inválidas') 
    ],

    product: [
        body('productName').notEmpty().withMessage('El campo nombre es obligatorio').bail()
            .isLength({min: 5}).withMessage('El campo nombre debe tener un mínimo de 5 caracteres'),
        body('brand').notEmpty().withMessage('El campo marca es obligatorio').bail()
            .isLength({min: 5}).withMessage('El campo marca debe tener un mínimo de 5 caracteres'),
        body('description').isLength({min: 20}).withMessage('El campo descripción debe tener al menos 20 caracteres'),
        body('imageProduct').custom((value, {req}) => {
                
        
                if (req.method == 'PUT') {
                    return true
                    
                } 
                    
                return req.files[0]
              

            }).withMessage('La imagen es obligatoria').bail()
            .custom((value, {req}) => {
                if (req.files[0]){
                    const auxi = ['.jpg', '.png', '.jpeg', '.gif'];
                    extention = path.extname(req.files[0].originalname)
                    return auxi.includes(extention)
                }
                return true
                
                }).withMessage('Extensión invalida').bail()
    ]
}