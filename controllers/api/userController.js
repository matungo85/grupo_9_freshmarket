const db = require('../../database/models')
var controller = {};

controller = {
    list: async (req, res) => {

        const users = await db.User.findAll({attributes: ["id", "name", "lastname", "email"]});
                

       for (let i = 0; i < users.length; i++) {
           users[i].setDataValue("url", "http://localhost:3000/api/users/" + users[i].id)
        }
               
        let respuesta = {
            meta: {
                count: users.length,
             
            },
            data: users
        }

        res.json(respuesta);
    },
    
    detail: async function (req, res){
        
        const id = req.params.id;

        const user = await db.User.findByPk(id, {attributes: ['id', 'name', 'lastname', 'email', 'phone', 'DNI', 'gender', 'avatar']});

        user.setDataValue("url de la imagen", 'http://localhost:3000/images/users/' + user.avatar)

        res.json(user);
    },
}

module.exports = controller