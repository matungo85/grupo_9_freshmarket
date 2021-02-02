const bcryptjs =require ('bcryptjs');
const {User} = require ('../database/models')

module.exports = {
login : (req, res ) => {
    console.log ('llegué acá!!')
}
    /*
    async login (req, res) {
        const {email, password} = req.body

     const users = await User.findOne({
        where: {
            email,
        }
     })
     if(user && bcrypt.compareSync(password, userpassword)){
         res.json ({
             meta: {
                 status : 'success',
             },
             data: {
                 user
             }
         })
     } else {
         res.status (400).json ({
             meta: {
                 status: 'error',
             },
             error: 'email o password incorrecto',
         })
     }
        
    } */
};