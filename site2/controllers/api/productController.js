const db = require('../../database/models')
var controller = {};
const sequelize = require('sequelize')

controller = {
    list: async (req, res) => {

        const products = await db.Product.findAll({include: ["category"]});

        const categorias = await db.sequelize.query('select distinct categories.name, count(categories.name) as "productos en esta categoria" from products inner join categories on products.category_id = categories.id group by categories.name' )

        console.log(categorias)
        let respuesta = {
            meta: {
                count: products.length,
                categorias: categorias

            },
            data: products
        }

        res.json(respuesta);
    }
}

module.exports = controller

