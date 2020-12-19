const {check, validationResult, body} = require('express-validator');
const fs = require('fs');
const path = require('path')
const bcryptjs = require('bcryptjs')

module.exports = {
    register: [
        body('name').notEmpty().withMessage('El campo nombre es Obligatorio').bail(),
        body('surname').notEmpty().withMessage('El campo apellido es Obligatorio').bail(),
        body('email').notEmpty().withMessage('El campo email es Obligatorio').bail()
                .isEmail().withMessage('El campo debe ser un email').bail()
                .custom( (value) => {
                    const users = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data/users.json')))
                    const user = users.find((user) => user.email == value)

                    if(user) {
                        return false
                    } else {
                        return true
                    }
                }

                ).withMessage('el email ya esta registrado').bail(),
        body('tel').notEmpty().withMessage('El campo teléfono es Obligatorio').bail(),
        body('dni').notEmpty().withMessage('El campo dni es Obligatorio').bail(),
        body('imagen').custom((value, {req}) => req.files[0]).withMessage('La imagen es obligatoria').bail(),
        body('password').isLength({min: 5}).withMessage('la contraseña debe tener 6 o mas caracteres')
                .custom((value, {req}) => value == req.body.retype).withMessage('la contraseñas ingresadas no coinciden')

    ],

    login: [
        body('mail').isEmail().withMessage('el campo debe ser un email').bail()
            .notEmpty().withMessage('el campo Email es obligatorio').bail()
            .custom(
                (value, {req}) => {
                    const users = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data/users.json')));
                    const user = users.find(user => user.email == value);
                    if (!user) {
                        return false
                    } else {
                        return bcryptjs.compareSync(req.body.pass, user.password)
                    }
                }
            ).withMessage('credenciales inválidas')
    ]
}