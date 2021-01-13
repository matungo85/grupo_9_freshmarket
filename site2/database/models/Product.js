module.exports = (sequelize, DataTypes) => {
    const alias = "Product"
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.DECIMAL
        },
        description: {
            type: DataTypes.STRING
        },
        brand: {
            type: DataTypes.STRING
        },
        weight_volume: {
            type: DataTypes.DECIMAL
        },
        unit: {
            type: DataTypes.STRING
        },
        discount: {
            type: DataTypes.DECIMAL
        },
        image: {
            type: DataTypes.STRING
        },
        category_id: {
            type: DataTypes.INTEGER
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at'
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at'
        }
    }
    const config = {
        tableName: "products",
    }


    const Product = sequelize.define(alias, cols, config);

    Product.associate = function (models) {
        Product.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'category_id',
        })
    }

    return Product;

}