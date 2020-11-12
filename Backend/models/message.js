'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {}
  Message.init({
    //userId: DataTypes.INTEGER,
    message: DataTypes.STRING,
    messageUrl: DataTypes.STRING,
  }, 
  {
    sequelize,
    modelName: 'Message',
  })
  return Message
}