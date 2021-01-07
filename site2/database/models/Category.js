module.exports = (sequelize, DataTypes) => {

    const alias = "Category";
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
    }

    const config = {
        tablename: "categories"
    }

    const Category = sequelize.define(alias, cols, config);

    Category.associate = function (models) {
        Category.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'category_id',
        })
    }

    return Category;


}