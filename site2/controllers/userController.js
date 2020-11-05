var controller = {};

controller = {
    login: function(req, res) {
        res.render('user/login');
    },
    register: function(req, res) {
        res.render('user/register');
    },
}

module.exports = controller;