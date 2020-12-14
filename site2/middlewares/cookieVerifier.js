const path = require('path');
const fs = require('fs');


module.exports = (req, res, next) => {
    
    if (req.cookies.user && !req.session.user) {
        const users = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data/users.json'), 'utf-8'));
        const user = users.find(user => user.email == req.cookies.user);
        req.session.user = user;
    }

    return next()
}