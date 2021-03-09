const db = require('../database/models')

module.exports = async (req, res, next) => {
    
    if (req.cookies.user && !req.session.user) {

        const user = await db.User.findOne({
            where: {email: req.cookies.user}
           })

        req.session.user = user;
    }

    return next()
}