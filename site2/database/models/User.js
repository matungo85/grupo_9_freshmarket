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
        last_name: {
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
    }

    const config = {
        tablename: "users"
    }

    const User = sequelize.define(alias, cols, config);

    return User

}