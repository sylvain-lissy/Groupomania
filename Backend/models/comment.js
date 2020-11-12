'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {};
  Comment.init({
    //userId: DataTypes.INTEGER,
    //messageId: DataTypes.STRING,
    comment: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};