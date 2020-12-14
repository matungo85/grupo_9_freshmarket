const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const {check, validationResult, body} = require('express-validator');



function getAllUsers () {
    const usersFilePath = path.join(__dirname, '..', 'data/users.json');

    const users = fs.readFileSync(usersFilePath, 'utf-8');
    
    if (users == '') {
        return []
    } else {
        return JSON.parse(users)
    }
}

function getNewId () {
    const users = getAllUsers();
    
    if (users.length == 0) {
        return 1
    } else {
        return users[users.length - 1].id + 1
    }
}

function saveUsers (users) {

    const usersFilePath = path.join(__dirname, '..', 'data/users.json');

    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '))

}


var controller = {};
controller = {
    login: function(req, res) {
        res.render('user/login');
    },

    processLogin: function(req, res, next) {
        
    },

    register: function(req, res) {
        res.render('user/register');
    },

    processRegister: function(req, res, next) {
        
        const errors = validationResult(req);
        
        if (errors.isEmpty()) {

            const newUser = {
                id: getNewId(),
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                password: bcryptjs.hashSync(req.body.password, 10),
                category: 'user',
                image: req.files[0].filename,
                tel: req.body.tel,
                dni: req.body.dni,
                sex: req.body.sex,
            }
    
            const userList = getAllUsers();
    
            userList.push(newUser);
            
            saveUsers(userList);
    
            res.redirect('/');

        } else {
            res.render('user/register', {errors: errors.errors})
        }


    },

    processLogin: function (req,res) {
        
        const errors = validationResult(req);
       
        if (!errors.isEmpty()) {
            res.render('user/login', {errors: errors.errors})
        } else {

            const users = getAllUsers();
            const user = users.find(user => user.email == req.body.mail);
            req.session.user = user;

            if (req.body.rec) {
                console.log('llegue aca')
                res.cookie('user', user.email, {maxAge: 1000 * 60 * 60})
                
            }

            res.redirect('/')
        }
    },
    logout: function (req, res) {
        req.session.destroy();
        if (req.cookies.user){
            res.cookie('user', null, {maxAge: -1})
        }   

        res.redirect('/');
    }

}

module.exports = controller;