module.exports = (sequelize, DataTypes) => {

    const alias = "User"

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        lastname: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        avatar: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        },
        DNI: {
            type: DataTypes.STRING
        },
        gender: {
            type: DataTypes.STRING
        },
        rol: {
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
        tableName: "users", 
        timestamps: false
    }

    const User = sequelize.define(alias, cols, config);

    return User

}