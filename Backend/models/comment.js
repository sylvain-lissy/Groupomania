'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {};
  Comment.init({
    comment_user: DataTypes.INTEGER,
    comment_message: DataTypes.STRING,
    comment_content: DataTypes.STRING,
    comment_image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Comment',
    timestamps: false
  });
  return Comment;
};