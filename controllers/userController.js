const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const {check, validationResult, body} = require('express-validator');
const db = require('../database/models'); 


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

    register: function(req, res) {
        res.render('user/register');
    },

    processRegister: async function(req, res, next) {
        
        const errors = validationResult(req);
        
        if (errors.isEmpty()) {

            await db.User.create({
                name: req.body.name,
                lastname: req.body.lastname,
                email: req.body.email,
                password: bcryptjs.hashSync(req.body.password, 10),
                avatar: req.files[0].filename,
                phone: req.body.phone,
                DNI: req.body.dni,   
                gender: req.body.gender,
                rol: 10
            })
    
            res.redirect('/');

        } else {
            res.render('user/register', {errors: errors.errors})
        }


    },

    login: function(req, res) {
        res.render('user/login');
    },
    

    processLogin: async function (req,res) {
        
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('user/login', {errors: errors.errors})
        } else {

            const user = await db.User.findOne({where: {email: req.body.mail}})

            req.session.user = user;

            if (req.body.rec) {
                
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
    }, 
    detail: function(req, res){
        db.User.findByPk(req.params.id)
            .then(function(user){
                res.render('user/userDetail', {user:user}); 
            }) 
    }, 
    userToUpdate: function(req, res){
        let userReq = db.User.findByPk(req.params.id) 
        .then(function(user){
            res.render('user/userUpdate', {user:user})
        })
    }, 
    update: async function(req, res){

        const id = req.params.id;
        const user = await db.User.findByPk(id); 
        

        await db.User.update({
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            avatar: req.files[0] ? req.files[0].filename : user.avatar,
            phone: req.body.phone,
            DNI: req.body.DNI,   
            gender: req.body.gender,
            rol: 10
        }, {
            where: {
                id: req.params.id
            } 
        }); 
        

        res.redirect('/users/detail/' + req.params.id)

    },
    delete: function(req, res){ 
        db.User.destroy({
            where: {
                id: req.params.id
            }
        })

        res.redirect('/')

    } 

}

module.exports = controller;