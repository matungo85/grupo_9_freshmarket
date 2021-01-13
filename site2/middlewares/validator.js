const {check, validationResult, body} = require('express-validator');
const fs = require('fs');
const path = require('path')
const bcryptjs = require('bcryptjs')
const db = require('../database/models')

module.exports = {
    register: [
        body('name').notEmpty().withMessage('El campo nombre es Obligatorio').bail(),
        body('lastname').notEmpty().withMessage('El campo apellido es Obligatorio').bail(),
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

                ).withMessage('el email ya esta registrado').bail(),
        body('phone').notEmpty().withMessage('El campo teléfono es Obligatorio').bail(),
        body('dni').notEmpty().withMessage('El campo dni es Obligatorio').bail(),
        body('avatar').custom((value, {req}) => req.files[0]).withMessage('La imagen es obligatoria').bail(),
        body('password').isLength({min: 5}).withMessage('la contraseña debe tener 6 o mas caracteres')
                .custom((value, {req}) => value == req.body.retype).withMessage('la contraseñas ingresadas no coinciden')

    ],

    login: [
        body('mail').isEmail().withMessage('el campo debe ser un email').bail()
            .notEmpty().withMessage('el campo Email es obligatorio').bail()
            .custom(
                async (value, {req}) => {
                  
                    const user = await db.User.findOne({where: {email: value}})
                    
                    if (!user) {
                        return false
                    } else {
                        return bcryptjs.compareSync(req.body.pass, user.password)
                    }
                }
            ).withMessage('credenciales inválidas')
    ]
}