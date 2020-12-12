const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const { Console } = require('console');




function getAllUsers () {
    const usersFilePath = path.join(__dirname, '..', 'data/users.json');

    const users = fs.readFileSync(usersFilePath, 'utf-8');
    console.log(users)
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
        
    
        const newUser = {
            id: getNewId(),
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: req.body.password,
            category: 'user',
            image: req.files[0].filename,
            tel: req.body.tel,
            dni: req.body.dni,
            sex: req.body.sex,
        }

        const newUserList = getAllUsers().push(newUser);
        
        saveUsers(newUserList);

    },

}

module.exports = controller;