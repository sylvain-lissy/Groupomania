'use strict';
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class User extends Model {}
    User.init({
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'http://127.0.0.1:3000/images/avatars/default_user.jpg'
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    }, 
    {
        sequelize,
        modelName: 'User',
    })
    return User
}
